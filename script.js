/* ================================================
   AYUSH SINGH — Portfolio script.js — FIXED v3
   All features run after page fully loads
   ================================================ */

window.addEventListener('load', function() {

/* ====== 1. NAVBAR ====== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ====== 2. MOBILE MENU ====== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger) hamburger.addEventListener('click', function() { mobileMenu.classList.toggle('open'); });
document.querySelectorAll('.mob-link').forEach(function(link) {
  link.addEventListener('click', function() { mobileMenu.classList.remove('open'); });
});

/* ====== 3. SCROLL REVEAL ====== */
const revealObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObs.unobserve(entry.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(function(el) { revealObs.observe(el); });

/* ====== 4. SMOOTH SCROLL ====== */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ====== 5. ACTIVE NAV ====== */
const navLinks = document.querySelectorAll('.nav-links a');
const navStyle = document.createElement('style');
navStyle.textContent = '.nav-links a.active { color: var(--accent) !important; background: var(--accent-dim) !important; }';
document.head.appendChild(navStyle);
const secObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      navLinks.forEach(function(l) { l.classList.remove('active'); });
      const a = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('section[id]').forEach(function(s) { secObs.observe(s); });

/* ====== 6. TYPEWRITER ====== */
const titles = ['Data Analyst', 'Power BI Developer', 'Excel Dashboard Builder', 'SQL Analytics Expert', 'Business Intelligence Specialist'];
let tIdx = 0, tChar = 0, tDel = false;
const titleEl = document.querySelector('.hero-title .mono');
function typeWriter() {
  if (!titleEl) return;
  const full = titles[tIdx];
  titleEl.textContent = tDel ? full.substring(0, tChar - 1) : full.substring(0, tChar + 1);
  tDel ? tChar-- : tChar++;
  if (!tDel && tChar === full.length) { tDel = true; setTimeout(typeWriter, 2000); return; }
  if (tDel && tChar === 0) { tDel = false; tIdx = (tIdx + 1) % titles.length; }
  setTimeout(typeWriter, tDel ? 55 : 85);
}
setTimeout(typeWriter, 1500);

/* ====== 7. COUNTER ANIMATION ====== */
function animCount(el, target, pre, suf) {
  pre = pre || ''; suf = suf || ''; let cur = 0;
  const inc = target / 60;
  const t = setInterval(function() {
    cur += inc;
    if (cur >= target) { cur = target; clearInterval(t); }
    el.textContent = pre + Math.floor(cur) + suf;
  }, 25);
}
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(function(el) {
          const txt = el.getAttribute('data-val') || el.textContent.trim();
          el.setAttribute('data-val', txt);
          if (txt === '6') animCount(el, 6, '', '');
          else if (txt.includes('K+')) animCount(el, 100, '', 'K+');
          else if (txt.includes('₹')) animCount(el, 53, '₹', 'M+');
          else if (txt.includes('23+')) animCount(el, 23, '', '+');
          else animCount(el, parseInt(txt.replace(/[^0-9]/g, '')), '', txt.replace(/[0-9]/g, ''));
        });
      }
    });
  }, { threshold: 0.5 }).observe(heroStats);
}

/* ====== 8. PARTICLES ====== */
(function() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.35';
  hero.insertBefore(canvas, hero.firstChild);
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; }
  resize(); window.addEventListener('resize', resize);
  const pts = [];
  for (let i = 0; i < 70; i++) {
    pts.push({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5, op: Math.random() * 0.5 + 0.1,
      c: Math.random() > 0.7 ? '#00d4ff' : '#ffffff'
    });
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach(function(p) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
        p.x = Math.random() * canvas.width; p.y = Math.random() * canvas.height;
      }
      ctx.save(); ctx.globalAlpha = p.op; ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    });
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 100) {
        ctx.save(); ctx.globalAlpha = (1 - d / 100) * 0.12; ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); ctx.restore();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ====== 9. PROJECT FILTERS ====== */
