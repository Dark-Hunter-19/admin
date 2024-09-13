'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);


//mark
// custom select variables
// Namespace for script1
const script1 = (() => {
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  // Close all dropdowns
  const closeAllDropdowns = () => {
    document.querySelectorAll("[data-select]").forEach(dropdown => {
      dropdown.classList.remove("active");
      const selectList = dropdown.nextElementSibling;
      if (selectList) {
        selectList.style.display = "none";
      }
    });
  };

  const toggleDropdown = (element) => {
    closeAllDropdowns(); // Close all dropdowns first
    element.classList.toggle("active");
    const selectList = element.nextElementSibling;
    if (selectList) {
      selectList.style.display = selectList.style.display === "block" ? "none" : "block";
    }
  };

  select.addEventListener("click", function () {
    toggleDropdown(this);
  });

  selectItems.forEach(item => {
    item.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      toggleDropdown(select); // Close the dropdown
      filterFunc(selectedValue);
    });
  });

  const filterFunc = (selectedValue) => {
    filterItems.forEach(item => {
      if (selectedValue === "all") {
        item.classList.add("active");
      } else if (selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });

})();




// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event listener to form button
formBtn.addEventListener("click", function (event) {
  // Check if phone number input is empty
  const phoneNumberInput = document.querySelector("[name='number']");
  const phoneNumber = phoneNumberInput.value.trim();
  
  if (!phoneNumber) {
    // If phone number is not provided, ask for confirmation
    const confirmation = confirm("Phone number is not provided. Are you sure you want to send the message without a phone number?");
    
    if (!confirmation) {
      event.preventDefault(); // Prevent form submission
    }
  }
});




// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === "certifications") {
        if (pages[j].dataset.page === "blog") {
          pages[j].classList.add("active");
          navigationLinks[j].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[j].classList.remove("active");
          navigationLinks[j].classList.remove("active");
        }
      } else if (this.innerHTML.toLowerCase() === "connections" && pages[j].dataset.page === "portfolio") {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

//project in about me
// custom select variables
// Namespace for script2
const script2 = (() => {
  const projectSelect = document.querySelector("[project-select]");
  const projectSelectItems = document.querySelectorAll("[project-select-item]");
  const projectSelectValue = document.querySelector("[project-select-value]");
  const projectFilterBtn = document.querySelectorAll("[project-filter-btn]");
  const projectFilterItems = document.querySelectorAll("[project-filter-item]");

  // Close all dropdowns
  const closeAllDropdowns = () => {
    document.querySelectorAll("[project-select]").forEach(dropdown => {
      dropdown.classList.remove("active");
      const selectList = dropdown.nextElementSibling;
      if (selectList) {
        selectList.style.display = "none";
      }
    });
  };

  const elementToggleFunc = (element) => {
    closeAllDropdowns(); // Close all dropdowns first
    element.classList.toggle("active");
    const selectList = element.nextElementSibling;
    if (selectList) {
      selectList.style.display = selectList.style.display === "block" ? "none" : "block";
    }
  };

  projectSelect.addEventListener("click", function () {
    elementToggleFunc(this);
  });

  projectSelectItems.forEach(item => {
    item.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      projectSelectValue.innerText = this.innerText;
      elementToggleFunc(projectSelect);
      projectFilterFunc(selectedValue);
    });
  });

  const projectFilterFunc = (selectedValue) => {
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
      const selectedValue = this.innerText.toLowerCase();
      projectSelectValue.innerText = this.innerText;
      projectFilterFunc(selectedValue);

      lastTouchedButton.classList.remove("active");
      this.classList.add("active");
      lastTouchedButton = this;
    });
  });

})();
