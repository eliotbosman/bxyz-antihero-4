/*
  Script: dedupe-fonts.js
  Purpose: Find exact duplicate font files in 01_BXYZ_AH_Fonts/ (by content hash)
           and move duplicates into 01_BXYZ_AH_Fonts/_duplicates/ (quarantine).
           Optionally, find "near-duplicates" by filename heuristics (family+weight+style)
           and move extras into 01_BXYZ_AH_Fonts/_near_duplicates/.
  Safety: DRY-RUN by default. Use `--apply` to actually move/delete files.
  Usage:
    node dedupe-fonts.js                   # dry-run (exact dupes)
    node dedupe-fonts.js --apply           # move exact duplicates to _duplicates/
    node dedupe-fonts.js --near            # dry-run (near-duplicates)
    node dedupe-fonts.js --near --apply    # move near-duplicates to _near_duplicates/
    node dedupe-fonts.js --apply --delete  # delete duplicates (not recommended)
*/

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const FONTS_DIR = path.join(ROOT, '01_BXYZ_AH_Fonts');
const DUP_DIR = path.join(FONTS_DIR, '_duplicates');
const NEAR_DIR = path.join(FONTS_DIR, '_near_duplicates');

const APPLY = process.argv.includes('--apply');
const DELETE = process.argv.includes('--delete');
const NEAR = process.argv.includes('--near');

function listFontFiles(dir) {
  return fs.readdirSync(dir)
    .filter(n => ['.woff','.woff2'].includes(path.extname(n).toLowerCase()))
    .map(n => path.join(dir, n))
    .filter(p => {
      try {
        const st = fs.statSync(p);
        return st.isFile() && st.size > 0; // ignore zero-byte
      } catch { return false; }
    });
}

function hashFile(file) {
  const buf = fs.readFileSync(file);
  return crypto.createHash('sha1').update(buf).digest('hex');
}

function stripTrailingNumber(base) {
  return base.replace(/\s+\d+$/,'');
}

// Heuristics similar to generate-fonts.js
const weightMap = [
  { re: /thin|hairline/i, w: 100 },
  { re: /extralight|ultralight/i, w: 200 },
  { re: /light|demi?light/i, w: 300 },
  { re: /regular|book|normal|roman|text/i, w: 400 },
  { re: /medium/i, w: 500 },
  { re: /semibold|demibold/i, w: 600 },
  { re: /bold|grandbold|textbold/i, w: 700 },
  { re: /extrabold|ultrabold|heavy|grandheavy|blackitalic?/i, w: 800 },
  { re: /black|ultrablack/i, w: 900 },
];

function detectWeight(name) {
  for (const m of weightMap) if (m.re.test(name)) return m.w;
  return 400;
}

function detectStyle(name) {
  if (/italic|it\b/i.test(name)) return 'italic';
  if (/oblique/i.test(name)) return 'oblique';
  return 'normal';
}

function familyFromBase(base) {
  if (base.includes('-')) return base.split('-')[0];
  const tokens = base.split(/[^A-Za-z0-9]+/).filter(Boolean);
  const styleTokens = new Set(['Regular','Book','Text','Thin','Light','Medium','Semi','Semibold','Demi','Demibold','Bold','Extra','Extrabold','Ultra','Ultrabold','Heavy','Black','Italic','Roman']);
  while (tokens.length > 1 && styleTokens.has(tokens[tokens.length-1])) tokens.pop();
  return tokens.join('-') || base;
}

function signatureFor(file) {
  const ext = path.extname(file).toLowerCase();
  const base = stripTrailingNumber(path.basename(file, ext));
  return {
    family: familyFromBase(base),
    weight: detectWeight(base),
    style: detectStyle(base),
  };
}