(function() {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;
  const bar = document.createElement('div');
  bar.className = 'filter-bar';
  bar.innerHTML = '<button class="filter-btn active" data-filter="all">All Projects</button><button class="filter-btn" data-filter="Power BI">Power BI</button><button class="filter-btn" data-filter="Excel">Excel</button><button class="filter-btn" data-filter="SQL">SQL</button>';
  grid.parentNode.insertBefore(bar, grid);
  const style = document.createElement('style');
  style.textContent = '.filter-bar{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:32px;justify-content:center}.filter-btn{font-family:"JetBrains Mono",monospace;font-size:.8rem;font-weight:600;padding:8px 20px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:transparent;color:#8a96b0;cursor:pointer;transition:all .3s ease}.filter-btn:hover{border-color:rgba(0,212,255,.4);color:#00d4ff;background:rgba(0,212,255,.08)}.filter-btn.active{background:#00d4ff;color:#050a15;border-color:#00d4ff;box-shadow:0 0 20px rgba(0,212,255,.3)}@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
  document.head.appendChild(style);
  bar.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      bar.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const f = btn.getAttribute('data-filter');
      document.querySelectorAll('.project-card').forEach(function(card) {
        const d = card.getAttribute('data-domain') || '';
        card.style.display = (f === 'all' || d === f) ? 'flex' : 'none';
        if (f === 'all' || d === f) card.style.animation = 'fadeInUp 0.4s ease forwards';
      });
    });
  });
})();

/* ====== 10. RADAR CHART ====== */
(function() {
  const skillsContainer = document.querySelector('#skills .container');
  if (!skillsContainer) return;

  // Create wrapper and canvas
  const wrap = document.createElement('div');
  wrap.style.cssText = 'margin-top:60px;text-align:center;';
  wrap.innerHTML = '<p style="font-family:JetBrains Mono,monospace;font-size:.78rem;color:#00d4ff;letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px;">Skill Proficiency Radar</p>';
  const canvas = document.createElement('canvas');
  canvas.width = 440; canvas.height = 380;
  canvas.style.cssText = 'max-width:100%;margin:0 auto;display:block;';
  wrap.appendChild(canvas);
  skillsContainer.appendChild(wrap);

  const ctx = canvas.getContext('2d');
  const skills = [
    {label:'Power BI', value:0.9},
    {label:'Adv. Excel', value:0.92},
    {label:'DAX/Power Query', value:0.85},
    {label:'SQL', value:0.7},
    {label:'Data Storytelling', value:0.88},
    {label:'KPI Dev.', value:0.9},
    {label:'Python', value:0.35}
  ];
  const cx = canvas.width / 2, cy = canvas.height / 2;
  const r = 130, total = skills.length;

  function drawRadar(progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const step = (Math.PI * 2) / total;

    // Grid rings
    for (let ring = 1; ring <= 5; ring++) {
      ctx.beginPath();
      for (let i = 0; i < total; i++) {
        const a = i * step - Math.PI / 2, rr = (r * ring) / 5;
        i === 0 ? ctx.moveTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a))
                : ctx.lineTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a));
      }
      ctx.closePath();
      ctx.strokeStyle = ring === 5 ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1; ctx.stroke();
    }

    // Axis lines
    for (let i = 0; i < total; i++) {
      const a = i * step - Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1; ctx.stroke();
    }

    // Filled polygon
    ctx.beginPath();
    for (let i = 0; i < total; i++) {
      const a = i * step - Math.PI / 2, val = skills[i].value * progress;
      const x = cx + r * val * Math.cos(a), y = cy + r * val * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, 'rgba(0,212,255,0.35)');
    grad.addColorStop(1, 'rgba(0,212,255,0.04)');
    ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = '#00d4ff'; ctx.lineWidth = 2; ctx.stroke();

    // Dots + labels
    for (let i = 0; i < total; i++) {
      const a = i * step - Math.PI / 2, val = skills[i].value * progress;
      const x = cx + r * val * Math.cos(a), y = cy + r * val * Math.sin(a);
      ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#00d4ff'; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();

      // Label
      const lx = cx + (r + 42) * Math.cos(a), ly = cy + (r + 42) * Math.sin(a);
      ctx.font = '600 11px Space Grotesk, sans-serif';
      ctx.fillStyle = 'rgba(232,237,247,' + Math.min(progress * 2, 1) + ')';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(skills[i].label, lx, ly);

      // Percentage
      if (progress > 0.6) {
        const pval = Math.round(skills[i].value * 100) + '%';
        const px = cx + r * val * 0.5 * Math.cos(a), py = cy + r * val * 0.5 * Math.sin(a);
        ctx.font = 'bold 9px JetBrains Mono, monospace';
        ctx.fillStyle = '#fff';
        ctx.fillText(pval, px, py);
      }
    }
  }

  // Trigger animation when canvas scrolls into view
  new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        let start = null;
        function anim(ts) {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1400, 1);
          drawRadar(p);
          if (p < 1) requestAnimationFrame(anim);
        }
        requestAnimationFrame(anim);
      }
    });
  }, { threshold: 0.2 }).observe(canvas);

  // Draw empty state initially
  drawRadar(0);
})();

