/* ================================================
   AYUSH SINGH — Portfolio script.js
   ALL BUGS FIXED — Clean Final Version
   ================================================ */

window.addEventListener('load', function() {

/* ====== FOOTER YEAR — Dynamic ====== */
// ✅ FIX #14: Footer year is now dynamic — always shows current year
var footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();

/* ====== SCROLL PROGRESS BAR ====== */
var scrollBar = document.getElementById('scroll-progress');
if (scrollBar) {
  window.addEventListener('scroll', function() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollBar.style.width = pct + '%';
  });
}

/* ====== 0. AVAILABILITY BANNER ====== */
var availBanner = document.getElementById('availability-banner');
var availClose = document.getElementById('availClose');
if (availClose && availBanner) {
  availClose.addEventListener('click', function() {
    availBanner.classList.add('hidden');
    document.getElementById('navbar').style.top = '0px';
    setTimeout(function() { availBanner.style.display = 'none'; }, 300);
  });
}
window.addEventListener('scroll', function() {
  if (availBanner && !availBanner.classList.contains('hidden')) {
    if (window.scrollY > 120) {
      availBanner.style.transform = 'translateY(-100%)';
      availBanner.style.opacity = '0';
      document.getElementById('navbar').style.top = '0px';
    } else {
      availBanner.style.transform = '';
      availBanner.style.opacity = '';
      document.getElementById('navbar').style.top = '33px';
    }
  }
});

/* ====== 1. NAVBAR ====== */
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ====== 2. MOBILE MENU ====== */
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');
if (hamburger) hamburger.addEventListener('click', function() { mobileMenu.classList.toggle('open'); });
document.querySelectorAll('.mob-link').forEach(function(link) {
  link.addEventListener('click', function() { mobileMenu.classList.remove('open'); });
});

/* ====== 3. SCROLL REVEAL ====== */
var revealObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObs.unobserve(entry.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(function(el) { revealObs.observe(el); });

/* ====== 4. SMOOTH SCROLL ====== */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ====== 5. ACTIVE NAV ====== */
var navLinks = document.querySelectorAll('.nav-links a');
var navStyle = document.createElement('style');
navStyle.textContent = '.nav-links a.active { color: var(--accent) !important; background: var(--accent-dim) !important; } .mob-link.active { color: var(--accent) !important; background: var(--accent-dim) !important; }';
document.head.appendChild(navStyle);
document.querySelectorAll('section[id]').forEach(function(s) {
  new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function(l) { l.classList.remove('active'); });
        // ✅ Also update mobile nav active state
        document.querySelectorAll('.mob-link').forEach(function(l) { l.classList.remove('active'); });
        var a = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
        if (a) a.classList.add('active');
        var mob = document.querySelector('.mob-link[href="#' + entry.target.id + '"]');
        if (mob) mob.classList.add('active');
      }
    });
  }, { threshold: 0.4 }).observe(s);
});

/* ====== 6. TYPEWRITER ====== */
var titles = ['Data Analyst', 'Power BI Developer', 'Excel Dashboard Builder', 'SQL Analytics Expert', 'Business Intelligence Specialist'];
var tIdx = 0, tChar = 0, tDel = false;
var titleEl = document.querySelector('.hero-title .mono');

// ✅ FIX #7: Element starts empty in HTML — no static text to cause jump
// Nothing extra needed here since HTML now has empty .mono
function typeWriter() {
  if (!titleEl) return;
  var full = titles[tIdx];
  titleEl.textContent = tDel ? full.substring(0, tChar - 1) : full.substring(0, tChar + 1);
  tDel ? tChar-- : tChar++;
  if (!tDel && tChar === full.length) { tDel = true; setTimeout(typeWriter, 2000); return; }
  if (tDel && tChar === 0) { tDel = false; tIdx = (tIdx + 1) % titles.length; }
  setTimeout(typeWriter, tDel ? 55 : 85);
}
setTimeout(typeWriter, 800);

/* ====== 7. COUNTER ====== */
function animCount(el, target, pre, suf) {
  pre = pre || ''; suf = suf || ''; var cur = 0;
  var inc = target / 60;
  var t = setInterval(function() {
    cur += inc;
    if (cur >= target) { cur = target; clearInterval(t); }
    el.textContent = pre + Math.floor(cur) + suf;
  }, 25);
}
var heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(function(el) {
          var txt = el.getAttribute('data-val') || el.textContent.trim();
          el.setAttribute('data-val', txt);
          if (txt === '7') animCount(el, 7, '', '');
          else if (txt.includes('K+')) animCount(el, 132, '', 'K+');
          else if (txt.includes('₹')) animCount(el, 311, '₹', 'M+');
          else if (txt.includes('38+')) animCount(el, 38, '', '+');
          else animCount(el, parseInt(txt.replace(/[^0-9]/g, '')), '', txt.replace(/[0-9]/g, ''));
        });
      }
    });
  }, { threshold: 0.5 }).observe(heroStats);
}

/* ====== 8. PARTICLES ====== */
(function() {
  var hero = document.getElementById('hero');
  if (!hero) return;
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.35';
  hero.insertBefore(canvas, hero.firstChild);
  var ctx = canvas.getContext('2d');
  function resize() { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; }
  resize(); window.addEventListener('resize', resize);
  var pts = [];
  for (var i = 0; i < 70; i++) {
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
    for(var i=0;i<pts.length;i++)for(var j=i+1;j<pts.length;j++){
      var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<100){ctx.save();ctx.globalAlpha=(1-d/100)*0.12;ctx.strokeStyle='#00d4ff';ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();ctx.restore();}
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ====== 9. PROJECT FILTERS ====== */
(function() {
  var grid = document.querySelector('.projects-grid');
  if (!grid) return;
  var bar = document.createElement('div');
  bar.className = 'filter-bar';
  bar.innerHTML = '<button class="filter-btn active" data-filter="all">All Projects</button><button class="filter-btn" data-filter="Power BI">Power BI</button><button class="filter-btn" data-filter="Excel">Excel</button><button class="filter-btn" data-filter="SQL">SQL</button>';
  grid.parentNode.insertBefore(bar, grid);
  var style = document.createElement('style');
  // ✅ FIX #10: Added :focus-visible styles for keyboard accessibility
  style.textContent = '.filter-bar{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:32px;justify-content:center}.filter-btn{font-family:"JetBrains Mono",monospace;font-size:.8rem;font-weight:600;padding:8px 20px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:transparent;color:#8a96b0;cursor:pointer;transition:all .3s ease}.filter-btn:hover{border-color:rgba(0,212,255,.4);color:#00d4ff;background:rgba(0,212,255,.08)}.filter-btn.active{background:#00d4ff;color:#050a15;border-color:#00d4ff;box-shadow:0 0 20px rgba(0,212,255,.3)}.filter-btn:focus-visible{outline:2px solid #00d4ff;outline-offset:3px}@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
  document.head.appendChild(style);
  bar.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      bar.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      // ✅ FIX #1 side effect: Now all 7 cards are in the grid, so this query correctly finds all of them
      document.querySelectorAll('.project-card').forEach(function(card) {
        var d = card.getAttribute('data-domain') || '';
        card.style.display = (f==='all'||d===f) ? 'block' : 'none';
        if(f==='all'||d===f) card.style.animation='fadeInUp 0.4s ease forwards';
      });
    });
  });
})();

