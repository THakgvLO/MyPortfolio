// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        navLinks.classList.remove('active');
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Scroll Reveal Animation
const fadeElements = document.querySelectorAll('.fade-in');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');

const revealTimeline = () => {
    const windowHeight = window.innerHeight;
    
    timelineItems.forEach((item, index) => {
        const elementTop = item.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 300);
        }
    });
};

window.addEventListener('scroll', () => {
    revealOnScroll();
    revealTimeline();
});

// Trigger on load
window.addEventListener('load', () => {
    revealOnScroll();
    revealTimeline();
});

// Project Modal
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalTags = document.getElementById('modalTags');
const modalDescription = document.getElementById('modalDescription');
const modalTechnologies = document.getElementById('modalTechnologies');
const modalChallenges = document.getElementById('modalChallenges');
const modalLink = document.getElementById('modalLink');

const projects = {
    1: {
        title: "HydroInsight - Water Quality Monitoring Platform",
        image: "assets/project-images/southern-africa-rivers.jpg",
        tags: ["Python", "Javascript", "Data Visualization", "Leaflet Charts", "Statistics"],
        description: "A comprehensive dashboard that visualizes water quality parameters across South African provinces. This project automated the collection of data from the Department of Water and Sanitation's trusted source, the National Integrated Water Information System (NIWIS). Then it was processed using Python scripts, and displayed as an interactive map and visualization dashboard for stakeholders and the public.",
        technologies: "Built with: HTML, CSS, Javascript, Python, JSON",
        challenges: "Challenge: Different data formats and inconsistent API responses.<br>Solution: Created a robust data cleaning pipeline and implemented error handling to ensure continuous data flow.",
        link: "https://github.com/THakgvLO/HydroInsight",
        live: "https://hydroinsight.netlify.app" // Only for HydroInsight
    },
    2: {
        title: "Analyzing Urban Heat and Climate Impacts in Pretoria",
        image: "assets/project-images/hot-cities-map.png",
        tags: ["Python", "Remote Sensing", "Spatial Analysis", "Urban Heat Islands", "Climate Change"],
        description: "This project investigates urban heat island effects in Pretoria using Python-based spatial analysis and remote sensing data. By examining temperature variations across the city and surrounding Gauteng region, the study reveals how land use and vegetation cover influence local climate dynamics. Peer-reviewed literature supports the methodology and interpretation, ensuring scientific rigor throughout.",
        technologies: "Built with: Python, Jupyter Notebook, Plotly, Matplotlib",
        challenges: "Challenge: Ensuring statistical accuracy in climate inference<br>Solution: Applied correlation metrics and p-values to validate observed patterns",
        link: "https://github.com/THakgvLO/climate-variability-sa"
    },
    3: {
    title: "ClearVue Business Intelligence System",
    image: "assets/project-images/bus-intelligence.png",
    tags: ["Python", "Power BI", "Pandas", "Data Modelling", "MongoDB", "Semantic Cleanup", "Dashboard Automation", "Warehousing", "Retail Intelligence", "Workflow Design"],
    description: "This is a uni group project for Advanced Databases, the below link leads to the forked GitHub repository. The project automates the transformation of ClearVue's raw retail data into structured insights using Python scripting and Power BI dashboards. It includes semantic cleanup, customer category mapping, and dynamic filtering for sales analysis. Designed for scalability and reproducibility, the system supports future collaborators through clear documentation and modular code.",
    technologies: "Built with: Python, Jupyter Notebook, MongoDB, Kafka",
    challenges: "Challenge: Inconsistent category naming and fragmented data sources<br>Solution: Built a reusable data cleaning pipeline with rule-based mapping and documentation.",
    link: "https://github.com/THakgvLO/ClearVue-BI-System"
    }
};

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projects[projectId];
        
        modalTitle.textContent = project.title;
        modalImage.src = project.image;
        modalLink.href = project.link;
        modalLink.onclick = () => {
            window.open(project.link, '_blank');
        };

        const liveButton = document.getElementById('modalLive');

        if (project.live) {
            liveButton.style.display = 'inline-block';
            liveButton.href = project.live;
            liveButton.setAttribute('target', '_blank');
            liveButton.setAttribute('rel', 'noopener noreferrer');
            liveButton.onclick = (e) => {
                e.preventDefault();
                window.open(project.live, '_blank');
            };
        } else {
            liveButton.style.display = 'none';
        }


        
        // Clear and populate tags
        modalTags.innerHTML = '';
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'modal-tag';
            tagElement.textContent = tag;
            modalTags.appendChild(tagElement);
        });
        
        // Populate content
        modalDescription.innerHTML = `<h3>Description</h3><p>${project.description}</p>`;
        modalTechnologies.innerHTML = `<h3>Technologies</h3><p>${project.technologies}</p>`;
        modalChallenges.innerHTML = `<h3>Challenges & Solutions</h3><p>${project.challenges}</p>`;
        
        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    card.addEventListener('click', () => {
        gtag('event', 'project_view', {
            'event_category': 'engagement',
            'event_label': modalTitle.textContent
        });
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Download CV button
const downloadCV = document.getElementById('downloadCV');

downloadCV.addEventListener('click', function(e) {
    e.preventDefault();
    const fileId = '1zmB4go5rItTamy0VvxHpdfp0Bd6xcxZl';
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    console.log('CV Download initiated');
    window.open(downloadUrl, '_blank');

    gtag('event', 'cv_download', {
        'event_category': 'engagement',
        'event_label': 'CV Download'
    });
});

// Tagline Animation
const taglines = document.querySelectorAll('.tagline');
let currentTagline = 0;

function rotateTaglines() {
    // Hide all taglines
    taglines.forEach(tagline => {
        tagline.style.opacity = '0';
        tagline.style.transform = 'translateY(20px)';
    });
    
    // Show current tagline
    taglines[currentTagline].style.opacity = '1';
    taglines[currentTagline].style.transform = 'translateY(0)';
    
    // Update current tagline
    currentTagline = (currentTagline + 1) % taglines.length;
}

// Start rotation after initial animation
setInterval(rotateTaglines, 6000);