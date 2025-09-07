// Flipbook config
const FLIPBOOK_SPEED_MS = 1000; // 1 per second
const FLIPBOOK_MAX = Infinity;  // set to a number to cap how many images in the loop

// Source images (present in 01_BXYZ_AH_IMG_TEST/)
const IMAGES = [
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_1.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_2.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_7.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_8.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_9.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_10.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_11.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_12.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_13.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_14.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_15.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_16.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_17.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_18.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_19.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_20.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_21.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_22.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_23.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_24.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_25.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_26.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_27.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_28.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_29.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_30.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_31.jpg",
  "01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_32.jpg",
].slice(0, FLIPBOOK_MAX);

// Shuffle helper
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Preload and keep only those that load
function preloadAndFilter(sources) {
  return new Promise(resolve => {
    const ok = [];
    let pending = sources.length;
    if (!pending) return resolve(ok);
    sources.forEach(src => {
      const img = new Image();
      img.onload = () => { ok.push(src); if (--pending === 0) resolve(ok); };
      img.onerror = () => { if (--pending === 0) resolve(ok); };
      img.src = src;
    });
  });
}

function randomAspect() {
  // Force 16:9 as requested
  return "ar-16-9";
}

function setupFlipbook() {
  startFlipbook();
}

async function startFlipbook() {
  const frame = document.querySelector(".flipbook-frame");
  const imgEl = document.getElementById("flipbook-image");
  if (!frame || !imgEl) return;

  const pool = shuffle(await preloadAndFilter(IMAGES));
  if (pool.length === 0) return;

  let i = 0;
  function tick() {
    frame.classList.remove("ar-4-5", "ar-16-9");
    frame.classList.add(randomAspect());
    imgEl.src = pool[i];
    i = (i + 1) % pool.length;
  }

  tick();
  setInterval(tick, FLIPBOOK_SPEED_MS);
}