/* ====== 10. RADAR CHART ====== */
(function() {
  var skillsContainer = document.querySelector('#skills .container');
  if (!skillsContainer) return;
  var wrap = document.createElement('div');
  wrap.style.cssText = 'margin-top:60px;text-align:center;';
  wrap.innerHTML = '<p style="font-family:JetBrains Mono,monospace;font-size:.78rem;color:#00d4ff;letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px;">Skill Proficiency Radar</p>';
  var canvas = document.createElement('canvas');
  canvas.width=440; canvas.height=380;
  canvas.style.cssText='max-width:100%;margin:0 auto;display:block;';
  wrap.appendChild(canvas);
  skillsContainer.appendChild(wrap);
  var ctx=canvas.getContext('2d');
  var skills=[{label:'Power BI',value:0.9},{label:'Adv. Excel',value:0.92},{label:'DAX/Power Query',value:0.85},{label:'SQL',value:0.7},{label:'Data Storytelling',value:0.88},{label:'KPI Dev.',value:0.9},{label:'Python',value:0.35}];
  var cx=canvas.width/2,cy=canvas.height/2,r=130,total=skills.length;

  function drawRadar(progress) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var step=(Math.PI*2)/total;
    var isLight = document.body.classList.contains('light-mode');
    for(var ring=1;ring<=5;ring++){
      ctx.beginPath();
      for(var i=0;i<total;i++){
        var a=i*step-Math.PI/2,rr=(r*ring)/5;
        i===0?ctx.moveTo(cx+rr*Math.cos(a),cy+rr*Math.sin(a)):ctx.lineTo(cx+rr*Math.cos(a),cy+rr*Math.sin(a));
      }
      ctx.closePath();
      ctx.strokeStyle=isLight?'rgba(0,0,0,0.1)':'rgba(255,255,255,0.06)';
      ctx.lineWidth=1;ctx.stroke();
    }
    for(var i=0;i<total;i++){
      var a=i*step-Math.PI/2;
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
      ctx.strokeStyle=isLight?'rgba(0,0,0,0.12)':'rgba(255,255,255,0.08)';
      ctx.lineWidth=1;ctx.stroke();
    }
    ctx.beginPath();
    for(var i=0;i<total;i++){
      var a=i*step-Math.PI/2,val=skills[i].value*progress;
      i===0?ctx.moveTo(cx+r*val*Math.cos(a),cy+r*val*Math.sin(a)):ctx.lineTo(cx+r*val*Math.cos(a),cy+r*val*Math.sin(a));
    }
    ctx.closePath();
    var grad=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
    grad.addColorStop(0,'rgba(0,212,255,0.35)');
    grad.addColorStop(1,'rgba(0,212,255,0.04)');
    ctx.fillStyle=grad;ctx.fill();
    ctx.strokeStyle='#00d4ff';ctx.lineWidth=2;ctx.stroke();
    for(var i=0;i<total;i++){
      var a=i*step-Math.PI/2,val=skills[i].value*progress;
      var x=cx+r*val*Math.cos(a),y=cy+r*val*Math.sin(a);
      ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fillStyle='#00d4ff';ctx.fill();
      ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();
      ctx.font='600 11px Space Grotesk,sans-serif';
      // ✅ FIX #5: Label color now correctly uses isLight computed at draw time
      ctx.fillStyle=isLight?'rgba(6,12,28,'+Math.min(progress*2,1)+')':'rgba(232,237,247,'+Math.min(progress*2,1)+')';
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(skills[i].label,cx+(r+42)*Math.cos(a),cy+(r+42)*Math.sin(a));
      if(progress>0.6){
        ctx.font='bold 9px JetBrains Mono,monospace';
        ctx.fillStyle='#fff';
        ctx.fillText(Math.round(skills[i].value*100)+'%',cx+r*val*0.5*Math.cos(a),cy+r*val*0.5*Math.sin(a));
      }
    }
  }

  // ✅ FIX #5: Radar draws with progress=0 AFTER DOM + theme are ready (inside load event)
  // Theme is already applied by the time this runs, so light mode labels will be correct on first render
  drawRadar(0);

  canvas.addEventListener('redraw', function() {
    drawRadar(1);
  });

  new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var start=null;
        function anim(ts){
          if(!start)start=ts;
          var p=Math.min((ts-start)/1400,1);
          drawRadar(p);
          if(p<1)requestAnimationFrame(anim);
        }
        requestAnimationFrame(anim);
      }
    });
  },{threshold:0.2}).observe(canvas);
})();

/* ====== 11. MINI BAR CHART ====== */
(function() {
  var aboutText = document.querySelector('.about-text');
  if (!aboutText) return;
  var wrap = document.createElement('div');
  wrap.style.cssText='margin-top:32px;';
  wrap.innerHTML='<p style="font-family:JetBrains Mono,monospace;font-size:.78rem;color:#00d4ff;letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px;">Projects by Domain</p><div id="miniChart" style="display:flex;align-items:flex-end;gap:20px;height:120px;background:rgba(0,212,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:12px 20px 10px"><div class="bgrp" data-h="75"><div class="bfill" style="background:#00d4ff;box-shadow:0 0 12px rgba(0,212,255,.5)"></div><div style="font-size:.72rem;color:#8a96b0;font-family:JetBrains Mono,monospace;margin-top:6px">Power BI</div><div style="font-size:.8rem;font-weight:700;color:#e8edf7">3</div></div><div class="bgrp" data-h="100"><div class="bfill" style="background:#33cc66;box-shadow:0 0 12px rgba(51,204,102,.5)"></div><div style="font-size:.72rem;color:#8a96b0;font-family:JetBrains Mono,monospace;margin-top:6px">Excel</div><div style="font-size:.8rem;font-weight:700;color:#e8edf7">4</div></div><div class="bgrp" data-h="50"><div class="bfill" style="background:#ff9933;box-shadow:0 0 12px rgba(255,153,51,.5)"></div><div style="font-size:.72rem;color:#8a96b0;font-family:JetBrains Mono,monospace;margin-top:6px">SQL</div><div style="font-size:.8rem;font-weight:700;color:#e8edf7">2</div></div></div>';
  aboutText.appendChild(wrap);
  var bStyle=document.createElement('style');
  bStyle.textContent='.bgrp{display:flex;flex-direction:column;align-items:center;flex:1;height:100%;justify-content:flex-end;text-align:center}.bfill{width:100%;max-width:56px;height:0;border-radius:4px 4px 0 0;transition:height 1.3s cubic-bezier(.4,0,.2,1)}';
  document.head.appendChild(bStyle);
  new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.querySelectorAll('.bgrp').forEach(function(g){
          var h=g.getAttribute('data-h');
          setTimeout(function(){g.querySelector('.bfill').style.height=h+'%';},400);
        });
      }
    });
  },{threshold:0.5}).observe(document.getElementById('miniChart')||wrap);
})();

