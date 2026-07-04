const year = document.getElementById('year');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalTags = document.getElementById('modalTags');
const modalDescription = document.getElementById('modalDescription');
const modalTools = document.getElementById('modalTools');
const modalFocus = document.getElementById('modalFocus');
const modalLinks = document.getElementById('modalLinks');
const modalClose = document.querySelector('.modal-close');
const projectCards = document.querySelectorAll('.project-card');

const projects = [
  {
    id: 1,
    title: 'HydroInsight',
    image: 'assets/project-images/southern-africa-rivers.jpg',
    description: 'A public-facing dashboard that turns water quality monitoring data into an interactive, easier-to-read system for environmental reporting.',
    tools: 'Python, Leaflet, statistics, GIS',
    focus: 'Water quality monitoring and accessible environmental insight',
    tags: ['Python', 'Leaflet', 'Statistics', 'GIS'],
    links: [
      { label: 'Repo', href: 'https://github.com/THakgvLO/HydroInsight' },
      { label: 'Live', href: 'https://hydroinsight.netlify.app/' }
    ]
  },
  {
    id: 2,
    title: 'ClearVue BI System',
    image: 'assets/project-images/data-analytics--business-intelligence-maturity-model---infographic-01-1.jpg',
    description: 'A retail intelligence workflow that brought messy source data into a structured and reusable BI process.',
    tools: 'Power BI, ETL, data cleaning, dashboards',
    focus: 'Reliable reporting and decision support',
    tags: ['Power BI', 'ETL', 'Data cleaning', 'Retail intelligence'],
    links: [
      { label: 'Repo', href: 'https://github.com/THakgvLO/ClearVue-BI-System' }
    ]
  },
  {
    id: 3,
    title: 'EV Fleet Viability Model',
    image: 'assets/project-images/ev.jpeg',
    description: 'A decision-support model for guiding EV charging site prioritisation with a structured, explainable approach.',
    tools: 'Python, K-means clustering, sustainability analysis',
    focus: 'Strategic planning and infrastructure prioritisation',
    tags: ['Python', 'K-means clustering', 'Sustainability', 'Strategy'],
    links: [
      { label: 'Repo', href: 'https://github.com/THakgvLO/satnac-openserve-project' },
      { label: 'Live', href: 'https://eagles-ev.netlify.app/' }
    ]
  },
  {
    id: 4,
    title: 'Urban Heat Analysis',
    image: 'assets/project-images/hot-cities-map.png',
    description: 'A spatial analysis project focused on climate patterns and urban heat behaviour in South African cities.',
    tools: 'Python, statistics, remote sensing, geospatial analysis',
    focus: 'Climate insight and urban heat interpretation',
    tags: ['Python', 'Statistics', 'Remote sensing', 'Climate'],
    links: [
      { label: 'Repo', href: 'https://github.com/THakgvLO/climate-variability-sa' }
    ]
  }
];

function openProject(projectId) {
  const project = projects.find((item) => item.id === Number(projectId));
  if (!project || !modal) {
    return;
  }

  modalImage.src = project.image;
  modalImage.alt = project.title;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTools.textContent = project.tools;
  modalFocus.textContent = project.focus;

  modalTags.innerHTML = '';
  project.tags.forEach((tag) => {
    const chip = document.createElement('span');
    chip.textContent = tag;
    modalTags.appendChild(chip);
  });

  modalLinks.innerHTML = '';
  project.links.forEach((link) => {
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.target = '_blank';
    anchor.rel = 'noreferrer';
    anchor.textContent = link.label;
    modalLinks.appendChild(anchor);
  });

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) {
    return;
  }

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('is-open');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

projectCards.forEach((card) => {
  const openCard = () => openProject(card.getAttribute('data-project'));
  card.addEventListener('click', openCard);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCard();
    }
  });
});

modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('is-open')) {
    closeModal();
  }
});
