// ==========================================
// GSAP SETUP
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// CUSTOM CURSOR
// ==========================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;

// Smooth cursor movement using GSAP quickTo
const xDotTo = gsap.quickTo(cursorDot, 'x', { duration: 0.3, ease: 'power3' });
const yDotTo = gsap.quickTo(cursorDot, 'y', { duration: 0.3, ease: 'power3' });
const xOutlineTo = gsap.quickTo(cursorOutline, 'x', { duration: 0.6, ease: 'power3' });
const yOutlineTo = gsap.quickTo(cursorOutline, 'y', { duration: 0.6, ease: 'power3' });

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  xDotTo(mouseX - 4);
  yDotTo(mouseY - 4);
  xOutlineTo(mouseX - 16);
  yOutlineTo(mouseY - 16);
});

// Scale cursor on interactive elements
const interactives = document.querySelectorAll('a, button, .card, .hero-image-container');
interactives.forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursorOutline, { scale: 1.5, duration: 0.3 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursorOutline, { scale: 1, duration: 0.3 });
  });
});

// ==========================================
// 3D BACKGROUND CANVAS (Wireframe Mesh) - MODERATELY OPTIMIZED
// ==========================================
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Mesh grid settings - moderate optimization
const gridSize = 50;
const rows = Math.ceil(height / gridSize) + 1;
const cols = Math.ceil(width / gridSize) + 1;
let points = [];

// Initialize grid points
function initGrid() {
  points = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      points.push({
        x: x * gridSize,
        y: y * gridSize,
        baseX: x * gridSize,
        baseY: y * gridSize,
        z: 0
      });
    }
  }
}

initGrid();

let rotation = 0;
let time = 0;

// Animate mesh with moderate effect
function animateMesh() {
  ctx.clearRect(0, 0, width, height);
  
  rotation += 0.001;
  time += 0.005;
  
  // Moderate wave pattern
  points.forEach((point, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    point.z = Math.sin(rotation + col * 0.15) * Math.cos(rotation + row * 0.15) * 20;
  });
  
  // Draw with moderate detail
  ctx.strokeStyle = 'rgba(0, 245, 255, 0.15)';
  ctx.lineWidth = 0.8;
  drawGrid();
  
  requestAnimationFrame(animateMesh);
}

// Helper function to draw the grid
function drawGrid() {
  // Horizontal lines
  for (let row = 0; row < rows; row++) {
    ctx.beginPath();
    for (let col = 0; col < cols; col++) {
      const i = row * cols + col;
      const point = points[i];
      if (col === 0) {
        ctx.moveTo(point.x, point.y + point.z);
      } else {
        ctx.lineTo(point.x, point.y + point.z);
      }
    }
    ctx.stroke();
  }
  
  // Vertical lines
  for (let col = 0; col < cols; col++) {
    ctx.beginPath();
    for (let row = 0; row < rows; row++) {
      const i = row * cols + col;
      const point = points[i];
      if (row === 0) {
        ctx.moveTo(point.x + point.z, point.y);
      } else {
        ctx.lineTo(point.x + point.z, point.y);
      }
    }
    ctx.stroke();
  }
}

// Start animation on desktop only
if (window.innerWidth > 768) {
  animateMesh();
}

// Handle resize
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initGrid();
});

// ==========================================
// FLOATING SHAPES ANIMATION - MODERATELY OPTIMIZED
// ==========================================
const shapes = document.querySelectorAll('.shape, .floating-element');

shapes.forEach((shape, i) => {
  // Moderate animation
  gsap.to(shape, {
    x: 'random(-100, 100)',
    y: 'random(-100, 100)',
    scale: 'random(0.9, 1.1)',
    duration: 'random(15, 25)',
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: i * 0.3
  });
});

// Parallax on mouse move (desktop only)
if (window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    
    // Moderate parallax effect
    gsap.to('.shape-1, .element-1', { 
      x: x * 50, 
      y: y * 50, 
      duration: 1.5,
      ease: 'power2.out'
    });
    gsap.to('.shape-2, .element-2', { 
      x: x * -40, 
      y: y * -40, 
      duration: 1.7,
      ease: 'power2.out'
    });
    gsap.to('.shape-3, .element-3', { 
      x: x * 60, 
      y: y * 60, 
      duration: 1.3,
      ease: 'power2.out'
    });
  });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target.offsetTop - 100,
          autoKill: false
        },
        ease: "power2.out"
      });
    }
  });
});