// Events data with bilingual content
const EVENTS_DATA = [
  {
    id: 1,
    title: { en: "ANTIHERO LAUNCH PARTY", fr: "SOIRÉE DE LANCEMENT ANTIHERO" },
    location: { en: "PARIS WAREHOUSE", fr: "ENTREPÔT PARISIEN" },
    datetime: { en: "FEB 15, 2024 • 8PM", fr: "15 FÉV 2024 • 20H" },
    description: { 
      en: "Join us for the official launch of our latest collection. Experience the rebellion through fashion, music, and art.",
      fr: "Rejoignez-nous pour le lancement officiel de notre dernière collection. Vivez la rébellion à travers la mode, la musique et l'art."
    },
    details: { 
      en: "Doors open at 7:30 PM • 21+ event • Free drinks until 10 PM",
      fr: "Ouverture à 19h30 • Événement 21+ • Boissons gratuites jusqu'à 22h"
    },
    image: "./01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_1.jpg",
    additionalInfo: { 
      en: "Featured artists will showcase their latest works alongside our new clothing line. Live DJ sets from underground artists.",
      fr: "Des artistes présenteront leurs dernières œuvres aux côtés de notre nouvelle ligne de vêtements. Sets DJ live d'artistes underground."
    }
  },
  {
    id: 2,
    title: { en: "UNDERGROUND FASHION SHOW", fr: "DÉFILÉ DE MODE UNDERGROUND" },
    location: { en: "MARAIS GALLERY", fr: "GALERIE DU MARAIS" },
    datetime: { en: "MAR 3, 2024 • 7PM", fr: "3 MARS 2024 • 19H" },
    description: { 
      en: "An intimate runway show featuring our spring collection in an underground setting.",
      fr: "Un défilé intime présentant notre collection printemps dans un cadre underground."
    },
    details: { 
      en: "Limited seating • RSVP required • Cocktail reception follows",
      fr: "Places limitées • RSVP obligatoire • Réception cocktail suivra"
    },
    image: "./01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_2.jpg",
    additionalInfo: { 
      en: "Models will walk through a maze of mirrors and neon lights, creating an immersive experience that challenges traditional fashion presentation.",
      fr: "Les mannequins défileront dans un labyrinthe de miroirs et de néons, créant une expérience immersive qui défie la présentation de mode traditionnelle."
    }
  },
  {
    id: 3,
    title: { en: "ARTIST COLLABORATION REVEAL", fr: "RÉVÉLATION COLLABORATION ARTISTE" },
    location: { en: "BELLEVILLE DISTRICT", fr: "QUARTIER BELLEVILLE" },
    datetime: { en: "MAR 20, 2024 • 6PM", fr: "20 MARS 2024 • 18H" },
    description: { 
      en: "Unveiling exclusive pieces created in collaboration with local street artists.",
      fr: "Dévoilement de pièces exclusives créées en collaboration avec des artistes de rue locaux."
    },
    details: { 
      en: "Open to public • Artist meet & greet • Limited edition prints available",
      fr: "Ouvert au public • Rencontre avec les artistes • Tirages en édition limitée disponibles"
    },
    image: "./01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_3.jpg",
    additionalInfo: { 
      en: "Watch live as artists create custom pieces on-site. First 50 attendees receive exclusive ANTIHERO x Artist collaboration stickers.",
      fr: "Regardez en direct les artistes créer des pièces personnalisées sur place. Les 50 premiers participants reçoivent des autocollants exclusifs de collaboration ANTIHERO x Artiste."
    }
  },
  {
    id: 4,
    title: { en: "MIDNIGHT SAMPLE SALE", fr: "VENTE D'ÉCHANTILLONS DE MINUIT" },
    location: { en: "WAREHOUSE 13", fr: "ENTREPÔT 13" },
    datetime: { en: "APR 1, 2024 • 12AM", fr: "1 AVR 2024 • 00H" },
    description: { 
      en: "Exclusive midnight sale featuring samples, prototypes, and one-of-a-kind pieces.",
      fr: "Vente exclusive de minuit avec échantillons, prototypes et pièces uniques."
    },
    details: { 
      en: "Cash only • Limited quantities • First come, first served",
      fr: "Espèces uniquement • Quantités limitées • Premier arrivé, premier servi"
    },
    image: "./01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_4.jpg",
    additionalInfo: { 
      en: "Rare pieces from our archive will be available at 50% off. Some items have never been released to the public.",
      fr: "Des pièces rares de nos archives seront disponibles à 50% de réduction. Certains articles n'ont jamais été commercialisés."
    }
  },
  {
    id: 5,
    title: { en: "REBEL MUSIC FESTIVAL", fr: "FESTIVAL DE MUSIQUE REBELLE" },
    location: { en: "PARC DE LA VILLETTE", fr: "PARC DE LA VILLETTE" },
    datetime: { en: "APR 15, 2024 • 2PM", fr: "15 AVR 2024 • 14H" },
    description: { 
      en: "A day-long music festival celebrating counterculture and rebellion through sound.",
      fr: "Un festival de musique d'une journée célébrant la contre-culture et la rébellion à travers le son."
    },
    details: { 
      en: "All ages welcome • Food trucks on site • ANTIHERO merchandise booth",
      fr: "Tous âges bienvenus • Food trucks sur place • Stand de marchandises ANTIHERO"
    },
    image: "./01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_5.jpg",
    additionalInfo: { 
      en: "Five stages featuring punk, electronic, and experimental music. Special ANTIHERO festival merch available exclusively at the event.",
      fr: "Cinq scènes avec punk, électronique et musique expérimentale. Marchandises spéciales festival ANTIHERO disponibles exclusivement à l'événement."
    }
  },
  {
    id: 6,
    title: { en: "PHOTOGRAPHY EXHIBITION", fr: "EXPOSITION DE PHOTOGRAPHIE" },
    location: { en: "SAINT-GERMAIN GALLERY", fr: "GALERIE SAINT-GERMAIN" },
    datetime: { en: "MAY 5, 2024 • 7PM", fr: "5 MAI 2024 • 19H" },
    description: { 
      en: "Raw photography exhibition showcasing the ANTIHERO lifestyle and aesthetic.",
      fr: "Exposition de photographie brute présentant le style de vie et l'esthétique ANTIHERO."
    },
    details: { 
      en: "Wine and cheese reception • Prints available for purchase • Artist Q&A",
      fr: "Réception vin et fromage • Tirages disponibles à l'achat • Q&R avec l'artiste"
    },
    image: "./01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_6.jpg",
    additionalInfo: { 
      en: "Behind-the-scenes shots from our campaigns and candid moments from the ANTIHERO community. Limited edition photo books will be available.",
      fr: "Photos des coulisses de nos campagnes et moments spontanés de la communauté ANTIHERO. Livres photo en édition limitée disponibles."
    }
  },
  {
    id: 7,
    title: { en: "DESIGN WORKSHOP", fr: "ATELIER DE DESIGN" },
    location: { en: "STUDIO SPACE", fr: "ESPACE STUDIO" },
    datetime: { en: "MAY 22, 2024 • 10AM", fr: "22 MAI 2024 • 10H" },
    description: { 
      en: "Hands-on workshop teaching screen printing and garment customization techniques.",
      fr: "Atelier pratique enseignant la sérigraphie et les techniques de personnalisation de vêtements."
    },
    details: { 
      en: "Materials provided • Limited to 20 participants • Registration required",
      fr: "Matériel fourni • Limité à 20 participants • Inscription obligatoire"
    },
    image: "./01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_7.jpg",
    additionalInfo: { 
      en: "Learn the techniques used to create ANTIHERO's signature looks. Take home your custom-designed piece.",
      fr: "Apprenez les techniques utilisées pour créer les looks signature d'ANTIHERO. Repartez avec votre pièce personnalisée."
    }
  },
  {
    id: 8,
    title: { en: "SUMMER ROOFTOP PARTY", fr: "FÊTE SUR TOIT D'ÉTÉ" },
    location: { en: "MONTMARTRE ROOFTOP", fr: "TOIT DE MONTMARTRE" },
    datetime: { en: "JUN 10, 2024 • 6PM", fr: "10 JUIN 2024 • 18H" },
    description: { 
      en: "Sunset party featuring new summer collection and exclusive DJ sets.",
      fr: "Fête au coucher du soleil présentant la nouvelle collection d'été et des sets DJ exclusifs."
    },
    details: { 
      en: "Sunset views • Premium bar • Dress code: ANTIHERO aesthetic",
      fr: "Vue sur le coucher de soleil • Bar premium • Code vestimentaire : esthétique ANTIHERO"
    },
    image: "./01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_8.jpg",
    additionalInfo: { 
      en: "360-degree city views while experiencing our summer line. Professional photographers will capture the evening for our next campaign.",
      fr: "Vue à 360 degrés sur la ville tout en découvrant notre ligne d'été. Des photographes professionnels captureront la soirée pour notre prochaine campagne."
    }
  },
  {
    id: 9,
    title: { en: "VINTAGE MARKET TAKEOVER", fr: "PRISE DE CONTRÔLE MARCHÉ VINTAGE" },
    location: { en: "MARCHÉ AUX PUCES", fr: "MARCHÉ AUX PUCES" },
    datetime: { en: "JUN 25, 2024 • 11AM", fr: "25 JUIN 2024 • 11H" },
    description: { 
      en: "ANTIHERO takes over the vintage market with rare finds and exclusive pieces.",
      fr: "ANTIHERO prend le contrôle du marché vintage avec des trouvailles rares et des pièces exclusives."
    },
    details: { 
      en: "Outdoor market • Vintage hunting • Special ANTIHERO vintage booth",
      fr: "Marché en plein air • Chasse au vintage • Stand vintage ANTIHERO spécial"
    },
    image: "./01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_9.jpg",
    additionalInfo: { 
      en: "Curated vintage pieces that inspired our designs, plus exclusive ANTIHERO vintage-style reproductions.",
      fr: "Pièces vintage sélectionnées qui ont inspiré nos designs, plus des reproductions exclusives de style vintage ANTIHERO."
    }
  },
  {
    id: 10,
    title: { en: "ANNIVERSARY CELEBRATION", fr: "CÉLÉBRATION D'ANNIVERSAIRE" },
    location: { en: "SECRET LOCATION", fr: "LIEU SECRET" },
    datetime: { en: "JUL 4, 2024 • 9PM", fr: "4 JUIL 2024 • 21H" },
    description: { 
      en: "One year anniversary celebration at a secret location revealed day-of.",
      fr: "Célébration du premier anniversaire dans un lieu secret révélé le jour même."
    },
    details: { 
      en: "Invitation only • Location revealed via text • Surprise performances",
      fr: "Sur invitation seulement • Lieu révélé par SMS • Performances surprises"
    },
    image: "./01_BXYZ_AH_IMG_TEST/01_BXYZ_AH_FLASH_TEST_10.jpg",
    additionalInfo: { 
      en: "A night of surprises celebrating one year of rebellion. Special anniversary collection preview and exclusive merch for attendees.",
      fr: "Une nuit de surprises célébrant une année de rébellion. Aperçu de la collection anniversaire spéciale et marchandises exclusives pour les participants."
    }
  }
];

