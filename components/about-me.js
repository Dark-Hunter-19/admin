    // URL of the Firebase Realtime Database
    const databaseUrl = 'https://ganesh-portfolio-01-default-rtdb.firebaseio.com/About.json';

    // Fetch the About content from Firebase Realtime Database
    fetch(databaseUrl)
      .then(response => response.json())
      .then(data => {
        // Get the About-Content from the data
        const aboutContent = data['About-Content'];
        
        // Check if the content exists and update the DOM
        if (aboutContent) {
          // Select the <p> tag inside the <section class="about-text">
          const aboutSection = document.querySelector('.about-text p');
          
          // Update the content of the <p> tag using innerHTML to render HTML tags
          aboutSection.innerHTML = aboutContent;
        } else {
          console.error('About-Content not found in the data.');
        }
      })
      .catch(error => {
        console.error('Error fetching About-Content:', error);
      });
    
