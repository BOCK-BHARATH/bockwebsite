// ===============================
//    MODERN ANIMATION SYSTEM
// ===============================

class ModernAnimations {
  constructor() {
    this.animationSpeed = 60; // FPS
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.particles = [];
    this.init();
  }

  init() {
    this.createLoader();
    this.initParticleSystem();
    this.initScrollAnimations();
    this.initTextAnimations();
    this.initCardAnimations();
    this.initNavigationAnimations();
    this.initMouseTracker();
    this.initPerformanceMonitor();
  }

  // ===============================
  //    LOADING ANIMATIONS
  // ===============================
  
  createLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="morphing-loader"></div>
        <div class="loading-text">INITIALIZING BOCK</div>
      </div>
    `;
    document.body.appendChild(loader);

    // Simulate loading time and fade out
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.remove();
      }, 1000);
    }, 3000);
  }

  // ===============================
  //    PARTICLE SYSTEM
  // ===============================
  
  initParticleSystem() {
    if (this.reducedMotion) return;

    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.appendChild(container);

    this.createParticles(container);
    this.animateParticles();
  }

  createParticles(container) {
    const particleCount = window.innerWidth < 768 ? 20 : 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 4 + 1;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      const xMovement = (Math.random() - 0.5) * 200;
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        --x-movement: ${xMovement}px;
      `;
      
      container.appendChild(particle);
      this.particles.push(particle);
    }
  }

  animateParticles() {
    if (this.reducedMotion) return;
    
    setInterval(() => {
      this.particles.forEach(particle => {
        if (Math.random() < 0.01) { // 1% chance to change direction
          const newX = (Math.random() - 0.5) * 200;
          particle.style.setProperty('--x-movement', `${newX}px`);
        }
      });
    }, 1000);
  }

  // ===============================
  //    SCROLL ANIMATIONS
  // ===============================
  
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Stagger child animations
          const children = entry.target.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate');
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Observe elements for scroll animations
    const animationElements = document.querySelectorAll(
      '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .text-reveal'
    );
    
    animationElements.forEach(el => observer.observe(el));
  }

  // ===============================
  //    TEXT ANIMATIONS
  // ===============================
  
  initTextAnimations() {
    this.initTypewriterEffect();
    this.initTextReveal();
    this.initGlitchText();
  }

  initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.width = '0';
      
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
          element.style.borderRight = 'none';
        }
      }, 100);
    });
  }

  initTextReveal() {
    const textRevealElements = document.querySelectorAll('.text-reveal');
    
    textRevealElements.forEach(element => {
      const text = element.textContent;
      element.innerHTML = `<span class="text-reveal-inner">${text}</span>`;
    });
  }

  initGlitchText() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
      element.setAttribute('data-text', element.textContent);
    });
  }

  // ===============================
  //    CARD ANIMATIONS
  // ===============================
  
  initCardAnimations() {
    const cards = document.querySelectorAll('.destination__card, .container-team');
    
    cards.forEach(card => {
      // Add glass effect classes
      card.classList.add('glass-card', 'card-3d', 'floating-card', 'card-glow');
      
      // Add enhanced hover effects
      card.addEventListener('mouseenter', (e) => {
        this.createRippleEffect(e);
      });

      // Add 3D tilt effect based on mouse position
      card.addEventListener('mousemove', (e) => {
        if (this.reducedMotion) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateZ(20px)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      animation: ripple 0.6s linear;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }

  // ===============================
  //    NAVIGATION ANIMATIONS
  // ===============================
  
  initNavigationAnimations() {
    const navItems = document.querySelectorAll('.site-navbar a');
    
    navItems.forEach(item => {
      item.classList.add('nav-item');
      
      // Add magnetic effect
      item.addEventListener('mousemove', (e) => {
        if (this.reducedMotion) return;
        
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        item.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ===============================
  //    MOUSE TRACKER
  // ===============================
  
  initMouseTracker() {
    if (this.reducedMotion) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, var(--neon-blue), var(--neon-purple));
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor following
    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.left = cursorX - 10 + 'px';
      cursor.style.top = cursorY - 10 + 'px';
      
      requestAnimationFrame(updateCursor);
    };
    updateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('button, a, .btn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
      });
    });
  }

  // ===============================
  //    PERFORMANCE MONITOR
  // ===============================
  
  initPerformanceMonitor() {
    let frameCount = 0;
    let lastTime = performance.now();

    const monitorFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        // Reduce animations if FPS is too low
        if (fps < 30) {
          document.body.classList.add('no-animation');
        } else {
          document.body.classList.remove('no-animation');
        }
      }
      
      requestAnimationFrame(monitorFPS);
    };
    
    requestAnimationFrame(monitorFPS);
  }

  // ===============================
  //    ENHANCED CAROUSEL
  // ===============================
  
  enhanceCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    carousel.classList.add('carousel-enhanced');
    
    const items = carousel.querySelectorAll('.item');
    items.forEach(item => {
      item.classList.add('carousel-item');
      
      // Add parallax effect
      item.addEventListener('mousemove', (e) => {
        if (this.reducedMotion) return;
        
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        const img = item.querySelector('img');
        if (img) {
          img.style.transform = `translate(${x * 10}px, ${y * 10}px) scale(1.05)`;
        }
      });
      
      item.addEventListener('mouseleave', () => {
        const img = item.querySelector('img');
        if (img) {
          img.style.transform = 'translate(0, 0) scale(1)';
        }
      });
    });
  }

  // ===============================
  //    BUTTON ENHANCEMENTS
  // ===============================
  
  enhanceButtons() {
    const buttons = document.querySelectorAll('.btn, button');
    
    buttons.forEach(button => {
      // Randomly assign neon or liquid style
      const style = Math.random() > 0.5 ? 'btn-neon' : 'btn-liquid';
      button.classList.add(style);
      
      // Add click animation
      button.addEventListener('click', (e) => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
          button.style.transform = 'scale(1)';
        }, 150);
      });
    });
  }
}

// ===============================
//    CSS ANIMATIONS (INJECTED)
// ===============================

const injectKeyframes = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.7;
        transform: scale(1.05);
      }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
};

// ===============================
//    INITIALIZATION
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  injectKeyframes();
  const animations = new ModernAnimations();
  
  // Enhance existing elements
  setTimeout(() => {
    animations.enhanceCarousel();
    animations.enhanceButtons();
  }, 100);
});

// Handle resize events
window.addEventListener('resize', () => {
  // Reinitialize particle system on resize
  const existingParticles = document.querySelector('.particles-container');
  if (existingParticles) {
    existingParticles.remove();
  }
  
  const animations = new ModernAnimations();
  animations.initParticleSystem();
});

// Export for potential external use
window.ModernAnimations = ModernAnimations;