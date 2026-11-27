(() => {
  const bar = document.querySelector('.filters');
  if (!bar) return;
  const buttons = [...bar.querySelectorAll('button')];
  const cards = [...document.querySelectorAll('.project-card')];
  const archive = document.querySelector('.archive');
  const archiveCount = archive.querySelector('summary small');
  const result = document.getElementById('filter-result');
  bar.hidden = false;
  function select(category) {
    let visible = 0;
    let archiveVisible = 0;
    for (const card of cards) {
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) {
        visible++;
        if (archive.contains(card)) archiveVisible++;
      }
    }
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.filter === category));
    }
    document.querySelector('.feature-pair').hidden = cards.filter(c => c.classList.contains('feature')).every(c => c.hidden);
    document.getElementById('catalog').classList.toggle('filtered', category !== 'all');
    archive.hidden = !archiveVisible;
    archive.open = category !== 'all' && !!archiveVisible;
    archiveCount.textContent = archiveVisible;
    result.textContent = 'Проектов в подборке: ' + visible;
  }
  for (const button of buttons) button.addEventListener('click', () => select(button.dataset.filter));
  function revealCard(card, scroll = false) {
    if (!card || !card.classList.contains('project-card')) return;
    if (card.hidden || card.closest('[hidden]')) select('all');
    if (archive.contains(card)) {
      archive.hidden = false;
      archive.open = true;
    }
    if (scroll) card.scrollIntoView({block: 'nearest', behavior: 'instant'});
  }
  // Dialog close asks for a visible focus target without changing history.
  addEventListener('portfolio:reveal-project', event => {
    const id = event.detail?.id;
    if (typeof id === 'string') revealCard(document.getElementById('card-' + id));
  });
  function revealAnchor() {
    const previousSections = {
      '#cases': '#works', '#screens': '#project-leads', '#case-massage': '#project-booking',
      '#case-docs': '#project-knowledge', '#process': '#contact', '#case-roleplay': '#project-persona',
      '#examples': '#works', '#smartcloser': '#project-leads', '#knowledgepilot': '#project-knowledge',
      '#telegram-portfolio': '#project-portfolio', '#fortress': '#project-fortress', '#other-projects': '#archive-projects'
    };
    if (previousSections[location.hash]) {
      location.replace(previousSections[location.hash]);
      return;
    }
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id.startsWith('project-') ? 'card-' + id.slice(8) : id);
    const card = target?.closest('.project-card');
    if (card) revealCard(card, true);
    else if (target && archive.contains(target)) {
      if (archive.hidden) select('all');
      archive.open = true;
      target.scrollIntoView({block: 'nearest', behavior: 'instant'});
    }
  }
  addEventListener('hashchange',revealAnchor);
  revealAnchor();
})();
