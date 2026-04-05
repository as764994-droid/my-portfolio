/* ================================================
   AYUSH SINGH — Portfolio FINAL script.js
   Complete clean version — fixes all issues
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
new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      navLinks.forEach(function(l) { l.classList.remove('active'); });
      const a = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.4 }).observe(document.querySelector('section[id]') || document.body);
document.querySelectorAll('section[id]').forEach(function(s) {
  new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function(l) { l.classList.remove('active'); });
        const a = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
        if (a) a.classList.add('active');
      }
    });
  }, { threshold: 0.4 }).observe(s);
});

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

/* ====== 7. COUNTER ====== */
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
    pts.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
      r: Math.random()*2+0.5, op: Math.random()*0.5+0.1, c: Math.random()>0.7?'#00d4ff':'#ffffff' });
  }
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pts.forEach(function(p) {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>canvas.width||p.y<0||p.y>canvas.height){p.x=Math.random()*canvas.width;p.y=Math.random()*canvas.height;}
      ctx.save();ctx.globalAlpha=p.op;ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();ctx.restore();
    });
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<100){ctx.save();ctx.globalAlpha=(1-d/100)*0.12;ctx.strokeStyle='#00d4ff';ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();ctx.restore();}
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
        card.style.display = (f==='all'||d===f) ? 'block' : 'none';
        if(f==='all'||d===f) card.style.animation='fadeInUp 0.4s ease forwards';
      });
    });
  });
})();

/* ====== 10. RADAR CHART ====== */
(function() {
  const skillsContainer = document.querySelector('#skills .container');
  if (!skillsContainer) return;
  const wrap = document.createElement('div');
  wrap.style.cssText = 'margin-top:60px;text-align:center;';
  wrap.innerHTML = '<p style="font-family:JetBrains Mono,monospace;font-size:.78rem;color:#00d4ff;letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px;">Skill Proficiency Radar</p>';
  const canvas = document.createElement('canvas');
  canvas.width=440; canvas.height=380;
  canvas.style.cssText='max-width:100%;margin:0 auto;display:block;';
  wrap.appendChild(canvas);
  skillsContainer.appendChild(wrap);
  const ctx=canvas.getContext('2d');
  const skills=[{label:'Power BI',value:0.9},{label:'Adv. Excel',value:0.92},{label:'DAX/Power Query',value:0.85},{label:'SQL',value:0.7},{label:'Data Storytelling',value:0.88},{label:'KPI Dev.',value:0.9},{label:'Python',value:0.35}];
  const cx=canvas.width/2,cy=canvas.height/2,r=130,total=skills.length;
  function drawRadar(progress) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const step=(Math.PI*2)/total;
    for(let ring=1;ring<=5;ring++){ctx.beginPath();for(let i=0;i<total;i++){const a=i*step-Math.PI/2,rr=(r*ring)/5;i===0?ctx.moveTo(cx+rr*Math.cos(a),cy+rr*Math.sin(a)):ctx.lineTo(cx+rr*Math.cos(a),cy+rr*Math.sin(a));}ctx.closePath();ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;ctx.stroke();}
    for(let i=0;i<total;i++){const a=i*step-Math.PI/2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;ctx.stroke();}
    ctx.beginPath();
    for(let i=0;i<total;i++){const a=i*step-Math.PI/2,val=skills[i].value*progress;i===0?ctx.moveTo(cx+r*val*Math.cos(a),cy+r*val*Math.sin(a)):ctx.lineTo(cx+r*val*Math.cos(a),cy+r*val*Math.sin(a));}
    ctx.closePath();const grad=ctx.createRadialGradient(cx,cy,0,cx,cy,r);grad.addColorStop(0,'rgba(0,212,255,0.35)');grad.addColorStop(1,'rgba(0,212,255,0.04)');ctx.fillStyle=grad;ctx.fill();ctx.strokeStyle='#00d4ff';ctx.lineWidth=2;ctx.stroke();
    for(let i=0;i<total;i++){const a=i*step-Math.PI/2,val=skills[i].value*progress;const x=cx+r*val*Math.cos(a),y=cy+r*val*Math.sin(a);ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fillStyle='#00d4ff';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();ctx.font='600 11px Space Grotesk,sans-serif';ctx.fillStyle='rgba(232,237,247,'+Math.min(progress*2,1)+')';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(skills[i].label,cx+(r+42)*Math.cos(a),cy+(r+42)*Math.sin(a));if(progress>0.6){ctx.font='bold 9px JetBrains Mono,monospace';ctx.fillStyle='#fff';ctx.fillText(Math.round(skills[i].value*100)+'%',cx+r*val*0.5*Math.cos(a),cy+r*val*0.5*Math.sin(a));}}
  }
  new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){let start=null;function anim(ts){if(!start)start=ts;const p=Math.min((ts-start)/1400,1);drawRadar(p);if(p<1)requestAnimationFrame(anim);}requestAnimationFrame(anim);}});},{threshold:0.2}).observe(canvas);
  drawRadar(0);
})();

