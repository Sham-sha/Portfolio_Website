// Function to create a project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.title;
    img.loading = 'lazy'; // Lazy load images

    const info = document.createElement('div');
    info.className = 'project-info';

    const title = document.createElement('h3');
    title.textContent = project.title;

    const description = document.createElement('p');
    description.textContent = project.description;

    const tags = document.createElement('div');
    tags.className = 'project-tags';
    project.tools.forEach(tool => {
        const span = document.createElement('span');
        span.textContent = tool;
        tags.appendChild(span);
    });

    const link = document.createElement('a');
    link.href = project.link;
    link.className = 'project-link';
    link.innerHTML = 'View Project <i class="fas fa-arrow-right"></i>';

    info.appendChild(title);
    info.appendChild(description);
    info.appendChild(tags);
    info.appendChild(link);

    card.appendChild(img);
    card.appendChild(info);

    return card;
}

// Function to load projects
async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    try {
        const response = await fetch('../data/projects.json');
        if (!response.ok) throw new Error('Failed to load projects');
        
        const data = await response.json();
        
        // Clear loading message
        projectsGrid.innerHTML = '';
        
        // Add projects to grid
        data.projects.forEach(project => {
            const card = createProjectCard(project);
            projectsGrid.appendChild(card);
        });
        
        // Add fade-in animation to cards
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                Failed to load projects. Please try again later.
            </div>
        `;
    }
}

// Load projects when the page loads
document.addEventListener('DOMContentLoaded', loadProjects);