/* ================================================
   AYUSH SINGH — Data Analyst Portfolio
   script.js — Full Interactive Version v2
   ================================================ */
 
/* ====== 1. NAVBAR SCROLL EFFECT ====== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});
 
/* ====== 2. MOBILE MENU ====== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});
 
/* ====== 3. SCROLL REVEAL ====== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
 
/* ====== 4. SMOOTH SCROLL ====== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
 
/* ====== 5. ACTIVE NAV HIGHLIGHT ====== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));
 
const navStyle = document.createElement('style');
navStyle.textContent = '.nav-links a.active { color: var(--accent) !important; background: var(--accent-dim) !important; }';
document.head.appendChild(navStyle);
 
/* ====== 6. TYPEWRITER EFFECT ====== */
const titles = ['Data Analyst', 'Power BI Developer', 'Excel Dashboard Builder', 'SQL Analytics Expert', 'Business Intelligence Specialist'];
let tIdx = 0, tChar = 0, tDeleting = false;
const titleEl = document.querySelector('.hero-title .mono');
 
function typeWriter() {
  if (!titleEl) return;
  const full = titles[tIdx];
  titleEl.textContent = tDeleting ? full.substring(0, tChar - 1) : full.substring(0, tChar + 1);
  tDeleting ? tChar-- : tChar++;
  if (!tDeleting && tChar === full.length) { tDeleting = true; setTimeout(typeWriter, 2000); return; }
  if (tDeleting && tChar === 0) { tDeleting = false; tIdx = (tIdx + 1) % titles.length; }
  setTimeout(typeWriter, tDeleting ? 55 : 85);
}
setTimeout(typeWriter, 1500);
 
/* ====== 7. ANIMATED COUNTER ====== */
function animateCounter(el, target, prefix, suffix) {
  prefix = prefix || '';
  suffix = suffix || '';
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(function() {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = prefix + Math.floor(current).toLocaleString('en-IN') + suffix;
  }, 25);
}
 
const counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(function(el) {
        const text = el.getAttribute('data-target') || el.textContent;
        el.setAttribute('data-target', text);
        if (text.includes('K+')) animateCounter(el, 100, '', 'K+');
        else if (text.includes('₹')) animateCounter(el, 53, '₹', 'M+');
        else if (text.includes('+')) animateCounter(el, parseInt(text), '', '+');
        else animateCounter(el, parseInt(text.replace(/[^0-9]/g, '')), '', text.replace(/[0-9]/g, ''));
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);
 
/* ====== 8. PARTICLE BACKGROUND ====== */
function createParticles() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.4';
  hero.insertBefore(canvas, hero.firstChild);
  const ctx = canvas.getContext('2d');
 
  function resize() { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
 
  function Particle() { this.reset(); }
  Particle.prototype.reset = function() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.6 + 0.1;
    this.color = Math.random() > 0.7 ? '#00d4ff' : '#ffffff';
  };
  Particle.prototype.update = function() {
    this.x += this.speedX; this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  };
  Particle.prototype.draw = function() {
    ctx.save(); ctx.globalAlpha = this.opacity; ctx.fillStyle = this.color;
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  };
 
  const particles = [];
  for (let i = 0; i < 80; i++) particles.push(new Particle());
 
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function(p) { p.update(); p.draw(); });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.save(); ctx.globalAlpha = (1 - dist / 100) * 0.15;
          ctx.strokeStyle = '#00d4ff'; ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); ctx.restore();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}
createParticles();
 
