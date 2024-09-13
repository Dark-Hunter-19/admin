// Your Firebase Realtime Database URL
const databaseURL = 'https://ganesh-portfolio-01-default-rtdb.firebaseio.com/Certifications.json';

// Base URL for Firebase Storage
const storageBaseURL = 'https://firebasestorage.googleapis.com/v0/b/ganesh-portfolio-01.appspot.com/o/';

// Function to fetch data and update HTML
async function fetchAndUpdateCertifications() {
    try {
        // Fetch data from Firebase Realtime Database
        const response = await fetch(databaseURL);
        const certifications = await response.json();
        
        // Get the article element and header
        const article = document.querySelector('article.blog[data-page="blog"]');
        const header = article.querySelector('header');

        if (certifications && article && header) {
            // Create a container for the blog posts
            const ul = document.createElement('ul');
            ul.className = 'blog-posts-list';

            // Iterate over each certification
            for (const key in certifications) {
                if (certifications.hasOwnProperty(key)) {
                    const cert = certifications[key];
                    
                    // Construct the image URL
                    const encodedFileName = encodeURIComponent(`Certifications/${cert['File-Name']}`);
                    const imageURL = `${storageBaseURL}${encodedFileName}?alt=media`;

                    // Create a list item for each certification
                    const li = document.createElement('li');
                    li.className = 'blog-post-item';

                    // Create the inner HTML structure
                    li.innerHTML = `
                        <a href="${cert['Certi-Link']}" target="_blank">
                            <figure class="blog-banner-box">
                                <img src="${imageURL}" alt="${cert['Title']}" loading="lazy">
                            </figure>
                            <div class="blog-content">
                                <div class="blog-meta">
                                    <p class="blog-category">${cert['Provider']}</p>
                                    <span class="dot"></span>
                                    <time datetime="${new Date(cert['Completion-Date']).toISOString()}">${cert['Completion-Date']}</time>
                                </div>
                                <h3 class="h3 blog-item-title">${cert['Title']}</h3>
                                <p class="blog-text">${cert['Message']}</p>
                            </div>
                        </a>
                    `;

                    // Append the list item to the unordered list
                    ul.appendChild(li);
                }
            }

            // Insert the new content after the header
            article.insertBefore(ul, header.nextSibling);
        }
    } catch (error) {
        console.error('Error fetching certifications:', error);
    }
}

// Fetch and update certifications on page load
window.onload = fetchAndUpdateCertifications;