// Current language state
let currentLanguage = 'en';

// Language switching functionality
function switchLanguage(lang) {
  currentLanguage = lang;
  
  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    }
  });
  
  // Re-populate events with new language
  populateEvents();
}

// Populate events
function populateEvents() {
  const eventsList = document.getElementById('events-list');
  if (!eventsList) return;

  // Clear existing events
  eventsList.innerHTML = '';

  EVENTS_DATA.forEach(event => {
    const eventItem = document.createElement('div');
    eventItem.className = 'event-item';
    eventItem.dataset.eventId = event.id;
    
    eventItem.innerHTML = `
      <div class="event-title">${event.title[currentLanguage]}</div>
      <div class="event-location">${event.location[currentLanguage]}</div>
      <div class="event-datetime">${event.datetime[currentLanguage]}</div>
      <div class="event-expanded" id="event-expanded-${event.id}">
        <div class="event-image">
          <img src="${event.image}" alt="${event.title[currentLanguage]}" />
        </div>
        <div class="event-content">
          <div class="event-description">${event.description[currentLanguage]}</div>
          <div class="event-details">${event.details[currentLanguage]}</div>
          <div class="event-additional">
            <h3>${currentLanguage === 'en' ? 'Additional Information' : 'Informations Supplémentaires'}</h3>
            <p>${event.additionalInfo[currentLanguage]}</p>
          </div>
        </div>
      </div>
    `;
    
    eventsList.appendChild(eventItem);
  });
}