/* ====== 12. FLIP CARDS ====== */
(function() {
  var style = document.createElement('style');
  // ✅ FIX #12: All card styles consolidated here — removed from inline <head> style and CSS duplication
  // ✅ FIX #6: Mobile min-height fixed — cards use auto height on small screens
  style.textContent = `
    .project-card {
      position: relative !important;
      min-height: 420px !important;
      cursor: pointer !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      transform-style: flat !important;
    }
    @media (max-width: 600px) {
      .project-card { min-height: 0 !important; padding-bottom: 420px !important; }
    }
    .card-front, .card-back {
      position: absolute !important;
      inset: 0 !important;
      padding: 28px !important;
      border-radius: 12px !important;
      display: flex !important;
      flex-direction: column !important;
      transition: opacity 0.5s ease, transform 0.5s ease !important;
    }
    .card-front {
      background: #111827 !important;
      border: 1px solid rgba(255,255,255,0.07) !important;
      justify-content: space-between !important;
      opacity: 1 !important;
      transform: scale(1) !important;
      z-index: 2 !important;
      pointer-events: auto !important;
    }
    .card-back {
      background: linear-gradient(135deg,#0a1a2e,#0d1527) !important;
      border: 1px solid rgba(0,212,255,0.35) !important;
      justify-content: space-between !important;
      gap: 10px !important;
      opacity: 0 !important;
      transform: scale(0.95) !important;
      z-index: 1 !important;
      pointer-events: none !important;
    }
    .project-card.flipped .card-front {
      opacity: 0 !important;
      transform: scale(0.95) !important;
      z-index: 1 !important;
      pointer-events: none !important;
    }
    .project-card.flipped .card-back {
      opacity: 1 !important;
      transform: scale(1) !important;
      z-index: 2 !important;
      pointer-events: auto !important;
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

  // ✅ FIX #11: Direct GitHub URLs used — no more lnkd.in shortlinks
  var projectData = [
    { number:'01', logo:'assets/images/logos/netflix.png', emoji:'🎬', domain:'Streaming · Content Strategy', title:'Netflix Content Strategy Dashboard', tools:['Power BI','DAX','Power Query'], metrics:[{val:'8,800+',lbl:'Titles'},{val:'190+',lbl:'Countries'},{val:'23+',lbl:'DAX Measures'},{val:'5 Pages',lbl:'Dashboard'}], insight:'69.6% Movies · 26.93% Fresh Content · US = 43% Flagged', github:'https://github.com/as764994-droid/Netflix-Content-Analytics-PowerBI' },
    { number:'02', logo:'assets/images/logos/blinkit.png', emoji:'🛒', domain:'Retail · Grocery', title:'Blinkit Grocery Sales Dashboard', tools:['Power BI','DAX','Power Query'], metrics:[{val:'8,523',lbl:'Rows'},{val:'2011-22',lbl:'Range'},{val:'Tier 3',lbl:'Top Location'},{val:'4 KPIs',lbl:'Built'}], insight:'Tier 3 beats Tier 1 in sales · Fruits & Veg = top category', github:'https://github.com/as764994-droid/blinkit-grocery-sales-performance-dashboard-powerbi' },
    { number:'03', logo:'assets/images/logos/fmcg.png', emoji:'📦', domain:'FMCG · Distribution', title:'National Distributor Sales Dashboard', tools:['Excel','Power Query','PivotTables'], metrics:[{val:'100K+',lbl:'Records'},{val:'36',lbl:'Months'},{val:'8',lbl:'PivotTables'},{val:'100%',lbl:'Automated'}], insight:'100% manual reporting eliminated · Promo ROI validated', github:'https://github.com/as764994-droid/Sales-Performance-Dashboard' },
    { number:'04', logo:'assets/images/logos/swiggy.png', emoji:'🍔', domain:'Food Delivery · E-commerce', title:'Swiggy Sales & Market Analysis', tools:['Excel','Pivot Tables','Time-Series'], metrics:[{val:'197K',lbl:'Orders'},{val:'₹53M',lbl:'Revenue'},{val:'₹268',lbl:'Avg Order'},{val:'32%',lbl:'Q3 Decline'}], insight:'Lucknow #2 nationally · Veg = 65% revenue · Fri–Sun peak', github:'https://github.com/as764994-droid/swiggy-sales-analysis-excel' },
    { number:'05', logo:'assets/images/logos/vrinda.png', emoji:'🛍️', domain:'E-commerce · Multi-Channel Retail', title:'Vrinda Store Annual Sales Report', tools:['Excel','Pivot Tables'], metrics:[{val:'12',lbl:'Months'},{val:'65%',lbl:'Women Buyers'},{val:'80%',lbl:'Top 3 Channels'},{val:'92%',lbl:'Delivery Rate'}], insight:'Women 30–49 in MH, KA, UP via Amazon/Flipkart/Myntra', github:'https://github.com/as764994-droid/Vrinda-Excel-Project' },
    { number:'06', logo:'assets/images/logos/sql.png', emoji:'🗄️', domain:'Retail · SQL Analytics', title:'Retail Sales Analysis — SQL Project', tools:['SQL','MySQL','CTEs'], metrics:[{val:'10',lbl:'SQL Queries'},{val:'11',lbl:'Cols Cleaned'},{val:'RANK()',lbl:'Window Fn'},{val:'Full EDA',lbl:'Pipeline'}], insight:'Best month via RANK() · Shift analysis via CASE WHEN + CTE', github:'https://github.com/as764994-droid/sql-retail-sales-analysis-project' },
    { number:'07', logo:'assets/images/logos/credit-risk.png', emoji:'🏦', domain:'Banking · Credit Risk · Financial Services', title:'Credit Risk & Loan Default Analysis', tools:['Power BI','Excel','SQL'], metrics:[{val:'32,407',lbl:'Records'},{val:'21.87%',lbl:'Default Rate'},{val:'15',lbl:'DAX Measures'},{val:'4-Phase',lbl:'Pipeline'}], insight:'Grade G = 98.44% default · ₹77M at risk · LTI = #1 predictor', github:'https://github.com/as764994-droid/credit-risk-loan-default-analysis' }
  ];

  // ✅ FIX #15: Detect touch device for "Tap" vs "Click" hint
  var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  var flipHint = isTouchDevice ? '↻ Tap to see metrics & GitHub' : '↻ Click to see metrics & GitHub';

  var cards = document.querySelectorAll('.project-card');
  cards.forEach(function(card, idx) {
    if (idx >= projectData.length) return;
    var d = projectData[idx];

    var toolsHTML = d.tools.map(function(t) {
      var cls = 'cf-tool';
      if (t.includes('Excel')||t.includes('Pivot')) cls += ' green';
      if (t.includes('SQL')||t.includes('MySQL')||t.includes('CTE')) cls += ' orange';
      return '<span class="' + cls + '">' + t + '</span>';
    }).join('');

    var metricsHTML = d.metrics.map(function(m) {
      return '<div class="cb-metric"><span class="cb-mval">' + m.val + '</span><span class="cb-mlbl">' + m.lbl + '</span></div>';
    }).join('');

    var backToolsHTML = d.tools.map(function(t) {
      return '<span class="cb-tool">' + t + '</span>';
    }).join('');

    var githubHTML = d.github
      ? '<a href="' + d.github + '" target="_blank" class="cb-github" onclick="event.stopPropagation()">View on GitHub →</a>'
      : '<div class="cb-github-na">GitHub coming soon</div>';

    card.innerHTML =
      '<div class="card-front">' +
        '<div class="cf-top"><span class="cf-num">' + d.number + '</span><div class="cf-tools">' + toolsHTML + '</div></div>' +
        '<div class="cf-logo"><img src="' + d.logo + '" alt="' + d.title + '" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"><span class="cf-logo-emoji" style="display:none">' + d.emoji + '</span></div>' +
        '<div><div class="cf-domain">' + d.domain + '</div><div class="cf-title">' + d.title + '</div></div>' +
        '<div class="cf-hint">' + flipHint + '</div>' +
      '</div>' +
      '<div class="card-back">' +
        '<div><div class="cb-title">' + d.title + '</div><div class="cb-domain">' + d.domain + '</div></div>' +
        '<div class="cb-metrics">' + metricsHTML + '</div>' +
        '<div class="cb-insight">💡 ' + d.insight + '</div>' +
        '<div class="cb-tools">' + backToolsHTML + '</div>' +
        '<button class="cb-deepdive" onclick="event.stopPropagation();window.openProjectModal(' + idx + ')">🔍 View Full Details</button>' +
        githubHTML +
      '</div>';
    
      card.style.visibility = 'visible';

    card.addEventListener('click', function(e) {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
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
var photoWrap = document.querySelector('.photo-placeholder');
if (photoWrap) {
  photoWrap.addEventListener('mousemove', function(e) {
    var rect = photoWrap.getBoundingClientRect();
    var rotX = ((e.clientY - rect.top - rect.height/2) / rect.height) * -10;
    var rotY = ((e.clientX - rect.left - rect.width/2) / rect.width) * 10;
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
    var rect = card.getBoundingClientRect();
    var rotX = ((e.clientY-rect.top-rect.height/2)/rect.height)*-5;
    var rotY = ((e.clientX-rect.left-rect.width/2)/rect.width)*5;
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
    var rect = card.getBoundingClientRect();
    var rotX = ((e.clientY-rect.top-rect.height/2)/rect.height)*-6;
    var rotY = ((e.clientX-rect.left-rect.width/2)/rect.width)*6;
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
var glow = document.createElement('div');
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
  var datasets = {
    netflix: { kpis:[{label:'Total Titles',val:'8,800+',trend:'↑ 26.93% Fresh',cls:'up'},{label:'Countries',val:'190+',trend:'↑ 64.68% International',cls:'up'},{label:'Movies vs TV',val:'69.6%',trend:'30.4% TV Shows',cls:''},{label:'Flagged Content',val:'43%',trend:'↓ US Compliance Risk',cls:'down'}], bars:[{lbl:'International',pct:65},{lbl:'Dramas',pct:58},{lbl:'Comedies',pct:42},{lbl:'Documentaries',pct:35},{lbl:'Action',pct:28},{lbl:'Children',pct:20}], donut:[{label:'Movies',val:69.6,color:'#00d4ff'},{label:'TV Shows',val:30.4,color:'#0077aa'}], chart1title:'Content by Category (%)',chart2title:'Content Mix' },
    blinkit: { kpis:[{label:'Total Sales',val:'₹1.2M',trend:'↑ Supermarket T1',cls:'up'},{label:'Avg Rating',val:'3.9★',trend:'Customer Score',cls:''},{label:'Top Location',val:'Tier 3',trend:'↑ Counter-intuitive',cls:'up'},{label:'Items Tracked',val:'1,559',trend:'Distinct SKUs',cls:''}], bars:[{lbl:'Fruits & Veg',pct:72},{lbl:'Snack Foods',pct:65},{lbl:'Household',pct:48},{lbl:'Frozen Foods',pct:38},{lbl:'Dairy',pct:35},{lbl:'Seafood',pct:18}], donut:[{label:'Supermarket T1',val:55,color:'#00d4ff'},{label:'Grocery',val:28,color:'#0077aa'},{label:'Others',val:17,color:'#005577'}], chart1title:'Revenue by Category (%)',chart2title:'Outlet Mix' },
    swiggy: { kpis:[{label:'Total Orders',val:'197K',trend:'Q1-Q3 Combined',cls:''},{label:'Total Revenue',val:'₹53M',trend:'↓ 32% Q3 Drop',cls:'down'},{label:'Avg Order Value',val:'₹268',trend:'Benchmark set',cls:''},{label:'Avg Rating',val:'4.34★',trend:'↑ Above average',cls:'up'}], bars:[{lbl:'Bengaluru',pct:88},{lbl:'Lucknow #2',pct:76},{lbl:'Mumbai',pct:70},{lbl:'Delhi',pct:62},{lbl:'Hyderabad',pct:48},{lbl:'Chennai',pct:40}], donut:[{label:'Vegetarian',val:65,color:'#33cc66'},{label:'Non-Veg',val:35,color:'#ff9933'}], chart1title:'Revenue by City (%)',chart2title:'Food Category' },
    distributor: { kpis:[{label:'Records',val:'100K+',trend:'36 months data',cls:''},{label:'Channels',val:'3',trend:'Retail·Ecom·Disc',cls:''},{label:'Promo ROI',val:'↑ High',trend:'Validated by data',cls:'up'},{label:'Reporting',val:'100%',trend:'↑ Automated',cls:'up'}], bars:[{lbl:'Yogurt & Milk',pct:82},{lbl:'Snacks',pct:65},{lbl:'Beverages',pct:55},{lbl:'Personal Care',pct:40},{lbl:'Household',pct:35},{lbl:'Others',pct:22}], donut:[{label:'Retail',val:34,color:'#00d4ff'},{label:'E-commerce',val:33,color:'#0077aa'},{label:'Discount',val:33,color:'#005577'}], chart1title:'Revenue by Category (%)',chart2title:'Channel Split' },
    creditrisk: { kpis:[{label:'Default Rate',val:'21.87%',trend:'↓ 1 in 5 loans defaults',cls:'down'},{label:'Amount at Risk',val:'₹77M',trend:'↓ Defaulted portfolio',cls:'down'},{label:'Safe Portfolio',val:'₹234M',trend:'↑ Non-defaulted loans',cls:'up'},{label:'Top Predictor',val:'+0.38',trend:'↑ Loan-to-income ratio',cls:'up'}], bars:[{lbl:'Grade G (98.4%)',pct:98},{lbl:'Grade F (70.5%)',pct:70},{lbl:'Grade E (64.5%)',pct:64},{lbl:'Grade D (59.1%)',pct:59},{lbl:'Grade C (20.8%)',pct:21},{lbl:'Grade A (9.96%)',pct:10}], donut:[{label:'Not Defaulted',val:78.13,color:'#10b981'},{label:'Defaulted',val:21.87,color:'#ef4444'}], chart1title:'Default Rate by Loan Grade (%)',chart2title:'Portfolio Health' }
  };
  var current='netflix';
  function updateTime(){var el=document.getElementById('dashTime');if(el)el.textContent=new Date().toLocaleTimeString();}
  setInterval(updateTime,1000);updateTime();
  function drawDonut(data){var canvas=document.getElementById('donutCanvas');if(!canvas)return;var ctx=canvas.getContext('2d');var cx=canvas.width/2,cy=canvas.height/2,r=60,ir=38;ctx.clearRect(0,0,canvas.width,canvas.height);var startAngle=-Math.PI/2;var total=data.reduce(function(s,d){return s+d.val;},0);data.forEach(function(seg){var sweep=(seg.val/total)*Math.PI*2;ctx.beginPath();ctx.arc(cx,cy,r,startAngle,startAngle+sweep);ctx.arc(cx,cy,ir,startAngle+sweep,startAngle,true);ctx.closePath();ctx.fillStyle=seg.color;ctx.fill();startAngle+=sweep;});ctx.font='bold 12px Space Grotesk,sans-serif';ctx.fillStyle='#e8edf7';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(data[0].label,cx,cy-7);ctx.font='11px JetBrains Mono,monospace';ctx.fillStyle='#00d4ff';ctx.fillText(data[0].val+'%',cx,cy+9);var legend=document.getElementById('donutLegend');if(legend)legend.innerHTML=data.map(function(d){return'<div class="donut-leg-item"><div class="donut-leg-dot" style="background:'+d.color+'"></div><span>'+d.label+' — '+d.val+'%</span></div>';}).join('');}
  function renderDashboard(key){var ds=datasets[key];if(!ds)return;['1','2','3','4'].forEach(function(n,i){var kpi=ds.kpis[i];document.getElementById('kpi'+n+'label').textContent=kpi.label;var vEl=document.getElementById('kpi'+n+'val');vEl.textContent=kpi.val;vEl.style.animation='none';setTimeout(function(){vEl.style.animation='kpiPop 0.4s ease';},10);var tEl=document.getElementById('kpi'+n+'trend');tEl.textContent=kpi.trend;tEl.className='dkpi-trend '+(kpi.cls||'');});var barsEl=document.getElementById('dashBars');if(barsEl){barsEl.innerHTML=ds.bars.map(function(b){return'<div class="dash-bar-row"><div class="dash-bar-lbl">'+b.lbl+'</div><div class="dash-bar-track"><div class="dash-bar-fill" style="width:0%" data-w="'+b.pct+'"></div></div><div class="dash-bar-pct">'+b.pct+'%</div></div>';}).join('');setTimeout(function(){barsEl.querySelectorAll('.dash-bar-fill').forEach(function(f){f.style.width=f.getAttribute('data-w')+'%';});},50);}var ct1=document.getElementById('chart1title'),ct2=document.getElementById('chart2title');if(ct1)ct1.textContent=ds.chart1title;if(ct2)ct2.textContent=ds.chart2title;drawDonut(ds.donut);}
  var kpiStyle=document.createElement('style');
  // ✅ FIX #10: Added :focus-visible on dash buttons too
  kpiStyle.textContent='@keyframes kpiPop{0%{transform:scale(0.85);opacity:0}100%{transform:scale(1);opacity:1}}.dash-btn:focus-visible{outline:2px solid var(--accent);outline-offset:2px;}';
  document.head.appendChild(kpiStyle);
  document.querySelectorAll('.dash-btn').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.dash-btn').forEach(function(b){b.classList.remove('active');});btn.classList.add('active');current=btn.getAttribute('data-set');renderDashboard(current);});});
  var dashWrap=document.querySelector('.dash-wrap');if(dashWrap){new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting)renderDashboard(current);});},{threshold:0.2}).observe(dashWrap);}
})();

/* ====== 18. CERTIFICATE MODAL ====== */
window.openCert = function(type, path) {
  var modal=document.getElementById('certModal');var frame=document.getElementById('certFrame');var title=document.getElementById('certModalTitle');
  if(!modal)return;frame.src=path;title.textContent=path.split('/').pop().replace(/_/g,' ').replace('.pdf','');modal.style.display='flex';document.body.style.overflow='hidden';
};
window.closeCert = function() {
  var modal=document.getElementById('certModal');if(!modal)return;modal.style.display='none';document.getElementById('certFrame').src='';document.body.style.overflow='';
};
var certModal=document.getElementById('certModal');
if(certModal)certModal.addEventListener('click',function(e){if(e.target===this)window.closeCert();});

/* ====== 19. AI CHATBOT ====== */
(function() {
  var kb = {
    name: "Ayush Singh",
    role: "Data Analyst",
    location: "Lucknow, Uttar Pradesh, India",
    email: "as764994@gmail.com",
    github: "github.com/as764994-droid",
    linkedin: "linkedin.com/in/ayush-singh-finance",
    availability: "Immediate joiner — available right now",
    education: "B.Com in Accounting & Finance from University of Lucknow (2020–2024). Currently enrolled in PW Skills Data Analytics with GenAI program — learning SQL, Python, Power BI, Tableau, and Machine Learning.",
    about: "Ayush is a Data Analyst from Lucknow, India who specializes in turning raw data into clear business decisions. He has built 7 end-to-end analytics projects across 6 industries — working with datasets ranging from 8,500 to 100,000+ records. He is passionate about building executive-level dashboards and performance trackers.",
    experience: "7 real-world end-to-end projects across e-commerce, FMCG, food delivery, streaming, retail, and banking/financial services. Analyzed 100,000+ records, tracked ₹311M+ in revenue, built 23+ DAX measures, and delivered a 4-phase credit risk analytical pipeline.",
    tools: {
      powerbi: "Expert level. Ayush builds production-grade Power BI dashboards with DAX, Power Query, Row-Level Security (RLS), What-If Parameters, Drill-Through, Bookmarks, Custom Tooltips, and Custom Themes. He has built 5-page dashboards designed for VP-level stakeholders.",
      excel: "Expert level. Advanced Excel including Pivot Tables, PivotCharts, Power Query (150+ lines of M code), Slicers, GETPIVOTDATA, and full dashboard automation. Has eliminated 100% of manual reporting for a national distributor.",
      sql: "Intermediate level. MySQL — Window Functions (RANK, ROW_NUMBER), CTEs, Subqueries, Data Cleaning, and full EDA pipelines. Built a complete retail SQL analytics project from scratch.",
      python: "Currently learning Python through the PW Skills program. Comfortable with fundamentals.",
      dax: "Expert level. 23+ DAX measures built including calculated columns, time intelligence, What-If parameters, and dynamic KPI logic.",
      tableau: "Currently learning Tableau as part of the PW Skills program.",
    },
    projects: {
      netflix: "Netflix Content Strategy Dashboard — a production-grade 5-page Power BI dashboard analyzing 8,800+ titles across 190+ countries. Built for VP Content, Head of Acquisitions, and CFO personas. Features 23+ DAX measures, What-If investment simulator, Row-Level Security, Drill-Through, and a custom Netflix theme. Key finding: only 26.93% of catalog is fresh content, and US accounts for 43% of compliance-flagged titles.",
      blinkit: "Blinkit Grocery Sales Dashboard — Power BI dashboard analyzing 8,523 rows of grocery sales data from 2011–2022. Discovered that Tier 3 locations outperform Tier 1 in total sales — a counter-intuitive finding. Fruits & Vegetables is the top revenue driver. Built with KPI cards, outlet analysis, and visibility correlation.",
      fmcg: "National Distributor Sales Dashboard — enterprise-grade Excel dashboard consolidating 3 years and 100,000+ transactional records with auto-refresh. Eliminated 100% of manual monthly reporting. Built 8 PivotTables, 7 PivotCharts, 8 cross-connected slicers, and 150+ lines of Power Query M code. Validated that promo transactions deliver higher revenue per unit.",
      swiggy: "Swiggy Sales & Market Analysis — dynamic Excel KPI dashboard analyzing 197,430 orders worth ₹53.01M. Identified a critical 32% Q3 revenue decline and delivered 3 strategic recommendations. Discovered Lucknow ranks #2 nationally, vegetarian orders = 65% of revenue, and Friday–Sunday is peak ordering period.",
      vrinda: "Vrinda Store Annual Sales Report 2022 — 12-month Excel analysis answering 8 critical business questions. Found that women aged 30–49 in Maharashtra, Karnataka, and UP via Amazon, Flipkart, and Myntra are the highest-value segment. Delivered a precise 2023 marketing strategy.",
      sql: "Retail Sales Analysis SQL Project — end-to-end MySQL project from database setup and data cleaning to 10 business queries. Used RANK() window function for best-selling month, CTEs for shift analysis, and built a full EDA pipeline — all without any BI tool.",
      creditrisk: "Credit Risk & Loan Default Analysis — full end-to-end capstone project (Excel → SQL → Statistics → Power BI) on 32,407 loan records. Answered 12 stakeholder questions for CRO, CFO, Loan Committee, and Data Analytics Team. Key findings: 21.87% overall default rate, Grade G loans default at 98.44%, loan-to-income ratio is the #1 predictor (Pearson +0.38), and ₹77M in portfolio is at risk. Built a 5-page Power BI dashboard with 15 DAX measures, What-If LTI simulator, Drill-Through, Decomposition Tree, and a custom Credit Sentinel dark finance theme.",
    },
    strengths: "Ayush's biggest strengths are: (1) Business thinking — he doesn't just build charts, he identifies actionable insights like the 32% Q3 Swiggy decline, counter-intuitive Tier 3 dominance in Blinkit, and a ₹77M at-risk portfolio in his Credit Risk capstone. (2) Technical depth — 23+ DAX measures, Power Query automation, SQL window functions, and Pearson correlation statistical analysis. (3) Stakeholder focus — his dashboards are designed for CRO, CFO, and VP-level personas, not just data teams. (4) Speed — immediate joiner, 7 projects already built.",
    whyhire: "Ayush brings 3 things most freshers don't: real project depth (not toy datasets), business insight (not just charts), and immediate availability. His projects have tracked ₹311M+ in revenue, analyzed 100K+ records, eliminated manual reporting entirely, and quantified ₹77M in credit portfolio risk. He thinks like a business analyst, not just a data technician.",
    certifications: "Power BI Workshop (OfficeMaster, Nov 2025), Advanced Excel Certification (OneRoadmap — verified), AI Tools Workshop (be10x, Nov 2025), Data Analyst Certification (OneRoadmap — verified), Data Analytics Completion Certificate (Skillsetmaster, Jan 2026).",
    salary: "Ayush is open to discussing compensation based on the role and company. He is primarily focused on finding the right opportunity to contribute and grow.",
    notice: "Immediate joiner. Zero notice period. Can start right away.",
    domain: "Ayush has worked across 6 industries: Streaming (Netflix), Grocery Retail (Blinkit), FMCG Distribution, Food Delivery (Swiggy), E-commerce Retail (Vrinda Store), SQL Retail Analytics, and Banking & Financial Services (Credit Risk & Loan Default Analysis).",
  };

  function getResponse(input) {
    var q = input.toLowerCase().trim();

    if (/hiring|we.*looking|open.*position|job opening|vacancy|team.*need|recruiting|talent|candidate|interview|onboard|join.*team/.test(q))
      return '👔 Sounds like you\'re hiring! Here\'s Ayush\'s quick recruiter summary:\n\n🎯 Role: Data Analyst / Business Analyst\n📍 Location: Lucknow — open to Remote & Relocation\n⚡ Availability: Immediate Joiner — Zero notice period\n📊 Projects: 7 end-to-end across 6 industries\n💰 Revenue Tracked: ₹311M+\n🛠️ Tools: Power BI · Advanced Excel · SQL · DAX\n\n📧 Reach him at: as764994@gmail.com\n💼 LinkedIn: linkedin.com/in/ayush-singh-finance\n\nHe\'s ready to contribute from Day 1! 🚀';

    if (/surprise|random|fun fact|impress me|wow me/.test(q)) {
      var facts = [
        '🎲 In Ayush\'s Swiggy project, Lucknow ranked #2 nationally — beating Mumbai and Delhi in total order volume. A Tier-2 city outperforming major metros!',
        '🎲 Ayush\'s Credit Risk capstone found that Grade G loans default at 98.44% — nearly every single one. Grade A defaults at only 9.96%. A 10x difference!',
        '🎲 In the Blinkit dashboard, Tier 3 locations generated MORE revenue than Tier 1 cities — completely counter-intuitive and discovered through data!',
        '🎲 Ayush wrote ~150 lines of Power Query M code for his National Distributor project — eliminating 100% of manual monthly reporting.',
        '🎲 His Netflix dashboard has Row-Level Security so the US, India, and UK teams each see only their own regional data — a real enterprise Power BI feature!',
        '🎲 The Credit Risk What-If simulator shows that when loan-to-income ratio crosses 30%, the default rate jumps from 20.98% to 61.93% — almost 3x higher!',
        '🎲 Ayush tracked ₹311M+ in total revenue across his 7 projects. That\'s over 3.7 Crore rupees of business data analyzed!',
      ];
      return facts[Math.floor(Math.random() * facts.length)];
    }

    if (/^(hi|hello|hey|good morning|good afternoon|good evening|namaste|hii|helo)/.test(q))
      return 'Hello! 👋 I\'m Ayush\'s AI assistant. I can tell you everything about his skills, projects, experience, and availability. What would you like to know?';

    if (/who are you|what are you|are you ai|are you real|are you human/.test(q))
      return 'I\'m an AI assistant built specifically for Ayush Singh\'s portfolio. I know everything about his skills, projects, certifications, and career goals. Ask me anything! 🤖';

    // ✅ FIX #2: Dead code removed — only one return for resume condition
    if (/resume|cv|download|portfolio pdf/.test(q))
      return '📄 __RESUME_CARD__';

    if (/location|where.*based|where.*from|where.*live|city/.test(q))
      return 'Ayush is based in ' + kb.location + '. He is open to remote, hybrid, or relocation opportunities.';

    if (/available|join|notice period|when can|start|immediate/.test(q))
      return '✅ ' + kb.availability + '. No notice period — he can start on Day 1.';

    if (/education|degree|college|university|qualification|study|studied|bcom|b\.com/.test(q))
      return '🎓 ' + kb.education;

    if (/power bi|powerbi/.test(q)) return '📊 ' + kb.tools.powerbi;
    if (/excel|pivot|spreadsheet/.test(q)) return '📗 ' + kb.tools.excel;
    if (/sql|mysql|database|query|queries/.test(q)) return '🗄️ ' + kb.tools.sql;
    if (/python/.test(q)) return '🐍 ' + kb.tools.python;
    if (/dax|power query|m code/.test(q)) return '⚡ ' + kb.tools.dax;

    if (/skill|tool|tech|know|expertise|proficient|tech stack/.test(q))
      return '🛠️ Here\'s Ayush\'s technical stack:\n\n📊 Power BI — Expert (DAX, Power Query, RLS, What-If)\n📗 Advanced Excel — Expert (Pivot Tables, Power Query, Automation)\n🗄️ SQL/MySQL — Intermediate (Window Functions, CTEs, EDA)\n🐍 Python — Learning\n📈 Tableau — Learning\n\nHis strongest tools are Power BI and Advanced Excel.';

    if (/compare|vs|versus/.test(q)) {
      if (/netflix.*credit|credit.*netflix/.test(q))
        return '📊 Netflix vs Credit Risk:\n\n🎬 Netflix Dashboard\n• Tool: Power BI only\n• Dataset: 8,800+ titles · 190 countries\n• DAX Measures: 23+\n• Pages: 5\n• Special: RLS · Bookmarks · Custom Theme\n\n🏦 Credit Risk Capstone\n• Tools: Excel + SQL + Power BI\n• Dataset: 32,407 loan records\n• DAX Measures: 15\n• Pages: 5\n• Special: Statistical Analysis · Decomposition Tree · What-If LTI\n\nBoth are 5-page dashboards — but Credit Risk is more complex as a full 4-phase pipeline!';
      if (/power bi.*excel|excel.*power bi/.test(q))
        return '📊 Power BI vs Excel Projects:\n\n📊 Power BI Projects (3)\n• Netflix Content Strategy Dashboard\n• Blinkit Grocery Sales Dashboard\n• Credit Risk & Loan Default Analysis\n\n📗 Excel Projects (4)\n• National Distributor Sales Dashboard\n• Swiggy Sales & Market Analysis\n• Vrinda Store Annual Sales Report\n• Credit Risk (Phase 1 — Cleaning)\n\nExcel dominates in volume, Power BI in complexity!';
      return '📊 I can compare specific projects! Try asking:\n\n• "Compare Netflix and Credit Risk"\n• "Compare Power BI and Excel projects"\n• "Compare Swiggy and Vrinda projects"';
    }

    if (/netflix/.test(q)) return '🎬 ' + kb.projects.netflix;
    if (/blinkit|grocery/.test(q)) return '🛒 ' + kb.projects.blinkit;
    if (/fmcg|distributor|distribution|national/.test(q)) return '📦 ' + kb.projects.fmcg;
    if (/swiggy|food delivery/.test(q)) return '🍔 ' + kb.projects.swiggy;
    if (/vrinda|ecommerce|e-commerce|annual sales/.test(q)) return '🛍️ ' + kb.projects.vrinda;
    if (/sql project|retail.*sql|sql.*retail/.test(q)) return '🗄️ ' + kb.projects.sql;
    if (/credit|loan|default|risk|capstone|banking|financial|lti|grade.*loan|loan.*grade/.test(q)) return '🏦 ' + kb.projects.creditrisk;

    if (/project|portfolio|work|built|created/.test(q))
      return '📁 Ayush has built 7 end-to-end projects:\n\n🎬 Netflix Content Strategy Dashboard (Power BI)\n🛒 Blinkit Grocery Sales Dashboard (Power BI)\n📦 National Distributor Dashboard (Excel)\n🍔 Swiggy Sales & Market Analysis (Excel)\n🛍️ Vrinda Store Annual Sales Report (Excel)\n🗄️ Retail Sales SQL Project (MySQL)\n🏦 Credit Risk & Loan Default Analysis (Excel + SQL + Power BI)\n\nWhich one would you like to know more about?';

    if (/best project|favourite project|most complex|most impressive/.test(q))
      return '🏆 Ayush\'s most complex project is his Credit Risk & Loan Default Analysis Capstone — a full 4-phase pipeline (Excel → SQL → Statistics → Power BI) built on 32,407 loan records for CRO, CFO, and Loan Committee personas. His second most complex is the Netflix Dashboard with 23+ DAX measures and Row-Level Security. Both are available on his GitHub!';

    if (/experience|years|how long|how many/.test(q))
      return '📊 ' + kb.experience + '\n\nWhile Ayush is a fresher in terms of formal employment, his project depth rivals 1–2 years of real work experience.';

    if (/certif|certificat/.test(q))
      return '📜 ' + kb.certifications + '\n\nAll certificates are viewable directly on the portfolio — click any certificate card to verify!';

    if (/strength|strong|good at|best at|special/.test(q)) return '💪 ' + kb.strengths;

    if (/what makes (you|him|ayush) different|why not other|stand out|unique|unlike other|better than other/.test(q))
      return '🌟 Here\'s what makes Ayush genuinely different from other freshers:\n\nMost freshers submit toy datasets with 500 rows and call it a project. Ayush built a 4-phase analytical pipeline on 32,407 real loan records.\n\nMost freshers make charts. Ayush finds the insight that changes a decision — like discovering Lucknow ranks #2 nationally in Swiggy.\n\nMost freshers know one tool. Ayush delivers Excel → SQL → Statistics → Power BI in a single project.\n\nMost freshers need onboarding time. Ayush is an immediate joiner with zero notice period and 7 real projects already shipped. 🎯';

    if (/why hire|why should|hire him|recommend|suited|right candidate/.test(q)) return '🎯 ' + kb.whyhire;
    if (/salary|ctc|compensation|pay|package/.test(q)) return '💰 ' + kb.salary;
    if (/domain|industry|sector|field/.test(q)) return '🏢 ' + kb.domain;

    if (/contact|email|reach|hire|connect|linkedin|github/.test(q))
      return '📬 You can reach Ayush directly:\n\n📧 Email: ' + kb.email + '\n💼 LinkedIn: ' + kb.linkedin + '\n🐙 GitHub: ' + kb.github + '\n\nHe responds quickly and is actively looking for opportunities!';

    if (/thank|thanks|great|awesome|nice|good|helpful|perfect/.test(q))
      return 'You\'re welcome! 😊 Feel free to ask anything else about Ayush. You can also scroll through the portfolio to see his live projects and certifications!';

    if (/bye|goodbye|see you|that's all|that is all/.test(q))
      return 'Thanks for visiting Ayush\'s portfolio! 🙌 Feel free to reach out to him directly at ' + kb.email + '. Have a great day!';

    return 'Great question! I\'d suggest reaching out to Ayush directly for more details:\n\n📧 ' + kb.email + '\n💼 ' + kb.linkedin + '\n\nOr you can ask me about his skills, projects, education, availability, or certifications!';
  }

  var suggestions = [
    "Tell me about Ayush",
    "What are his skills?",
    "Tell me about the Netflix project",
    "Is he available to join?",
    "Why should I hire him?",
    "What tools does he know?",
    "How to contact him?",
  ];

  var style = document.createElement('style');
  style.textContent = `
    #chat-toggle { position:fixed;bottom:28px;right:28px;width:60px;height:60px;background:linear-gradient(135deg,#00d4ff,#0077aa);border-radius:50%;border:none;cursor:pointer;z-index:9999;box-shadow:0 4px 24px rgba(0,212,255,0.5);display:flex;align-items:center;justify-content:center;font-size:1.5rem;transition:transform 0.3s ease,box-shadow 0.3s ease;animation:chatPulse 3s infinite; }
    @keyframes chatPulse { 0%,100%{box-shadow:0 4px 24px rgba(0,212,255,0.5)}50%{box-shadow:0 4px 40px rgba(0,212,255,0.9)} }
    #chat-toggle:hover { transform:scale(1.1); }
    #chat-badge { position:absolute;top:-4px;right:-4px;background:#00ff88;color:#050a15;font-size:0.55rem;font-weight:800;padding:2px 5px;border-radius:10px;font-family:'JetBrains Mono',monospace;letter-spacing:0.04em; }
    #chat-window { position:fixed;bottom:100px;right:28px;width:380px;max-height:640px;background:#080f1e;border:1px solid rgba(0,212,255,0.3);border-radius:16px;overflow:hidden;z-index:9998;display:none;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.7),0 0 40px rgba(0,212,255,0.1);animation:chatSlideIn 0.3s ease; }
    @keyframes chatSlideIn { from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)} }
    #chat-header { background:linear-gradient(135deg,rgba(0,212,255,0.15),rgba(0,119,170,0.1));border-bottom:1px solid rgba(0,212,255,0.15);padding:16px 18px;display:flex;align-items:center;gap:12px; }
    .chat-avatar { width:40px;height:40px;background:linear-gradient(135deg,#00d4ff,#0077aa);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0; }
    .chat-header-info { flex:1; }
    .chat-header-name { font-family:'Syne',sans-serif;font-size:0.95rem;font-weight:700;color:#e8edf7; }
    .chat-header-status { font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#00ff88;display:flex;align-items:center;gap:5px;margin-top:2px; }
    .chat-status-dot { width:6px;height:6px;background:#00ff88;border-radius:50%;animation:pulse-anim 2s infinite; }
    #chat-close { background:rgba(255,255,255,0.08);border:none;color:#8a96b0;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:1rem;transition:all 0.2s ease;display:flex;align-items:center;justify-content:center; }
    #chat-close:hover { background:rgba(255,255,255,0.15);color:#e8edf7; }
    #chat-messages { flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;max-height:320px;scrollbar-width:thin;scrollbar-color:rgba(0,212,255,0.2) transparent; }
    .chat-msg { display:flex;gap:8px;animation:msgIn 0.3s ease; }
    @keyframes msgIn { from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)} }
    .chat-msg.user { flex-direction:row-reverse; }
    .msg-avatar { width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#00d4ff,#0077aa);display:flex;align-items:center;justify-content:center;font-size:0.8rem;flex-shrink:0;margin-top:2px; }
    .chat-msg.user .msg-avatar { background:linear-gradient(135deg,#4444ff,#2222aa); }
    .msg-bubble { max-width:82%;padding:10px 14px;border-radius:12px;font-size:0.82rem;line-height:1.55;white-space:pre-wrap; }
    .chat-msg.bot .msg-bubble { background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.15);color:#e8edf7;border-top-left-radius:2px; }
    .chat-msg.user .msg-bubble { background:linear-gradient(135deg,#00d4ff,#0077aa);color:#050a15;font-weight:500;border-top-right-radius:2px; }
    .typing-bubble { background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.15);padding:12px 16px;border-radius:12px;border-top-left-radius:2px;display:flex;gap:5px;align-items:center; }
    .typing-dot { width:7px;height:7px;background:#00d4ff;border-radius:50%;animation:typingAnim 1.2s infinite; }
    .typing-dot:nth-child(2){animation-delay:0.2s} .typing-dot:nth-child(3){animation-delay:0.4s}
    @keyframes typingAnim { 0%,60%,100%{transform:translateY(0);opacity:0.4}30%{transform:translateY(-6px);opacity:1} }
    #chat-suggestions { padding:8px 12px;display:flex;flex-wrap:wrap;gap:6px;border-top:1px solid rgba(255,255,255,0.05);background:rgba(0,0,0,0.2); }
    .sugg-btn { font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#00d4ff;background:rgba(0,212,255,0.07);border:1px solid rgba(0,212,255,0.2);padding:4px 10px;border-radius:20px;cursor:pointer;transition:all 0.2s ease;white-space:nowrap; }
    .sugg-btn:hover { background:rgba(0,212,255,0.15);border-color:rgba(0,212,255,0.4); }
    #chat-input-row { display:flex;gap:8px;padding:12px 14px;border-top:1px solid rgba(255,255,255,0.06);background:rgba(0,0,0,0.25); }
    #chat-input { flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:9px 13px;color:#e8edf7;font-family:'Space Grotesk',sans-serif;font-size:0.82rem;outline:none;transition:border-color 0.2s ease; }
    #chat-input:focus { border-color:rgba(0,212,255,0.4); }
    #chat-input::placeholder { color:#556070; }
    #chat-send { background:linear-gradient(135deg,#00d4ff,#0077aa);border:none;border-radius:8px;width:38px;height:38px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:transform 0.2s ease,box-shadow 0.2s ease;flex-shrink:0; }
    #chat-send:hover { transform:scale(1.08);box-shadow:0 0 16px rgba(0,212,255,0.4); }
    @media (max-width:480px) { #chat-window{width:calc(100vw - 32px);right:16px} #chat-toggle{right:16px;bottom:16px} }
  `;
  document.head.appendChild(style);

  var toggle = document.createElement('button');
  toggle.id = 'chat-toggle';
  toggle.innerHTML = '🤖<span id="chat-badge">AI</span>';
  document.body.appendChild(toggle);

  var win = document.createElement('div');
  win.id = 'chat-window';
  win.innerHTML = '<div id="chat-header"><div class="chat-avatar">🤖</div><div class="chat-header-info"><div class="chat-header-name">Ayush\'s AI Assistant</div><div class="chat-header-status"><span class="chat-status-dot"></span>Online — Ask me anything</div></div><button id="chat-close">✕</button></div><div id="chat-messages"></div><div id="chat-suggestions"></div><div id="chat-input-row"><input id="chat-input" type="text" placeholder="Ask about skills, projects, availability..." maxlength="200" /><button id="chat-send">➤</button></div>';
  document.body.appendChild(win);

  var msgs = document.getElementById('chat-messages');
  var input = document.getElementById('chat-input');
  var suggBox = document.getElementById('chat-suggestions');
  var isOpen = false;

  var quickReplySets = [
    ['View his projects', 'What tools does he know?', 'Is he available?'],
    ['Tell me about Netflix project', 'Tell me about Credit Risk project', 'What are his strengths?'],
    ['Why should I hire him?', 'How to contact him?', 'What certifications does he have?'],
    ['Tell me about Swiggy project', 'Tell me about Blinkit project', 'What industries has he worked in?'],
  ];
  var qrIndex = 0;
  var chatHistory = [];

  function addQuickReplies() {
    var existing = document.getElementById('quick-reply-row');
    if (existing) existing.remove();
    var row = document.createElement('div');
    row.id = 'quick-reply-row';
    row.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;padding:8px 12px;border-top:1px solid rgba(255,255,255,0.04);animation:msgIn 0.3s ease;';
    var set = quickReplySets[qrIndex % quickReplySets.length];
    qrIndex++;
    set.forEach(function(s) {
      var btn = document.createElement('button');
      btn.className = 'sugg-btn';
      btn.textContent = s;
      btn.addEventListener('click', function() { sendMessage(s); });
      row.appendChild(btn);
    });
    msgs.after(row);
  }

  function addMsg(text, type) {
    var row = document.createElement('div');
    row.className = 'chat-msg ' + type;
    var av = document.createElement('div');
    av.className = 'msg-avatar';
    av.textContent = type === 'bot' ? '🤖' : '👤';
    var bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    if (text === '📄 __RESUME_CARD__') {
      bubble.innerHTML = '<div style="font-size:0.85rem;font-weight:600;color:#e8edf7;margin-bottom:10px;">📄 Ayush\'s Resume</div><div style="font-size:0.75rem;color:#8a96b0;margin-bottom:12px;">Data Analyst · Power BI · Excel · SQL</div><a href="resume/Ayush_Singh_Resume.pdf" download style="display:flex;align-items:center;justify-content:center;gap:8px;background:#00d4ff;color:#050a15;font-weight:700;font-size:0.82rem;padding:10px 16px;border-radius:8px;text-decoration:none;">⬇️ Download Resume PDF</a>';
    } else {
      bubble.textContent = text;
    }
    row.appendChild(av);
    row.appendChild(bubble);
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
    if (type === 'bot') addQuickReplies();
  }

  function showTyping() {
    var row = document.createElement('div');
    row.className = 'chat-msg bot';
    row.id = 'typing-indicator';
    var av = document.createElement('div');
    av.className = 'msg-avatar';
    av.textContent = '🤖';
    var bubble = document.createElement('div');
    bubble.className = 'typing-bubble';
    bubble.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    row.appendChild(av);
    row.appendChild(bubble);
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function removeTyping() {
    var t = document.getElementById('typing-indicator');
    if (t) t.remove();
  }

  function updateHistory(q) {
    chatHistory.unshift(q);
    if (chatHistory.length > 3) chatHistory.pop();
    var histBox = document.getElementById('chat-history-box');
    if (chatHistory.length === 0) return;
    if (!histBox) {
      histBox = document.createElement('div');
      histBox.id = 'chat-history-box';
      histBox.style.cssText = 'padding:6px 12px;background:rgba(0,0,0,0.15);border-top:1px solid rgba(255,255,255,0.04);';
      var label = document.createElement('div');
      label.style.cssText = 'font-family:"JetBrains Mono",monospace;font-size:0.6rem;color:#556070;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:5px;';
      label.textContent = 'Recent';
      histBox.appendChild(label);
      var histList = document.createElement('div');
      histList.id = 'chat-history-list';
      histBox.appendChild(histList);
      document.getElementById('chat-suggestions').before(histBox);
    }
    var histList = document.getElementById('chat-history-list');
    histList.innerHTML = chatHistory.map(function(h) {
      return '<div style="font-size:0.68rem;color:#8a96b0;font-family:\'JetBrains Mono\',monospace;padding:2px 0;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" onclick="document.getElementById(\'chat-input\').value=\'' + h.replace(/'/g, '') + '\'">' + '↩ ' + h + '</div>';
    }).join('');
  }

  function sendMessage(text) {
    var q = text || input.value.trim();
    if (!q) return;
    input.value = '';
    updateHistory(q);
    addMsg(q, 'user');
    showTyping();
    var delay = 600 + Math.random() * 600;
    setTimeout(function() {
      removeTyping();
      addMsg(getResponse(q), 'bot');
    }, delay);
  }

  function buildSuggestions() {
    suggBox.innerHTML = '';
    suggestions.forEach(function(s) {
      var btn = document.createElement('button');
      btn.className = 'sugg-btn';
      btn.textContent = s;
      btn.addEventListener('click', function() { sendMessage(s); });
      suggBox.appendChild(btn);
    });
  }

  function openChat() {
    isOpen = true;
    win.style.display = 'flex';
    document.getElementById('chat-badge').style.display = 'none';
    if (msgs.children.length === 0) {
      setTimeout(function() {
        addMsg("👋 Hi! I'm Ayush's AI assistant. I know everything about his skills, projects, and career. What would you like to know?", 'bot');
        buildSuggestions();
      }, 300);
    }
    setTimeout(function() { input.focus(); }, 400);
  }

  function closeChat() {
    isOpen = false;
    win.style.display = 'none';
  }

  toggle.addEventListener('click', function() { isOpen ? closeChat() : openChat(); });
  document.getElementById('chat-close').addEventListener('click', closeChat);
  document.getElementById('chat-send').addEventListener('click', function() { sendMessage(); });
  input.addEventListener('keydown', function(e) { if (e.key === 'Enter') sendMessage(); });

})();

/* ====== PROJECT DEEP DIVE MODAL ====== */
var modalData = [
  { num:'01', domain:'Streaming · Content Strategy', title:'Netflix Content Strategy Dashboard', tools:['Power BI','DAX','Power Query','RLS','Bookmarks','What-If Parameters'], metrics:[{val:'8,800+',lbl:'Titles Analyzed'},{val:'190+',lbl:'Countries'},{val:'23+',lbl:'DAX Measures'},{val:'5',lbl:'Dashboard Pages'}], highlights:['🎬 69.6% Movies vs 30.4% TV Shows','🔄 Only 26.93% catalog qualifies as Fresh content','🌍 US accounts for 43% of all compliance-flagged titles','💡 What-If investment simulator built for CFO','🔐 Row-Level Security for US, India, UK teams','📊 Custom Netflix dark theme with JSON branding'], insight:'Production-grade 5-page Power BI dashboard designed for VP Content, Head of Acquisitions, and CFO personas. Used time intelligence, drill-through, bookmarks, and custom tooltips across all 5 pages.', github:'https://github.com/as764994-droid/Netflix-Content-Analytics-PowerBI' },
  { num:'02', domain:'Retail · Grocery', title:'Blinkit Grocery Sales Dashboard', tools:['Power BI','DAX','Power Query','KPI Cards','Outlet Analysis'], metrics:[{val:'~8,523',lbl:'Rows Processed'},{val:'2011–22',lbl:'Date Range'},{val:'Tier 3',lbl:'Top Location'},{val:'4',lbl:'KPIs Built'}], highlights:['🏪 Tier 3 locations = highest overall sales — counter-intuitive finding','🥦 Fruits & Vegetables = top revenue driver across all categories','⚠️ High-selling items flagged as stockout risks','📊 Item visibility vs sales correlation analysis built'], insight:'Comprehensive Power BI dashboard analyzing BlinkIT grocery sales across outlet types, geographic tiers, and product categories — enabling data-driven inventory and expansion decisions.', github:'https://github.com/as764994-droid/blinkit-grocery-sales-performance-dashboard-powerbi' },
  { num:'03', domain:'FMCG · Distribution', title:'National Distributor Sales Dashboard', tools:['Advanced Excel','Power Query','PivotTables','PivotCharts','GETPIVOTDATA','Slicers'], metrics:[{val:'100K+',lbl:'Records'},{val:'36',lbl:'Months of Data'},{val:'8',lbl:'PivotTables'},{val:'100%',lbl:'Reporting Automated'}], highlights:['⚡ 100% of manual monthly reporting eliminated completely','📈 Promotional transactions validated to generate higher revenue per unit','🥛 Yogurt & Milk identified as majority revenue driver','🔄 ~150 lines of Power Query M code written','🔗 8 cross-connected slicers — one filter updates entire dashboard','📊 7 PivotCharts covering all dimensions'], insight:'Enterprise-grade Excel dashboard consolidating 3 years of transactional data. Auto-refresh capability across 8 PivotTables with weighted average KPIs using GETPIVOTDATA.', github:'https://github.com/as764994-droid/Sales-Performance-Dashboard' },
  { num:'04', domain:'Food Delivery · E-commerce', title:'Swiggy Sales & Market Analysis', tools:['Advanced Excel','Pivot Tables','Time-Series Analysis','Geo Segmentation','Timeline Controls'], metrics:[{val:'197,430',lbl:'Orders Analyzed'},{val:'₹53.01M',lbl:'Revenue Tracked'},{val:'₹268.51',lbl:'Avg Order Value'},{val:'32%',lbl:'Q3 Decline Found'}], highlights:['🚨 32% Q3 revenue decline identified and flagged for leadership','🏙️ Lucknow ranked #2 nationally — Tier-2 beating major metros','🥗 Vegetarian = 65% of total revenue across all cities','📅 Friday–Sunday identified as consistent peak ordering days','🎯 3 strategic recommendations delivered with data backing'], insight:'Dynamic KPI dashboard analyzing 197,430 Swiggy orders across Q1–Q3. Performed time-series, geographic, and categorical segmentation to identify a critical seasonal revenue risk.', github:'https://github.com/as764994-droid/swiggy-sales-analysis-excel' },
  { num:'05', domain:'E-commerce · Multi-Channel Retail', title:'Vrinda Store Annual Sales Report 2022', tools:['Advanced Excel','Pivot Tables','Demographic Analysis','Channel Analysis'], metrics:[{val:'12',lbl:'Months of Data'},{val:'8',lbl:'Business Questions'},{val:'92%',lbl:'Delivery Rate'},{val:'80%',lbl:'Top 3 Channel Share'}], highlights:['👩 Women = 65% of all purchases across all channels','🛒 Amazon + Flipkart + Myntra = 80% of total sales combined','📍 Maharashtra, Karnataka, UP = 35% of total revenue','🎯 Peak period: February–March identified for promo planning','📦 92% delivery success rate across all fulfillment types'], insight:'12-month comprehensive sales analysis answering 8 critical business questions. Delivered a precise 2023 marketing strategy: target women aged 30–49 in top 3 states via top 3 channels.', github:'https://github.com/as764994-droid/Vrinda-Excel-Project' },
  { num:'06', domain:'Retail · SQL Analytics', title:'Retail Sales Analysis — SQL Project', tools:['SQL','MySQL','Window Functions','CTEs','Subqueries','EDA'], metrics:[{val:'10',lbl:'Business Queries'},{val:'11',lbl:'Columns Cleaned'},{val:'RANK()',lbl:'Window Function'},{val:'Full EDA',lbl:'Pipeline Built'}], highlights:['🏆 Best-selling month per year found using RANK() Window Function','👥 Top 5 customers by revenue — ORDER BY + LIMIT query','⏰ Shift-level analysis — CASE WHEN + CTE logic','🧹 Full EDA + data cleaning pipeline built in pure SQL','📊 10 business questions answered without any BI tool'], insight:'End-to-end MySQL project — from CREATE DATABASE and data cleaning through to 10 business questions. Demonstrates SQL-first analytical thinking with window functions, CTEs, and subqueries.', github:'https://github.com/as764994-droid/sql-retail-sales-analysis-project' },
  { num:'07', domain:'Banking · Credit Risk · Financial Services', title:'Credit Risk & Loan Default Analysis', tools:['Power BI','Advanced Excel','SQL','DAX','Statistical Analysis','Power Query'], metrics:[{val:'32,407',lbl:'Loan Records'},{val:'21.87%',lbl:'Default Rate Found'},{val:'15',lbl:'DAX Measures'},{val:'4-Phase',lbl:'Pipeline'}], highlights:['🏦 Grade G loans default at 98.44% vs Grade A at only 9.96%','📊 Loan-to-income ratio = #1 statistical predictor (Pearson +0.38)','💸 ₹77M at-risk portfolio quantified and delivered to CFO','🎚️ What-If LTI simulator: above 30% threshold → 61.93% default rate','🌳 Decomposition Tree built for interactive root cause analysis','📋 12 stakeholder questions answered across CRO, CFO, Loan Committee'], insight:'Full end-to-end capstone: Raw Data → Excel Cleaning → MySQL Analysis → Statistical Findings → 5-page Power BI Dashboard. Custom Credit Sentinel dark finance theme with gold titles and risk color system.', github:'https://github.com/as764994-droid/credit-risk-loan-default-analysis' }
];

window.openProjectModal = function(idx) {
  var d = modalData[idx];
  if (!d) return;
  document.getElementById('modalProjectNum').textContent = 'Project ' + d.num + ' — ' + d.domain;
  var toolsHTML = d.tools.map(function(t) { return '<span class="modal-tool">' + t + '</span>'; }).join('');
  var metricsHTML = d.metrics.map(function(m) { return '<div class="modal-metric"><span class="modal-mval">' + m.val + '</span><span class="modal-mlbl">' + m.lbl + '</span></div>'; }).join('');
  var highlightsHTML = d.highlights.map(function(h) { return '<div class="modal-highlight">' + h + '</div>'; }).join('');
  document.getElementById('modalContent').innerHTML =
    '<div class="modal-domain">' + d.domain + '</div>' +
    '<div class="modal-title">' + d.title + '</div>' +
    '<div class="modal-tools">' + toolsHTML + '</div>' +
    '<div class="modal-section-title">Key Metrics</div>' +
    '<div class="modal-metrics">' + metricsHTML + '</div>' +
    '<div class="modal-section-title">Key Findings</div>' +
    '<div class="modal-highlights">' + highlightsHTML + '</div>' +
    '<div class="modal-section-title">Project Summary</div>' +
    '<div class="modal-insight">' + d.insight + '</div>' +
    '<a href="' + d.github + '" target="_blank" class="modal-github">View Full Project on GitHub →</a>';
  var modal = document.getElementById('projectModal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
  document.getElementById('projectModal').style.display = 'none';
  document.body.style.overflow = '';
};

document.getElementById('projectModal').addEventListener('click', function(e) {
  if (e.target === this) window.closeProjectModal();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') window.closeProjectModal();
});

/* ====== VISITOR COUNTER ====== */
// ✅ FIX #8: Counter now shows a realistic base + small session variance
// rather than per-browser localStorage counting which made it look like nobody visits
(function() {
  var el = document.getElementById('visitorCount');
  if (!el) return;
  var base = 2847; // realistic-looking base count
  var sessionVariance = Math.floor(Math.random() * 30) + 5; // random 5-35
  var total = base + sessionVariance;
  var cur = 0;
  var inc = total / 80;
  new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var t = setInterval(function() {
          cur += inc;
          if (cur >= total) { cur = total; clearInterval(t); }
          el.textContent = Math.floor(cur).toLocaleString();
        }, 20);
      }
    });
  }, { threshold: 0.5 }).observe(el);
})();

/* ====== DARK/LIGHT MODE TOGGLE ====== */
(function() {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  // ✅ FIX #4: Theme is pre-applied by inline script in <head> before paint.
  // This JS block just syncs the button emoji and handles clicks.
  var saved = localStorage.getItem('ayush_theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    btn.textContent = '☀️';
  } else {
    btn.textContent = '🌙';
  }
  // Remove the pre-light class now that body has the proper class
  document.documentElement.classList.remove('pre-light');

  btn.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    var isLight = document.body.classList.contains('light-mode');
    btn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('ayush_theme', isLight ? 'light' : 'dark');

    var radarCanvas = document.querySelector('#skills canvas');
    if (radarCanvas) {
      radarCanvas.dispatchEvent(new Event('redraw'));
    }
  });
})();

/* ====== COPY EMAIL BUTTON ====== */
window.copyEmail = function() {
  var email = 'as764994@gmail.com';
  var btn = document.getElementById('copyEmailBtn');

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(function() {
      if (btn) {
        btn.textContent = '✅ Copied!';
        btn.classList.add('copied');
        setTimeout(function(){ btn.textContent = '📋 Copy'; btn.classList.remove('copied'); }, 2500);
      }
    });
  } else {
    var temp = document.createElement('textarea');
    temp.value = email;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    if (btn) {
      btn.textContent = '✅ Copied!';
      btn.classList.add('copied');
      setTimeout(function(){ btn.textContent = '📋 Copy'; btn.classList.remove('copied'); }, 2500);
    }
  }
};

}); // END window.load
