
/* ==========================================
   RAHUL YELLEBOINWAD - PORTFOLIO JAVASCRIPT
========================================== */


/* ==========================================
   1. TYPING ANIMATION
========================================== */

const skills = [
    "Java Full Stack Developer",
    "Java Developer",
    "Spring Boot Developer",
    "Hibernate & JPA",
    "HTML, CSS & JavaScript",
    "Angular Developer",
    "React Developer",
    "MySQL Developer",
    "Servlet & JSP",
    "WordPress Developer"
];

const typingElement = document.getElementById("typing-text");

let skillIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    if (!typingElement) return;

    const currentSkill = skills[skillIndex];

    // Type or delete characters
    charIndex += isDeleting ? -1 : 1;

    typingElement.textContent =
        currentSkill.substring(0, charIndex);

    let delay = isDeleting ? 45 : 90;

    // Full text displayed
    if (!isDeleting && charIndex === currentSkill.length) {

        isDeleting = true;
        delay = 1800;

    }

    // Text completely deleted
    else if (isDeleting && charIndex === 0) {

        isDeleting = false;

        skillIndex = (skillIndex + 1) % skills.length;

        delay = 400;

    }

    setTimeout(typeEffect, delay);
}

if (typingElement) {
    typeEffect();
}


/* ==========================================
   2. RESPONSIVE MOBILE NAVIGATION
========================================== */

const menuBtn = document.getElementById("menuBtn");

const closeMenuBtn = document.getElementById("closeMenuBtn");

const navLinks = document.getElementById("navLinks");

const menuOverlay = document.getElementById("menuOverlay");


function openNavigation() {

    if (!menuBtn || !navLinks) return;

    navLinks.classList.add("active");

    if (menuOverlay) {
        menuOverlay.classList.add("active");
    }

    document.body.classList.add("menu-open");

    menuBtn.setAttribute("aria-expanded", "true");

    menuBtn.setAttribute("aria-label", "Close navigation");

}


function closeNavigation() {

    if (!menuBtn || !navLinks) return;

    navLinks.classList.remove("active");

    if (menuOverlay) {
        menuOverlay.classList.remove("active");
    }

    document.body.classList.remove("menu-open");

    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.setAttribute("aria-label", "Open navigation");

}


// Open menu
if (menuBtn) {

    menuBtn.addEventListener("click", openNavigation);

}


// Close menu
if (closeMenuBtn) {

    closeMenuBtn.addEventListener("click", closeNavigation);

}


// Close menu when clicking overlay
if (menuOverlay) {

    menuOverlay.addEventListener("click", closeNavigation);

}


// Close menu after clicking navigation links
if (navLinks) {

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeNavigation);

    });

}


// Close menu using Escape key
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeNavigation();

    }

});


// Close menu when switching to desktop
window.addEventListener("resize", function () {

    if (window.innerWidth > 900) {

        closeNavigation();

    }

});


/* ==========================================
   3. CONTACT FORM
========================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const subject = document.getElementById("subject").value.trim();

        const message = document.getElementById("message").value.trim();


        // Check empty fields
        if (!name || !email || !subject || !message) {

            alert("Please fill in all fields.");

            return;

        }


        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;

        }


        // Prepare email subject
        const mailSubject = encodeURIComponent(subject);

        // Prepare email body
        const mailBody = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );


        // Create mailto URL
        const mailtoLink =
            "mailto:yelleboinwadr@gmail.com" +
            "?subject=" + mailSubject +
            "&body=" + mailBody;


        // Open default email application
        window.location.href = mailtoLink;

    });

}


/* ==========================================
   4. GITHUB PROJECTS INTEGRATION
========================================== */

const githubUsername = "itsrahuly";

const githubContainer =
    document.getElementById("github-projects");


async function loadGitHubProjects() {

    if (!githubContainer) return;

    githubContainer.textContent = "Loading Projects...";

    try {

        const response = await fetch(
            `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`,
            {
                headers: {
                    "Accept": "application/vnd.github+json"
                }
            }
        );


        // Check API response
        if (!response.ok) {

            if (response.status === 403) {

                throw new Error(
                    "GitHub API rate limit exceeded. Please try again later."
                );

            }

            throw new Error(
                `GitHub API error: ${response.status}`
            );

        }


        const repos = await response.json();


        // Filter repositories
        const projects = repos

            .filter(repo =>
                !repo.fork &&
                !repo.archived &&
                !repo.disabled
            )

            .sort((a, b) =>
                new Date(b.updated_at) -
                new Date(a.updated_at)
            )

            .slice(0, 6);


        // Clear previous content
        githubContainer.replaceChildren();


        // Check projects
        if (projects.length === 0) {

            githubContainer.textContent =
                "No public projects available.";

            return;

        }


        // Create project cards
        projects.forEach(repo => {

            const card = document.createElement("div");

            card.className = "project-card";


            // Project title
            const title = document.createElement("h3");

            title.textContent = repo.name;


            // Project description
            const description = document.createElement("p");

            description.textContent =
                repo.description ||
                "Explore this project on GitHub.";


            // Technology
            const language = document.createElement("p");

            language.className = "project-language";

            language.textContent =
                "Technology: " +
                (repo.language || "Not specified");


            // GitHub link
            const link = document.createElement("a");

            link.href = repo.html_url;

            link.target = "_blank";

            link.rel = "noopener noreferrer";

            link.className = "btn outline";

            link.textContent = "View on GitHub";


            // Append elements
            card.appendChild(title);

            card.appendChild(description);

            card.appendChild(language);

            card.appendChild(link);


            // Add card
            githubContainer.appendChild(card);

        });

    }

    catch (error) {

        console.error("GitHub Projects Error:", error);

        githubContainer.textContent =
            "Unable to load projects. Please visit my GitHub profile.";

        // Create fallback GitHub link
        const githubLink = document.createElement("a");

        githubLink.href =
            `https://github.com/${githubUsername}`;

        githubLink.target = "_blank";

        githubLink.rel = "noopener noreferrer";

        githubLink.className = "btn outline";

        githubLink.textContent = "Visit My GitHub";


        githubContainer.appendChild(githubLink);

    }

}


// Load GitHub projects
loadGitHubProjects();


/* ==========================================
   5. AUTOMATIC COPYRIGHT YEAR
========================================== */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* ==========================================
   END OF PORTFOLIO JAVASCRIPT
========================================== */