// Setup event interactions with GSAP animations
function setupEventInteractions() {
  const eventItems = document.querySelectorAll('.event-item');
  
  eventItems.forEach(item => {
    const eventId = item.dataset.eventId;
    const expandedContent = document.getElementById(`event-expanded-${eventId}`);
    let isExpanded = false;
    
    item.addEventListener('click', () => {
      if (isExpanded) {
        // Close animation
        gsap.to(expandedContent, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            expandedContent.classList.remove('active');
            expandedContent.style.display = 'none';
          }
        });
        isExpanded = false;
      } else {
        // Close any other open events first
        eventItems.forEach(otherItem => {
          const otherId = otherItem.dataset.eventId;
          const otherExpanded = document.getElementById(`event-expanded-${otherId}`);
          if (otherExpanded.classList.contains('active')) {
            gsap.to(otherExpanded, {
              height: 0,
              opacity: 0,
              duration: 0.3,
              ease: "power2.inOut",
              onComplete: () => {
                otherExpanded.classList.remove('active');
                otherExpanded.style.display = 'none';
              }
            });
          }
        });
        
        // Open animation
        expandedContent.style.display = 'grid';
        expandedContent.classList.add('active');
        
        gsap.fromTo(expandedContent, 
          { height: 0, opacity: 0 },
          { 
            height: 'auto',
            opacity: 1,
            duration: 0.6,
            ease: "power2.inOut"
          }
        );
        isExpanded = true;
      }
    });
  });
}

// Setup overlay functionality
function setupOverlays() {
  const menuTrigger = document.getElementById('menu-trigger');
  const infoTrigger = document.getElementById('info-trigger');
  const menuOverlay = document.getElementById('menu-overlay');
  const infoOverlay = document.getElementById('info-overlay');
  const menuClose = document.getElementById('menu-close');
  const infoClose = document.getElementById('info-close');

  if (menuTrigger && menuOverlay && menuClose) {
    menuTrigger.addEventListener('click', () => {
      menuOverlay.style.display = 'flex';
      menuOverlay.classList.add('active');
    });
    
    menuClose.addEventListener('click', () => {
      menuOverlay.classList.remove('active');
      setTimeout(() => {
        menuOverlay.style.display = 'none';
      }, 300);
    });
  }

  if (infoTrigger && infoOverlay && infoClose) {
    infoTrigger.addEventListener('click', () => {
      infoOverlay.style.display = 'flex';
      infoOverlay.classList.add('active');
    });
    
    infoClose.addEventListener('click', () => {
      infoOverlay.classList.remove('active');
      setTimeout(() => {
        infoOverlay.style.display = 'none';
      }, 300);
    });
  }
}