/* ====== 11. MINI BAR CHART ====== */
(function() {
  const aboutText = document.querySelector('.about-text');
  if (!aboutText) return;
  const wrap = document.createElement('div');
  wrap.style.cssText='margin-top:32px;';
  wrap.innerHTML='<p style="font-family:JetBrains Mono,monospace;font-size:.78rem;color:#00d4ff;letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px;">Projects by Domain</p><div id="miniChart" style="display:flex;align-items:flex-end;gap:20px;height:120px;background:rgba(0,212,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:12px 20px 10px"><div class="bgrp" data-h="66"><div class="bfill" style="background:#00d4ff;box-shadow:0 0 12px rgba(0,212,255,.5)"></div><div style="font-size:.72rem;color:#8a96b0;font-family:JetBrains Mono,monospace;margin-top:6px">Power BI</div><div style="font-size:.8rem;font-weight:700;color:#e8edf7">2</div></div><div class="bgrp" data-h="100"><div class="bfill" style="background:#33cc66;box-shadow:0 0 12px rgba(51,204,102,.5)"></div><div style="font-size:.72rem;color:#8a96b0;font-family:JetBrains Mono,monospace;margin-top:6px">Excel</div><div style="font-size:.8rem;font-weight:700;color:#e8edf7">3</div></div><div class="bgrp" data-h="33"><div class="bfill" style="background:#ff9933;box-shadow:0 0 12px rgba(255,153,51,.5)"></div><div style="font-size:.72rem;color:#8a96b0;font-family:JetBrains Mono,monospace;margin-top:6px">SQL</div><div style="font-size:.8rem;font-weight:700;color:#e8edf7">1</div></div></div>';
  aboutText.appendChild(wrap);
  const bStyle=document.createElement('style');
  bStyle.textContent='.bgrp{display:flex;flex-direction:column;align-items:center;flex:1;height:100%;justify-content:flex-end;text-align:center}.bfill{width:100%;max-width:56px;height:0;border-radius:4px 4px 0 0;transition:height 1.3s cubic-bezier(.4,0,.2,1)}';
  document.head.appendChild(bStyle);
  new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.querySelectorAll('.bgrp').forEach(function(g){const h=g.getAttribute('data-h');setTimeout(function(){g.querySelector('.bfill').style.height=h+'%';},400);});}});},{threshold:0.5}).observe(document.getElementById('miniChart')||wrap);
})();

