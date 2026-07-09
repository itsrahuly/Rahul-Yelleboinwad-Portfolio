// =============================
// TYPING ANIMATION
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}
// =============================

const skills = [
    "Java Full Stack Developer",
    "Java Developer",
    "Spring Boot ",
    "Hibernate & JPA",
    "HTML, CSS, JavaScript",
    "Angular",
    "React ",
    "MySQL r",
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
// MOBILE MENU

const menuBtn =
document.getElementById("menuBtn");

const navLinks =
document.getElementById("navLinks");

menuBtn.addEventListener(
"click",
() => {
    navLinks.classList.toggle("active");
});

// ================= CURRENT YEAR =================

document.getElementById("year")
.textContent =
new Date().getFullYear();

//new update 7-9-2026

.menu-toggle {
    display: none;
    font-size: 30px;
    cursor: pointer;
}

.close-btn {
    font-size: 30px;
    text-align: right;
    cursor: pointer;
    list-style: none;
}

@media(max-width:768px) {

    .menu-toggle {
        display: block;
    }

    .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: 250px;
        height: 100vh;
        background: white;
        flex-direction: column;
        transition: 0.3s;
        padding-top: 50px;
    }

    .nav-links.active {
        right: 0;
    }
}
