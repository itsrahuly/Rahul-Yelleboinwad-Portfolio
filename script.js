
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
    "MySQL",
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

    // Increase or decrease character count
    charIndex += isDeleting ? -1 : 1;

    typingElement.textContent =
        currentSkill.substring(0, charIndex);

    let delay = isDeleting ? 50 : 100;

    // When typing is complete
    if (!isDeleting && charIndex === currentSkill.length) {

        isDeleting = true;
        delay = 1500;

    }

    // When deleting is complete
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
const navLinks = document.getElementById("navLinks");

function openNavigation() {

    if (!menuBtn || !navLinks) return;

    navLinks.classList.add("active");

    document.body.classList.add("menu-open");

    menuBtn.textContent = "×";

    menuBtn.setAttribute("aria-expanded", "true");

    menuBtn.setAttribute("aria-label", "Close navigation");

}

function closeNavigation() {

    if (!menuBtn || !navLinks) return;

    navLinks.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuBtn.textContent = "☰";

    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.setAttribute("aria-label", "Open navigation");

}


// Toggle mobile menu
if (menuBtn && navLinks) {

    menuBtn.setAttribute("role", "button");

    menuBtn.setAttribute("tabindex", "0");

    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.setAttribute("aria-label", "Open navigation");

    menuBtn.addEventListener("click", function () {

        if (navLinks.classList.contains("active")) {

            closeNavigation();

        } else {

            openNavigation();

        }

    });


    // Keyboard accessibility
    menuBtn.addEventListener("keydown", function (event) {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();

            menuBtn.click();

        }

    });


    // Close menu after clicking navigation links
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeNavigation);

    });


    // Close menu when clicking outside
    document.addEventListener("click", function (event) {

        if (
            navLinks.classList.contains("active") &&
            !navLinks.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            closeNavigation();

        }

    });


    // Close menu using Escape key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeNavigation();

        }

    });


    // Close mobile menu when switching to desktop
    window.addEventListener("resize", function () {

        if (window.innerWidth > 991) {

            closeNavigation();

        }

    });

}


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


        // Validate empty fields
        if (!name || !email || !subject || !message) {

            alert("Please fill in all fields.");

            return;

        }


        // Prepare email details
        const mailSubject = encodeURIComponent(subject);

        const mailBody = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );


        // Create email link
        const mailtoLink =
            "mailto:rahulyelleboinwad@gmail.com" +
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

    // Show loading message
    githubContainer.textContent = "Loading Projects...";

    try {

        const response = await fetch(
            `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`
        );


        // Check API response
        if (!response.ok) {

            throw new Error("Unable to fetch GitHub repositories.");

        }


        const repos = await response.json();


        // Remove forked repositories
        const projects = repos
            .filter(repo => !repo.fork)
            .sort((a, b) =>
                new Date(b.updated_at) - new Date(a.updated_at)
            )
            .slice(0, 6);


        // Clear previous content
        githubContainer.replaceChildren();


        // Check available projects
        if (projects.length === 0) {

            githubContainer.textContent =
                "No projects available.";

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
                repo.description || "No description available.";


            // Programming language
            const language = document.createElement("p");

            language.className = "project-language";

            language.textContent =
                "Technology: " + (repo.language || "Not specified");


            // GitHub link
            const link = document.createElement("a");

            link.href = repo.html_url;

            link.target = "_blank";

            link.rel = "noopener noreferrer";

            link.className = "btn outline";

            link.textContent = "View on GitHub";


            // Add elements to card
            card.appendChild(title);

            card.appendChild(description);

            card.appendChild(language);

            card.appendChild(link);


            // Add card to projects section
            githubContainer.appendChild(card);

        });

    }

    catch (error) {

        console.error("GitHub Projects Error:", error);

        githubContainer.textContent =
            "Unable to load projects. Please visit my GitHub profile.";

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