/* ====== 12. FLIP CARDS ====== */
(function() {
  // Add flip card styles
  const style = document.createElement('style');
  style.textContent = `
    .project-card {
      position: relative;
      min-height: 420px;
      cursor: pointer;
    }
    .card-front, .card-back {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: 12px;
      padding: 28px;
      display: flex;
      flex-direction: column;
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .card-front {
      background: #111827;
      border: 1px solid rgba(255,255,255,0.07);
      opacity: 1;
      transform: scale(1);
      z-index: 2;
      pointer-events: auto;
    }
    .card-back {
      background: linear-gradient(135deg, #0a1a2e 0%, #0d1527 100%);
      border: 1px solid rgba(0,212,255,0.35);
      opacity: 0;
      transform: scale(0.95);
      z-index: 1;
      pointer-events: none;
      justify-content: space-between;
      gap: 10px;
    }
    .project-card.flipped .card-front {
      opacity: 0;
      transform: scale(0.95);
      z-index: 1;
      pointer-events: none;
    }
    .project-card.flipped .card-back {
      opacity: 1;
      transform: scale(1);
      z-index: 2;
      pointer-events: auto;
    }
    .cf-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; }
    .cf-num { font-family:'JetBrains Mono',monospace; font-size:0.78rem; color:#00d4ff; font-weight:600; }
    .cf-tools { display:flex; flex-wrap:wrap; gap:5px; justify-content:flex-end; }
    .cf-tool { font-family:'JetBrains Mono',monospace; font-size:0.65rem; background:rgba(0,212,255,0.1); color:#00d4ff; border:1px solid rgba(0,212,255,0.2); padding:2px 7px; border-radius:4px; }
    .cf-tool.green { background:rgba(51,204,102,0.1); color:#33cc66; border-color:rgba(51,204,102,0.2); }
    .cf-tool.orange { background:rgba(255,153,51,0.1); color:#ff9933; border-color:rgba(255,153,51,0.2); }
    .cf-logo { display:flex; align-items:center; justify-content:center; height:100px; margin:8px 0; }
    .cf-logo img { max-height:75px; max-width:160px; object-fit:contain; filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4)); transition:transform 0.3s ease; }
    .card-front:hover .cf-logo img { transform:scale(1.05); }
    .cf-logo-emoji { font-size:3.5rem; }
    .cf-domain { font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:#556070; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:5px; }
    .cf-title { font-family:'Syne',sans-serif; font-size:1.05rem; font-weight:700; color:#e8edf7; line-height:1.3; }
    .cf-hint { font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:#556070; text-align:center; padding-top:12px; border-top:1px solid rgba(255,255,255,0.06); letter-spacing:0.06em; margin-top:auto; }
    .cb-title { font-family:'Syne',sans-serif; font-size:1rem; font-weight:800; color:#00d4ff; margin-bottom:3px; }
    .cb-domain { font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:#556070; text-transform:uppercase; margin-bottom:8px; }
    .cb-metrics { display:grid; grid-template-columns:1fr 1fr; gap:7px; }
    .cb-metric { background:rgba(0,212,255,0.06); border:1px solid rgba(0,212,255,0.12); border-radius:8px; padding:9px; text-align:center; }
    .cb-mval { font-family:'Syne',sans-serif; font-size:1rem; font-weight:800; color:#00d4ff; display:block; line-height:1; }
    .cb-mlbl { font-size:0.62rem; color:#8a96b0; display:block; margin-top:2px; }
    .cb-insight { font-size:0.75rem; color:#8a96b0; line-height:1.5; padding:7px 10px; background:rgba(255,255,255,0.03); border-radius:6px; }
    .cb-tools { display:flex; flex-wrap:wrap; gap:5px; }
    .cb-tool { font-family:'JetBrains Mono',monospace; font-size:0.62rem; background:rgba(0,212,255,0.08); color:#00d4ff; border:1px solid rgba(0,212,255,0.15); padding:2px 7px; border-radius:4px; }
    .cb-github { display:flex; align-items:center; justify-content:center; background:#00d4ff; color:#050a15; font-weight:700; font-size:0.82rem; padding:10px; border-radius:8px; transition:all 0.3s ease; text-decoration:none; }
    .cb-github:hover { background:#33ddff; box-shadow:0 0 20px rgba(0,212,255,0.4); }
    .cb-github-na { text-align:center; font-size:0.75rem; color:#556070; font-style:italic; padding:8px; }
  `;
  document.head.appendChild(style);

  const projectData = [
    { number:'01', logo:'assets/images/logos/netflix.png', emoji:'🎬', domain:'Streaming · Content Strategy', title:'Netflix Content Strategy Dashboard', tools:['Power BI','DAX','Power Query'], toolColors:['','',''], metrics:[{val:'8,800+',lbl:'Titles'},{val:'190+',lbl:'Countries'},{val:'23+',lbl:'DAX Measures'},{val:'5 Pages',lbl:'Dashboard'}], insight:'69.6% Movies · 26.93% Fresh Content · US = 43% Flagged', github:'https://lnkd.in/e-ekidNT' },
    { number:'02', logo:'assets/images/logos/blinkit.png', emoji:'🛒', domain:'Retail · Grocery', title:'Blinkit Grocery Sales Dashboard', tools:['Power BI','DAX','Power Query'], metrics:[{val:'8,523',lbl:'Rows'},{val:'2011-22',lbl:'Range'},{val:'Tier 3',lbl:'Top Location'},{val:'4 KPIs',lbl:'Built'}], insight:'Tier 3 beats Tier 1 in sales · Fruits & Veg = top category', github:'https://github.com/as764994-droid/blinkit-grocery-sales-performance-dashboard-powerbi' },
    { number:'03', logo:'assets/images/logos/fmcg.png', emoji:'📦', domain:'FMCG · Distribution', title:'National Distributor Sales Dashboard', tools:['Excel','Power Query','PivotTables'], metrics:[{val:'100K+',lbl:'Records'},{val:'36',lbl:'Months'},{val:'8',lbl:'PivotTables'},{val:'100%',lbl:'Automated'}], insight:'100% manual reporting eliminated · Promo ROI validated', github:'https://lnkd.in/gbcumXRA' },
    { number:'04', logo:'assets/images/logos/swiggy.png', emoji:'🍔', domain:'Food Delivery · E-commerce', title:'Swiggy Sales & Market Analysis', tools:['Excel','Pivot Tables','Time-Series'], metrics:[{val:'197K',lbl:'Orders'},{val:'₹53M',lbl:'Revenue'},{val:'₹268',lbl:'Avg Order'},{val:'32%',lbl:'Q3 Decline'}], insight:'Lucknow #2 nationally · Veg = 65% revenue · Fri–Sun peak', github:'https://lnkd.in/g8wm3vmA' },
    { number:'05', logo:'assets/images/logos/vrinda.png', emoji:'🛍️', domain:'E-commerce · Multi-Channel Retail', title:'Vrinda Store Annual Sales Report', tools:['Excel','Pivot Tables'], metrics:[{val:'12',lbl:'Months'},{val:'65%',lbl:'Women Buyers'},{val:'80%',lbl:'Top 3 Channels'},{val:'92%',lbl:'Delivery Rate'}], insight:'Women 30–49 in MH, KA, UP via Amazon/Flipkart/Myntra', github:'https://lnkd.in/g9viZyqC' },
    { number:'06', logo:'assets/images/logos/sql.png', emoji:'🗄️', domain:'Retail · SQL Analytics', title:'Retail Sales Analysis — SQL Project', tools:['SQL','MySQL','CTEs'], metrics:[{val:'10',lbl:'SQL Queries'},{val:'11',lbl:'Cols Cleaned'},{val:'RANK()',lbl:'Window Fn'},{val:'Full EDA',lbl:'Pipeline'}], insight:'Best month via RANK() · Shift analysis via CASE WHEN + CTE', github:'https://lnkd.in/gXbrYqPA' }
  ];

  const cards = document.querySelectorAll('.project-card');
  cards.forEach(function(card, idx) {
    if (idx >= projectData.length) return;
    const d = projectData[idx];

    const toolsHTML = d.tools.map(function(t) {
      let cls = 'cf-tool';
      if (t.includes('Excel')||t.includes('Pivot')) cls += ' green';
      if (t.includes('SQL')||t.includes('MySQL')||t.includes('CTE')) cls += ' orange';
      return '<span class="' + cls + '">' + t + '</span>';
    }).join('');

    const metricsHTML = d.metrics.map(function(m) {
      return '<div class="cb-metric"><span class="cb-mval">' + m.val + '</span><span class="cb-mlbl">' + m.lbl + '</span></div>';
    }).join('');

    const backToolsHTML = d.tools.map(function(t) {
      return '<span class="cb-tool">' + t + '</span>';
    }).join('');

    const githubHTML = d.github
      ? '<a href="' + d.github + '" target="_blank" class="cb-github" onclick="event.stopPropagation()">View on GitHub →</a>'
      : '<div class="cb-github-na">GitHub coming soon</div>';

    card.innerHTML =
      '<div class="card-front">' +
        '<div class="cf-top"><span class="cf-num">' + d.number + '</span><div class="cf-tools">' + toolsHTML + '</div></div>' +
        '<div class="cf-logo"><img src="' + d.logo + '" alt="' + d.title + '" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"><span class="cf-logo-emoji" style="display:none">' + d.emoji + '</span></div>' +
        '<div><div class="cf-domain">' + d.domain + '</div><div class="cf-title">' + d.title + '</div></div>' +
        '<div class="cf-hint">↻ Click to see metrics & GitHub</div>' +
      '</div>' +
      '<div class="card-back">' +
        '<div><div class="cb-title">' + d.title + '</div><div class="cb-domain">' + d.domain + '</div></div>' +
        '<div class="cb-metrics">' + metricsHTML + '</div>' +
        '<div class="cb-insight">💡 ' + d.insight + '</div>' +
        '<div class="cb-tools">' + backToolsHTML + '</div>' +
        githubHTML +
      '</div>';

    // Click to flip
    card.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') return;
      card.style.transform = '';
      card.style.transition = 'transform 0.18s ease';
      card.style.transform = 'scaleX(0)';
      setTimeout(function() {
        card.classList.toggle('flipped');
        card.style.transform = 'scaleX(1)';
        setTimeout(function() {
          card.style.transform = '';
          card.style.transition = '';
        }, 180);
      }, 180);
    });
  });
})();

