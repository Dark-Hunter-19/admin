fetch('https://ganesh-portfolio-01-default-rtdb.firebaseio.com/Technical-Skills.json')
  .then(response => response.json())
  .then(data => {
    generateSkillsSection(data);
  })
  .catch(error => console.error('Error fetching the data:', error));

function generateSkillsSection(data) {
  // Create the section
  const section = document.createElement('section');
  section.className = 'skill';

  // Add the title
  const title = document.createElement('h3');
  title.className = 'h3 skills-title';
  title.textContent = 'Technical Skills';
  section.appendChild(title);

  // Create the list
  const ul = document.createElement('ul');
  ul.className = 'skills-list content-card';

  // Iterate over the skills and create list items
  for (const key in data) {
    const skill = data[key];

    const li = document.createElement('li');
    li.className = 'skills-item';

    // Create title wrapper
    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'title-wrapper';

    const h5 = document.createElement('h5');
    h5.className = 'h5';
    h5.textContent = skill.Language;
    titleWrapper.appendChild(h5);

    const dataElem = document.createElement('data');
    dataElem.value = skill.Percentage;
    dataElem.textContent = `${skill.Percentage}%`;
    titleWrapper.appendChild(dataElem);

    li.appendChild(titleWrapper);

    // Create progress background
    const progressBg = document.createElement('div');
    progressBg.className = 'skill-progress-bg';

    const progressFill = document.createElement('div');
    progressFill.className = 'skill-progress-fill';
    progressFill.style.width = `${skill.Percentage}%`;
    progressBg.appendChild(progressFill);

    li.appendChild(progressBg);

    // Append the list item to the list
    ul.appendChild(li);
  }

  // Append the list to the section
  section.appendChild(ul);

  // Insert the skills section in the correct place inside the resume article
  const resumeArticle = document.querySelector('article.resume[data-page="resume"]');
  if (resumeArticle) {
    // Find the last section (Experience or Education) and insert after it
    const lastTimelineSection = resumeArticle.querySelector('section.timeline:last-of-type');
    if (lastTimelineSection) {
      lastTimelineSection.insertAdjacentElement('afterend', section); // Insert after the last timeline section (Experience or Education)
    } else {
      resumeArticle.appendChild(section); // If no timeline section, just append the skills section
    }
  } else {
    console.error('Resume article not found');
  }
}
