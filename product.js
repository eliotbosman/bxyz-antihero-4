// Product page dynamic functionality
class ProductPage {
  constructor() {
    this.products = {
      'antihero-tee': {
        title: 'ANTIHERO TEE',
        price: '$45.00',
        images: [
          './01_BXYZ_AH_PRD_TEST/01_BXYZ_AH_PRODUCT_TEST_1.webp',
          './01_BXYZ_AH_PRD_TEST/01_BXYZ_AH_PRODUCT_TEST_2.webp'
        ],
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`
      },
      'hero-hoodie': {
        title: 'HERO HOODIE',
        price: '$85.00',
        images: [
          './01_BXYZ_AH_PRD_TEST/01_BXYZ_AH_PRODUCT_TEST_10.webp',
          './01_BXYZ_AH_PRD_TEST/01_BXYZ_AH_PRODUCT_TEST_11.webp'
        ],
        description: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
        
        Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.
        
        Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.`
      },
      'rebel-jacket': {
        title: 'REBEL JACKET',
        price: '$120.00',
        images: [
          './01_BXYZ_AH_PRD_TEST/01_BXYZ_AH_PRODUCT_TEST_16.webp',
          './01_BXYZ_AH_PRD_TEST/01_BXYZ_AH_PRODUCT_TEST_17.webp'
        ],
        description: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
        
        Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.
        
        Cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.`
      },
      'anti-pants': {
        title: 'ANTI PANTS',
        price: '$65.00',
        images: [
          './01_BXYZ_AH_PRD_TEST/01_BXYZ_AH_PRODUCT_TEST_19.webp',
          './01_BXYZ_AH_PRD_TEST/01_BXYZ_AH_PRODUCT_TEST_3.webp'
        ],
        description: `Ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
      },
      'hero-shorts': {
        title: 'HERO SHORTS',
        price: '$55.00',
        images: [
          './01_BXYZ_AH_PRD_TEST/01_BXYZ_AH_PRODUCT_TEST_20.webp',
          './01_BXYZ_AH_PRD_TEST/01_BXYZ_AH_PRODUCT_TEST_4.webp'
        ],
        description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
        
        Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.`
      },
      'rebel-cap': {
        title: 'REBEL CAP',
        price: '$35.00',
        images: [
          './01_BXYZ_AH_PRD_TEST/01_BXYZ_AH_PRODUCT_TEST_5.webp',
          './01_BXYZ_AH_PRD_TEST/01_BXYZ_AH_PRODUCT_TEST_6.webp'
        ],
        description: `Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
        
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
        
        Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.`
      }
    };

    this.init();
  }

  init() {
    // Get product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId && this.products[productId]) {
      this.loadProduct(productId);
    } else {
      // Default to first product if no ID or invalid ID
      this.loadProduct('antihero-tee');
    }

    this.setupEventListeners();
  }

  loadProduct(productId) {
    const product = this.products[productId];
    
    // Update title
    document.getElementById('product-title').textContent = product.title;
    document.title = `${product.title} — ANTI HERO`;
    
    // Update price
    document.getElementById('product-price').textContent = product.price;
    
    // Update description
    const descriptionEl = document.getElementById('product-description');
    descriptionEl.innerHTML = product.description.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('');
    
    // Load images
    this.loadImages(product.images);
  }

  loadImages(images) {
    const gallery = document.getElementById('image-gallery');
    const counter = document.getElementById('image-counter');
    gallery.innerHTML = '';
    
    // Update counter with total images
    counter.textContent = `1/${images.length}`;
    
    images.forEach((imageSrc, index) => {
      const img = document.createElement('img');
      img.src = imageSrc;
      img.alt = `Product image ${index + 1}`;
      img.className = 'product-image';
      img.loading = 'lazy';
      img.dataset.index = index + 1;
      
      // Add click handler for image interaction
      img.addEventListener('click', () => {
        this.handleImageClick(img);
      });
      
      gallery.appendChild(img);
    });

    // Set up proximity scroll and counter updates
    this.setupProximityScroll(gallery, counter, images.length);
  }

  setupProximityScroll(gallery, counter, totalImages) {
    let currentImageIndex = 1;
    let isScrolling = false;
    
    // Simple scroll-based counter update with debouncing
    const updateCounter = () => {
      const images = gallery.querySelectorAll('.product-image');
      const galleryRect = gallery.getBoundingClientRect();
      const galleryCenter = galleryRect.top + galleryRect.height / 2;
      
      let closestIndex = 1;
      let closestDistance = Infinity;
      
      images.forEach((img, index) => {
        const imgRect = img.getBoundingClientRect();
        const imgCenter = imgRect.top + imgRect.height / 2;
        const distance = Math.abs(imgCenter - galleryCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index + 1;
        }
      });
      
      if (closestIndex !== currentImageIndex) {
        currentImageIndex = closestIndex;
        counter.textContent = `${currentImageIndex}/${totalImages}`;
      }
    };

    // Debounced scroll listener
    let scrollTimeout;
    gallery.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateCounter, 50);
    });

    // Immediate wheel-based navigation
    gallery.addEventListener('wheel', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (isScrolling) return;
      isScrolling = true;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const targetIndex = Math.max(1, Math.min(totalImages, currentImageIndex + direction));
      
      if (targetIndex !== currentImageIndex) {
        const targetImage = gallery.children[targetIndex - 1];
        targetImage.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        
        currentImageIndex = targetIndex;
        counter.textContent = `${currentImageIndex}/${totalImages}`;
      }
      
      setTimeout(() => {
        isScrolling = false;
      }, 300);
    }, { passive: false });

    // Prevent page scroll when interacting with product details
    const productDetails = document.querySelector('.product-details');
    productDetails.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, { passive: true });

    // Touch navigation
    let startY = 0;
    let startTime = 0;

    gallery.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
    });

    gallery.addEventListener('touchend', (e) => {
      const endY = e.changedTouches[0].clientY;
      const endTime = Date.now();
      const deltaY = startY - endY;
      const deltaTime = endTime - startTime;
      
      // Only trigger on quick swipes
      if (Math.abs(deltaY) > 50 && deltaTime < 300) {
        const direction = deltaY > 0 ? 1 : -1;
        const targetIndex = Math.max(1, Math.min(totalImages, currentImageIndex + direction));
        
        if (targetIndex !== currentImageIndex) {
          const targetImage = gallery.children[targetIndex - 1];
          targetImage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          
          currentImageIndex = targetIndex;
          counter.textContent = `${currentImageIndex}/${totalImages}`;
        }
      }
    });
  }

  handleImageClick(img) {
    // Simple zoom effect or modal could be added here
    img.style.transform = img.style.transform === 'scale(1.05)' ? 'scale(1)' : 'scale(1.05)';
    setTimeout(() => {
      img.style.transform = 'scale(1)';
    }, 200);
  }

  setupEventListeners() {
    // Size selection
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Add to cart
    const addToCartBtn = document.getElementById('add-to-cart');
    addToCartBtn.addEventListener('click', () => {
      const selectedSize = document.querySelector('.size-btn.active')?.dataset.size;
      const productTitle = document.getElementById('product-title').textContent;
      
      // Simple feedback - could integrate with cart system
      addToCartBtn.textContent = 'ADDED!';
      setTimeout(() => {
        addToCartBtn.textContent = 'ADD TO CART';
      }, 1500);
      
      console.log(`Added ${productTitle} (Size: ${selectedSize}) to cart`);
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProductPage();
});