// ==========================================
// HERO ANIMATIONS
// ==========================================
gsap.from('.hero-label', { opacity: 0, y: 20, duration: 0.8, delay: 0.2 });
gsap.from('.hero-heading', { opacity: 0, y: 40, duration: 1, delay: 0.4 });
gsap.from('.hero-text', { opacity: 0, y: 30, duration: 0.8, delay: 0.6 });

gsap.from('.hero-image-container', {
  opacity: 0,
  scale: 0.8,
  duration: 1,
  delay: 1,
  ease: "back.out(1.7)"
});

// ==========================================
// CARD 3D TILT EFFECT - RESTORED FUNCTIONALITY
// ==========================================
const cards = document.querySelectorAll('[data-tilt]');

cards.forEach(card => {
  // 3D tilt on hover (desktop only)
  if (window.innerWidth > 768) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5
      });
    });
  }
});

// ==========================================
// HERO PARTICLES - MODERATELY OPTIMIZED
// ==========================================
function createHeroParticles() {
  const heroSection = document.querySelector('.hero');
  const particleCount = 10;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 8 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    heroSection.appendChild(particle);
  }
}

document.addEventListener('DOMContentLoaded', createHeroParticles);

// ==========================================
// JOIN BUTTON FUNCTIONALITY
// ==========================================
const joinButtons = document.querySelectorAll('.btn-primary');

joinButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (btn.closest('.card')) {
      e.preventDefault();
      const inviteUrl = btn.getAttribute('href');
      
      gsap.fromTo(btn, 
        { scale: 1 },
        { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }
      );
      
      setTimeout(() => {
        window.open(inviteUrl, '_blank', 'noopener,noreferrer');
      }, 200);
    }
  });
});

// ==========================================
// SECTION ANIMATIONS - RESTORED
// ==========================================
gsap.from('.section-intro', {
  scrollTrigger: {
    trigger: '.collection',
    start: 'top 80%'
  },
  opacity: 0,
  y: 40,
  duration: 0.8
});

gsap.from('.info-block', {
  scrollTrigger: {
    trigger: '.info-section',
    start: 'top 80%'
  },
  opacity: 0,
  y: 40,
  stagger: 0.2,
  duration: 0.8
});

// ==========================================
// HEADER BACKGROUND ON SCROLL - OPTIMIZED
// ==========================================
let ticking = false;

function updateHeaderOnScroll() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 100) {
        gsap.to(header, { backgroundColor: 'rgba(5, 5, 5, 0.8)', duration: 0.3 });
    } else {
        gsap.to(header, { backgroundColor: 'rgba(5, 5, 5, 0.5)', duration: 0.3 });
    }
    ticking = false;
}

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(updateHeaderOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ==========================================
// PERFORMANCE: Debounced Resize
// ==========================================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
}, { passive: true });

// ==========================================
// PERFORMANCE: Reduced Animation Intensity on Mobile
// ==========================================
if (window.innerWidth <= 768) {
    const shapes = document.querySelectorAll('.shape, .floating-element');
    shapes.forEach(shape => {
        const currentDuration = parseFloat(getComputedStyle(shape).animationDuration);
        if (currentDuration) {
            shape.style.animationDuration = (currentDuration * 2) + 's';
        }
    });
    
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => particle.remove());
}

// ==========================================
// SCROLL-TRIGGERED ANIMATIONS FOR CARDS - RESTORED
// ==========================================
const animatedCards = document.querySelectorAll('[data-animate-on-scroll]');

// ==========================================
// CIRCULAR BADGES ANIMATION
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const badgeSection = document.querySelector('.badges-section');
    const badgeCards = document.querySelectorAll('.badge-card');

    if (badgeSection) {
        // Make sure the section is visible
        badgeSection.style.display = 'block';
        badgeSection.style.visibility = 'visible';
    }

    if (badgeCards.length > 0) {
        // Make sure cards are visible
        badgeCards.forEach(card => {
            card.style.display = 'block';
            card.style.visibility = 'visible';
            card.style.opacity = '1';
        });
    }
});

console.log('GROWTH X initialized ✓');