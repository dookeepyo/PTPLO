const cursor = document.getElementById('cursor');
  window.addEventListener('mousemove', e => { cursor.style.left = e.clientX+'px'; cursor.style.top = e.clientY+'px'; });
  document.querySelectorAll('a, button, .g-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  const heroGrid = document.querySelector('.hero-bg-grid');
  if(heroGrid && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const gridSize = 44;
    const lightCount = 12;

    for(let i = 0; i < lightCount; i++){
      const light = document.createElement('span');
      const horizontal = i < 7;
      light.className = `grid-light ${horizontal ? 'horizontal' : 'vertical'}`;
      light.style.setProperty('--duration', `${8 + Math.random() * 8}s`);
      light.style.setProperty('--delay', `${-Math.random() * 14}s`);

      if(horizontal){
        const maxRows = Math.max(1, Math.floor(heroGrid.offsetHeight / gridSize));
        light.style.top = `${Math.floor(Math.random() * maxRows) * gridSize}px`;
      }else{
        const maxColumns = Math.max(1, Math.floor(heroGrid.offsetWidth / gridSize));
        light.style.left = `${Math.floor(Math.random() * maxColumns) * gridSize}px`;
      }

      heroGrid.appendChild(light);
    }
  }

  const codeWindow = document.getElementById('codeWindow');
  if(codeWindow){
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let tiltFrame = null;
    let isPointerInside = false;

    function animateCodeTilt(){
      currentRotateX += (targetRotateX - currentRotateX) * 0.12;
      currentRotateY += (targetRotateY - currentRotateY) * 0.12;
      codeWindow.style.setProperty('transform', `perspective(650px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) scale(1.015)`, 'important');

      const isMoving = Math.abs(targetRotateX - currentRotateX) > 0.01 || Math.abs(targetRotateY - currentRotateY) > 0.01;
      if(isPointerInside || isMoving){
        tiltFrame = requestAnimationFrame(animateCodeTilt);
      }else{
        currentRotateX = 0;
        currentRotateY = 0;
        codeWindow.style.setProperty('transform', 'perspective(650px) rotateX(0deg) rotateY(0deg) scale(1)', 'important');
        codeWindow.classList.remove('is-tilting');
        tiltFrame = null;
      }
    }

    codeWindow.addEventListener('mousemove', e => {
      const r = codeWindow.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      isPointerInside = true;
      targetRotateY = px * 18;
      targetRotateX = -py * 18;
      codeWindow.classList.add('is-tilting');
      codeWindow.style.setProperty('--code-glare-x', `${(px + 0.5) * 100}%`);
      codeWindow.style.setProperty('--code-glare-y', `${(py + 0.5) * 100}%`);
      if(!tiltFrame) tiltFrame = requestAnimationFrame(animateCodeTilt);
    });
    codeWindow.addEventListener('mouseleave', () => {
      isPointerInside = false;
      targetRotateX = 0;
      targetRotateY = 0;
      codeWindow.style.setProperty('--code-glare-x', '50%');
      codeWindow.style.setProperty('--code-glare-y', '50%');
      if(!tiltFrame) tiltFrame = requestAnimationFrame(animateCodeTilt);
    });
  }

  const progress = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    progress.style.width = (h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
  });

  let pageAnimationsStarted = false;
  const heroTitle = document.getElementById('heroTitle');

  // Prepare the hidden letter elements while the intro is still covering them.
  // Rebuilding the title after the intro leaves causes a visible flash.
  if(heroTitle){
    heroTitle.innerHTML = heroTitle.innerHTML.split(/(<[^>]+>)/).map(chunk => {
      if(chunk.startsWith('<')) return chunk;
      return chunk.split('').map(ch => ch===' ' ? ' ' : `<span class="word"><span>${ch}</span></span>`).join('');
    }).join('');
  }

  function startPageAnimations(){
    if(pageAnimationsStarted) return;
    pageAnimationsStarted = true;
    if(heroTitle){
      requestAnimationFrame(() => setTimeout(() => heroTitle.classList.add('run'), 80));
    }

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

    const navLinks = document.querySelectorAll('[data-nav]');
    const sections = ['profile','skills','work','contact'].map(id => document.getElementById(id));
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const link = document.querySelector(`[data-nav][href="#${entry.target.id}"]`);
        if(!link) return;
        if(entry.isIntersecting){ navLinks.forEach(l=>l.classList.remove('active')); link.classList.add('active'); }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(s => s && navObserver.observe(s));

    const timelineFill = document.getElementById('timelineFill');
    const tItems = document.querySelectorAll('.t-item');
    const tObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('in-view'); });
      let filled = 0; tItems.forEach(t => { if(t.classList.contains('in-view')) filled++; });
      timelineFill.style.height = (filled/tItems.length*100)+'%';
    }, { threshold: 0.4 });
    tItems.forEach(t => tObserver.observe(t));
  }

  // ---- intro loader sequence ----
  (function(){
    const intro = document.getElementById('intro');
    const typed1 = document.getElementById('typed1');
    const cursor1 = document.getElementById('cursor1');
    const line2 = document.getElementById('introLine2');
    const typed2 = document.getElementById('typed2');
    const cursor2 = document.getElementById('cursor2');
    const barFill = document.getElementById('introBarFill');
    const percentEl = document.getElementById('introPercent');
    let done = false;

    function typeText(el, text, speed, cb){
      let i = 0;
      const t = setInterval(() => {
        el.textContent += text[i];
        i++;
        if(i >= text.length){ clearInterval(t); if(cb) cb(); }
      }, speed);
    }

    function runProgress(){
      let p = 0;
      const bar = setInterval(() => {
        p += Math.random() * 13 + 7;
        if(p >= 100) p = 100;
        barFill.style.width = p + '%';
        percentEl.textContent = Math.floor(p) + '%';
        if(p >= 100){
          clearInterval(bar);
          setTimeout(finishIntro, 400);
        }
      }, 90);
    }

    function finishIntro(){
      if(done) return;
      done = true;

      document.body.classList.remove('intro-lock');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => intro.classList.add('leave'));
      });

      let called = false;
      const proceed = event => {
        if(called || (event && event.target !== intro)) return;
        called = true;
        intro.style.display = 'none';
        startPageAnimations();
      };
      intro.addEventListener('transitionend', proceed);
      setTimeout(proceed, 1000);
    }

    function beginTyping(){
      cursor1.style.display = 'inline-block';
      typeText(typed1, 'whoami', 60, () => {
        cursor1.style.display = 'none';
        setTimeout(() => {
          line2.style.opacity = 1;
          cursor2.style.display = 'inline-block';
          typeText(typed2, 'build --portfolio --interactions', 32, () => {
            cursor2.style.display = 'none';
            setTimeout(runProgress, 200);
          });
        }, 300);
      });
    }

    // safety net in case something stalls
    setTimeout(finishIntro, 6500);
    beginTyping();
  })();

  const gItems = document.querySelectorAll('.g-item');
  const gallery = document.getElementById('gallery');
  const moreProjectsBtn = document.getElementById('moreProjectsBtn');

  gItems.forEach((item, index) => {
    if(index >= 6) item.classList.add('project-extra');
  });

  moreProjectsBtn.addEventListener('click', () => {
    const isExpanded = gallery.classList.toggle('show-all');
    moreProjectsBtn.setAttribute('aria-expanded', String(isExpanded));
    moreProjectsBtn.textContent = isExpanded ? '프로젝트 접기 ↑' : '더 많은 프로젝트 보기 →';
  });

  const lightbox = document.getElementById('lightbox');
  const lbThumb = document.getElementById('lbThumb');
  const lbMedia = document.getElementById('lbMedia');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbCounter = document.getElementById('lbCounter');
  const lbTitle = document.getElementById('lbTitle');
  const lbDesc = document.getElementById('lbDesc');
  const lbTags = document.getElementById('lbTags');
  const lbPeriod = document.getElementById('lbPeriod');
  const lbContribution = document.getElementById('lbContribution');
  const lbRole = document.getElementById('lbRole');
  const lbInfo = document.getElementById('lbInfo');
  const lbLink = document.getElementById('lbLink');
  let lbImages = [];
  let lbImageIndex = 0;

  function renderLightboxImage(){
    if(!lbImages.length) return;
    lbMedia.innerHTML = `<img src="${lbImages[lbImageIndex]}" alt="${lbTitle.textContent} 작업 화면 ${lbImageIndex + 1}">`;
    lbCounter.textContent = `${lbImageIndex + 1} / ${lbImages.length}`;
  }

  function moveLightboxImage(direction){
    if(lbImages.length < 2) return;
    lbImageIndex = (lbImageIndex + direction + lbImages.length) % lbImages.length;
    renderLightboxImage();
  }

  lbPrev.addEventListener('click', () => moveLightboxImage(-1));
  lbNext.addEventListener('click', () => moveLightboxImage(1));

  gItems.forEach(item => {
    item.addEventListener('click', () => {
      lbThumb.style.background = item.querySelector('.g-thumb').style.background;
      const media = item.querySelector('.g-thumb svg, .g-thumb img');
      lbTitle.textContent = item.dataset.title;
      lbImages = item.dataset.images ? item.dataset.images.split(',') : [];
      lbImageIndex = 0;
      if(lbImages.length){
        renderLightboxImage();
      }else{
        lbMedia.innerHTML = media ? media.outerHTML : '';
      }
      const hasGallery = lbImages.length > 1;
      lbPrev.hidden = !hasGallery;
      lbNext.hidden = !hasGallery;
      lbCounter.hidden = !hasGallery;
      lbDesc.textContent = item.dataset.desc;
      lbTags.innerHTML = item.dataset.tags.split(',').map(t => `<span class="tag">${t}</span>`).join('');
      const details = [
        [lbPeriod, document.getElementById('lbPeriodItem'), item.dataset.period],
        [lbContribution, document.getElementById('lbContributionItem'), item.dataset.contribution],
        [lbRole, document.getElementById('lbRoleItem'), item.dataset.role]
      ];
      details.forEach(([valueEl, itemEl, value]) => {
        valueEl.textContent = value || '';
        itemEl.hidden = !value;
      });
      const detailCount = details.filter(([, , value]) => value).length;
      lbInfo.hidden = detailCount === 0;
      lbInfo.dataset.count = detailCount;
      const projectUrl = item.dataset.url;
      lbLink.href = projectUrl || '#';
      lbLink.classList.toggle('is-disabled', !projectUrl);
      lbLink.setAttribute('aria-disabled', String(!projectUrl));
      lbLink.hidden = item.dataset.galleryOnly === 'true';
      lightbox.classList.add('open');
    });
  });
  document.getElementById('lbClose').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', e => { if(e.target===lightbox) lightbox.classList.remove('open'); });
  window.addEventListener('keydown', e => {
    if(e.key === 'Escape') lightbox.classList.remove('open');
    if(lightbox.classList.contains('open') && e.key === 'ArrowLeft') moveLightboxImage(-1);
    if(lightbox.classList.contains('open') && e.key === 'ArrowRight') moveLightboxImage(1);
  });

  const resumeModal = document.getElementById('resumeModal');
  const resumeOpen = document.getElementById('resumeOpen');
  const resumeClose = document.getElementById('resumeClose');
  const resumePrint = document.getElementById('resumePrint');

  function openResume(){
    resumeModal.classList.add('open');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-lock');
    resumeClose.focus();
  }

  function closeResume(){
    resumeModal.classList.remove('open');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-lock');
    resumeOpen.focus();
  }

  resumeOpen.addEventListener('click', openResume);
  resumeClose.addEventListener('click', closeResume);
  resumeModal.addEventListener('click', e => { if(e.target === resumeModal) closeResume(); });
  window.addEventListener('keydown', e => {
    if(e.key === 'Escape' && resumeModal.classList.contains('open')) closeResume();
  });

  resumePrint.addEventListener('click', () => {
    const resumeUrl = new URL('img/resume.png', window.location.href).href;
    const printWindow = window.open('', '_blank');
    if(!printWindow) return;
    printWindow.opener = null;
    printWindow.document.write(`<!DOCTYPE html><html><head><title>두기표 이력서</title><style>@page{margin:0}html,body{margin:0}img{display:block;width:100%;height:auto}</style></head><body><img src="${resumeUrl}" alt="두기표 이력서" onload="window.print()"></body></html>`);
    printWindow.document.close();
  });
