// Function to create a project card
function createProjectCard(project) {
    // Create the main card container
    const card = document.createElement('div');
    card.className = 'project-card';

    // Create and set up the project image
    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.title;
    img.loading = 'lazy'; // Load images lazily

    // Create container for project information
    const info = document.createElement('div');
    info.className = 'project-info';

    // Add the project title
    const title = document.createElement('h3');
    title.textContent = project.title;

    // Add the project description
    const description = document.createElement('p');
    description.textContent = project.description;

    // Add tools used as tags
    const tags = document.createElement('div');
    tags.className = 'project-tags';
    project.tools.forEach(tool => {
        const span = document.createElement('span');
        span.textContent = tool;
        tags.appendChild(span);
    });

    // Add a link to view the project
    const link = document.createElement('a');
    link.href = project.link;
    link.className = 'project-link';
    link.innerHTML = 'View Project <i class="fas fa-arrow-right"></i>';

    // Add title, description, tags, and link to info container
    info.appendChild(title);
    info.appendChild(description);
    info.appendChild(tags);
    info.appendChild(link);

    // Add the image and info to the main card
    card.appendChild(img);
    card.appendChild(info);

    return card;
}

// Function to load projects
async function loadProjects() {
    // Get the grid where the projects will be displayed
    const projectsGrid = document.getElementById('projects-grid');

    try {
        // Fetch project data from the JSON file
        const response = await fetch('../data/projects.json');

        if (!response.ok) {
            throw new Error('Failed to load projects');
        }

        const data = await response.json();

        // Clear the loading message
        projectsGrid.innerHTML = '';

        // Create and add project cards to the grid
        data.projects.forEach(project => {
            const card = createProjectCard(project);
            projectsGrid.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading projects:', error);

        // Show an error message if loading fails
        projectsGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                Failed to load projects. Please try again later.
            </div>
        `;
    }
}

// Run the loadProjects function when the page is fully loaded
document.addEventListener('DOMContentLoaded', loadProjects);
