document.querySelectorAll('.faq-item').forEach(el => {
  el.querySelector('.faq-btn').addEventListener('click', () => {
    const open = el.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-ans').style.maxHeight = '0';
    });
    if (!open) {
      el.classList.add('open');
      el.querySelector('.faq-ans').style.maxHeight = el.querySelector('.faq-ans').scrollHeight + 'px';
    }
  });
});

const io = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:0.08});
document.querySelectorAll('.r').forEach(el => io.observe(el));