function scoreForKeep(file) {
  const name = path.basename(file);
  const ext = path.extname(file).toLowerCase();
  const base = stripTrailingNumber(path.basename(file, ext));
  // Higher score = better candidate to keep
  let score = 0;
  if (ext === '.woff2') score += 10; // prefer woff2
  if (name === `${base}${ext}`) score += 5; // prefer without trailing number
  score += Math.max(0, 50 - name.length); // prefer shorter names
  return score;
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function main() {
  if (!fs.existsSync(FONTS_DIR)) {
    console.error('Fonts directory not found:', FONTS_DIR);
    process.exit(1);
  }
  const files = listFontFiles(FONTS_DIR);
  console.log(`Scanning ${files.length} font files in ${path.relative(ROOT, FONTS_DIR)}`);

  // Group by content hash (exact duplicates)
  const groups = new Map();
  for (const f of files) {
    const h = hashFile(f);
    if (!groups.has(h)) groups.set(h, []);
    groups.get(h).push(f);
  }

  let duplicateGroups = 0;
  let duplicateFiles = 0;
  const actions = [];
  const touched = new Set();

  for (const [hash, group] of groups.entries()) {
    if (group.length <= 1) continue;
    duplicateGroups++;
    // choose best to keep
    const sorted = group.slice().sort((a,b)=> scoreForKeep(b) - scoreForKeep(a));
    const keep = sorted[0];
    const dups = sorted.slice(1);
    duplicateFiles += dups.length;
    for (const d of dups) {
      const target = path.join(DUP_DIR, path.basename(d));
      actions.push({ type: DELETE ? 'delete' : 'move', from: d, to: target, keep, kind: 'exact' });
      touched.add(d);
    }
  }

  if (duplicateGroups === 0) {
    console.log('No exact duplicate files found.');
  }

  console.log(`Found ${duplicateGroups} duplicate groups, ${duplicateFiles} duplicate files.`);

  // Near-duplicates by filename signature (family+weight+style)
  if (NEAR) {
    const sigMap = new Map();
    for (const f of files) {
      if (touched.has(f)) continue; // already handled as exact dup
      const sig = signatureFor(f);
      const key = `${sig.family}__${sig.weight}__${sig.style}`;
      if (!sigMap.has(key)) sigMap.set(key, []);
      sigMap.get(key).push(f);
    }

    let nearGroups = 0, nearFiles = 0;
    for (const [key, group] of sigMap.entries()) {
      if (group.length <= 1) continue;
      nearGroups++;
      const sorted = group.slice().sort((a,b)=> scoreForKeep(b) - scoreForKeep(a));
      const keep = sorted[0];
      const dups = sorted.slice(1);
      nearFiles += dups.length;
      for (const d of dups) {
        const target = path.join(NEAR_DIR, path.basename(d));
        actions.push({ type: DELETE ? 'delete' : 'move', from: d, to: target, keep, kind: 'near' });
      }
    }
    if (nearGroups === 0) console.log('No near-duplicate groups found.');
    else console.log(`Near-duplicates: ${nearGroups} groups, ${nearFiles} files.`);
  }

  for (const a of actions) {
    const relFrom = path.relative(ROOT, a.from);
    const relKeep = path.relative(ROOT, a.keep);
    if (!APPLY) {
      console.log(`[dry-run] ${a.kind || 'exact'} ${a.type.toUpperCase()} ${relFrom} (keep -> ${relKeep})`);
      continue;
    }
    if (a.type === 'move') {
      ensureDir(a.kind === 'near' ? NEAR_DIR : DUP_DIR);
      try {
        fs.renameSync(a.from, a.to);
        console.log(`[moved:${a.kind||'exact'}] ${relFrom} -> ${path.relative(ROOT, a.to)} (kept ${relKeep})`);
      } catch (e) {
        console.warn(`[warn] failed to move ${relFrom}: ${e.message}`);
      }
    } else if (a.type === 'delete') {
      try {
        fs.unlinkSync(a.from);
        console.log(`[deleted:${a.kind||'exact'}] ${relFrom} (kept ${relKeep})`);
      } catch (e) {
        console.warn(`[warn] failed to delete ${relFrom}: ${e.message}`);
      }
    }
  }

  if (!APPLY) {
    console.log('\nNothing changed (dry-run). Re-run with --apply to move duplicates.');
  } else if (!DELETE) {
    console.log(`\nExact duplicates moved to ${path.relative(ROOT, DUP_DIR)}.`);
    if (NEAR) console.log(`Near-duplicates moved to ${path.relative(ROOT, NEAR_DIR)}.`);
  }
}

main();