/* ====== PROFILE PHOTO TILT ====== */
const photoWrap = document.querySelector('.photo-placeholder');
if (photoWrap) {
  photoWrap.addEventListener('mousemove', function(e) {
    const rect = photoWrap.getBoundingClientRect();
    const rotX = ((e.clientY - rect.top - rect.height/2) / rect.height) * -10;
    const rotY = ((e.clientX - rect.left - rect.width/2) / rect.width) * 10;
    photoWrap.style.transform = 'perspective(600px) translateY(-6px) rotateX('+rotX+'deg) rotateY('+rotY+'deg)';
    photoWrap.style.transition = 'transform 0.08s ease';
  });
  photoWrap.addEventListener('mouseleave', function() {
    photoWrap.style.transform = '';
    photoWrap.style.transition = 'transform 0.5s ease';
  });
}

/* ====== 13. SKILL + CERT TILT ====== */
document.querySelectorAll('.skill-card, .cert-card').forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const rotX = ((e.clientY-rect.top-rect.height/2)/rect.height)*-5;
    const rotY = ((e.clientX-rect.left-rect.width/2)/rect.width)*5;
    card.style.transform='perspective(600px) translateY(-4px) rotateX('+rotX+'deg) rotateY('+rotY+'deg)';
    card.style.transition='transform 0.08s ease';
  });
  card.addEventListener('mouseleave', function() {
    card.style.transform='';
    card.style.transition='transform 0.5s ease';
  });
});

