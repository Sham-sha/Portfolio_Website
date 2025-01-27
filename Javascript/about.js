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

// Animate progress bars when they come into view
function animateCircularProgress(canvas, targetPercentage) {
  let currentPercentage = 0;
  const animationDuration = 1500; // 1.5 seconds
  const fps = 60;
  const steps = animationDuration / (1000 / fps);
  const increment = targetPercentage / steps;

  const animation = setInterval(() => {
      currentPercentage += increment;
      if (currentPercentage >= targetPercentage) {
          currentPercentage = targetPercentage;
          clearInterval(animation);
      }
      drawCircularProgress(canvas, currentPercentage);
  }, 1000 / fps);
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

              // Observe when the skill comes into view
              const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                      if (entry.isIntersecting) {
                          animateCircularProgress(canvas, skill.level);
                          observer.unobserve(entry.target);
                      }
                  });
              }, { threshold: 0.5 });

              observer.observe(skillItem);
          });

          section.appendChild(skillsGrid);
          return section;
      }

      skillsContainer.appendChild(createSkillSection('Technical Skills', skillsData.techSkills));
      skillsContainer.appendChild(createSkillSection('English & Life Skills', skillsData.lifeSkills));
  })
  .catch(error => console.error('Error loading skills data:', error));

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          target.scrollIntoView({
              behavior: 'smooth'
          });
      }
  });
});