/* ===== CONFIGURE AQUI: número com DDI + DDD, só dígitos ===== */
const WHATSAPP = '5519999999999';
const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

document.querySelectorAll('a[data-wa]').forEach(a => { a.href = waLink(a.dataset.wa); });

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
  nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
}));

/* Formulário -> abre o WhatsApp com a mensagem pronta */
const form = document.getElementById('appointmentForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const d = new FormData(form);
  const name = String(d.get('name')).trim();
  const msg = `Olá! Me chamo ${name} e vim pelo site do Ateliê Oral. Tenho interesse em: ${d.get('interest')}.`;
  form.querySelector('.form-feedback').textContent = 'Abrindo o WhatsApp…';
  window.open(waLink(msg), '_blank', 'noopener');
  form.reset();
});

/* ===== Movimento ao rolar ===== */
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function split(el, cls, inner) {
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    let i = 0;
    (function walk(n) {
      [...n.childNodes].forEach(c => {
        if (c.nodeType === 3) {
          const f = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(t => {
            if (!t) return;
            if (/^\s+$/.test(t)) { f.append(t); return; }
            const w = document.createElement('span'); w.className = cls; w.setAttribute('aria-hidden', 'true');
            if (inner) { const s = document.createElement('span'); s.textContent = t; s.style.setProperty('--d', (0.05 * i++).toFixed(2) + 's'); w.append(s); }
            else w.textContent = t;
            f.append(w);
          });
          c.replaceWith(f);
        } else if (c.nodeType === 1 && c.tagName !== 'BR') walk(c);
      });
    })(el);
  }

  // título da introdução: palavras acendem conforme a rolagem
  const scrubEl = document.querySelector('.intro h2');
  if (scrubEl && !reduce) split(scrubEl, 'sw', false);
  const scrubWords = scrubEl ? [...scrubEl.querySelectorAll('.sw')] : [];

  const rules = [
    ['.hero h1', 'lines'],
    ['.hero-copy > :not(h1)', 'up'], ['.hero-photo', 'img'], ['.hero-stamp', 'up'],
    ['.photo-caption, .hero-bottom, .hero-side-label', 'up'],
    ['.section h2:not(.intro h2), .appointment h2, .team-info h3, .quote-content p', 'words'],
    ['.section-kicker, .overline, .heading-aside', 'up'],
    ['.intro-bottom, .intro-ornament', 'up'],
    ['.service-card', 'up'], ['.services-foot', 'up'],
    ['.quote-image', 'img'], ['.quote-content > *', 'up'],
    ['.space-copy > *, .space-index', 'left'], ['.space-photo', 'img'],
    ['.team-photo', 'img'], ['.team-info > *', 'right'],
    ['.appointment-left > *', 'up'], ['.appointment-form', 'right'],
    ['.footer > *, .footer-bottom', 'up']
  ];
  const seen = new Set(), items = [];
  rules.forEach(([sel, type]) => document.querySelectorAll(sel).forEach(el => {
    if (seen.has(el)) return;
    seen.add(el); el.setAttribute('data-reveal', type); items.push(el);
    if (type === 'words' && !reduce) split(el, 'w', true);
  }));

  // escalonamento entre irmãos
  const groups = new Map();
  items.forEach(el => {
    if (['lines', 'words', 'img'].includes(el.dataset.reveal)) return;
    const p = el.parentElement; (groups.get(p) || groups.set(p, []).get(p)).push(el);
  });
  groups.forEach(l => l.forEach((el, i) => el.style.setProperty('--d', (Math.min(i, 7) * 0.11).toFixed(2) + 's')));
  const hp = document.querySelector('.hero-photo'); if (hp) hp.style.setProperty('--d', '.25s');

  if (reduce || !('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('is-visible')); return; }

  // imagens com clip-path não "intersectam": observa-se o pai
  const targets = new Map();
  items.forEach(el => { const t = el.dataset.reveal === 'img' ? el.parentElement : el; (targets.get(t) || targets.set(t, []).get(t)).push(el); });
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    targets.get(en.target).forEach(el => el.classList.add('is-visible')); io.unobserve(en.target);
  }), { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
  requestAnimationFrame(() => requestAnimationFrame(() => targets.forEach((_, t) => io.observe(t))));

  // barra de progresso + palavras da introdução
  const bar = document.querySelector('.progress'); let tick = false;
  function frame() {
    tick = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    if (scrubWords.length) {
      const r = scrubEl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (innerHeight * 0.55 + r.height * 0.4)));
      const n = Math.round(p * scrubWords.length);
      scrubWords.forEach((w, i) => w.classList.toggle('on', i < n));
    }
  }
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(frame); } }, { passive: true });
  frame();
})();
