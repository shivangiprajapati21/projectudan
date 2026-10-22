```javascript
/* =====================================================
   PROJECT UDAAN
   Designed by Shivangi Prajapati,
   Divyanshi Yadav & Deeksha Saxene
   ===================================================== */


/* ================= PAGE LOAD ================= */

document.addEventListener("DOMContentLoaded", () => {

    // Add page loaded class
    document.body.classList.add("page-loaded");

    // Initialize scroll animations
    initializeScrollAnimations();

});


/* ================= EXPLORE ISSUE ================= */

function showProblem(problemName) {

    const messages = {

        "Infrastructure":
            "Good infrastructure creates a better learning environment. Students can help identify issues related to classrooms, laboratories, seating and campus facilities.",

        "Academic Support":
            "Academic support includes access to learning resources, practical exposure, guidance, doubt-solving and opportunities beyond the classroom.",

        "Cleanliness":
            "A clean campus improves health, comfort and student experience. UDAAN encourages students to identify cleanliness and waste-management issues.",

        "Communication":
            "Students need easy access to important notices, events, opportunities and updates. Better communication can create a more connected campus.",

        "Digital Access":
            "Technology is an important part of modern education. Internet connectivity, digital resources and access to technology can improve learning.",

        "Campus Environment":
            "A greener and healthier campus benefits everyone. Students can contribute ideas related to sustainability, greenery and environmental awareness."
    };


    const message =
        messages[problemName] ||
        "Every campus problem deserves to be heard and understood.";

    showModal(problemName, message);
}


/* ================= MODAL ================= */

function showModal(title, message) {

    // Remove existing modal
    const oldModal = document.querySelector(".uda an-modal");

    if (oldModal) {
        oldModal.remove();
    }


    const modal = document.createElement("div");

    modal.className = "udaan-modal";

    modal.innerHTML = `
        <div class="modal-overlay"></div>

        <div class="modal-box">

            <button class="modal-close" aria-label="Close">
                ×
            </button>

            <div class="modal-icon">
                💡
            </div>

            <span class="modal-label">
                UDAAN INSIGHT
            </span>

            <h3>${title}</h3>

            <p>${message}</p>

            <button class="modal-action">
                Share Your Experience →
            </button>

        </div>
    `;

    document.body.appendChild(modal);


    // Close button
    modal.querySelector(".modal-close")
        .addEventListener("click", closeModal);


    // Overlay click
    modal.querySelector(".modal-overlay")
        .addEventListener("click", closeModal);


    // Share experience button
    modal.querySelector(".modal-action")
        .addEventListener("click", () => {

            closeModal();

            document.querySelector("#voice")
                .scrollIntoView({
                    behavior: "smooth"
                });

            setTimeout(() => {
                document.querySelector("#problemText").focus();
            }, 700);

        });


    // Escape key
    document.addEventListener("keydown", escapeModal);

}


function closeModal() {

    const modal = document.querySelector(".udaan-modal");

    if (modal) {
        modal.classList.add("closing");

        setTimeout(() => {
            modal.remove();
        }, 250);
    }

    document.removeEventListener("keydown", escapeModal);
}


function escapeModal(event) {

    if (event.key === "Escape") {
        closeModal();
    }

}


/* ================= FORM ================= */

const problemForm = document.getElementById("problemForm");


if (problemForm) {

    problemForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("studentName").value.trim();

        const category =
            document.getElementById("category").value;

        const problem =
            document.getElementById("problemText").value.trim();


        // Validation
        if (!problem) {

            showNotification(
                "Please tell us about the problem or idea.",
                "error"
            );

            return;
        }


        if (!category) {

            showNotification(
                "Please select a category first.",
                "error"
            );

            return;
        }


        // Create submission object
        const submission = {

            name: name || "Anonymous Student",

            category: category,

            problem: problem,

            date: new Date().toLocaleString()

        };


        // Save to browser
        saveSubmission(submission);


        // Reset form
        problemForm.reset();


        // Success message
        showSuccessMessage(submission);

    });

}


/* ================= SAVE SUBMISSION ================= */

function saveSubmission(submission) {

    let submissions =
        JSON.parse(
            localStorage.getItem("udaanSubmissions")
        ) || [];


    submissions.push(submission);


    localStorage.setItem(
        "udaanSubmissions",
        JSON.stringify(submissions)
    );

}


/* ================= SUCCESS MESSAGE ================= */

function showSuccessMessage(submission) {

    const existing =
        document.querySelector(".success-message");

    if (existing) {
        existing.remove();
    }


    const success = document.createElement("div");

    success.className = "success-message";


    success.innerHTML = `

        <div class="success-icon">
            ✓
        </div>

        <div>
            <strong>
                Your voice has been heard! ✨
            </strong>

            <p>
                Thank you for helping make our campus better.
            </p>
        </div>

        <button class="success-close">
            ×
        </button>

    `;


    document.body.appendChild(success);


    success
        .querySelector(".success-close")
        .addEventListener("click", () => {

            success.classList.add("hide");

            setTimeout(() => {
                success.remove();
            }, 300);

        });


    // Automatically hide
    setTimeout(() => {

        if (document.body.contains(success)) {

            success.classList.add("hide");

            setTimeout(() => {
                success.remove();
            }, 300);

        }

    }, 5000);

}


/* ================= NOTIFICATION ================= */

function showNotification(message, type = "info") {

    const notification =
        document.createElement("div");

    notification.className =
        `notification ${type}`;


    notification.innerHTML = `

        <span>
            ${type === "error" ? "!" : "i"}
        </span>

        <p>${message}</p>

    `;


    document.body.appendChild(notification);


    setTimeout(() => {

        notification.classList.add("hide");

        setTimeout(() => {
            notification.remove();
        }, 300);

    }, 3500);

}


/* ================= SCROLL ANIMATIONS ================= */

function initializeScrollAnimations() {

    const elements =
        document.querySelectorAll(
            ".problem-card, .step, .team-card, .stat"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    elements.forEach((element, index) => {

        element.style.transitionDelay =
            `${index * 70}ms`;

        observer.observe(element);

    });

}


/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".navbar nav a");


window.addEventListener("scroll", () => {

    let currentSection = "";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* ================= SMOOTH NAVIGATION ================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener("click", function(event) {

        const targetID =
            this.getAttribute("href");


        if (targetID === "#") {
            return;
        }


        const target =
            document.querySelector(targetID);


        if (target) {

            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* ================= TEXTAREA CHARACTER COUNTER ================= */

const textarea =
    document.getElementById("problemText");


if (textarea) {

    const counter =
        document.createElement("div");

    counter.className =
        "character-counter";

    counter.textContent =
        "0 / 500 characters";


    textarea.parentNode.insertBefore(
        counter,
        textarea.nextSibling
    );


    textarea.setAttribute(
        "maxlength",
        "500"
    );


    textarea.addEventListener("input", () => {

        const length =
            textarea.value.length;


        counter.textContent =
            `${length} / 500 characters`;

    });

}


/* ================= BACK TO TOP ================= */

const backToTop =
    document.createElement("button");


backToTop.className =
    "back-to-top";

backToTop.innerHTML =
    "↑";

backToTop.setAttribute(
    "aria-label",
    "Back to top"
);


document.body.appendChild(backToTop);


window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* ================= CONSOLE MESSAGE ================= */

console.log(
    "%c✦ PROJECT UDAAN",
    "font-size: 22px; font-weight: bold; color: #7656d6;"
);

console.log(
    "%cFrom Campus Problems to Campus Solutions.",
    "font-size: 13px; color: #777487;"
);

console.log(
    "%cDesigned by Shivangi Prajapati, Divyanshi Yadav & Deeksha Saxene",

    "font-size: 12px; color: #5940ad;"
);
```
```javascript
/* =====================================================
   CAMPUS PULSE VOTING SYSTEM
   ===================================================== */

const defaultVotes = {
    infrastructure: 0,
    academics: 0,
    cleanliness: 0,
    communication: 0
};


// Get saved votes
function getVotes() {

    const saved =
        localStorage.getItem("udaanVotes");

    return saved
        ? JSON.parse(saved)
        : { ...defaultVotes };
}


// Save votes
function saveVotes(votes) {

    localStorage.setItem(
        "udaanVotes",
        JSON.stringify(votes)
    );
}


// Update complete poll
function updatePoll() {

    const votes = getVotes();

    const total =
        Object.values(votes)
            .reduce(
                (sum, value) => sum + value,
                0
            );


    document.getElementById("totalVotes")
        .textContent = total;


    Object.keys(votes).forEach((category) => {

        const count = votes[category];

        const percentage =
            total === 0
                ? 0
                : Math.round(
                    (count / total) * 100
                );


        const voteText =
            document.getElementById(
                `votes-${category}`
            );

        const percentageText =
            document.getElementById(
                `percent-${category}`
            );

        const progress =
            document.getElementById(
                `progress-${category}`
            );


        if (voteText) {

            voteText.textContent =
                `${count} vote${count !== 1 ? "s" : ""}`;

        }


        if (percentageText) {

            percentageText.textContent =
                `${percentage}%`;

        }


        if (progress) {

            progress.style.width =
                `${percentage}%`;

        }

    });

}


// Vote function
function vote(category) {

    const alreadyVoted =
        localStorage.getItem(
            "udaanUserVoted"
        );


    if (alreadyVoted) {

        showNotification(
            "You have already voted. Thank you for sharing your voice!",
            "info"
        );

        return;
    }


    const votes = getVotes();

    votes[category]++;

    saveVotes(votes);


    // Remember that this browser has voted
    localStorage.setItem(
        "udaanUserVoted",
        "true"
    );


    updatePoll();


    // Change button state
    const buttons =
        document.querySelectorAll(".vote-btn");


    buttons.forEach((button) => {

        button.classList.remove("voted");

        button.textContent =
            "Vote for this issue";

    });


    const clickedButton =
        event.currentTarget;

    clickedButton.classList.add("voted");

    clickedButton.textContent =
        "✓ Your Vote";


    showNotification(
        "Thank you! Your vote has been recorded.",
        "success"
    );

}


// Load poll when page opens
document.addEventListener(
    "DOMContentLoaded",
    updatePoll
);
```