/* ====== 9. PROJECT FILTER BUTTONS ====== */
function setupProjectFilter() {
  const projectsSection = document.getElementById('projects');
  if (!projectsSection) return;
  const grid = projectsSection.querySelector('.projects-grid');
  if (!grid) return;
 
  const filterHTML = '<div class="filter-bar" id="filterBar"><button class="filter-btn active" data-filter="all">All Projects</button><button class="filter-btn" data-filter="Power BI">Power BI</button><button class="filter-btn" data-filter="Excel">Excel</button><button class="filter-btn" data-filter="SQL">SQL</button></div>';
  grid.insertAdjacentHTML('beforebegin', filterHTML);
 
  const filterStyle = document.createElement('style');
  filterStyle.textContent = '.filter-bar{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:32px;justify-content:center}.filter-btn{font-family:"JetBrains Mono",monospace;font-size:.8rem;font-weight:600;padding:8px 20px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:transparent;color:#8a96b0;cursor:pointer;transition:all .3s ease;letter-spacing:.04em}.filter-btn:hover{border-color:rgba(0,212,255,.4);color:#00d4ff;background:rgba(0,212,255,.08)}.filter-btn.active{background:#00d4ff;color:#050a15;border-color:#00d4ff;box-shadow:0 0 20px rgba(0,212,255,.3)}@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
  document.head.appendChild(filterStyle);
 
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.project-card').forEach(function(card) {
        const domain = card.getAttribute('data-domain') || '';
        if (filter === 'all' || domain === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
setupProjectFilter();
 
/* ====== 10. RADAR CHART ====== */
function buildRadarChart() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  skillsSection.querySelector('.container').insertAdjacentHTML('beforeend', '<div class="reveal" style="margin-top:60px;text-align:center"><div class="section-label" style="text-align:center;margin-bottom:8px">Skill Proficiency Radar</div><canvas id="radarCanvas" width="440" height="380" style="max-width:100%;margin:0 auto;display:block"></canvas></div>');
 
  const canvas = document.getElementById('radarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const skills = [
    {label:'Power BI',value:0.9},{label:'Advanced Excel',value:0.92},
    {label:'DAX / Power Query',value:0.85},{label:'SQL',value:0.7},
    {label:'Data Storytelling',value:0.88},{label:'KPI Development',value:0.9},{label:'Python',value:0.35}
  ];
  const cx = canvas.width / 2, cy = canvas.height / 2, r = Math.min(cx, cy) - 70, total = skills.length;
 
  function drawRadar(progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const step = (Math.PI * 2) / total;
    for (let ring = 1; ring <= 5; ring++) {
      ctx.beginPath();
      for (let i = 0; i < total; i++) {
        const a = i * step - Math.PI / 2, rr = (r * ring) / 5;
        i === 0 ? ctx.moveTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a)) : ctx.lineTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a));
      }
      ctx.closePath(); ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 1; ctx.stroke();
    }
    for (let i = 0; i < total; i++) {
      const a = i * step - Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1; ctx.stroke();
    }
    ctx.beginPath();
    for (let i = 0; i < total; i++) {
      const a = i * step - Math.PI / 2, val = skills[i].value * progress;
      i === 0 ? ctx.moveTo(cx + r * val * Math.cos(a), cy + r * val * Math.sin(a)) : ctx.lineTo(cx + r * val * Math.cos(a), cy + r * val * Math.sin(a));
    }
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, 'rgba(0,212,255,0.4)'); grad.addColorStop(1, 'rgba(0,212,255,0.05)');
    ctx.fillStyle = grad; ctx.fill(); ctx.strokeStyle = '#00d4ff'; ctx.lineWidth = 2; ctx.stroke();
    for (let i = 0; i < total; i++) {
      const a = i * step - Math.PI / 2, val = skills[i].value * progress;
      const x = cx + r * val * Math.cos(a), y = cy + r * val * Math.sin(a);
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = '#00d4ff'; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.font = '600 11px Space Grotesk,sans-serif';
      ctx.fillStyle = 'rgba(232,237,247,' + Math.min(progress * 1.5, 1) + ')';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(skills[i].label, cx + (r + 38) * Math.cos(a), cy + (r + 38) * Math.sin(a));
      if (progress > 0.5) {
        ctx.font = 'bold 10px JetBrains Mono,monospace'; ctx.fillStyle = '#00d4ff';
        ctx.fillText(Math.round(skills[i].value * 100) + '%', cx + r * val * 0.55 * Math.cos(a), cy + r * val * 0.55 * Math.sin(a));
      }
    }
  }
 
  const rObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        let start = null;
        function anim(ts) { if (!start) start = ts; const p = Math.min((ts - start) / 1200, 1); drawRadar(p); if (p < 1) requestAnimationFrame(anim); }
        requestAnimationFrame(anim);
        rObs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.3});
  rObs.observe(canvas);
}
buildRadarChart();
 
