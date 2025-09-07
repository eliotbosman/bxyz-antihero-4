// <<bxyz bokmarke>> animations bootstrap (idle)

// <<bxyz bokmarke>> gsap
window.gsap = window.gsap || undefined;

// <<bxyz bokmarke>> scrollmagic
const ScrollMagicController = (typeof ScrollMagic !== 'undefined') ? new ScrollMagic.Controller() : null;

// <<bxyz bokmarke>> locomotive scroll
let loco = null;
if (typeof LocomotiveScroll !== 'undefined') {
  loco = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]') || document.documentElement,
    smooth: false
  });
}

// <<bxyz bokmarke>> Smooth title scaling on scroll
(function smoothTitleScale(){
  const header = document.querySelector('.site-header-bottom-sticky');
  const title = document.querySelector('.site-header-bottom-sticky .brand-title');
  if (!header || !title || !window.gsap) return;

  const XL_SIZE = getComputedStyle(document.documentElement).getPropertyValue('--fs-xl').trim() || '1.5rem';
  const S_SIZE = getComputedStyle(document.documentElement).getPropertyValue('--fs-s').trim() || '0.875rem';
  
  // Set initial size to XL
  gsap.set(title, { fontSize: `clamp(${S_SIZE}, 18vw, calc(${XL_SIZE} * 20))` });

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY || 0;
        const maxScroll = 300; // Distance over which to animate
        
        // Calculate progress (0 = top, 1 = fully scrolled)
        const progress = Math.min(scrollY / maxScroll, 1);
        
        // Smooth interpolation between XL and S sizes
        const currentSize = gsap.utils.interpolate(
          `clamp(${S_SIZE}, 18vw, calc(${XL_SIZE} * 20))`,
          S_SIZE,
          progress
        );
        
        gsap.set(title, { 
          fontSize: currentSize,
          force3D: true
        });
        
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// <<bxyz bokmarke>> Nav bar interactions removed - using CSS hover underline instead
