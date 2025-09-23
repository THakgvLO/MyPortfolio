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
        title: "Water Quality Monitoring Platform",
        image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        tags: ["Python", "Javascript", "Data Visualization", "Leaflet Charts", "Statistics"],
        description: "A comprehensive dashboard that visualizes water quality parameters across South African provinces. This project automated the collection of data from multiple government APIs, processed it using Python scripts, and created an interactive Power BI dashboard for stakeholders.",
        technologies: "Built with: HTML, CSS, Javascript, Python, JSON",
        challenges: "Challenge: Different data formats and inconsistent API responses. Solution: Created a robust data cleaning pipeline and implemented error handling to ensure continuous data flow.",
        link: "https://github.com/THakgvLO/HydroInsight"
    },
    2: {
        title: "Urban Heat and Climate Change Analysis",
        image: "https://images.unsplash.com/photo-1543302094-76d0b288a6e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        tags: ["Python", "Remote Sensing", "Spatial Analysis", "Urban Heat Islands", "Climate Change"],
        description: "This data analysis project analyzed urban heat islands in Pretoria using python and existing peer-reviewed articles. The analysis identified temperature variations across the city and the Gauteng region, and correlated them with land use patterns and vegetation cover.",
        technologies: "Built with: Python, Google Colab, Plotly, Matplotlib",
        challenges: "Challenge: Accuracy in statistical inference Solution: Used statistical values such as correlation and p-values to determine the level of accuracy for my inferences.",
        link: "#"
    }
};

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projects[projectId];
        
        modalTitle.textContent = project.title;
        modalImage.src = project.image;
        modalLink.href = project.link;
        
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

// Track CV downloads
downloadCV.addEventListener('click', function(e) {
    // ...existing code...
    gtag('event', 'cv_download', {
        'event_category': 'engagement',
        'event_label': 'CV Download'
    });
});

// Track project views
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        // ...existing code...
        gtag('event', 'project_view', {
            'event_category': 'engagement',
            'event_label': modalTitle.textContent
        });
    });
});