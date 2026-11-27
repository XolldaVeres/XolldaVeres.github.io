(() => {
  'use strict';

  const motion = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  for (const picture of document.querySelectorAll('[data-tilt]')) {
    let update = 0;
    const reset = () => {
      cancelAnimationFrame(update);
      picture.style.removeProperty('--tilt-x');
      picture.style.removeProperty('--tilt-y');
    };
    picture.addEventListener('pointermove', (event) => {
      if (!motion.matches || event.pointerType === 'touch') return;
      cancelAnimationFrame(update);
      update = requestAnimationFrame(() => {
        const bounds = picture.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        picture.style.setProperty('--tilt-x', (-4 * y).toFixed(2) + 'deg');
        picture.style.setProperty('--tilt-y', (5 * x).toFixed(2) + 'deg');
      });
    });
    picture.addEventListener('pointerleave', reset);
    picture.addEventListener('pointercancel', reset);
    motion.addEventListener('change', reset);
  }

  const data = document.getElementById('catalog-data');
  const dialog = document.createElement('dialog');
  if (!data || typeof dialog.showModal !== 'function') return;
  const projects = new Map(JSON.parse(data.textContent).map(project => [project.id, project]));
  const projectHash = '#project-';
  const stateKey = 'portfolioProjectDialog';

  dialog.className = 'project-dialog';
  dialog.setAttribute('aria-labelledby', 'pd-title');
  // The template contains controls only. Project text is inserted as text nodes.
  dialog.innerHTML = `
    <div class="pd-panel">
      <header class="pd-header">
        <h2 id="pd-title"></h2>
        <button class="pd-btn pd-close" type="button" autofocus>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg>
          <span>Закрыть</span>
        </button>
      </header>
      <div class="pd-grid">
        <section class="pd-gallery" aria-label="Галерея проекта">
          <div class="pd-view" role="region" aria-label="Изображение проекта" tabindex="0">
            <div class="pd-mat"><img class="pd-image" alt=""></div>
          </div>
          <div class="pd-controls">
            <button class="pd-btn pd-zoom" type="button" aria-pressed="false">Увеличить</button>
            <div class="pd-pages" role="group" aria-label="Листать кадры">
              <button class="pd-btn pd-prev" type="button" aria-label="Предыдущий кадр">
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m12 5-5 5 5 5"/></svg>
              </button>
              <span class="pd-count"></span>
              <button class="pd-btn pd-next" type="button" aria-label="Следующий кадр">
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5"/></svg>
              </button>
            </div>
          </div>
          <div class="pd-frame-caption" aria-live="polite" aria-atomic="true">
            <span class="pd-sr pd-progress"></span>
            <h3 class="pd-frame-title"></h3>
            <p class="pd-caption"></p>
          </div>
        </section>
        <div class="pd-info">
          <p class="pd-status"></p>
          <div class="pd-body"></div>
          <div class="pd-actions"></div>
        </div>
      </div>
    </div>`;
  document.body.append(dialog);

  const find = selector => dialog.querySelector(selector);
  const title = find('#pd-title');
  const close = find('.pd-close');
  const grid = find('.pd-grid');
  const gallery = find('.pd-gallery');
  const view = find('.pd-view');
  const image = find('.pd-image');
  const zoom = find('.pd-zoom');
  const pages = find('.pd-pages');
  const count = find('.pd-count');
  const progress = find('.pd-progress');
  const frameTitle = find('.pd-frame-title');
  const caption = find('.pd-caption');
  const status = find('.pd-status');
  const body = find('.pd-body');
  const actions = find('.pd-actions');
  let currentProject = null;
  let frames = [];
  let index = 0;
  let opener = null;
  let closing = false;

  function setZoom(on) {
    view.classList.toggle('pd-enlarged', on);
    zoom.setAttribute('aria-pressed', String(on));
    zoom.textContent = on ? 'Уместить' : 'Увеличить';
    view.scrollTo(0, 0);
  }

  function rememberFrame() {
    const entry = history.state?.[stateKey];
    if (entry?.id !== currentProject.id) return;
    history.replaceState({...history.state, [stateKey]: {...entry, index}}, '');
  }

  function drawFrame(at) {
    const length = frames.length;
    gallery.hidden = length === 0;
    grid.classList.toggle('pd-no-gallery', !length);
    if (!length) return;
    index = ((at % length) + length) % length;
    const frame = frames[index];
    setZoom(false);
    image.alt = frame.alt || frame.title || '';
    image.src = frame.src;
    frameTitle.textContent = frame.title || '';
    frameTitle.hidden = !frame.title;
    caption.textContent = frame.caption || '';
    caption.hidden = !frame.caption;
    pages.hidden = length < 2;
    count.textContent = (index + 1) + ' / ' + length;
    progress.textContent = 'Кадр ' + (index + 1) + ' из ' + length + '. ';
    rememberFrame();
  }

  function projectAtHash() {
    if (!location.hash.startsWith(projectHash)) return null;
    try {
      return projects.get(decodeURIComponent(location.hash.slice(projectHash.length))) || null;
    } catch {
      return null;
    }
  }

  function plainParagraphs(source) {
    const paragraphs = Array.isArray(source) ? source : String(source || '').split(/\n+/);
    return paragraphs.filter(Boolean).map(line => {
      const paragraph = document.createElement('p');
      paragraph.textContent = line;
      return paragraph;
    });
  }

  function projectActions(items) {
    const links = [];
    for (const action of items || []) {
      if (!action.text || !action.href) continue;
      const link = document.createElement('a');
      link.href = action.href;
      link.textContent = action.text;
      link.className = 'pd-action';
      if (action.download) link.download = typeof action.download === 'string' ? action.download : '';
      links.push(link);
    }
    return links;
  }

  function openProject(project, at) {
    currentProject = project;
    title.textContent = project.title;
    status.textContent = project.status || '';
    status.hidden = !project.status;
    body.replaceChildren(...plainParagraphs(project.body));
    actions.replaceChildren(...projectActions(project.actions));
    actions.hidden = !actions.childElementCount;
    frames = (project.images || []).filter(frame => frame && frame.src);
    drawFrame(Number.isInteger(at) && at >= 0 && at < frames.length ? at : 0);
    closing = false;
    if (!dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add('pd-scroll-lock');
    }
    dialog.scrollTop = 0;
    close.focus({preventScroll: true});
  }

  function closeProject() {
    if (!dialog.open || closing) return;
    closing = true;
    const entry = history.state?.[stateKey];
    if (entry?.fromCatalog && projectAtHash()?.id === entry.id) {
      // Only a marker we pushed in this tab can trigger a backward navigation.
      history.back();
      return;
    }
    if (projectAtHash()) {
      const nextState = {...history.state};
      delete nextState[stateKey];
      history.replaceState(nextState, '', location.href.split('#')[0]);
    }
    dialog.close();
  }

  function syncLocation() {
    const project = projectAtHash();
    if (!project) {
      if (dialog.open) dialog.close();
      return;
    }
    if (dialog.open && currentProject?.id === project.id) return;
    const entry = history.state?.[stateKey];
    if (!opener || opener.dataset.project !== project.id)
      opener = Array.from(document.querySelectorAll('[data-project]')).find(el => el.dataset.project === project.id) || null;
    openProject(project, entry?.id === project.id ? entry.index : 0);
  }

  for (const trigger of document.querySelectorAll('[data-project]')) {
    trigger.addEventListener('click', (event) => {
      if (event.button !== 0 || event.defaultPrevented || event.metaKey || event.ctrlKey ||
          event.shiftKey || event.altKey || trigger.hasAttribute('download') ||
          (trigger.target && trigger.target !== '_self')) return;
      const project = projects.get(trigger.dataset.project);
      if (!project) return;
      const at = Number(trigger.dataset.index || 0);
      try {
        const state = {...history.state, [stateKey]: {id: project.id, index: at, fromCatalog: true}};
        history.pushState(state, '', projectHash + encodeURIComponent(project.id));
      } catch {
        return; // Keep the normal link to the standalone project page.
      }
      event.preventDefault();
      opener = trigger;
      openProject(project, at);
    });
  }

  image.addEventListener('load', () => {
    // Cropped archive images retain their original pixels at the default size.
    view.style.setProperty('--pd-source-width', image.naturalWidth + 'px');
    view.style.setProperty('--pd-enlarged-width', Math.round(image.naturalWidth * 1.5) + 'px');
  });
  image.addEventListener('error', () => {
    if (!frames.length) return;
    frames.splice(index, 1);
    drawFrame(Math.min(index, frames.length - 1));
  });
  zoom.addEventListener('click', () => setZoom(!view.classList.contains('pd-enlarged')));
  close.addEventListener('click', closeProject);
  find('.pd-prev').addEventListener('click', () => drawFrame(index - 1));
  find('.pd-next').addEventListener('click', () => drawFrame(index + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey || frames.length < 2 ||
        view.classList.contains('pd-enlarged')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      drawFrame(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeProject(); });
  let startedOnBackdrop = false;
  dialog.addEventListener('pointerdown', event => { startedOnBackdrop = event.target === dialog; });
  dialog.addEventListener('click', event => {
    if (event.target === dialog && startedOnBackdrop) closeProject();
  });
  dialog.addEventListener('close', () => {
    // A traversal may open the same native dialog again before its close event.
    if (dialog.open) return;
    closing = false;
    document.documentElement.classList.remove('pd-scroll-lock');
    if (opener?.isConnected) {
      const card = opener.closest('.project-card');
      if (card && currentProject) {
        window.dispatchEvent(new CustomEvent('portfolio:reveal-project', {detail: {id: currentProject.id}}));
        const archive = card.closest('details');
        if (archive) archive.open = true;
      }
      opener.focus({preventScroll: true});
      (card || opener).scrollIntoView({block: 'nearest', behavior: 'instant'});
    }
  });
  window.addEventListener('popstate', syncLocation);
  window.addEventListener('hashchange', syncLocation);
  syncLocation();
})();