/* ====== 11. MINI BAR CHART ====== */
(function() {
  const aboutText = document.querySelector('.about-text');
  if (!aboutText) return;

  const wrap = document.createElement('div');
  wrap.style.cssText = 'margin-top:32px;';
  wrap.innerHTML = '<p style="font-family:JetBrains Mono,monospace;font-size:.78rem;color:#00d4ff;letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px;">Projects by Domain</p><div id="miniChart" style="display:flex;align-items:flex-end;gap:20px;height:120px;background:rgba(0,212,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:12px 20px 10px"><div class="bgrp" data-h="66"><div class="bfill" style="background:#00d4ff;box-shadow:0 0 12px rgba(0,212,255,.5)"></div><div style="font-size:.72rem;color:#8a96b0;font-family:JetBrains Mono,monospace;margin-top:6px">Power BI</div><div style="font-size:.8rem;font-weight:700;color:#e8edf7">2</div></div><div class="bgrp" data-h="100"><div class="bfill" style="background:#33cc66;box-shadow:0 0 12px rgba(51,204,102,.5)"></div><div style="font-size:.72rem;color:#8a96b0;font-family:JetBrains Mono,monospace;margin-top:6px">Excel</div><div style="font-size:.8rem;font-weight:700;color:#e8edf7">3</div></div><div class="bgrp" data-h="33"><div class="bfill" style="background:#ff9933;box-shadow:0 0 12px rgba(255,153,51,.5)"></div><div style="font-size:.72rem;color:#8a96b0;font-family:JetBrains Mono,monospace;margin-top:6px">SQL</div><div style="font-size:.8rem;font-weight:700;color:#e8edf7">1</div></div></div>';
  aboutText.appendChild(wrap);

  // Style bar groups
  const bStyle = document.createElement('style');
  bStyle.textContent = '.bgrp{display:flex;flex-direction:column;align-items:center;flex:1;height:100%;justify-content:flex-end;text-align:center}.bfill{width:100%;max-width:56px;height:0;border-radius:4px 4px 0 0;transition:height 1.3s cubic-bezier(.4,0,.2,1)}';
  document.head.appendChild(bStyle);

  new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bgrp').forEach(function(g) {
          const h = g.getAttribute('data-h');
          setTimeout(function() { g.querySelector('.bfill').style.height = h + '%'; }, 400);
        });
      }
    });
  }, { threshold: 0.5 }).observe(document.getElementById('miniChart'));
})();

/* ====== 12. CARD TILT ====== */
document.querySelectorAll('.project-card, .skill-card, .cert-card').forEach(function(card) {
  card.style.transformStyle = 'preserve-3d';
  card.style.willChange = 'transform';
  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const rotX = ((y - rect.height / 2) / rect.height) * -6;
    const rotY = ((x - rect.width / 2) / rect.width) * 6;
    card.style.transform = 'perspective(800px) translateY(-6px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
    card.style.transition = 'transform 0.08s ease';
  });
  card.addEventListener('mouseleave', function() {
    card.style.transform = 'perspective(800px) translateY(0) rotateX(0) rotateY(0)';
    card.style.transition = 'transform 0.5s ease';
  });
});

/* ====== 13. CURSOR GLOW ====== */
const glow = document.createElement('div');
glow.style.cssText = 'position:fixed;width:280px;height:280px;background:radial-gradient(circle,rgba(0,212,255,.07) 0%,transparent 70%);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:left .08s ease,top .08s ease;';
document.body.appendChild(glow);
document.addEventListener('mousemove', function(e) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });

/* ====== 14. CERTIFICATE MODAL ====== */
window.openCert = function(type, path) {
  const modal = document.getElementById('certModal');
  const frame = document.getElementById('certFrame');
  const title = document.getElementById('certModalTitle');
  if (!modal) return;
  frame.src = path;
  title.textContent = path.split('/').pop().replace(/_/g,' ').replace('.pdf','');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};
window.closeCert = function() {
  const modal = document.getElementById('certModal');
  if (!modal) return;
  modal.style.display = 'none';
  document.getElementById('certFrame').src = '';
  document.body.style.overflow = '';
};
const certModal = document.getElementById('certModal');
if (certModal) certModal.addEventListener('click', function(e) { if (e.target === this) window.closeCert(); });

}); // END window.load
