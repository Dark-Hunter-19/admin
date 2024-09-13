// Function to fetch data from Firebase Realtime Database and display the content
async function fetchAndDisplayResume() {
    try {
        // Fetch resume data from Firebase Realtime Database
        const response = await fetch('https://ganesh-portfolio-01-default-rtdb.firebaseio.com/Resume-SoftCopy.json');
        const data = await response.json();

        // Extract image and PDF file names
        const imageName = data['Resume-Image'];
        const pdfName = data['Resume-PDF'];

        // Construct Firebase Storage URLs using the filename and the format you specified
        const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/ganesh-portfolio-01.appspot.com/o/Resume%2F';
        const imageUrl = `${baseUrl}${encodeURIComponent(imageName)}?alt=media`;
        const pdfUrl = `${baseUrl}${encodeURIComponent(pdfName)}?alt=media`;

        // Create the new section element
        const newSection = document.createElement('section');
        newSection.innerHTML = `
            <h3 class="h3 skills-title">Soft Copy</h3>
            <li class="project-item active" data-filter-item data-category="web development">
                <a href="${pdfUrl}" target="_blank" id="pdf-link">
                    <figure class="project-img">
                        <div class="project-item-icon-box">
                            <ion-icon name="eye-outline"></ion-icon>
                        </div>
                        <img src="${imageUrl}" alt="Resume Image" loading="lazy">
                    </figure>
                </a>
            </li>
        `;

        // Find the <article> with class "resume"
        const resumeArticle = document.querySelector('article.resume[data-page="resume"]');

        // Append the new section at the end of the article
        if (resumeArticle) {
            resumeArticle.appendChild(newSection);
        } else {
            console.error('Resume article not found.');
        }
    } catch (error) {
        console.error('Error fetching the resume data:', error);
    }
}

// Call the function to fetch data and display it
fetchAndDisplayResume();
