document.addEventListener('DOMContentLoaded', function() {
    const projectContainer = document.getElementById('project-container');
    const prevButton = document.getElementById('prev-project');
    const nextButton = document.getElementById('next-project');

    const projects = [
        {
            name: "Dragon Ball Legends Tier List",
            description: "An interactive tier list for Dragon Ball Legends Units.",
            websiteUrl: "https://zevzx.github.io/DragonBallLegendsTierList/",
            githubUrl: "https://github.com/ZevZX/DragonBallLegendsTierList",
            iframeSrc: "https://zevzx.github.io/DragonBallLegendsTierList/"
        },
        {
            name: "Volatility",
            description: "",
            githubUrl: "https://github.com/KirbyAndStuff/volatility",
            youtubeUrl: "https://www.youtube.com/@JoyousCastDev",
            youtubeVideos: [
                "W1Mvhf927-c",
                "fih-giKs_ks",
                "CVJUBK1Z09c",
                "nec9gyZ-Sfc",
                "9Kn9kekAUm4",
                "pfFnwvG8pZ8",
                "237QkYl1GTk",
                "FcyyAtVcKqE"
            ]
        }
    ];

    let currentProjectIndex = 0;

    function createProjectSlide(project) {
        const slide = document.createElement('div');
        slide.className = 'project-slide';
        
        let html = `
            <h2>${project.name}</h2>
            <p>${project.description}</p>
            <div class="project-links">
        `;
    
        if (project.websiteUrl) {
            html += `<a href="${project.websiteUrl}" target="_blank" class="website-link">Go to Website</a>`;
        }
        if (project.githubUrl) {
            html += `<a href="${project.githubUrl}" target="_blank" class="github-link">Go to Repository</a>`;
        }
        if (project.youtubeUrl) {
            html += `<a href="${project.youtubeUrl}" target="_blank" class="youtube-link">Watch on YouTube</a>`;
        }
    
        html += `</div>`;
    
        if (project.iframeSrc) {
            html += `<div class="iframe-container"><iframe src="${project.iframeSrc}" frameborder="0"></iframe></div>`;
        }
    
        if (project.youtubeVideos) {
            html += `<div class="youtube-grid">`;
            project.youtubeVideos.forEach(videoId => {
                html += `
                    <div class="youtube-video">
                        <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                `;
            });
            html += `</div>`;
        }
    
        slide.innerHTML = html;
        return slide;
    }

    function initializeCarousel() {
        projects.forEach((project, index) => {
            const slide = createProjectSlide(project);
            if (index === 0) {
                slide.style.opacity = '1';
                slide.style.transform = 'translateX(0)';
            } else {
                slide.style.opacity = '0';
                slide.style.transform = 'translateX(100%)';
            }
            projectContainer.appendChild(slide);
        });
    }

    function updateCarousel(direction) {
        const slides = document.querySelectorAll('.project-slide');
        const currentSlide = slides[currentProjectIndex];
        
        let nextIndex = direction === 'next' 
            ? (currentProjectIndex + 1) % projects.length 
            : (currentProjectIndex - 1 + projects.length) % projects.length;
        
        const nextSlide = slides[nextIndex];
    
        // Set initial positions
        currentSlide.style.transform = 'translateX(0)';
        nextSlide.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
        nextSlide.style.opacity = '0';
    
        // Trigger reflow
        void currentSlide.offsetWidth;
    
        // Animate slides
        currentSlide.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
        currentSlide.style.opacity = '0';
        nextSlide.style.transform = 'translateX(0)';
        nextSlide.style.opacity = '1';
    
        currentProjectIndex = nextIndex;
    }

    function showNextProject() {
        updateCarousel('next');
    }

    function showPrevProject() {
        updateCarousel('prev');
    }

    // Initialize the carousel
    initializeCarousel();

    // Add event listeners to buttons
    nextButton.addEventListener('click', showNextProject);
    prevButton.addEventListener('click', showPrevProject);
});