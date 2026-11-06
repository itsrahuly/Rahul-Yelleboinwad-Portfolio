// =============================
// TYPING ANIMATION
// =============================

const skills = [
    "Java Full Stack Developer",
    "Java Developer",
    "Spring Boot ",
    "Hibernate & JPA",
    "HTML, CSS, JavaScript",
    "Angular",
    "React ",
    "MySQL ",
    "Servlet & JSP",
    "WordPress "
];

let index = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement =
    document.getElementById("typing-text");

function typeEffect() {

    const currentSkill =
        skills[index];

    if (!isDeleting) {

        typingElement.textContent =
            currentSkill.substring(
                0,
                charIndex + 1
            );

        charIndex++;

        if (
            charIndex ===
            currentSkill.length
        ) {
            setTimeout(() => {
                isDeleting = true;
            }, 1200);
        }

    } else {

        typingElement.textContent =
            currentSkill.substring(
                0,
                charIndex - 1
            );

        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;

            index =
                (index + 1)
                % skills.length;
        }
    }

    setTimeout(
        typeEffect,
        isDeleting ? 50 : 100
    );
}

typeEffect();


// =============================
// CONTACT FORM
// =============================

document
.getElementById("contactForm")
.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const subject =
            document.getElementById("subject").value;

        const message =
            document.getElementById("message").value;

        const mailtoLink =
            `mailto:rahulyelleboinwad@gmail.com
            ?subject=${encodeURIComponent(subject)}
            &body=${encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\n\n" + message
            )}`;

        window.location.href =
            mailtoLink;
    }
);


// =============================
// GITHUB PROJECTS FETCH
// =============================

const username = "itsrahuly";

const container =
document.getElementById(
    "github-projects"
);

fetch(
`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
)

.then(response =>
    response.json()
)

.then(repos => {

    container.innerHTML = "";

    repos.forEach(repo => {

        if (repo.fork)
            return;

        const card =
            document.createElement("div");

        card.className =
            "project-card";

        card.innerHTML = `

            <h3>${repo.name}</h3>

            <p>
            ${repo.description ||
            "No description available"}
            </p>

            <br>

            <p>
                <strong>
                ${repo.language ||
                "Java Project"}
                </strong>
            </p>

            <br>

            <a
                href="${repo.html_url}"
                target="_blank"
                class="btn outline"
            >
                View on GitHub
            </a>
        `;

        container
        .appendChild(card);

    });

})

.catch(() => {

    container.innerHTML =
    `
    <p>
    Unable to load projects.
    </p>
    `;
});

// =====================================
// RESPONSIVE NAVIGATION FUNCTIONALITY
// =====================================

const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const navLinks = document.getElementById("navLinks");

function openNavigation() {
    navLinks.classList.add("active");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
}

function closeNavigation() {
    navLinks.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

// Open menu
menuBtn.addEventListener("click", openNavigation);

// Close menu
closeMenu.addEventListener("click", closeNavigation);

// Close after selecting any navigation link
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeNavigation);
});

// Close when clicking outside
document.addEventListener("click", function(event) {

    if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {
        closeNavigation();
    }

});

// Close using Escape key
document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeNavigation();
    }

});

// Close if resized to desktop
window.addEventListener("resize", function() {

    if (window.innerWidth > 991) {
        closeNavigation();
    }

});



// ================= CURRENT YEAR =================

document.getElementById("year")
.textContent =
new Date().getFullYear();

