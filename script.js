/* =========================================================
   PROJECT UDAAN - COMPLETE SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. INITIAL SETUP
       ===================================================== */

    console.log(
        "%c PROJECT UDAAN 🚀 ",
        "background:#171225;color:#b9d66b;font-size:18px;font-weight:bold;padding:8px 15px;border-radius:8px;"
    );

    console.log(
        "%cFrom Campus Problems to Solutions.",
        "color:#7357d9;font-size:14px;font-weight:bold;"
    );


    /* =====================================================
       2. PROBLEM DATA
       ===================================================== */

    window.problemData = {

        "Infrastructure": {
            icon: "🏫",
            title: "Infrastructure",
            description:
                "Students may face challenges related to classrooms, seating, campus facilities, washrooms, study spaces and other physical infrastructure.",
            solution:
                "Regular student feedback, facility audits and a simple issue-reporting system can help identify and prioritize infrastructure improvements."
        },

        "Academic Support": {
            icon: "📚",
            title: "Academic Support",
            description:
                "Students need easy access to notes, study resources, academic guidance, doubt support and important academic information.",
            solution:
                "A centralized academic resource hub can bring notes, announcements, study material and support resources together."
        },

        "Cleanliness": {
            icon: "♻️",
            title: "Cleanliness",
            description:
                "Waste management, cleanliness around common areas and awareness about responsible disposal can affect campus life.",
            solution:
                "More visible waste points, awareness campaigns and student participation can create a cleaner campus."
        },

        "Communication": {
            icon: "📢",
            title: "Communication",
            description:
                "Important notices and announcements can sometimes be scattered across different channels.",
            solution:
                "A centralized campus communication hub can make important announcements easier to access."
        },

        "Digital Access": {
            icon: "💻",
            title: "Digital Access",
            description:
                "Students increasingly depend on digital systems for learning, communication and campus services.",
            solution:
                "Improved digital resources and a unified student platform can make access easier and faster."
        },

        "Campus Environment": {
            icon: "🌱",
            title: "Campus Environment",
            description:
                "Students need a campus environment that feels green, safe, comfortable and welcoming.",
            solution:
                "Green spaces, cleanliness drives, seating areas and student-led environment initiatives can improve campus experience."
        }

    };


    /* =====================================================
       3. SHOW PROBLEM POPUP
       ===================================================== */

    window.showProblem = function(problemName) {

        const problem = window.problemData[problemName];

        if (!problem) {
            return;
        }

        const oldModal = document.querySelector(".udaan-modal");

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
                    ${problem.icon}
                </div>

                <span class="modal-label">
                    CAMPUS CHALLENGE
                </span>

                <h2>
                    ${problem.title}
                </h2>

                <p>
                    ${problem.description}
                </p>

                <div class="modal-solution">

                    <span>
                        💡 POSSIBLE SOLUTION
                    </span>

                    <p>
                        ${problem.solution}
                    </p>

                </div>

                <a
                    href="#voice"
                    class="modal-action"
                    onclick="closeProblemModal()"
                >
                    Share Your Idea →
                </a>

            </div>
        `;


        document.body.appendChild(modal);


        requestAnimationFrame(() => {
            modal.classList.add("show");
        });


        const closeButton =
            modal.querySelector(".modal-close");

        const overlay =
            modal.querySelector(".modal-overlay");


        closeButton.addEventListener(
            "click",
            closeProblemModal
        );

        overlay.addEventListener(
            "click",
            closeProblemModal
        );


        document.body.style.overflow = "hidden";
    };


    /* =====================================================
       4. CLOSE PROBLEM MODAL
       ===================================================== */

    window.closeProblemModal = function() {

        const modal =
            document.querySelector(".udaan-modal");

        if (!modal) {
            return;
        }

        modal.classList.remove("show");

        setTimeout(() => {
            modal.remove();
        }, 250);

        document.body.style.overflow = "";
    };


    /* =====================================================
       5. ESC KEY FOR MODAL
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeProblemModal();
        }

    });


    /* =====================================================
       6. CAMPUS PULSE
       ===================================================== */

    const defaultVotes = {

        infrastructure: 0,
        academics: 0,
        cleanliness: 0,
        communication: 0

    };


    function getVotes() {

        try {

            const saved =
                localStorage.getItem("udaanVotes");

            if (!saved) {
                return { ...defaultVotes };
            }

            return {
                ...defaultVotes,
                ...JSON.parse(saved)
            };

        } catch (error) {

            console.log(
                "Unable to read saved votes."
            );

            return { ...defaultVotes };
        }
    }


    function saveVotes(votes) {

        try {

            localStorage.setItem(
                "udaanVotes",
                JSON.stringify(votes)
            );

        } catch (error) {

            console.log(
                "Unable to save votes."
            );

        }
    }


    function updatePoll() {

        const votes = getVotes();

        const total =
            Object.values(votes)
                .reduce(
                    (sum, value) => sum + value,
                    0
                );


        const totalVotes =
            document.getElementById("totalVotes");

        if (totalVotes) {
            totalVotes.textContent = total;
        }


        const categories = [
            "infrastructure",
            "academics",
            "cleanliness",
            "communication"
        ];


        categories.forEach(category => {

            const count =
                votes[category] || 0;

            const percentage =
                total === 0
                    ? 0
                    : Math.round(
                        (count / total) * 100
                    );


            const voteElement =
                document.getElementById(
                    `${category}Votes`
                );

            const percentElement =
                document.getElementById(
                    `${category}Percent`
                );

            const progressElement =
                document.getElementById(
                    `${category}Progress`
                );


            if (voteElement) {

                voteElement.textContent =
                    `${count} vote${count === 1 ? "" : "s"}`;

            }


            if (percentElement) {

                percentElement.textContent =
                    `${percentage}%`;

            }


            if (progressElement) {

                progressElement.style.width =
                    `${percentage}%`;

            }

        });


        updateTopIssue(votes);
    }


    /* =====================================================
       7. VOTE FUNCTION
       ===================================================== */

    window.vote = function(category, button) {

        const alreadyVoted =
            localStorage.getItem(
                "udaanUserVoted"
            );


        if (alreadyVoted === "true") {

            showNotification(
                "You have already voted! 💜"
            );

            return;
        }


        const votes = getVotes();


        if (
            typeof votes[category] === "undefined"
        ) {

            return;
        }


        votes[category]++;


        saveVotes(votes);


        localStorage.setItem(
            "udaanUserVoted",
            "true"
        );


        if (button) {

            button.classList.add("voted");

            button.innerHTML =
                "✓ Vote Submitted";

        }


        updatePoll();


        showNotification(
            "Your vote has been recorded! 🚀"
        );


        document.querySelectorAll(".vote-btn")
            .forEach(btn => {

                if (btn !== button) {

                    btn.disabled = true;
                    btn.style.opacity = "0.5";
                    btn.style.cursor = "not-allowed";

                }

            });

    };


    /* =====================================================
       8. TOP CAMPUS ISSUE
       ===================================================== */

    function updateTopIssue(votes) {

        const entries =
            Object.entries(votes);


        if (!entries.length) {
            return;
        }


        entries.sort(
            (a, b) => b[1] - a[1]
        );


        const topCategory =
            entries[0][0];


        const topVotes =
            entries[0][1];


        if (topVotes === 0) {
            return;
        }


        const names = {

            infrastructure:
                "Infrastructure",

            academics:
                "Academic Support",

            cleanliness:
                "Cleanliness",

            communication:
                "Communication"

        };


        console.log(
            `Top Campus Issue: ${names[topCategory]}`
        );

    }


    updatePoll();


    /* =====================================================
       9. VOICE FORM
       ===================================================== */

    const voiceForm =
        document.getElementById("voiceForm");


    if (voiceForm) {

        voiceForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                const studentName =
                    document.getElementById(
                        "studentName"
                    )?.value.trim();


                const category =
                    document.getElementById(
                        "category"
                    )?.value;


                const problemIdea =
                    document.getElementById(
                        "problemIdea"
                    )?.value.trim();


                if (!category || !problemIdea) {

                    showNotification(
                        "Please fill the required fields."
                    );

                    return;
                }


                const submission = {

                    id:
                        Date.now(),

                    name:
                        studentName ||
                        "Anonymous Student",

                    category:
                        category,

                    idea:
                        problemIdea,

                    date:
                        new Date()
                            .toLocaleString()

                };


                saveSubmission(
                    submission
                );


                voiceForm.reset();


                updateCharacterCounter();


                showSuccessMessage();


                showNotification(
                    "Your voice has been submitted! 💜"
                );

            }
        );

    }


    /* =====================================================
       10. SAVE SUBMISSION
       ===================================================== */

    function saveSubmission(submission) {

        try {

            const oldSubmissions =
                JSON.parse(
                    localStorage.getItem(
                        "udaanSubmissions"
                    )
                ) || [];


            oldSubmissions.push(
                submission
            );


            localStorage.setItem(
                "udaanSubmissions",
                JSON.stringify(
                    oldSubmissions
                )
            );


        } catch (error) {

            console.log(
                "Unable to save submission."
            );

        }

    }


    /* =====================================================
       11. SUCCESS MESSAGE
       ===================================================== */

    function showSuccessMessage() {

        const oldMessage =
            document.querySelector(
                ".success-message"
            );


        if (oldMessage) {
            oldMessage.remove();
        }


        const message =
            document.createElement("div");


        message.className =
            "success-message";


        message.innerHTML = `

            <div class="success-icon">
                ✓
            </div>

            <div>
                <strong>
                    Thank you for speaking up!
                </strong>

                <p>
                    Your idea has been added to the
                    UDAAN prototype.
                </p>
            </div>

        `;


        const form =
            document.querySelector(
                ".voice-form"
            );


        if (form) {

            form.parentNode.insertBefore(
                message,
                form
            );

        }


        setTimeout(() => {

            message.classList.add(
                "visible"
            );

        }, 50);


        setTimeout(() => {

            message.classList.remove(
                "visible"
            );

            setTimeout(() => {

                message.remove();

            }, 300);

        }, 5000);

    }


    /* =====================================================
       12. NOTIFICATION
       ===================================================== */

    window.showNotification =
        function(text) {

            const oldNotification =
                document.querySelector(
                    ".notification"
                );


            if (oldNotification) {
                oldNotification.remove();
            }


            const notification =
                document.createElement(
                    "div"
                );


            notification.className =
                "notification";


            notification.innerHTML = `

                <span class="notification-dot">
                    ✓
                </span>

                <span>
                    ${text}
                </span>

            `;


            document.body.appendChild(
                notification
            );


            setTimeout(() => {

                notification.classList.add(
                    "show"
                );

            }, 50);


            setTimeout(() => {

                notification.classList.remove(
                    "show"
                );


                setTimeout(() => {

                    notification.remove();

                }, 300);

            }, 3000);

        };


    /* =====================================================
       13. CHARACTER COUNTER
       ===================================================== */

    const textarea =
        document.getElementById(
            "problemIdea"
        );


    const counter =
        document.querySelector(
            ".character-counter"
        );


    function updateCharacterCounter() {

        if (!textarea || !counter) {
            return;
        }


        const length =
            textarea.value.length;


        counter.textContent =
            `${length} / 500`;


        if (length > 450) {

            counter.style.color =
                "#f4a261";

        } else {

            counter.style.color =
                "";

        }

    }


    if (textarea) {

        textarea.addEventListener(
            "input",
            updateCharacterCounter
        );


        updateCharacterCounter();

    }


    /* =====================================================
       14. SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".problem-card, .voice-card, .impact-card, .team-card, .process-step, .solution-box"
        );


    revealElements.forEach(element => {

        element.classList.add(
            "scroll-reveal"
        );

    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {
                observer.observe(element);
            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       15. ACTIVE NAVBAR
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    function updateActiveNav() {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;


            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute("href");


            if (
                href === `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    updateActiveNav();


    /* =====================================================
       16. SMOOTH NAVIGATION
       ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );


                if (
                    targetId === "#" ||
                    targetId === "#!"
                ) {

                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const navbarHeight =
                    document.querySelector(
                        ".navbar"
                    )?.offsetHeight || 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    navbarHeight;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });

            }
        );

    });


    /* =====================================================
       17. BACK TO TOP BUTTON
       ===================================================== */

    const backToTop =
        document.createElement(
            "button"
        );


    backToTop.className =
        "back-to-top";


    backToTop.innerHTML =
        "↑";


    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );


    document.body.appendChild(
        backToTop
    );


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 600) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    /* =====================================================
       18. PREVENT FORM RESUBMISSION
       ===================================================== */

    window.addEventListener(
        "pageshow",
        () => {

            if (
                window.location.hash ===
                "#voice"
            ) {

                updateCharacterCounter();

            }

        }
    );


    /* =====================================================
       19. INITIAL UI CHECK
       ===================================================== */

    setTimeout(() => {

        updatePoll();
        updateActiveNav();
        updateCharacterCounter();

    }, 100);


});
