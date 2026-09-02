(() => {
  const root = document.documentElement;
  const body = document.body;
  const navToggle = document.querySelector('.nav__toggle');
  const navPanel = document.querySelector('.nav__panel');
  const themeToggle = document.querySelector('.theme-toggle');
  const themeToggleText = document.querySelector('.theme-toggle__text');
  const typingText = document.getElementById('typingText');
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  const downloadCvBtnBottom = document.getElementById('downloadCvBtnBottom');
  const revealItems = document.querySelectorAll('.reveal');
  const navLinks = document.querySelectorAll('.nav__links a');

  const phrases = [
    'Computer Science Graduate',
    'AI Research Enthusiast',
    'Aspiring Educator',
    'Medical Image Analysis Explorer'
  ];

  const typingState = {
    phraseIndex: 0,
    charIndex: 0,
    deleting: false
  };

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('portfolio-theme');
  const activeTheme = storedTheme || (prefersDark ? 'dark' : 'light');

  const setTheme = theme => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (themeToggleText) {
      themeToggleText.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
  };

  setTheme(activeTheme);

  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  navToggle?.addEventListener('click', () => {
    const isOpen = navPanel.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    body.classList.toggle('menu-open', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navPanel.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
      body.classList.remove('menu-open');
    });
  });

  const typeLoop = () => {
    const currentPhrase = phrases[typingState.phraseIndex];
    const speed = typingState.deleting ? 42 : 68;

    if (!typingState.deleting) {
      typingState.charIndex += 1;
      typingText.textContent = currentPhrase.slice(0, typingState.charIndex);

      if (typingState.charIndex === currentPhrase.length) {
        typingState.deleting = true;
        setTimeout(typeLoop, 1150);
        return;
      }
    } else {
      typingState.charIndex -= 1;
      typingText.textContent = currentPhrase.slice(0, typingState.charIndex);

      if (typingState.charIndex === 0) {
        typingState.deleting = false;
        typingState.phraseIndex = (typingState.phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(typeLoop, speed);
  };

  if (typingText) {
    typingText.textContent = '';
    setTimeout(typeLoop, 500);
  }

  if (downloadCvBtn) {
    const downloadCv = event => {
      event.preventDefault();
      const content = [
        'Tanjina Ahmed Tuly',
        'Computer Science Graduate | AI Research Enthusiast | Aspiring Educator',
        '',
        'Summary',
        'Academic portfolio focused on research, teaching, and leadership.',
        '',
        'Highlights',
        '- CGPA 3.95/4.00',
        '- Top 8 graduate',
        '- Artificial Intelligence',
        '- Medical Image Analysis',
        '- Teaching and leadership',
        '',
        'Contact',
        'Email: tanjina@example.com',
        'GitHub: https://github.com/',
        'LinkedIn: https://www.linkedin.com/',
        'ResearchGate: https://www.researchgate.net/'
      ].join('\n');

      const blob = new Blob([content], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'Tanjina_Ahmed_Tuly_CV.pdf';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    };

    downloadCvBtn.addEventListener('click', downloadCv);
    downloadCvBtnBottom?.addEventListener('click', downloadCv);
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -50px 0px'
  });

  revealItems.forEach(item => revealObserver.observe(item));

  const activeSectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const target = link.getAttribute('href')?.slice(1);
        link.classList.toggle('is-active', target === entry.target.id);
      });
    });
  }, {
    threshold: 0.32,
    rootMargin: '-20% 0px -55% 0px'
  });

  document.querySelectorAll('section[id]').forEach(section => activeSectionObserver.observe(section));

})();
