const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');
const modal = document.getElementById('detailModal');
const modalTitle = document.getElementById('detailTitle');
const modalKicker = document.getElementById('detailKicker');
const modalBody = document.getElementById('detailBody');
const modalLinks = document.getElementById('detailLinks');
const modalClose = document.querySelector('.modal-close');
const cards = document.querySelectorAll('.collage-card');
const weatherTime = document.getElementById('weatherTime');
const weatherCondition = document.getElementById('weatherCondition');
const weatherSecondary = document.getElementById('weatherSecondary');
const mapVisual = document.getElementById('mapVisual');
const mapControls = document.querySelectorAll('[data-map-zoom]');

const OWNER_TIME_ZONE = 'Africa/Johannesburg';

const cardDetails = {
  about: {
    kicker: 'About',
    title: 'Hi, I’m Thakgalo',
    body: [
      '<strong>What I do</strong><br>Data science, analytics engineering, and automation.',
      '<strong>Education</strong><br>BSc in Environmental Sciences with Geography and Computer Science.<br>Postgraduate Diploma in Data Science.',
      '<strong>Focus</strong><br>Practical systems that make complex data easier to use.'
    ],
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thakgalo-sehlola' },
      { label: 'GitHub', href: 'https://github.com/THakgvLO' }
    ]
  },
  status: {
    kicker: 'Status',
    title: 'Online',
    body: [
      'Available for thoughtful technical work, collaboration, and new opportunities.',
      'The best way to reach me is through the contact links below.'
    ],
    links: []
  },
  weather: {
    kicker: 'Weather',
    title: 'Local conditions',
    body: [
      'A quick read on the current local conditions and time zone context.',
      'The weather card reflects the active browser time zone and compares it with my home time zone.'
    ],
    links: []
  },
  location: {
    kicker: 'Location',
    title: 'South Africa',
    body: [
      'Based in South Africa, building practical data systems and decision support tools.',
      'Use the map controls on the card to inspect the geography without leaving the page.'
    ],
    links: []
  },
  photos: {
    kicker: 'Photos',
    title: 'A few snapshots',
    body: [
      'I like the balance between technical clarity and visual storytelling.',
      'That same principle carries through the way I build dashboards, systems, and portfolio work.'
    ],
    links: []
  },
  skills: {
    kicker: 'Tools',
    title: 'Skills and credentials',
    body: [
      '<strong>Machine learning</strong><br>Regression | Classification | Clustering | Hypothesis testing | NLP',
      '<strong>Data engineering</strong><br>SQL | ETL and ELT | Data modelling | Kafka | MongoDB',
      '<strong>Programming and testing</strong><br>Python | Java | Selenium | Appium | TestNG | Maven',
      '<strong>Cloud and platforms</strong><br>AWS | Microsoft Fabric | Azure Fundamentals | Power Platform | CI/CD',
      '<strong>GIS and spatial</strong><br>ArcGIS Pro | Remote sensing | Spatial analysis',
      '<strong>Credentials</strong><br>AWS Cloud Practitioner | AWS Solutions Architect Associate |<br> AWS AI and Machine Learning Engineer Nanodegree | Azure Fundamentals |<br> Fabric Analytics Engineer Associate | Power Platform Up Program'
    ],
    links: []
  },
  blog: {
    kicker: 'Blog',
    title: 'Why business intelligence matters',
    body: [
      'Business intelligence turns scattered data into a shared view of what is happening and what needs attention.',
      'The value is not in dashboards alone. It is in better decisions, clearer priorities, and faster responses.'
    ],
    links: []
  }
};

function formatTime(date, timeZone) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone
  }).format(date);
}

function getZoneLabel(timeZone) {
  return timeZone.split('/').pop().replace('_', ' ');
}

function updateWeatherCard() {
  if (!weatherTime || !weatherCondition || !weatherSecondary) return;

  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const now = new Date();
  const localTime = formatTime(now, localTimeZone);
  const ownerTime = formatTime(now, OWNER_TIME_ZONE);

  weatherTime.textContent = localTime;
  weatherCondition.textContent = `${getZoneLabel(localTimeZone)} • Overcast`;

  if (localTimeZone === OWNER_TIME_ZONE) {
    weatherSecondary.textContent = '';
    weatherSecondary.style.display = 'none';
    return;
  }

  weatherSecondary.textContent = `${getZoneLabel(OWNER_TIME_ZONE)}: ${ownerTime}`;
  weatherSecondary.style.display = 'block';
}

function openCardModal(cardKey) {
  const detail = cardDetails[cardKey];
  if (!detail || !modal) return;

  modalTitle.textContent = detail.title;
  modalKicker.textContent = detail.kicker;
  modalBody.innerHTML = detail.body.map((para) => `<p>${para}</p>`).join('');

  modalLinks.innerHTML = '';
  detail.links.forEach((link) => {
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.label;
    if (link.href.startsWith('http')) {
      anchor.target = '_blank';
      anchor.rel = 'noreferrer';
    }
    modalLinks.appendChild(anchor);
  });

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
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

cards.forEach((card) => {
  const open = () => openCardModal(card.dataset.card);
  card.addEventListener('click', open);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  });
});

modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
});

updateWeatherCard();

let mapScale = 1;
mapControls.forEach((control) => {
  control.addEventListener('click', (event) => {
    event.stopPropagation();
    mapScale = control.dataset.mapZoom === 'in'
      ? Math.min(mapScale + 0.2, 1.8)
      : Math.max(mapScale - 0.2, 1);
    if (mapVisual) mapVisual.style.transform = `scale(${mapScale})`;
  });
});