// Setup product hover effects
function setupProductHovers() {
  const productItems = document.querySelectorAll('.product-item img');
  
  productItems.forEach(img => {
    const hoverSrc = img.dataset.hover;
    const originalSrc = img.src;
    
    if (hoverSrc) {
      img.addEventListener('mouseenter', () => {
        img.src = hoverSrc;
      });
      
      img.addEventListener('mouseleave', () => {
        img.src = originalSrc;
      });
    }
  });
}

// Setup music player functionality
function setupMusicPlayer() {
  const playPauseBtn = document.getElementById('play-pause');
  const prevBtn = document.getElementById('prev-track');
  const nextBtn = document.getElementById('next-track');
  const progressBar = document.getElementById('progress-bar');
  const progressFill = document.getElementById('progress-fill');
  const volumeRange = document.getElementById('volume-range');
  const volumeBtn = document.getElementById('volume-btn');
  const trackTitle = document.getElementById('track-title');
  const trackArtist = document.getElementById('track-artist');
  const currentTime = document.getElementById('current-time');
  
  let isPlaying = false;
  let currentTrack = 0;
  let progress = 35;
  
  const tracks = [
    { title: "ANTIHERO RADIO", artist: "NOW PLAYING: REBEL FREQUENCIES" },
    { title: "UNDERGROUND SESSIONS", artist: "NOW PLAYING: DARK WAVE COLLECTIVE" },
    { title: "STREET SOUNDS", artist: "NOW PLAYING: URBAN REBELLION" },
    { title: "MIDNIGHT FREQUENCIES", artist: "NOW PLAYING: SHADOW BEATS" }
  ];
  
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentTrack = (currentTrack + 1) % tracks.length;
      updateTrackInfo();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentTrack = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
      updateTrackInfo();
    });
  }
  
  if (progressBar && progressFill) {
    progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newProgress = (clickX / rect.width) * 100;
      progress = Math.max(0, Math.min(100, newProgress));
      progressFill.style.width = progress + '%';
      
      const minutes = Math.floor((progress / 100) * 24);
      const seconds = Math.floor(((progress / 100) * 24 * 60) % 60);
      currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    });
  }
  
  if (volumeRange) {
    volumeRange.addEventListener('input', (e) => {
      const volume = e.target.value;
      if (volumeBtn) {
        volumeBtn.textContent = volume == 0 ? 'MUTE' : 'VOL';
      }
    });
  }
  
  function updateTrackInfo() {
    if (trackTitle && trackArtist) {
      trackTitle.textContent = tracks[currentTrack].title;
      trackArtist.textContent = tracks[currentTrack].artist;
    }
  }
  
  // Simulate progress animation when playing
  setInterval(() => {
    if (isPlaying && progress < 100) {
      progress += 0.1;
      if (progressFill) {
        progressFill.style.width = progress + '%';
      }
      const minutes = Math.floor((progress / 100) * 24);
      const seconds = Math.floor(((progress / 100) * 24 * 60) % 60);
      if (currentTime) {
        currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    }
  }, 1000);
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  setupFlipbook();
  populateEvents();
  setupEventInteractions();
  setupOverlays();
  setupMusicPlayer();
  setupLanguageSwitcher();
  buildArtistList();
});

// Setup language switcher
function setupLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchLanguage(btn.dataset.lang);
    });
  });
}

// -------------------------
// Artists expandable section
// -------------------------

const ARTISTS = [
  "Nova Drift", "Echo Bloom", "Velvet Harbor", "Lunar Arcade", "Static Poet",
  "Neon Chapel", "Golden Motel", "Feral Choir", "Silver Atlas", "Paper Wolves",
  "Marble Radio", "Cassette Ghosts", "Crystal Tennis", "Fever Picnic", "Modern Arcade",
  "Orchid Empire", "Ghost Carousel", "Ivory District", "Hollow Season", "Cobalt Lanes",
  "Blue Parlor", "June Motel", "Static Seasons", "Golden Youth", "Night Library",
  "Ivory Echoes", "Velvet Bridges", "Cherry Weather", "Thursday Cinema", "Violet Cities"
];

