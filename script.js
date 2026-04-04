/* ================================================
   AYUSH SINGH — Data Analyst Portfolio
   script.js — Animations & Interactions
   ================================================ */

/* ====== 1. NAVBAR: Scroll effect + Active link highlighting ====== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ====== 2. MOBILE MENU TOGGLE ====== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

/* ====== 3. SCROLL REVEAL ANIMATION ====== */
// This watches elements with class "reveal" and adds class "visible" when they enter the screen
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // Only animate once
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

// Watch all elements with class "reveal"
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ====== 4. SMOOTH SCROLL for nav links ====== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ====== 5. ACTIVE NAV LINK HIGHLIGHT ====== */
// Highlights the nav link that matches the current section on screen
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

/* ====== 6. TYPEWRITER EFFECT for Hero Title ====== */
// Cycles through role titles in the hero section
const titles = [
  'Data Analyst',
  'Power BI Developer',
  'Excel Dashboard Builder',
  'Business Analytics Specialist'
];

let currentTitle = 0;
let currentChar = 0;
let isDeleting = false;
const titleElement = document.querySelector('.hero-title .mono');

function typeWriter() {
  if (!titleElement) return;

  const fullText = titles[currentTitle];

  if (!isDeleting) {
    titleElement.textContent = fullText.substring(0, currentChar + 1);
    currentChar++;
    if (currentChar === fullText.length) {
      isDeleting = true;
      setTimeout(typeWriter, 2200); // Pause before deleting
      return;
    }
  } else {
    titleElement.textContent = fullText.substring(0, currentChar - 1);
    currentChar--;
    if (currentChar === 0) {
      isDeleting = false;
      currentTitle = (currentTitle + 1) % titles.length;
    }
  }

  const speed = isDeleting ? 60 : 90;
  setTimeout(typeWriter, speed);
}

// Start typewriter after page loads (with a small delay)
setTimeout(typeWriter, 1500);

/* ====== 7. ANIMATED STAT COUNTER ====== */
// Numbers in the hero section count up when they come into view
function animateCounter(element, targetText) {
  // Extract the number from strings like "100K+", "₹53M+", "6", "23+"
  const hasRupee = targetText.includes('₹');
  const hasSuffix = targetText.replace(/[0-9.,₹]/g, '');
  const numPart = parseFloat(targetText.replace(/[^0-9.]/g, ''));

  let current = 0;
  const increment = numPart / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= numPart) {
      current = numPart;
      clearInterval(timer);
    }

    let display = '';
    if (hasRupee) display = '₹' + Math.floor(current) + hasSuffix.replace('₹', '');
    else display = Math.floor(current) + hasSuffix;

    element.textContent = display;
  }, 30);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(el => {
        const original = el.textContent;
        animateCounter(el, original);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

/* ====== 8. PROJECT CARD TILT EFFECT (subtle) ====== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

/* ====== 9. ACTIVE NAV LINK STYLE ====== */
// Add this CSS dynamically (active nav link blue highlight)
const style = document.createElement('style');
style.textContent = `
  .nav-links a.active {
    color: var(--accent) !important;
    background: var(--accent-dim) !important;
  }
`;
document.head.appendChild(style);

/* ====== 10. CONSOLE EASTER EGG ====== */
console.log(`
╔══════════════════════════════════════╗
║   👋 Hey Recruiter! Nice to meet you ║
║   Ayush Singh — Data Analyst         ║
║   📧 as764994@gmail.com              ║
║   💼 linkedin.com/in/ayush-singhfinance ║
╚══════════════════════════════════════╝
`);

// ====== CERTIFICATE MODAL ======
function openCert(type, path) {
  const modal = document.getElementById('certModal');
  const frame = document.getElementById('certFrame');
  const title = document.getElementById('certModalTitle');
  frame.src = path;
  title.textContent = path.split('/').pop().replace(/_/g,' ').replace('.pdf','');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeCert() {
  const modal = document.getElementById('certModal');
  modal.style.display = 'none';
  document.getElementById('certFrame').src = '';
  document.body.style.overflow = '';
}

// Close modal when clicking outside
document.getElementById('certModal').addEventListener('click', function(e) {
  if (e.target === this) closeCert();
});