/* ====== 14. PROJECT CARD TILT ====== */
document.querySelectorAll('.project-card').forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    if (card.classList.contains('flipped')) return;
    const rect = card.getBoundingClientRect();
    const rotX = ((e.clientY-rect.top-rect.height/2)/rect.height)*-6;
    const rotY = ((e.clientX-rect.left-rect.width/2)/rect.width)*6;
    card.style.transform='perspective(1000px) translateY(-6px) rotateX('+rotX+'deg) rotateY('+rotY+'deg)';
    card.style.transition='transform 0.08s ease';
  });
  card.addEventListener('mouseleave', function() {
    if (card.classList.contains('flipped')) return;
    card.style.transform='';
    card.style.transition='transform 0.5s ease';
  });
});

/* ====== 15. CURSOR GLOW ====== */
const glow = document.createElement('div');
glow.style.cssText='position:fixed;width:280px;height:280px;background:radial-gradient(circle,rgba(0,212,255,.07) 0%,transparent 70%);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%)';
document.body.appendChild(glow);
document.addEventListener('mousemove', function(e) { glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px'; });

/* ====== 16. TIMELINE ANIMATION ====== */
document.querySelectorAll('.tl-item').forEach(function(item) {
  new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) { if(entry.isIntersecting) entry.target.classList.add('visible'); });
  }, {threshold:0.2}).observe(item);
});

