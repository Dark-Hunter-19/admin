  // URL for the social links data in Firebase
  const socialUrl = 'https://ganesh-portfolio-01-default-rtdb.firebaseio.com/Social.json';

  // Fetch data from Firebase
  fetch(socialUrl)
    .then(response => response.json())
    .then(socialData => {
      insertSocialLinks(socialData); // Insert social links into HTML
    })
    .catch(error => {
      console.error('Error fetching social data:', error);
    });
  
  function insertSocialLinks(socialData) {
    const socialList = document.querySelector('.social-list'); // Get the <ul> element
  
    // Loop through the socialData object
    for (const platform in socialData) {
      if (socialData.hasOwnProperty(platform)) {
        const socialLink = socialData[platform];
  
        // Create <li> element
        const listItem = document.createElement('li');
        listItem.classList.add('social-item');
  
        // Create <a> element
        const linkElement = document.createElement('a');
        linkElement.classList.add('social-link');
        linkElement.href = socialLink;
        linkElement.target = '_blank';
  
        // Create <img> element
        const imgElement = document.createElement('img');
        imgElement.src = `./assets/images/logo/${platform}.png`; // Replace platform name with key
        imgElement.alt = platform; // Use the platform name as alt text
        imgElement.width = 18; // Set image width
  
        // Append <img> to <a>, and <a> to <li>
        linkElement.appendChild(imgElement);
        listItem.appendChild(linkElement);
  
        // Append <li> to the <ul> (social-list)
        socialList.appendChild(listItem);
      }
    }
  }