const RIGHT_LINKS = [
  { label: "Website", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Spotify", href: "#" },
  { label: "Apple Music", href: "#" }
];

function buildArtistList() {
  const list = document.getElementById("artist-list");
  const wrap = document.querySelector("#artists .artists-wrap");
  if (!list || !wrap) return;

  // Render buttons
  list.innerHTML = ARTISTS.map((name, i) => `
    <li><button class="artist-btn" data-index="${i}">${name}</button></li>
  `).join("");

  // Create expandable panel (initially hidden)
  const panel = document.createElement("div");
  panel.className = "artist-panel";
  panel.innerHTML = `
    <div class="artist-links">
      <ul class="links"></ul>
    </div>
    <div class="artist-image">
      <img alt="Artist image" />
      <p class="artist-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
    </div>
    <div class="artist-close"><button type="button">[Close]</button></div>
  `;
  wrap.appendChild(panel);

  const imgEl = panel.querySelector("img");
  const linksEl = panel.querySelector(".links");
  const closeBtn = panel.querySelector(".artist-close button");

  function openArtist(index) {
    // Choose an image from our pool
    const src = IMAGES[(index % IMAGES.length)];
    if (src) imgEl.src = src;

    // Build right-rail links
    linksEl.innerHTML = RIGHT_LINKS.map(l => `
      <li><a href="${l.href}" target="_blank" rel="noopener">${l.label}</a></li>
    `).join("");

    // Smooth open with GSAP
    if (window.gsap) {
      panel.classList.add("is-open");
      gsap.killTweensOf(panel);
      
      // Get natural height
      gsap.set(panel, { height: 'auto' });
      const targetHeight = panel.offsetHeight;
      
      // Animate from 0 to target height
      gsap.fromTo(panel, 
        { height: 0, opacity: 0, force3D: true }, 
        { 
          height: targetHeight, 
          opacity: 1, 
          duration: 0.3, 
          ease: 'power1.out',
          onComplete: () => {
            gsap.set(panel, { height: 'auto' });
            // Smooth scroll to reveal after animation
            setTimeout(() => {
              panel.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
          }
        }
      );
    } else {
      panel.classList.add("is-open");
      setTimeout(() => {
        panel.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }

  list.addEventListener("click", (e) => {
    const btn = e.target.closest(".artist-btn");
    if (!btn) return;
    const i = parseInt(btn.getAttribute("data-index"), 10) || 0;
    openArtist(i);
  });

  closeBtn.addEventListener("click", () => {
    if (window.gsap && panel.classList.contains("is-open")) {
      gsap.killTweensOf(panel);
      const currentHeight = panel.offsetHeight;
      gsap.fromTo(panel, 
        { height: currentHeight, opacity: 1, force3D: true }, 
        { 
          height: 0, 
          opacity: 0, 
          duration: 0.2, 
          ease: 'power1.in', 
          onComplete: () => {
            panel.classList.remove("is-open");
            gsap.set(panel, { clearProps: 'all' });
          }
        }
      );
    } else {
      panel.classList.remove("is-open");
    }
  });
}

// Product hover image swap functionality
function initProductHover() {
  const productItems = document.querySelectorAll('.product-item img[data-hover]');
  
  productItems.forEach(img => {
    const originalSrc = img.src;
    const hoverSrc = img.getAttribute('data-hover');
    
    if (!hoverSrc) return;
    
    // Preload hover image
    const hoverImg = new Image();
    hoverImg.src = hoverSrc;
    
    img.addEventListener('mouseenter', () => {
      img.src = hoverSrc;
    });
    
    img.addEventListener('mouseleave', () => {
      img.src = originalSrc;
    });
  });
}

// Overlay functionality
function initOverlays() {
  const menuTrigger = document.getElementById('menu-trigger');
  const infoTrigger = document.getElementById('info-trigger');
  const menuOverlay = document.getElementById('menu-overlay');
  const infoOverlay = document.getElementById('info-overlay');
  const menuClose = document.getElementById('menu-close');
  const infoClose = document.getElementById('info-close');

  // Debug: Check if elements exist
  console.log('Menu trigger:', menuTrigger);
  console.log('Info trigger:', infoTrigger);
  console.log('Menu overlay:', menuOverlay);
  console.log('Info overlay:', infoOverlay);

  function openOverlay(overlay) {
    console.log('Opening overlay:', overlay);
    overlay.style.display = 'flex';
    overlay.style.visibility = 'visible';
    
    if (window.gsap) {
      gsap.set(overlay, { y: '100%', opacity: 1 });
      gsap.to(overlay, { 
        y: '0%', 
        duration: 0.6, 
        ease: 'power2.out' 
      });
      
      // Animate in links or text
      const links = overlay.querySelectorAll('.overlay-link');
      const text = overlay.querySelectorAll('.overlay-text p');
      
      if (links.length > 0) {
        gsap.fromTo(links, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
        );
      }
      
      if (text.length > 0) {
        gsap.fromTo(text,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
        );
      }
      
      // Animate headline if it exists
      const headline = overlay.querySelector('.overlay-headline');
      if (headline) {
        gsap.fromTo(headline,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'power2.out' }
        );
      }
    } else {
      overlay.style.opacity = '1';
    }
  }

  function closeOverlay(overlay) {
    if (window.gsap) {
      gsap.to(overlay, { 
        y: '100%', 
        duration: 0.4, 
        ease: 'power2.in',
        onComplete: () => {
          overlay.style.display = 'none';
          overlay.style.visibility = 'hidden';
        }
      });
    } else {
      overlay.style.opacity = '0';
      overlay.style.display = 'none';
      overlay.style.visibility = 'hidden';
    }
  }

  // Event listeners with null checks
  if (menuTrigger && menuOverlay) {
    console.log('Adding menu click listener');
    menuTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Menu clicked');
      openOverlay(menuOverlay);
    });
  } else {
    console.error('Menu elements not found:', { menuTrigger, menuOverlay });
  }
  
  if (infoTrigger && infoOverlay) {
    console.log('Adding info click listener');
    infoTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Info clicked');
      openOverlay(infoOverlay);
    });
  } else {
    console.error('Info elements not found:', { infoTrigger, infoOverlay });
  }
  
  if (menuClose && menuOverlay) {
    menuClose.addEventListener('click', () => closeOverlay(menuOverlay));
  }
  
  if (infoClose && infoOverlay) {
    infoClose.addEventListener('click', () => closeOverlay(infoOverlay));
  }

  // Close on overlay background click
  [menuOverlay, infoOverlay].forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeOverlay(overlay);
      }
    });
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (menuOverlay.style.display !== 'none') closeOverlay(menuOverlay);
      if (infoOverlay.style.display !== 'none') closeOverlay(infoOverlay);
    }
  });
}

