/* ═════════════════════════════════════════════════════════════════════════ */
/*  SM CONSULTANCY SERVICES – PREMIUM INTERACTIVE JAVASCRIPT               */
/*  Features: Seamless Page Transitions, Scroll Reveal, Sticky Header,      */
/*  Animated Counters, FAQ Accordion, WhatsApp Auto-Send Form              */
/* ═════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Mobile Menu Toggle ──
  const burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', () => {
      document.body.classList.toggle('open');
    });
  }

  // Close mobile menu on clicking nav link
  document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('open');
    });
  });

  // ── 2. Sticky Header with Scroll Effect ──
  const header = document.querySelector('header');
  const handleScroll = () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ── 3. Page Interactivity Initializer ──
  function initPageInteractivity() {
    // 3a. Re-trigger Lucide Icons
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    // 3b. Scroll Reveal Animations (IntersectionObserver)
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      document.querySelectorAll('.reveal').forEach((el) => {
        if (el.parentElement && el.parentElement.children.length > 1) {
          const siblingIndex = Array.from(el.parentElement.children).indexOf(el);
          el.style.transitionDelay = `${(siblingIndex % 4) * 0.08}s`;
        }
        revealObserver.observe(el);
      });
    } else {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('active'));
    }

    // 3c. Animated Counters for Stats
    const counterElements = document.querySelectorAll('.counter[data-target]');
    if (counterElements.length && 'IntersectionObserver' in window) {
      let hasAnimated = false;
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              hasAnimated = true;
              counterElements.forEach((el) => {
                const target = parseFloat(el.getAttribute('data-target'));
                const isDecimal = target % 1 !== 0;
                const duration = 1600;
                const startTime = performance.now();

                function step(currentTime) {
                  const elapsed = currentTime - startTime;
                  const progress = Math.min(elapsed / duration, 1);
                  const ease = 1 - Math.pow(1 - progress, 3);
                  const current = ease * target;

                  if (isDecimal) {
                    el.textContent = current.toFixed(1);
                  } else {
                    el.textContent = Math.floor(current);
                  }

                  if (progress < 1) {
                    requestAnimationFrame(step);
                  } else {
                    el.textContent = isDecimal ? target.toFixed(1) : target;
                  }
                }

                requestAnimationFrame(step);
              });
              counterObserver.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );

      const statsSection = document.querySelector('.sec-stats-bar');
      if (statsSection) {
        counterObserver.observe(statsSection);
      }
    }

    // 3d. FAQ Accordion: Close other answers when one opens
    const allDetails = document.querySelectorAll('details');
    allDetails.forEach((targetDetail) => {
      targetDetail.addEventListener('toggle', () => {
        if (targetDetail.open) {
          allDetails.forEach((detail) => {
            if (detail !== targetDetail && detail.open) {
              detail.removeAttribute('open');
            }
          });
        }
      });
    });

    // 3e. Contact Form WhatsApp Auto-Send Handler
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
      inquiryForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('formName') ? document.getElementById('formName').value.trim() : '';
        const phone = document.getElementById('formPhone') ? document.getElementById('formPhone').value.trim() : '';
        const email = document.getElementById('formEmail') ? document.getElementById('formEmail').value.trim() : '';
        const service = document.getElementById('formService') ? document.getElementById('formService').value.trim() : '';
        const message = document.getElementById('formMessage') ? document.getElementById('formMessage').value.trim() : '';

        const text = `*New Website Inquiry - SM Consultancy Services*
---------------------------------------
👤 *Name:* ${name}
📞 *Phone:* ${phone}
✉️ *Email:* ${email}
💼 *Service Required:* ${service}
📝 *Message:*
${message}
---------------------------------------
Sent via smconsultancy.info`;

        const whatsappNumber = '601129262577';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

        const statusBox = document.getElementById('formStatus');
        if (statusBox) {
          statusBox.style.display = 'block';
          statusBox.innerHTML = `✅ <strong>Opening WhatsApp...</strong> If WhatsApp did not open automatically, <a href="${whatsappUrl}" target="_blank" rel="noopener" style="color:#0b2a5b;text-decoration:underline;font-weight:700">click here to send your inquiry</a>.`;
        }

        window.open(whatsappUrl, '_blank');
      });
    }

    // 3f. Smooth In-Page Anchor Scrolling (e.g. #s0 on services.html)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 82;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          document.body.classList.remove('open');
        }
      });
    });
  }

  // Initialize on first load
  initPageInteractivity();

  // ── 4. Seamless SPA-Style Page Transitions Between Separate Pages ──
  // Enabled when served over HTTP/HTTPS (e.g. Vercel, Netlify, or local dev server)
  const isHttp = window.location.protocol.startsWith('http');

  if (isHttp && 'fetch' in window && 'DOMParser' in window && 'history' in window) {
    async function loadPage(url, push = true) {
      const main = document.querySelector('main');
      if (!main) {
        window.location.href = url;
        return;
      }

      // Smooth fade-out of current page content (150ms)
      main.style.transition = 'opacity 0.16s ease, transform 0.16s ease';
      main.style.opacity = '0';
      main.style.transform = 'translateY(6px)';

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network error');
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const newMain = doc.querySelector('main');
        if (!newMain) throw new Error('No main found');

        // Swap Document Title
        if (doc.title) {
          document.title = doc.title;
        }

        // Swap Main Content
        main.innerHTML = newMain.innerHTML;

        // Scroll to top instantly
        window.scrollTo(0, 0);

        // Update URL
        if (push) {
          window.history.pushState({ url }, '', url);
        }

        // Update Active Nav Link
        const currentPath = new URL(url, window.location.href).pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('nav a').forEach((link) => {
          const href = link.getAttribute('href') || '';
          const linkPath = href.split('/').pop();
          link.classList.toggle('on', linkPath === currentPath);
        });

        // Close mobile drawer if open
        document.body.classList.remove('open');

        // Re-initialize all scripts & interactivity on new page
        initPageInteractivity();

        // Smooth fade-in of new content
        requestAnimationFrame(() => {
          main.style.opacity = '1';
          main.style.transform = 'translateY(0)';
        });
      } catch (err) {
        // Fallback to normal browser load if fetch fails
        window.location.href = url;
      }
    }

    // Intercept clicks on internal .html links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Ignore anchor jumps on same page, tel, mailto, external links
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        link.target === '_blank' ||
        link.hasAttribute('download')
      ) {
        return;
      }

      // Check if it's an internal HTML page link
      try {
        const targetUrl = new URL(href, window.location.href);
        if (targetUrl.origin === window.location.origin) {
          e.preventDefault();
          loadPage(targetUrl.href, true);
        }
      } catch (err) {
        // Allow default link navigation
      }
    });

    // Handle Browser Back / Forward Buttons smoothly
    window.addEventListener('popstate', () => {
      loadPage(window.location.href, false);
    });
  }
});
