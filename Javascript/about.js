// Function to draw circular progress
function drawCircularProgress(canvas, percentage) {
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;
  
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 10;
    ctx.stroke();
  
    // Draw progress arc
    const startAngle = -0.5 * Math.PI;
    const endAngle = startAngle + (2 * Math.PI * percentage / 100);
  
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#505d75';
    ctx.lineWidth = 10;
    ctx.stroke();
  }
  
  // Load skills data
  fetch('../data/skills.json')
    .then(response => response.json())
    .then(skillsData => {
        const skillsContainer = document.getElementById('skills-container');
  
        function createSkillSection(title, skills) {
            const section = document.createElement('div');
            section.classList.add('skill-category');
  
            const heading = document.createElement('h3');
            heading.textContent = title;
            section.appendChild(heading);
  
            const skillsGrid = document.createElement('div');
            skillsGrid.classList.add('skills-grid');
  
            skills.forEach(skill => {
                const skillItem = document.createElement('div');
                skillItem.classList.add('skill-item');
  
                const circularProgress = document.createElement('div');
                circularProgress.classList.add('circular-progress');
  
                const canvas = document.createElement('canvas');
                canvas.width = 120;
                canvas.height = 120;
  
                const progressValue = document.createElement('div');
                progressValue.classList.add('progress-value');
                progressValue.textContent = skill.level + '%';
  
                const skillName = document.createElement('div');
                skillName.classList.add('skill-name');
                skillName.textContent = skill.skill;
  
                circularProgress.appendChild(canvas);
                circularProgress.appendChild(progressValue);
                skillItem.appendChild(circularProgress);
                skillItem.appendChild(skillName);
                skillsGrid.appendChild(skillItem);
  
                // Draw the progress immediately
                drawCircularProgress(canvas, skill.level);
            });
  
            section.appendChild(skillsGrid);
            return section;
        }
  
        skillsContainer.appendChild(createSkillSection('Technical Skills', skillsData.techSkills));
        skillsContainer.appendChild(createSkillSection('English & Life Skills', skillsData.lifeSkills));
    })
    .catch(error => console.error('Error loading skills data:', error));
  