/* ====== 17. LIVE DASHBOARD ====== */
(function() {
  const datasets = {
    netflix: { kpis:[{label:'Total Titles',val:'8,800+',trend:'↑ 26.93% Fresh',cls:'up'},{label:'Countries',val:'190+',trend:'↑ 64.68% International',cls:'up'},{label:'Movies vs TV',val:'69.6%',trend:'30.4% TV Shows',cls:''},{label:'Flagged Content',val:'43%',trend:'↓ US Compliance Risk',cls:'down'}], bars:[{lbl:'International',pct:65},{lbl:'Dramas',pct:58},{lbl:'Comedies',pct:42},{lbl:'Documentaries',pct:35},{lbl:'Action',pct:28},{lbl:'Children',pct:20}], donut:[{label:'Movies',val:69.6,color:'#00d4ff'},{label:'TV Shows',val:30.4,color:'#0077aa'}], chart1title:'Content by Category (%)',chart2title:'Content Mix' },
    blinkit: { kpis:[{label:'Total Sales',val:'₹1.2M',trend:'↑ Supermarket T1',cls:'up'},{label:'Avg Rating',val:'3.9★',trend:'Customer Score',cls:''},{label:'Top Location',val:'Tier 3',trend:'↑ Counter-intuitive',cls:'up'},{label:'Items Tracked',val:'1,559',trend:'Distinct SKUs',cls:''}], bars:[{lbl:'Fruits & Veg',pct:72},{lbl:'Snack Foods',pct:65},{lbl:'Household',pct:48},{lbl:'Frozen Foods',pct:38},{lbl:'Dairy',pct:35},{lbl:'Seafood',pct:18}], donut:[{label:'Supermarket T1',val:55,color:'#00d4ff'},{label:'Grocery',val:28,color:'#0077aa'},{label:'Others',val:17,color:'#005577'}], chart1title:'Revenue by Category (%)',chart2title:'Outlet Mix' },
    swiggy: { kpis:[{label:'Total Orders',val:'197K',trend:'Q1-Q3 Combined',cls:''},{label:'Total Revenue',val:'₹53M',trend:'↓ 32% Q3 Drop',cls:'down'},{label:'Avg Order Value',val:'₹268',trend:'Benchmark set',cls:''},{label:'Avg Rating',val:'4.34★',trend:'↑ Above average',cls:'up'}], bars:[{lbl:'Bengaluru',pct:88},{lbl:'Lucknow #2',pct:76},{lbl:'Mumbai',pct:70},{lbl:'Delhi',pct:62},{lbl:'Hyderabad',pct:48},{lbl:'Chennai',pct:40}], donut:[{label:'Vegetarian',val:65,color:'#33cc66'},{label:'Non-Veg',val:35,color:'#ff9933'}], chart1title:'Revenue by City (%)',chart2title:'Food Category' },
    distributor: { kpis:[{label:'Records',val:'100K+',trend:'36 months data',cls:''},{label:'Channels',val:'3',trend:'Retail·Ecom·Disc',cls:''},{label:'Promo ROI',val:'↑ High',trend:'Validated by data',cls:'up'},{label:'Reporting',val:'100%',trend:'↑ Automated',cls:'up'}], bars:[{lbl:'Yogurt & Milk',pct:82},{lbl:'Snacks',pct:65},{lbl:'Beverages',pct:55},{lbl:'Personal Care',pct:40},{lbl:'Household',pct:35},{lbl:'Others',pct:22}], donut:[{label:'Retail',val:34,color:'#00d4ff'},{label:'E-commerce',val:33,color:'#0077aa'},{label:'Discount',val:33,color:'#005577'}], chart1title:'Revenue by Category (%)',chart2title:'Channel Split' }
  };
  let current='netflix';
  function updateTime(){const el=document.getElementById('dashTime');if(el)el.textContent=new Date().toLocaleTimeString();}
  setInterval(updateTime,1000);updateTime();
  function drawDonut(data){const canvas=document.getElementById('donutCanvas');if(!canvas)return;const ctx=canvas.getContext('2d');const cx=canvas.width/2,cy=canvas.height/2,r=60,ir=38;ctx.clearRect(0,0,canvas.width,canvas.height);let startAngle=-Math.PI/2;const total=data.reduce(function(s,d){return s+d.val;},0);data.forEach(function(seg){const sweep=(seg.val/total)*Math.PI*2;ctx.beginPath();ctx.arc(cx,cy,r,startAngle,startAngle+sweep);ctx.arc(cx,cy,ir,startAngle+sweep,startAngle,true);ctx.closePath();ctx.fillStyle=seg.color;ctx.fill();startAngle+=sweep;});ctx.font='bold 12px Space Grotesk,sans-serif';ctx.fillStyle='#e8edf7';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(data[0].label,cx,cy-7);ctx.font='11px JetBrains Mono,monospace';ctx.fillStyle='#00d4ff';ctx.fillText(data[0].val+'%',cx,cy+9);const legend=document.getElementById('donutLegend');if(legend)legend.innerHTML=data.map(function(d){return'<div class="donut-leg-item"><div class="donut-leg-dot" style="background:'+d.color+'"></div><span>'+d.label+' — '+d.val+'%</span></div>';}).join('');}
  function renderDashboard(key){const ds=datasets[key];if(!ds)return;['1','2','3','4'].forEach(function(n,i){const kpi=ds.kpis[i];document.getElementById('kpi'+n+'label').textContent=kpi.label;const vEl=document.getElementById('kpi'+n+'val');vEl.textContent=kpi.val;vEl.style.animation='none';setTimeout(function(){vEl.style.animation='kpiPop 0.4s ease';},10);const tEl=document.getElementById('kpi'+n+'trend');tEl.textContent=kpi.trend;tEl.className='dkpi-trend '+(kpi.cls||'');});const barsEl=document.getElementById('dashBars');if(barsEl){barsEl.innerHTML=ds.bars.map(function(b){return'<div class="dash-bar-row"><div class="dash-bar-lbl">'+b.lbl+'</div><div class="dash-bar-track"><div class="dash-bar-fill" style="width:0%" data-w="'+b.pct+'"></div></div><div class="dash-bar-pct">'+b.pct+'%</div></div>';}).join('');setTimeout(function(){barsEl.querySelectorAll('.dash-bar-fill').forEach(function(f){f.style.width=f.getAttribute('data-w')+'%';});},50);}const ct1=document.getElementById('chart1title'),ct2=document.getElementById('chart2title');if(ct1)ct1.textContent=ds.chart1title;if(ct2)ct2.textContent=ds.chart2title;drawDonut(ds.donut);}
  const kpiStyle=document.createElement('style');kpiStyle.textContent='@keyframes kpiPop{0%{transform:scale(0.85);opacity:0}100%{transform:scale(1);opacity:1}}';document.head.appendChild(kpiStyle);
  document.querySelectorAll('.dash-btn').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.dash-btn').forEach(function(b){b.classList.remove('active');});btn.classList.add('active');current=btn.getAttribute('data-set');renderDashboard(current);});});
  const dashWrap=document.querySelector('.dash-wrap');if(dashWrap){new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting)renderDashboard(current);});},{threshold:0.2}).observe(dashWrap);}
})();

/* ====== 18. CERTIFICATE MODAL ====== */
window.openCert = function(type, path) {
  const modal=document.getElementById('certModal');const frame=document.getElementById('certFrame');const title=document.getElementById('certModalTitle');
  if(!modal)return;frame.src=path;title.textContent=path.split('/').pop().replace(/_/g,' ').replace('.pdf','');modal.style.display='flex';document.body.style.overflow='hidden';
};
window.closeCert = function() {
  const modal=document.getElementById('certModal');if(!modal)return;modal.style.display='none';document.getElementById('certFrame').src='';document.body.style.overflow='';
};
const certModal=document.getElementById('certModal');
if(certModal)certModal.addEventListener('click',function(e){if(e.target===this)window.closeCert();});

}); // END window.load