// Link hover animations
function initLinkAnimations() {
  // Add animated-link class to all links
  const links = document.querySelectorAll('a, .artist-btn, .overlay-link');
  
  links.forEach(link => {
    if (!link.classList.contains('animated-link')) {
      link.classList.add('animated-link');
    }
    
    // Create line elements for animation
    const topLine = document.createElement('span');
    const middleLine = document.createElement('span');
    const bottomLine = document.createElement('span');
    
    topLine.className = 'link-line link-line-top';
    middleLine.className = 'link-line link-line-middle';
    bottomLine.className = 'link-line link-line-bottom';
    
    link.appendChild(topLine);
    link.appendChild(middleLine);
    link.appendChild(bottomLine);
    
    let animationTimeline;
    
    link.addEventListener('mouseenter', () => {
      if (window.gsap) {
        // Kill any existing animation
        if (animationTimeline) animationTimeline.kill();
        
        // Create looping animation: underline -> throughline -> overline
        animationTimeline = gsap.timeline({ repeat: -1 });
        
        animationTimeline
          .set([topLine, middleLine, bottomLine], { scaleX: 0, transformOrigin: 'left' })
          .to(bottomLine, { scaleX: 1, duration: 0.3, ease: 'power2.out' })
          .to(bottomLine, { scaleX: 0, transformOrigin: 'right', duration: 0.3, ease: 'power2.in' }, '+=0.2')
          .to(middleLine, { scaleX: 1, duration: 0.3, ease: 'power2.out' }, '-=0.1')
          .to(middleLine, { scaleX: 0, transformOrigin: 'right', duration: 0.3, ease: 'power2.in' }, '+=0.2')
          .to(topLine, { scaleX: 1, duration: 0.3, ease: 'power2.out' }, '-=0.1')
          .to(topLine, { scaleX: 0, transformOrigin: 'right', duration: 0.3, ease: 'power2.in' }, '+=0.2');
      }
    });
    
    link.addEventListener('mouseleave', () => {
      if (window.gsap && animationTimeline) {
        animationTimeline.kill();
        gsap.set([topLine, middleLine, bottomLine], { scaleX: 0 });
      }
    });
  });
}