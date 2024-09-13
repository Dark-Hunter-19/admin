async function populateProjects() {
    try {
        const response = await fetch("https://ganesh-portfolio-01-default-rtdb.firebaseio.com/Projects.json");
        const projectData = await response.json();
  
        // Locate the target element
        const modalContainer = document.querySelector('[data-modal-container]');
        if (!modalContainer) {
            console.warn('Modal container not found');
            return;
        }
  
        // Create a container for your new content
        const newContent = document.createElement('section');
        newContent.className = 'projects';
        newContent.innerHTML = `
          <ul class="filter-list">
            <li class="filter-item">
              <button class="active" data-filter-btn>All</button>
            </li>
            <li class="filter-item">
              <button data-filter-btn>Web design</button>
            </li>
            <li class="filter-item">
              <button data-filter-btn>Applications</button>
            </li>
            <li class="filter-item">
              <button data-filter-btn>Web development</button>
            </li>
          </ul>

          <div class="filter-select-box">
            <button class="filter-select" project-select>
              <div class="select-value" project-select-value>Select category</div>
              <div class="select-icon">
                <ion-icon name="chevron-down"></ion-icon>
              </div>
            </button>
            <ul class="select-list">
              <li class="select-item">
                <button project-select-item>All</button>
              </li>
              <li class="select-item">
                <button project-select-item>Web design</button>
              </li>
              <li class="select-item">
                <button project-select-item>Applications</button>
              </li>
              <li class="select-item">
                <button project-select-item>Web development</button>
              </li>
            </ul>
          </div>

          <ul class="project-list">
            <!-- Project items will be inserted here -->
          </ul>
        `;

        // Insert the new content after the modal-container
        modalContainer.insertAdjacentElement('afterend', newContent);
  
        // Populate the project list as before
        const filterList = newContent.querySelector('.filter-list');
        const selectList = newContent.querySelector('.select-list');
        const projectList = newContent.querySelector('.project-list');
        const projectSelectValue = newContent.querySelector("[project-select-value]");
  
        filterList.innerHTML = '';
        selectList.innerHTML = '';
        projectList.innerHTML = '';
  
        const allCategory = 'All';
        filterList.innerHTML += `<li class="filter-item"><button class="active" project-filter-btn>${allCategory}</button></li>`;
        selectList.innerHTML += `<li class="select-item"><button project-select-item>${allCategory}</button></li>`;
  
        const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/ganesh-portfolio-01.appspot.com/o/Projects%2F';
        const fallbackImageUrl = `${baseUrl}404.gif?alt=media`;
  
        const categories = Object.keys(projectData);
        categories.forEach(category => {
            const formattedCategory = category.toLowerCase().replace(/ /g, "-");
            filterList.innerHTML += `<li class="filter-item"><button project-filter-btn>${category}</button></li>`;
            selectList.innerHTML += `<li class="select-item"><button project-select-item>${category}</button></li>`;
  
            const projects = projectData[category];
            for (const projectKey in projects) {
                const project = projects[projectKey];
                if (project && project.Name && project.Date && project.Description && project.Link) {
                    const projectItem = document.createElement('li');
                    projectItem.className = 'project-item active';
                    projectItem.setAttribute('project-filter-item', '');
                    projectItem.setAttribute('data-category', formattedCategory);
  
                    let imageUrl = project.File ? `${baseUrl}${encodeURIComponent(project.File)}?alt=media` : fallbackImageUrl;
  
                    const imgElement = document.createElement('img');
                    imgElement.src = imageUrl;
                    imgElement.alt = project.Name;
                    imgElement.width = 40;
                    imgElement.onerror = () => {
                        imgElement.src = fallbackImageUrl;
                    };
  
                    projectItem.innerHTML = `
                        <a href="${project.Link}" target="_blank">
                            <figure class="project-img">
                                ${imgElement.outerHTML}
                            </figure>
                            <h3 class="project-title">${project.Name} : ${project.Date}</h3>
                        </a>
                        <p class="project-category experience">
                            <strong>Description:</strong> ${project.Description}<br>
                        </p>
                    `;
  
                    projectList.appendChild(projectItem);
                }
            }
        });
  
        // Reattach event listeners after content display
        attachEventListeners(newContent);
  
    } catch (error) {
        console.error("Error fetching or populating projects:", error);
    }
}
  
function attachEventListeners(container) {
    const projectSelect = container.querySelector("[project-select]");
    const projectSelectItems = container.querySelectorAll("[project-select-item]");
    const projectSelectValue = container.querySelector("[project-select-value]");
    const projectFilterBtn = container.querySelectorAll("[project-filter-btn]");
    const projectFilterItems = container.querySelectorAll("[project-filter-item]");
  
    if (projectSelect) {
        projectSelect.addEventListener("click", function () {
            elementToggleFunc(this);
        });
    } else {
        console.warn("projectSelect not found");
    }
  
    projectSelectItems.forEach(item => {
        item.addEventListener("click", function () {
            let selectedValue = this.innerText.toLowerCase();
            projectSelectValue.innerText = this.innerText;
            if (projectSelect) {
                elementToggleFunc(projectSelect);
            }
            projectFilterFunc(selectedValue);
        });
    });
  
    const projectFilterFunc = function (selectedValue) {
        projectFilterItems.forEach(item => {
            if (selectedValue === "all") {
                item.classList.add("active");
            } else if (selectedValue === item.dataset.category) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    };
  
    let lastTouchedButton = projectFilterBtn[0];
  
    projectFilterBtn.forEach(btn => {
        btn.addEventListener("click", function () {
            let selectedValue = this.innerText.toLowerCase();
            projectSelectValue.innerText = this.innerText;
            projectFilterFunc(selectedValue);
  
            if (lastTouchedButton) {
                lastTouchedButton.classList.remove("active");
            }
            this.classList.add("active");
            lastTouchedButton = this;
        });
    });
}
  
populateProjects();