/* ====== 11. MINI BAR CHART ====== */
function buildMiniChart() {
  const aboutText = document.querySelector('.about-text');
  if (!aboutText) return;
  aboutText.insertAdjacentHTML('beforeend', '<div class="mini-chart-wrap reveal" style="margin-top:32px"><div class="section-label" style="margin-bottom:14px">Projects by Domain</div><div class="mini-chart" id="miniChart"><div class="bar-group" data-val="33"><div class="bar-fill" style="--bc:#00d4ff"></div><div class="bar-label">Power BI</div><div class="bar-val">2 projects</div></div><div class="bar-group" data-val="50"><div class="bar-fill" style="--bc:#33cc66"></div><div class="bar-label">Excel</div><div class="bar-val">3 projects</div></div><div class="bar-group" data-val="17"><div class="bar-fill" style="--bc:#ff9933"></div><div class="bar-label">SQL</div><div class="bar-val">1 project</div></div></div></div>');
  const cs = document.createElement('style');
  cs.textContent = '.mini-chart{display:flex;align-items:flex-end;gap:20px;height:100px;background:rgba(0,212,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:16px 20px 12px}.bar-group{display:flex;flex-direction:column;align-items:center;gap:6px;flex:1;height:100%;justify-content:flex-end}.bar-fill{width:100%;max-width:60px;height:0;background:var(--bc);border-radius:4px 4px 0 0;transition:height 1.2s cubic-bezier(.4,0,.2,1);box-shadow:0 0 12px var(--bc);opacity:.85}.bar-label{font-size:.72rem;color:#8a96b0;font-family:"JetBrains Mono",monospace}.bar-val{font-size:.78rem;font-weight:700;color:#e8edf7}';
  document.head.appendChild(cs);
  const cObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bar-group').forEach(function(g) { setTimeout(function() { g.querySelector('.bar-fill').style.height = g.getAttribute('data-val') + '%'; }, 300); });
        cObs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.4});
  const chart = document.getElementById('miniChart');
  if (chart) cObs.observe(chart);
}
buildMiniChart();
 
/* ====== 12. CARD TILT ====== */
document.querySelectorAll('.project-card').forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const rotX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -4;
    const rotY = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 4;
    card.style.transform = 'translateY(-4px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', function() { card.style.transform = ''; card.style.transition = 'transform 0.3s ease'; });
});
 
/* ====== 13. CURSOR GLOW ====== */
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = 'position:fixed;width:300px;height:300px;background:radial-gradient(circle,rgba(0,212,255,.06) 0%,transparent 70%);border-radius:50%;pointer-events:none;z-index:0;transform:translate(-50%,-50%)';
document.body.appendChild(cursorGlow);
document.addEventListener('mousemove', function(e) { cursorGlow.style.left = e.clientX + 'px'; cursorGlow.style.top = e.clientY + 'px'; });
 
/* ====== 14. CERTIFICATE MODAL ====== */
function openCert(type, path) {
  const modal = document.getElementById('certModal');
  const frame = document.getElementById('certFrame');
  const title = document.getElementById('certModalTitle');
  if (!modal) return;
  frame.src = path;
  title.textContent = path.split('/').pop().replace(/_/g, ' ').replace('.pdf', '');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeCert() {
  const modal = document.getElementById('certModal');
  if (!modal) return;
  modal.style.display = 'none';
  document.getElementById('certFrame').src = '';
  document.body.style.overflow = '';
}
const certModal = document.getElementById('certModal');
if (certModal) certModal.addEventListener('click', function(e) { if (e.target === this) closeCert(); });
 
/* ====== 15. CONSOLE EASTER EGG ====== */
console.log('%c\n Hey Recruiter! Ayush Singh - Data Analyst\n as764994@gmail.com\n linkedin.com/in/ayush-singh-finance\n', 'color:#00d4ff;font-family:monospace;font-size:12px;');
