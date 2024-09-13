document.addEventListener('DOMContentLoaded', function() {
    const databaseURL = 'https://ganesh-portfolio-01-default-rtdb.firebaseio.com/Portfolio.json';

    // Fetch data from Firebase
    fetch(databaseURL)
        .then(response => response.json())
        .then(data => {
            const filterList = document.getElementById('filter-list');
            const selectList = document.getElementById('select-list');
            const projectList = document.getElementById('project-list');
            
            // Initialize categories
            const categories = Object.keys(data);
            let filterButtons = '';
            let selectItems = '';
            let projectItems = '';

            // Add "All" option
            filterButtons += `<li class="filter-item">
                <button class="active" data-filter-btn="all">All</button>
            </li>`;
            selectItems += `<li class="select-item">
                <button data-select-item="all">All</button>
            </li>`;

            categories.forEach(category => {
                if (data[category]) {
                    filterButtons += `<li class="filter-item">
                        <button data-filter-btn="${category.toLowerCase()}">${category}</button>
                    </li>`;

                    selectItems += `<li class="select-item">
                        <button data-select-item="${category.toLowerCase()}">${category}</button>
                    </li>`;

                    Object.keys(data[category]).forEach(itemKey => {
                        const item = data[category][itemKey];
                        const image = `https://firebasestorage.googleapis.com/v0/b/ganesh-portfolio-01.appspot.com/o/Connections%2F${item.Image}?alt=media`;
                        
                        projectItems += `<li class="project-item" data-filter-item data-category="${category.toLowerCase()}">
                            <a href="#">
                                <figure class="project-img">
                                    <div class="project-item-icon-box">
                                        <ion-icon name="eye-outline"></ion-icon>
                                    </div>
                                    <img src="${image}" alt="${item.Name}" loading="lazy">
                                </figure>
                                <h3 class="project-title">${item.Name} : ${item.Role}</h3>
                                <p class="project-category experience">
                                    <strong>Specialisation:</strong> ${item.Specialisation}<br>
                                    <strong>Working@:</strong> ${item['Working@']}<br>
                                    <strong>Experience:</strong> ${item.Experience}<br>
                                    <div class="blog-content">
                                        <div class="blog-meta">
                                            <a href="mailto:${item.Email}" target="_blank"><img src="./assets/images/logo/E-mail.png" alt="Email Icon" width="20" height="20"></a><br>
                                            <a href="tel:${item.Phone}"><img src="./assets/images/logo/Phone.png" alt="Phone Icon" width="20" height="20"></a><br>
                                            <a href="${item.Instagram}" target="_blank"><img src="./assets/images/logo/Instagram.png" alt="Instagram Icon" width="20" height="20"></a><br>
                                            <a href="${item.Facebook}" target="_blank"><img src="./assets/images/logo/Facebook.png" alt="Facebook Icon" width="20" height="20"></a><br>
                                            <a href="${item.Twitter}" target="_blank"><img src="./assets/images/logo/X-Corp.png" alt="Twitter Icon" width="20" height="20"></a><br>
                                            <a href="${item['Linked-In']}" target="_blank"><img src="./assets/images/logo/Linked-In.png" alt="LinkedIn Icon" width="20" height="20"></a>
                                        </div>
                                    </div>
                                </p>
                            </a>
                        </li>`;
                    });
                }
            });

            // Update the HTML content
            filterList.innerHTML = filterButtons;
            selectList.innerHTML = selectItems;
            projectList.innerHTML = projectItems;

            // Show all projects by default
            const allProjects = document.querySelectorAll('.project-item');
            allProjects.forEach(item => {
                item.style.display = 'block';
            });

            // Filter functionality
            const filterButtonsElements = document.querySelectorAll('[data-filter-btn]');
            filterButtonsElements.forEach(button => {
                button.addEventListener('click', function() {
                    const category = this.getAttribute('data-filter-btn');
                    const projectItemsElements = document.querySelectorAll('[data-filter-item]');
                    
                    projectItemsElements.forEach(item => {
                        if (category === 'all' || item.getAttribute('data-category') === category) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });

                    filterButtonsElements.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // Dropdown functionality
            const selectButtons = document.querySelectorAll('[data-select-item]');
            const dropdownMenu = document.getElementById('select-list');

            selectButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const category = this.getAttribute('data-select-item');
                    const filterButton = document.querySelector(`[data-filter-btn="${category}"]`);
                    
                    if (filterButton) {
                        filterButton.click();
                    }
                    
                    document.querySelector('[data-select-value]').textContent = this.textContent;

                    // Close the dropdown menu
                    dropdownMenu.style.display = 'none'; // Close dropdown by hiding it
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
