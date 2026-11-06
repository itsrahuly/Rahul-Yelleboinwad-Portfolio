
/* =====================================
   PORTFOLIO JAVASCRIPT
===================================== */


/* =====================================
   1. TYPING ANIMATION
===================================== */

const skills = [
    "Java Full Stack Developer",
    "Java Developer",
    "Spring Boot Developer",
    "Hibernate & JPA",
    "HTML, CSS, JavaScript",
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

    if (isDeleting) {

        charIndex--;

    } else {

        charIndex++;

    }

    typingElement.textContent =
        currentSkill.substring(0, charIndex);

    let delay = isDeleting ? 45 : 100;

    if (!isDeleting && charIndex === currentSkill.length) {

        delay = 1500;
        isDeleting = true;

    } else if (isDeleting && charIndex === 0) {

        isDeleting = false;

        skillIndex = (skillIndex + 1) % skills.length;

        delay = 400;

    }

    setTimeout(typeEffect, delay);
}

typeEffect();


/* =====================================
   2. RESPONSIVE NAVIGATION
===================================== */

const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const navLinks = document.getElementById("navLinks");
const navOverlay = document.getElementById("navOverlay");


function openNavigation() {

    navLinks.classList.add("active");

    navOverlay.classList.add("active");

    document.body.classList.add("menu-open");

    menuBtn.setAttribute("aria-expanded", "true");

    menuBtn.setAttribute("aria-label", "Navigation menu open");

}


function closeNavigation() {

    navLinks.classList.remove("active");

    navOverlay.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.setAttribute("aria-label", "Open navigation");

}


// Open menu
menuBtn.addEventListener("click", function () {

    if (navLinks.classList.contains("active")) {

        closeNavigation();

    } else {

        openNavigation();

    }

});


// Close button
closeMenu.addEventListener("click", closeNavigation);


// Close when clicking outside
navOverlay.addEventListener("click", closeNavigation);


// Close after clicking navigation links
navLinks.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

        closeNavigation();

    });

});


// Close using Escape key
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeNavigation();

    }

});


// Reset navigation when switching to desktop
window.addEventListener("resize", function () {

    if (window.innerWidth > 991) {

        closeNavigation();

    }

});


/* =====================================
   3. CONTACT FORM
===================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();


        const mailSubject = encodeURIComponent(subject);

        const mailBody = encodeURIComponent(

            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message

        );


        const mailtoLink =
            "mailto:rahulyelleboinwad@gmail.com" +
            "?subject=" + mailSubject +
            "&body=" + mailBody;


        window.location.href = mailtoLink;

    });

}


/* =====================================
   4. GITHUB PROJECTS
===================================== */

const username = "itsrahuly";

const githubContainer =
    document.getElementById("github-projects");


async function loadGitHubProjects() {

    if (!githubContainer) return;

    try {

        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        );

        if (!response.ok) {

            throw new Error("GitHub API request failed");

        }

        const repos = await response.json();

        githubContainer.innerHTML = "";

        const projects = repos
            .filter(repo => !repo.fork)
            .slice(0, 6);


        if (projects.length === 0) {

            githubContainer.textContent =
                "No projects available.";

            return;

        }


        projects.forEach(repo => {

            const card = document.createElement("div");

            card.className = "project-card";


            const title = document.createElement("h3");

            title.textContent = repo.name;


            const description = document.createElement("p");

            description.textContent =
                repo.description || "No description available";


            const language = document.createElement("p");

            language.textContent =
                "Technology: " + (repo.language || "Not specified");


            const link = document.createElement("a");

            link.href = repo.html_url;

            link.target = "_blank";

            link.rel = "noopener noreferrer";

            link.className = "btn outline";

            link.textContent = "View on GitHub";


            card.appendChild(title);

            card.appendChild(description);

            card.appendChild(language);

            card.appendChild(link);


            githubContainer.appendChild(card);

        });

    } catch (error) {

        console.error("GitHub Projects Error:", error);

        githubContainer.textContent =
            "Unable to load projects. Please visit my GitHub profile.";

    }

}

loadGitHubProjects();


/* =====================================
   5. CURRENT YEAR
===================================== */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =====================================
   END OF PORTFOLIO JAVASCRIPT
===================================== */
