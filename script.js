/* =========================================================
   PROJECT UDAAN - COMPLETE ENGINE SCRIPT.JS
   Comprehensive Campus Grievance, Tracking, Interactive Map,
   Analytics Dashboard, AI Chatbot, Hindi Support & Dark Mode
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. DEFAULT & INITIAL COMPLAINT DATABASE
       ===================================================== */
    const DEFAULT_COMPLAINTS = [
        {
            id: "UDN-1024",
            studentName: "Aakash Singh",
            studentRoll: "23BCE041",
            isAnonymous: false,
            category: "Digital Access",
            urgency: "High",
            location: "Central Library 2nd Floor",
            title: "WiFi router dead zone in research reading hall",
            description: "Students are unable to access IEEE journals and academic resources due to weak WiFi coverage in the east wing.",
            status: "In Progress",
            date: "24/10/2026, 09:30 AM",
            assignedDept: "IT & Network Operations Cell",
            assignedOfficer: "Er. Amit Verma (Network Lead)",
            eta: "Within 24 Hours",
            adminRemarks: "Dual-band Cisco AP ordered. Cable routing scheduled for today 4 PM.",
            rating: 0
        },
        {
            id: "UDN-1028",
            studentName: "Anonymous Student",
            studentRoll: "",
            isAnonymous: true,
            category: "Cleanliness",
            urgency: "High",
            location: "Boys Hostel 1 Mess",
            title: "RO Drinking Water cooler filter replacement needed",
            description: "The drinking water cooler filter on Ground Floor has not been serviced for 3 months, water taste is muddy.",
            status: "Resolved",
            date: "23/10/2026, 02:15 PM",
            assignedDept: "Sanitation & Estate Works",
            assignedOfficer: "Shri R.K. Sharma (Estate Officer)",
            eta: "Completed",
            adminRemarks: "Water purifier filter core replaced, tank sanitized, and TDS tested at 115 ppm.",
            rating: 5
        },
        {
            id: "UDN-1033",
            studentName: "Sneha Upadhyay",
            studentRoll: "24MCA018",
            isAnonymous: false,
            category: "Academic Support",
            urgency: "Medium",
            location: "Computer Labs (Lab 3)",
            title: "Projector lamp flickering during AI/ML practicals",
            description: "Ceiling projector HDMI input cuts off every 10 minutes, disrupting ongoing lab demonstrations.",
            status: "Under Review",
            date: "24/10/2026, 11:00 AM",
            assignedDept: "Academic & Technical Lab Cell",
            assignedOfficer: "Er. Priya Singh (Lab Incharge)",
            eta: "Within 48 Hours",
            adminRemarks: "Technical inspection assigned to lab technician for lamp replacement.",
            rating: 0
        },
        {
            id: "UDN-1041",
            studentName: "Vikas Yadav",
            studentRoll: "22BEE082",
            isAnonymous: false,
            category: "Cleanliness",
            urgency: "Normal",
            location: "Canteen Plaza",
            title: "Washbasin drainage overflow near entrance",
            description: "Water logging creating slippery surface for students visiting the canteen during lunch hours.",
            status: "Resolved",
            date: "22/10/2026, 01:20 PM",
            assignedDept: "Sanitation & Housekeeping",
            assignedOfficer: "Shri Munna Lal (Sanitation Supervisor)",
            eta: "Completed",
            adminRemarks: "Drainage cleared, anti-skid rubber mats placed at washing area.",
            rating: 4
        },
        {
            id: "UDN-1045",
            studentName: "Pooja Mishra",
            studentRoll: "23BIT055",
            isAnonymous: false,
            category: "Campus Security",
            urgency: "Critical",
            location: "Girls Hostel Connecting Walkway",
            title: "Street lights dark near Botanical Garden turn",
            description: "Three street lights are fused making the path completely dark after 7 PM. Safety hazard for students returning from library.",
            status: "In Progress",
            date: "24/10/2026, 08:45 AM",
            assignedDept: "Chief Proctor & Electrical Cell",
            assignedOfficer: "Chief Proctor / Shri V.K. Tiwari",
            eta: "Immediate (Under 6 Hours)",
            adminRemarks: "Emergency work order #EW-92 issued. Electrician team currently changing LED bulbs.",
            rating: 0
        },
        {
            id: "UDN-1050",
            studentName: "Anonymous Student",
            studentRoll: "",
            isAnonymous: true,
            category: "Infrastructure",
            urgency: "Normal",
            location: "Academic Block A (Room 204)",
            title: "Ceiling fan regulator damaged and speed stuck",
            description: "Fan regulator knob broken, fan running at low speed in crowded classroom.",
            status: "Submitted",
            date: "24/10/2026, 11:15 AM",
            assignedDept: "Campus Maintenance Cell",
            assignedOfficer: "Pending Department Assignment",
            eta: "3-4 Days",
            adminRemarks: "Ticket registered in queue, scheduled for electrical maintenance.",
            rating: 0
        }
    ];

    // Initialize Complaints in LocalStorage
    function getStoredComplaints() {
        try {
            const data = localStorage.getItem("udaanComplaints");
            if (!data) {
                localStorage.setItem("udaanComplaints", JSON.stringify(DEFAULT_COMPLAINTS));
                return DEFAULT_COMPLAINTS;
            }
            return JSON.parse(data);
        } catch (e) {
            return DEFAULT_COMPLAINTS;
        }
    }

    function saveStoredComplaints(complaints) {
        try {
            localStorage.setItem("udaanComplaints", JSON.stringify(complaints));
        } catch (e) {
            console.error("Unable to save complaints:", e);
        }
    }


    /* =====================================================
       2. LANGUAGE TRANSLATION DICTIONARY (HINDI / ENGLISH)
       ===================================================== */
    const TRANSLATIONS = {
        en: {
            nav_home: "Home",
            nav_tracker: "Status Tracker ⭐",
            nav_map: "Campus Map",
            nav_dashboard: "Dashboard",
            nav_problems: "Problems",
            nav_pulse: "Campus Pulse",
            nav_voice: "Report Grievance",
            nav_cta: "Submit Issue ↗",
            hero_eyebrow: "COLLEGE INNOVATION & GRIEVANCE REDRESSAL",
            hero_title: "From Campus <span>Problems</span> to Solutions.",
            hero_subtitle: "A student-powered platform where campus grievances are reported, tracked in real-time, and transformed into verified institutional solutions.",
            hero_btn_report: "📝 Register Complaint →",
            hero_btn_track: "🔍 Track Status",
            hero_btn_map: "🗺️ Campus Map",
            hero_trust: "Built by students, for a transparent and better campus.",
            tracker_label: "LIVE GRIEVANCE TRACKER",
            tracker_title: "Check Complaint <span>Status in Real-Time.</span>",
            tracker_subtitle: "Enter your Ticket ID or choose a sample to inspect the complete resolution pipeline.",
            tracker_btn_search: "Track Complaint",
            tracker_sample_label: "Quick Demo Samples:",
            map_label: "CAMPUS GEOLOCATION & HEATMAP",
            map_title: "Interactive <span>Campus Map.</span>",
            map_subtitle: "Click on any building or zone to view active complaints and report location-specific issues.",
            map_report_btn: "Report Issue Here ↗",
            dash_label: "ADMIN & STUDENT DASHBOARD",
            dash_title: "Campus Grievance <span>Analytics.</span>",
            dash_subtitle: "Live overview of complaints, resolution rates, and departmental response records.",
            dash_admin_mode: "Admin Demo Mode",
            dash_admin_hint: "(Click to resolve issues!)",
            dash_export_btn: "Download Report (Print/CSV)",
            form_label: "YOUR VOICE MATTERS",
            form_heading: "Report an Issue <span>or Share an Idea.</span>",
            form_intro_desc: "Submit a campus grievance or innovative proposal. Get an instant tracking ID to follow up directly until resolution.",
            lbl_name: "Your Name",
            lbl_roll: "Student Roll No / ID (Optional)",
            lbl_anon: "Submit Anonymously (Hide my identity completely)",
            lbl_category: "Category *",
            lbl_urgency: "Urgency / Severity Level *",
            lbl_location: "Campus Location / Specific Room *",
            lbl_subject: "Issue Title / Subject *",
            lbl_desc: "Detailed Description *",
            lbl_photo: "Attach Photo Proof (Optional)",
            btn_submit_voice: "Submit & Generate Tracking ID →",
            ai_name: "UDAAN Sahayak AI",
            ai_greeting: "Namaste! 🙏 Main UDAAN Sahayak hoon. Aap mujhse campus complaints, WiFi issues, mess food, hostel timings ya complaint tracking ke baare me pooch sakte hain."
        },
        hi: {
            nav_home: "होम",
            nav_tracker: "स्थिति ट्रैकर ⭐",
            nav_map: "कैंपस मैप",
            nav_dashboard: "डैशबोर्ड",
            nav_problems: "समस्याएं",
            nav_pulse: "कैंपस पोल",
            nav_voice: "शिकायत दर्ज करें",
            nav_cta: "समस्या बताएं ↗",
            hero_eyebrow: "कॉलेज नवाचार और छात्र शिकायत निवारण मंच",
            hero_title: "कैंपस की <span>समस्याओं</span> से समाधान तक।",
            hero_subtitle: "एक ऐसा छात्र-संचालित मंच जहाँ कैंपस की शिकायतों को सुना जाता है, लाइव ट्रैक किया जाता है और प्रमाणित समाधान में बदला जाता है।",
            hero_btn_report: "📝 शिकायत दर्ज करें →",
            hero_btn_track: "🔍 स्थिति जांचें",
            hero_btn_map: "🗺️ कैंपस मैप",
            hero_trust: "छात्रों द्वारा निर्मित, एक बेहतर और पारदर्शी कैंपस के लिए।",
            tracker_label: "लाइव शिकायत ट्रैकर",
            tracker_title: "शिकायत की <span>वास्तविक स्थिति देखें।</span>",
            tracker_subtitle: "अपनी टिकट आईडी दर्ज करें या लाइव समाधान पाइपलाइन देखने के लिए नमूना चुनें।",
            tracker_btn_search: "ट्रैक करें",
            tracker_sample_label: "त्वरित डेमो नमूने:",
            map_label: "कैंपस जियोलोकेशन एवं हीटमैप",
            map_title: "इंटरएक्टिव <span>कैंपस मैप।</span>",
            map_subtitle: "सक्रिय शिकायतों को देखने और स्थान-विशिष्ट समस्या रिपोर्ट करने के लिए किसी भी भवन पर क्लिक करें।",
            map_report_btn: "यहाँ की समस्या रिपोर्ट करें ↗",
            dash_label: "प्रशासनिक एवं छात्र डैशबोर्ड",
            dash_title: "कैंपस शिकायत <span>एनालिटिक्स।</span>",
            dash_subtitle: "शिकायतों, समाधान दर और विभागीय प्रतिक्रिया का वास्तविक समय का अवलोकन।",
            dash_admin_mode: "एडमिन डेमो मोड",
            dash_admin_hint: "(शिकायत सुलझाने के लिए क्लिक करें!)",
            dash_export_btn: "रिपोर्ट डाउनलोड करें (प्रिंट/CSV)",
            form_label: "आपकी आवाज़ महत्वपूर्ण है",
            form_heading: "शिकायत दर्ज करें <span>या विचार साझा करें।</span>",
            form_intro_desc: "कैंपस की कोई भी समस्या या सुझाव साझा करें। समाधान होने तक फॉलो-अप के लिए तुरंत ट्रैकिंग टिकट प्राप्त करें।",
            lbl_name: "आपका नाम",
            lbl_roll: "रोल नंबर / छात्र आईडी (ऐच्छिक)",
            lbl_anon: "गुमनाम रूप से भेजें (मेरी पहचान गुप्त रखें)",
            lbl_category: "श्रेणी चुनें *",
            lbl_urgency: "प्राथमिकता / गंभीरता स्तर *",
            lbl_location: "कैंपस स्थान / कमरा संख्या *",
            lbl_subject: "समस्या का विषय / शीर्षक *",
            lbl_desc: "विस्तृत विवरण *",
            lbl_photo: "फोटो प्रमाण संलग्न करें (ऐच्छिक)",
            btn_submit_voice: "जमा करें और ट्रैकिंग आईडी पाएं →",
            ai_name: "उड़ान सहायक AI",
            ai_greeting: "नमस्ते! 🙏 मैं उड़ान सहायक हूँ। आप मुझसे कैंपस शिकायत, वाईफाई समस्या, मेस खाना, हॉस्टल नियम या टिकट ट्रैकिंग के बारे में पूछ सकते हैं।"
        }
    };

    let currentLang = localStorage.getItem("udaanLang") || "en";

    window.toggleLanguage = function() {
        currentLang = currentLang === "en" ? "hi" : "en";
        localStorage.setItem("udaanLang", currentLang);
        applyLanguage(currentLang);
    };

    function applyLanguage(lang) {
        const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
        const langText = document.getElementById("langText");
        if (langText) {
            langText.textContent = lang === "en" ? "हिंदी" : "English";
        }

        document.querySelectorAll("[data-i18n]").forEach(elem => {
            const key = elem.getAttribute("data-i18n");
            if (dict[key]) {
                elem.innerHTML = dict[key];
            }
        });
    }

    applyLanguage(currentLang);


    /* =====================================================
       3. DARK MODE ENGINE
       ===================================================== */
    let currentTheme = localStorage.getItem("udaanTheme") || "light";

    function applyTheme(theme) {
        const themeIcon = document.getElementById("themeIcon");
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            if (themeIcon) themeIcon.textContent = "☀️";
        } else {
            document.body.classList.remove("dark-mode");
            if (themeIcon) themeIcon.textContent = "🌙";
        }
    }

    window.toggleTheme = function() {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem("udaanTheme", currentTheme);
        applyTheme(currentTheme);
    };

    applyTheme(currentTheme);


    /* =====================================================
       4. EMERGENCY SOS MODAL
       ===================================================== */
    window.toggleSosModal = function(show) {
        const modal = document.getElementById("sosModal");
        if (modal) {
            modal.style.display = show ? "grid" : "none";
            document.body.style.overflow = show ? "hidden" : "";
        }
    };


    /* =====================================================
       5. IMPACT STATS CALCULATION
       ===================================================== */
    function updateImpactStats() {
        const complaints = getStoredComplaints();
        const total = complaints.length;
        const resolved = complaints.filter(c => c.status === "Resolved").length;
        const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;

        const statTotal = document.getElementById("statTotalComplaints");
        const statResolved = document.getElementById("statResolvedCount");
        const statRate = document.getElementById("statResolutionRate");

        if (statTotal) statTotal.textContent = total;
        if (statResolved) statResolved.textContent = resolved;
        if (statRate) statRate.textContent = `${rate}%`;
    }

    updateImpactStats();


    /* =====================================================
       6. STATUS TRACKER ENGINE (PRIORITY ⭐⭐⭐⭐⭐)
       ===================================================== */
    window.handleTrackSearch = function() {
        const input = document.getElementById("trackerSearchInput");
        if (!input) return;
        const query = input.value.trim();
        if (!query) {
            showNotification("Please enter a Ticket ID (e.g. UDN-1024) 🔍");
            return;
        }
        renderTrackResult(query);
    };

    window.quickTrack = function(ticketId) {
        const input = document.getElementById("trackerSearchInput");
        if (input) input.value = ticketId;
        renderTrackResult(ticketId);
    };

    function renderTrackResult(query) {
        const complaints = getStoredComplaints();
        const match = complaints.find(c =>
            c.id.toLowerCase() === query.toLowerCase() ||
            (c.title && c.title.toLowerCase().includes(query.toLowerCase()))
        );

        const container = document.getElementById("trackerResultContainer");
        if (!container) return;

        if (!match) {
            container.style.display = "block";
            container.innerHTML = `
                <div style="text-align:center; padding:30px;">
                    <div style="font-size:40px; margin-bottom:10px;">🔍</div>
                    <h3>No Complaint Found for "${escapeHtml(query)}"</h3>
                    <p style="color:var(--muted); margin-top:8px; font-size:13px;">
                        Please verify your Ticket ID or try one of the quick samples above like <strong>UDN-1024</strong>.
                    </p>
                </div>
            `;
            return;
        }

        // Status stages map
        const stages = ["Submitted", "Under Review", "In Progress", "Resolved"];
        const currentIndex = stages.indexOf(match.status);
        const progressWidth = currentIndex === 0 ? "0%" : currentIndex === 1 ? "33%" : currentIndex === 2 ? "66%" : "100%";

        const urgencyClass = `badge-${match.urgency ? match.urgency.toLowerCase() : "normal"}`;
        const statusClass = match.status === "Submitted" ? "badge-submitted" :
                            match.status === "Under Review" ? "badge-review" :
                            match.status === "In Progress" ? "badge-progress" : "badge-resolved";

        container.style.display = "block";
        container.innerHTML = `
            <div class="tracker-card-header">
                <div>
                    <span class="tracker-ticket-badge">${match.id}</span>
                </div>
                <div class="tracker-badge-group">
                    <span class="badge ${urgencyClass}">● ${match.urgency || "Normal"} Priority</span>
                    <span class="badge ${statusClass}">Status: ${match.status}</span>
                </div>
            </div>

            <div style="margin-top: 20px;">
                <h3 style="font-size: 20px; font-family:'Playfair Display', serif;">${escapeHtml(match.title)}</h3>
                <p style="color:var(--muted); font-size:13px; margin-top:6px; line-height:1.6;">
                    ${escapeHtml(match.description)}
                </p>
            </div>

            <!-- 4-Step Pipeline -->
            <div class="tracker-pipeline">
                <div class="pipeline-track-bar">
                    <div class="pipeline-track-fill" style="width: ${progressWidth};"></div>
                </div>

                <div class="pipeline-step ${currentIndex >= 0 ? (currentIndex === 0 ? 'active' : 'completed') : ''}">
                    <div class="pipeline-dot">📝</div>
                    <h4>1. Submitted</h4>
                    <small>${escapeHtml(match.date || "Logged")}</small>
                </div>

                <div class="pipeline-step ${currentIndex >= 1 ? (currentIndex === 1 ? 'active' : 'completed') : ''}">
                    <div class="pipeline-dot">🔍</div>
                    <h4>2. Under Review</h4>
                    <small>Assigned to Cell</small>
                </div>

                <div class="pipeline-step ${currentIndex >= 2 ? (currentIndex === 2 ? 'active' : 'completed') : ''}">
                    <div class="pipeline-dot">🛠️</div>
                    <h4>3. In Progress</h4>
                    <small>Action Underway</small>
                </div>

                <div class="pipeline-step ${currentIndex >= 3 ? 'completed active' : ''}">
                    <div class="pipeline-dot">✅</div>
                    <h4>4. Resolved</h4>
                    <small>Verified by Student</small>
                </div>
            </div>

            <!-- Details Grid -->
            <div class="tracker-details-grid">
                <div class="tracker-detail-item">
                    <span>Campus Location</span>
                    <strong>📍 ${escapeHtml(match.location || "Main Campus")}</strong>
                </div>
                <div class="tracker-detail-item">
                    <span>Responsible Authority</span>
                    <strong>🏛️ ${escapeHtml(match.assignedOfficer || match.assignedDept || "Estate Cell")}</strong>
                </div>
                <div class="tracker-detail-item">
                    <span>Estimated Completion</span>
                    <strong>⏱️ ${escapeHtml(match.eta || "Within 24-48 Hours")}</strong>
                </div>
                <div class="tracker-detail-item">
                    <span>Reported By</span>
                    <strong>👤 ${match.isAnonymous ? "Anonymous Student (Protected)" : escapeHtml(match.studentName || "Student")}</strong>
                </div>
            </div>

            ${match.adminRemarks ? `
                <div class="tracker-admin-notes">
                    <strong>Official Department Note / Action Taken:</strong>
                    <p>“${escapeHtml(match.adminRemarks)}”</p>
                </div>
            ` : ''}

            ${match.status === "Resolved" ? `
                <div class="tracker-feedback-box">
                    <div>
                        <strong style="display:block; font-size:13px;">Rate this resolution</strong>
                        <small style="color:var(--muted); font-size:11px;">Was your problem fixed satisfactorily?</small>
                    </div>
                    <div class="rating-stars" id="starRatingBox">
                        <span onclick="rateResolution('${match.id}', 1)">${match.rating >= 1 ? '★' : '☆'}</span>
                        <span onclick="rateResolution('${match.id}', 2)">${match.rating >= 2 ? '★' : '☆'}</span>
                        <span onclick="rateResolution('${match.id}', 3)">${match.rating >= 3 ? '★' : '☆'}</span>
                        <span onclick="rateResolution('${match.id}', 4)">${match.rating >= 4 ? '★' : '☆'}</span>
                        <span onclick="rateResolution('${match.id}', 5)">${match.rating >= 5 ? '★' : '☆'}</span>
                    </div>
                </div>
            ` : ''}
        `;

        // Smooth scroll to results
        container.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    window.rateResolution = function(ticketId, score) {
        const complaints = getStoredComplaints();
        const item = complaints.find(c => c.id === ticketId);
        if (item) {
            item.rating = score;
            saveStoredComplaints(complaints);
            renderTrackResult(ticketId);
            showNotification(`Thank you! Rated ${score}/5 stars ⭐`);
        }
    };


    /* =====================================================
       7. CAMPUS MAP ENGINE (PRIORITY ⭐⭐⭐⭐)
       ===================================================== */
    const BUILDING_INFO = {
        admin: {
            name: "Main Administrative Block",
            desc: "Registrar office, Dean Academics, Accounts, and University Examination Cell.",
            locationStr: "Main Admin Block (Ground Floor)"
        },
        acad_a: {
            name: "Academic Block A (Science & Tech)",
            desc: "Lecture halls 101-310, Electronics labs, and Engineering Faculty lounges.",
            locationStr: "Academic Block A"
        },
        library: {
            name: "Central Library & E-Resource Centre",
            desc: "2nd Floor digital research terminal, air conditioned reading hall, and book bank.",
            locationStr: "Central Library 2nd Floor"
        },
        labs: {
            name: "Computer Centre & IT Labs",
            desc: "High-performance AI/ML labs, Data Science terminal room, and server cluster.",
            locationStr: "Computer Labs (Lab 3)"
        },
        hostel_b: {
            name: "Boys Hostel Block & Dining Hall",
            desc: "Rooms 101 to 450, Mess A, study hall, and RO water stations.",
            locationStr: "Boys Hostel 1 Mess"
        },
        canteen: {
            name: "Student Canteen & Plaza",
            desc: "Main cafeteria dining, stationary kiosk, and open student meeting gazebo.",
            locationStr: "Canteen Plaza"
        },
        hostel_g: {
            name: "Girls Hostel Block & Lawns",
            desc: "Secure residence blocks, courtyard, and common recreation room.",
            locationStr: "Girls Hostel Connecting Walkway"
        },
        sports: {
            name: "Sports Complex & Campus Dispensary",
            desc: "Gymnasium, indoor badminton court, first-aid medical dispensary, and pharmacy.",
            locationStr: "Campus Dispensary / Sports Arena"
        }
    };

    let selectedBuildingKey = "library";

    window.selectBuilding = function(key) {
        selectedBuildingKey = key;
        const info = BUILDING_INFO[key] || BUILDING_INFO.library;

        // Visual selection on SVG
        document.querySelectorAll(".map-building").forEach(b => {
            b.classList.remove("selected");
        });
        const target = document.querySelector(`.map-building[data-building="${key}"]`);
        if (target) target.classList.add("selected");

        // Inspector Card Elements
        const bldgTitle = document.getElementById("bldgTitle");
        const bldgDesc = document.getElementById("bldgDesc");
        const bldgActiveCount = document.getElementById("bldgActiveCount");
        const bldgStatus = document.getElementById("bldgStatus");
        const bldgIssueList = document.getElementById("bldgIssueList");

        if (bldgTitle) bldgTitle.textContent = info.name;
        if (bldgDesc) bldgDesc.textContent = info.desc;

        // Query active issues matching this building name
        const complaints = getStoredComplaints();
        const matchingIssues = complaints.filter(c =>
            c.location && (
                c.location.toLowerCase().includes(info.name.toLowerCase().split(" ")[0]) ||
                c.location.toLowerCase().includes(key.toLowerCase()) ||
                info.locationStr.toLowerCase().includes(c.location.toLowerCase())
            )
        );

        const openCount = matchingIssues.filter(c => c.status !== "Resolved").length;

        if (bldgActiveCount) bldgActiveCount.textContent = openCount;
        if (bldgStatus) {
            bldgStatus.textContent = openCount === 0 ? "All Good" : `${openCount} Open Issue${openCount > 1 ? 's' : ''}`;
            bldgStatus.style.color = openCount === 0 ? "#52c41a" : "#ff4d4f";
        }

        if (bldgIssueList) {
            if (matchingIssues.length === 0) {
                bldgIssueList.innerHTML = `<span style="font-size:12px; color:var(--muted);">No complaints reported for this building.</span>`;
            } else {
                bldgIssueList.innerHTML = matchingIssues.map(issue => `
                    <div class="inspector-issue-pill">
                        <div>
                            <strong>${issue.id}</strong>: ${escapeHtml(issue.title.substring(0, 28))}...
                        </div>
                        <span class="badge ${issue.status === 'Resolved' ? 'badge-resolved' : 'badge-progress'}">
                            ${issue.status}
                        </span>
                    </div>
                `).join("");
            }
        }
    };

    window.reportForSelectedBuilding = function() {
        const info = BUILDING_INFO[selectedBuildingKey];
        const locationInput = document.getElementById("issueLocation");
        if (locationInput && info) {
            locationInput.value = info.locationStr;
        }

        const voiceSection = document.getElementById("voice");
        if (voiceSection) {
            voiceSection.scrollIntoView({ behavior: "smooth" });
        }
        showNotification(`Location set to ${info.name}! 📍`);
    };

    // Initialize Map selection
    setTimeout(() => {
        selectBuilding("library");
    }, 200);


    /* =====================================================
       8. DASHBOARD ENGINE & ADMIN MODE (PRIORITY ⭐⭐⭐⭐)
       ===================================================== */
    let isAdminModeActive = false;

    window.toggleAdminMode = function(checked) {
        isAdminModeActive = checked;
        showNotification(
            checked ? "Admin Mode Enabled! You can now resolve or update complaints live." : "Switched to Student View."
        );
        filterDashboardTable();
    };

    window.filterDashboardTable = function() {
        const searchInput = document.getElementById("dashSearchQuery");
        const categorySelect = document.getElementById("dashCategoryFilter");
        const statusSelect = document.getElementById("dashStatusFilter");
        const tableBody = document.getElementById("dashboardTableBody");

        if (!tableBody) return;

        const query = (searchInput?.value || "").toLowerCase().trim();
        const catFilter = categorySelect?.value || "ALL";
        const statusFilter = statusSelect?.value || "ALL";

        const complaints = getStoredComplaints();

        const filtered = complaints.filter(item => {
            const matchesQuery = !query ||
                item.id.toLowerCase().includes(query) ||
                (item.title && item.title.toLowerCase().includes(query)) ||
                (item.location && item.location.toLowerCase().includes(query)) ||
                (item.studentName && item.studentName.toLowerCase().includes(query));

            const matchesCategory = catFilter === "ALL" || item.category === catFilter;
            const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;

            return matchesQuery && matchesCategory && matchesStatus;
        });

        if (filtered.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center; padding:30px; color:var(--muted);">
                        No complaints match your search filters.
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = filtered.map(item => {
            const urgencyBadge = `<span class="badge badge-${item.urgency ? item.urgency.toLowerCase() : 'normal'}">${item.urgency || 'Normal'}</span>`;
            const statusBadge = `<span class="badge ${item.status === 'Resolved' ? 'badge-resolved' : item.status === 'In Progress' ? 'badge-progress' : item.status === 'Under Review' ? 'badge-review' : 'badge-submitted'}">${item.status}</span>`;

            let actionHtml = "";
            if (isAdminModeActive) {
                actionHtml = `
                    <select class="admin-action-select" onchange="updateTicketStatus('${item.id}', this.value)">
                        <option value="Submitted" ${item.status === 'Submitted' ? 'selected' : ''}>Set: Submitted</option>
                        <option value="Under Review" ${item.status === 'Under Review' ? 'selected' : ''}>Set: Under Review</option>
                        <option value="In Progress" ${item.status === 'In Progress' ? 'selected' : ''}>Set: In Progress</option>
                        <option value="Resolved" ${item.status === 'Resolved' ? 'selected' : ''}>Set: Resolved ✅</option>
                    </select>
                `;
            } else {
                actionHtml = `
                    <button class="sample-chip" onclick="quickTrack('${item.id}')">
                        Track ↗
                    </button>
                `;
            }

            return `
                <tr>
                    <td><strong>${item.id}</strong></td>
                    <td>${escapeHtml(item.category || "General")}</td>
                    <td>${escapeHtml(item.location || "Campus")}</td>
                    <td><strong>${escapeHtml(item.title || "")}</strong></td>
                    <td>${urgencyBadge}</td>
                    <td>${statusBadge}</td>
                    <td>${actionHtml}</td>
                </tr>
            `;
        }).join("");
    };

    window.updateTicketStatus = function(ticketId, newStatus) {
        const complaints = getStoredComplaints();
        const item = complaints.find(c => c.id === ticketId);
        if (item) {
            item.status = newStatus;
            if (newStatus === "Resolved") {
                item.adminRemarks = "Resolved by campus administrative team on " + new Date().toLocaleDateString();
                item.eta = "Completed";
            } else if (newStatus === "In Progress") {
                item.adminRemarks = "Staff technician dispatched to site.";
            }
            saveStoredComplaints(complaints);
            filterDashboardTable();
            updateImpactStats();
            showNotification(`Updated ${ticketId} status to ${newStatus}! 🚀`);
        }
    };

    window.exportGrievanceReport = function() {
        const complaints = getStoredComplaints();
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Ticket ID,Category,Urgency,Location,Title,Status,Date,Assigned Department\n";

        complaints.forEach(c => {
            const row = [
                c.id,
                `"${c.category || ''}"`,
                `"${c.urgency || ''}"`,
                `"${c.location || ''}"`,
                `"${c.title ? c.title.replace(/"/g, '""') : ''}"`,
                `"${c.status || ''}"`,
                `"${c.date || ''}"`,
                `"${c.assignedDept || ''}"`
            ].join(",");
            csvContent += row + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `UDAAN_Grievance_Report_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showNotification("Grievance report CSV downloaded successfully! 📄");
    };

    filterDashboardTable();


    /* =====================================================
       9. COMPLAINT & VOICE SUBMISSION (PRIORITY ⭐⭐⭐⭐⭐)
       ===================================================== */
    let currentFormTab = "complaint";
    let selectedImageDataUrl = "";

    window.switchFormTab = function(tab) {
        currentFormTab = tab;
        const complaintBtn = document.getElementById("tabComplaintBtn");
        const ideaBtn = document.getElementById("tabIdeaBtn");
        const urgencyWrap = document.getElementById("urgencyFieldWrap");
        const submitBtn = document.getElementById("submitBtn");

        if (tab === "complaint") {
            complaintBtn?.classList.add("active");
            ideaBtn?.classList.remove("active");
            if (urgencyWrap) urgencyWrap.style.display = "block";
            if (submitBtn) submitBtn.innerHTML = "<span>Submit & Generate Tracking ID →</span>";
        } else {
            ideaBtn?.classList.add("active");
            complaintBtn?.classList.remove("active");
            if (urgencyWrap) urgencyWrap.style.display = "none";
            if (submitBtn) submitBtn.innerHTML = "<span>Share Innovative Idea →</span>";
        }
    };

    window.toggleAnonymousMode = function(isAnon) {
        const nameInput = document.getElementById("studentName");
        const rollInput = document.getElementById("studentRoll");
        if (isAnon) {
            if (nameInput) {
                nameInput.value = "Anonymous Student";
                nameInput.disabled = true;
            }
            if (rollInput) {
                rollInput.value = "";
                rollInput.disabled = true;
            }
        } else {
            if (nameInput) {
                nameInput.value = "";
                nameInput.disabled = false;
            }
            if (rollInput) {
                rollInput.disabled = false;
            }
        }
    };

    window.handleImageSelection = function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            selectedImageDataUrl = e.target.result;
            const previewBox = document.getElementById("imagePreviewWrap");
            const previewImg = document.getElementById("imagePreviewImg");
            const statusText = document.getElementById("uploadStatusText");

            if (previewImg) previewImg.src = selectedImageDataUrl;
            if (previewBox) previewBox.style.display = "flex";
            if (statusText) statusText.textContent = `Attached: ${file.name}`;
        };
        reader.readAsDataURL(file);
    };

    window.removeSelectedImage = function() {
        selectedImageDataUrl = "";
        const previewBox = document.getElementById("imagePreviewWrap");
        const fileInput = document.getElementById("photoInput");
        const statusText = document.getElementById("uploadStatusText");

        if (previewBox) previewBox.style.display = "none";
        if (fileInput) fileInput.value = "";
        if (statusText) statusText.textContent = "Click to select or drag & drop photo proof";
    };

    window.handleGrievanceSubmit = function(event) {
        event.preventDefault();

        const studentName = document.getElementById("studentName")?.value.trim() || "Anonymous Student";
        const studentRoll = document.getElementById("studentRoll")?.value.trim() || "";
        const isAnon = document.getElementById("isAnonymous")?.checked || false;
        const category = document.getElementById("category")?.value;
        const urgency = document.getElementById("urgencyLevel")?.value || "Normal";
        const location = document.getElementById("issueLocation")?.value.trim();
        const title = document.getElementById("issueTitle")?.value.trim();
        const description = document.getElementById("problemIdea")?.value.trim();

        if (!category || !location || !title || !description) {
            showNotification("Please fill all required fields! ⚠️");
            return;
        }

        // Generate Ticket ID
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const ticketId = `UDN-${randomNum}`;

        // Assign Department and ETA
        let dept = "Campus Maintenance Cell";
        let eta = "3-4 Days";

        if (category === "Cleanliness") {
            dept = "Sanitation & Housekeeping Cell";
        } else if (category === "Digital Access") {
            dept = "IT & Network Operations Unit";
            eta = "Within 24 Hours";
        } else if (category === "Hostel & Mess") {
            dept = "Chief Hostel Warden & Mess Committee";
        } else if (category === "Academic Support") {
            dept = "Academic Affairs & Lab Section";
        } else if (category === "Campus Security") {
            dept = "Chief Proctor & Security Desk";
            eta = "Immediate / 6 Hours";
        }

        if (urgency === "Critical") {
            eta = "Emergency Fast-Track (Under 6 Hours)";
        } else if (urgency === "High") {
            eta = "Within 24 Hours";
        }

        const newComplaint = {
            id: ticketId,
            studentName: isAnon ? "Anonymous Student" : studentName,
            studentRoll: isAnon ? "" : studentRoll,
            isAnonymous: isAnon,
            category: category,
            urgency: urgency,
            location: location,
            title: title,
            description: description,
            status: "Submitted",
            date: new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            assignedDept: dept,
            assignedOfficer: "Pending Department Assignment",
            eta: eta,
            adminRemarks: "Complaint logged and queued for site verification.",
            photo: selectedImageDataUrl,
            rating: 0
        };

        const complaints = getStoredComplaints();
        complaints.unshift(newComplaint);
        saveStoredComplaints(complaints);

        // Reset form
        document.getElementById("voiceForm")?.reset();
        removeSelectedImage();
        updateCharacterCounter();

        // Update UI
        updateImpactStats();
        filterDashboardTable();

        // Show Ticket Modal
        showTicketSuccessModal(ticketId, eta, dept);
    };

    function showTicketSuccessModal(ticketId, eta, dept) {
        const modal = document.getElementById("ticketSuccessModal");
        const modalTicketId = document.getElementById("modalTicketId");
        const modalEta = document.getElementById("modalEta");
        const modalDept = document.getElementById("modalDept");

        if (modalTicketId) modalTicketId.textContent = ticketId;
        if (modalEta) modalEta.textContent = eta;
        if (modalDept) modalDept.textContent = dept;

        if (modal) modal.style.display = "grid";
    }

    window.closeTicketModal = function() {
        const modal = document.getElementById("ticketSuccessModal");
        if (modal) modal.style.display = "none";
    };

    window.copyModalTicketId = function() {
        const idElem = document.getElementById("modalTicketId");
        if (!idElem) return;
        const text = idElem.textContent;

        navigator.clipboard.writeText(text).then(() => {
            const btnText = document.getElementById("copyBtnText");
            if (btnText) btnText.textContent = "Copied! ✓";
            showNotification(`Copied ${text} to clipboard! 📋`);
            setTimeout(() => {
                if (btnText) btnText.textContent = "Copy";
            }, 2000);
        });
    };

    window.jumpToTrackComplaint = function() {
        const idElem = document.getElementById("modalTicketId");
        const ticketId = idElem ? idElem.textContent : "";
        closeTicketModal();

        const trackerSection = document.getElementById("tracker");
        if (trackerSection) {
            trackerSection.scrollIntoView({ behavior: "smooth" });
        }

        if (ticketId) {
            setTimeout(() => {
                quickTrack(ticketId);
            }, 400);
        }
    };


    /* =====================================================
       10. AI CHATBOT ENGINE (PRIORITY ⭐⭐⭐⭐⭐)
       ===================================================== */
    let isAiChatOpen = false;

    window.toggleAiChatbot = function(forceState) {
        const chatWindow = document.getElementById("aiChatWindow");
        if (!chatWindow) return;

        isAiChatOpen = forceState !== undefined ? forceState : !isAiChatOpen;
        chatWindow.style.display = isAiChatOpen ? "flex" : "none";

        if (isAiChatOpen) {
            const input = document.getElementById("aiUserInput");
            if (input) input.focus();
        }
    };

    window.sendAiPrompt = function(promptText) {
        const input = document.getElementById("aiUserInput");
        if (input) input.value = promptText;
        handleAiChatSubmit(new Event("submit"));
    };

    window.handleAiChatSubmit = function(event) {
        event.preventDefault();
        const input = document.getElementById("aiUserInput");
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;

        input.value = "";
        appendChatMessage("user", text);

        // Show typing indicator
        const typingId = appendTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator(typingId);
            const botResponse = generateAiResponse(text);
            appendChatMessage("bot", botResponse);
        }, 600);
    };

    function appendChatMessage(sender, text) {
        const body = document.getElementById("aiMessagesBody");
        if (!body) return;

        const msgDiv = document.createElement("div");
        msgDiv.className = `ai-message msg-${sender}`;
        msgDiv.innerHTML = `
            <div class="msg-bubble">
                <p>${text}</p>
                <small class="msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
            </div>
        `;
        body.appendChild(msgDiv);
        body.scrollTop = body.scrollHeight;
    }

    function appendTypingIndicator() {
        const body = document.getElementById("aiMessagesBody");
        if (!body) return null;
        const id = "typing-" + Date.now();
        const typingDiv = document.createElement("div");
        typingDiv.id = id;
        typingDiv.className = "ai-message msg-bot";
        typingDiv.innerHTML = `
            <div class="msg-bubble" style="color:var(--muted); font-style:italic;">
                UDAAN Sahayak is thinking... ✍️
            </div>
        `;
        body.appendChild(typingDiv);
        body.scrollTop = body.scrollHeight;
        return id;
    }

    function removeTypingIndicator(id) {
        if (!id) return;
        const elem = document.getElementById(id);
        if (elem) elem.remove();
    }

    function generateAiResponse(userQuery) {
        const q = userQuery.toLowerCase();

        // 1. Complaint Tracking queries (e.g. "track UDN-1024" or "status")
        const ticketMatch = userQuery.match(/UDN-\d{4}/i);
        if (ticketMatch) {
            const ticketId = ticketMatch[0].toUpperCase();
            const complaints = getStoredComplaints();
            const found = complaints.find(c => c.id === ticketId);
            if (found) {
                return `Maine <strong>${found.id}</strong> ka status check kiya hai:<br>
                📌 <strong>Status:</strong> ${found.status}<br>
                📍 <strong>Location:</strong> ${found.location}<br>
                ⏱️ <strong>ETA:</strong> ${found.eta}<br>
                ${found.adminRemarks ? `💬 <em>"${found.adminRemarks}"</em><br>` : ''}
                <button class="sample-chip" style="margin-top:6px;" onclick="quickTrack('${found.id}')">View Full Pipeline Tracker ↗</button>`;
            } else {
                return `Mujhe Ticket ID <strong>${ticketId}</strong> nahi mili. Kripya check karein ya naya ticket submit karein.`;
            }
        }

        // 2. WiFi / Internet queries
        if (q.includes("wifi") || q.includes("internet") || q.includes("net") || q.includes("connection")) {
            return `Campus WiFi me connectivity issue ke liye:<br>
            1. Check karein ki aap <strong>CAMPUS-STUDENT-WLAN</strong> se connected hain.<br>
            2. Router restart request ya dead zone report karne ke liye aap <strong>Digital Access</strong> category me complaint darj kar sakte hain.<br>
            <button class="sample-chip" style="margin-top:6px;" onclick="prefillComplaint('Digital Access', 'Library / Hostel WiFi range issue')">File WiFi Complaint ↗</button>`;
        }

        // 3. Mess / Food / Water queries
        if (q.includes("mess") || q.includes("food") || q.includes("water") || q.includes("khana") || q.includes("cooler")) {
            return `Mess food quality ya RO drinking water issues ke liye aap direct <strong>Hostel & Mess</strong> category me report kar sakte hain. Complaint direct Chief Warden aur Mess Incharge ko forward hoti hai.<br>
            <button class="sample-chip" style="margin-top:6px;" onclick="prefillComplaint('Hostel & Mess', 'Mess food hygiene / Drinking water cooler maintenance')">Report Mess/Water Issue ↗</button>`;
        }

        // 4. Emergency / Safety / Ragging
        if (q.includes("emergency") || q.includes("ragging") || q.includes("safety") || q.includes("police") || q.includes("ambulance") || q.includes("doctor")) {
            return `🚨 <strong>Emergency Support:</strong><br>
            • Campus Proctor / Security: <strong>+91 98765 43210</strong><br>
            • Anti-Ragging Helpline: <strong>1800-180-5522</strong><br>
            • Women Safety Powerline: <strong>1090 / 112</strong><br>
            <button class="sample-chip" style="margin-top:6px; background:#ff4d4f; color:white;" onclick="toggleSosModal(true)">Open Emergency Helplines Modal ↗</button>`;
        }

        // 5. General / Greeting
        if (q.includes("hello") || q.includes("hi") || q.includes("namaste") || q.includes("kya hai")) {
            return `Namaste! UDAAN ek unified grievance portal hai. Aap yahan par:<br>
            • Complaint darj kar sakte hain (Ticket ID milegi)<br>
            • Status track kar sakte hain<br>
            • Campus map par hotspot issues dekh sakte hain.<br>
            Aap kis baare me jaankari chahte hain?`;
        }

        // Default smart fallback
        return `Aapki samasya ko hum samajh gaye hain. Aap isko turant <strong>Report Grievance</strong> form par darj karein taaki college authorities ko ticket generate ho sake.<br>
        <button class="sample-chip" style="margin-top:6px;" onclick="document.getElementById('voice').scrollIntoView({behavior:'smooth'})">Go to Complaint Form ↗</button>`;
    }

    window.prefillComplaint = function(category, titleText) {
        toggleAiChatbot(false);
        const catSelect = document.getElementById("category");
        const titleInput = document.getElementById("issueTitle");
        if (catSelect) catSelect.value = category;
        if (titleInput) titleInput.value = titleText;
        document.getElementById("voice")?.scrollIntoView({ behavior: "smooth" });
    };


    /* =====================================================
       11. CAMPUS PULSE VOTING
       ===================================================== */
    const defaultVotes = {
        infrastructure: 14,
        academics: 9,
        cleanliness: 21,
        communication: 7
    };

    function getVotes() {
        try {
            const saved = localStorage.getItem("udaanVotes");
            return saved ? { ...defaultVotes, ...JSON.parse(saved) } : { ...defaultVotes };
        } catch (e) {
            return { ...defaultVotes };
        }
    }

    function saveVotes(votes) {
        try {
            localStorage.setItem("udaanVotes", JSON.stringify(votes));
        } catch (e) {}
    }

    function updatePoll() {
        const votes = getVotes();
        const total = Object.values(votes).reduce((sum, v) => sum + v, 0);

        const totalVotesElem = document.getElementById("totalVotes");
        if (totalVotesElem) totalVotesElem.textContent = total;

        ["infrastructure", "academics", "cleanliness", "communication"].forEach(category => {
            const count = votes[category] || 0;
            const pct = total === 0 ? 0 : Math.round((count / total) * 100);

            const countElem = document.getElementById(`${category}Votes`);
            const pctElem = document.getElementById(`${category}Percent`);
            const progressElem = document.getElementById(`${category}Progress`);

            if (countElem) countElem.textContent = `${count} vote${count === 1 ? '' : 's'}`;
            if (pctElem) pctElem.textContent = `${pct}%`;
            if (progressElem) progressElem.style.width = `${pct}%`;
        });
    }

    window.vote = function(category, button) {
        if (localStorage.getItem("udaanUserVoted") === "true") {
            showNotification("You have already voted! 💜");
            return;
        }

        const votes = getVotes();
        if (typeof votes[category] !== "undefined") {
            votes[category]++;
            saveVotes(votes);
            localStorage.setItem("udaanUserVoted", "true");

            if (button) {
                button.classList.add("voted");
                button.innerHTML = "✓ Vote Recorded";
            }

            updatePoll();
            showNotification("Your campus vote has been recorded! 🚀");
        }
    };

    updatePoll();


    /* =====================================================
       12. PROBLEM MODAL POPUP
       ===================================================== */
    window.problemData = {
        "Infrastructure": {
            icon: "🏫",
            title: "Infrastructure & Space",
            description: "Classrooms, benches, washroom fittings, fans and physical campus facilities needing repair.",
            solution: "Regular student auditing, immediate ticket tracking and dedicated campus maintenance teams."
        },
        "Academic Support": {
            icon: "📚",
            title: "Academic Support & Resources",
            description: "Lab equipment availability, project mentorship, syllabus timelines and doubt clearing sessions.",
            solution: "Centralized departmental grievance escalation and verified turnaround schedules."
        },
        "Cleanliness": {
            icon: "♻️",
            title: "Cleanliness & Hygiene",
            description: "Restroom hygiene, drinking water coolers, regular trash bin clearance and campus waste points.",
            solution: "Active housekeeping monitoring, QR code reporting at washrooms and student sanitation audits."
        },
        "Communication": {
            icon: "📢",
            title: "Campus Communication",
            description: "Scattered WhatsApp notices causing rumors and missed university exam/placement deadlines.",
            solution: "Single authoritative digital noticeboard with verified push updates and SMS alerts."
        },
        "Digital Access": {
            icon: "💻",
            title: "Digital Access & WiFi",
            description: "Weak WiFi in reading halls, outdated lab software, and digital portal downtime.",
            solution: "High-speed campus mesh network and student grievance priority channel for IT teams."
        },
        "Campus Environment": {
            icon: "🌱",
            title: "Campus Safety & Environment",
            description: "Adequate street lighting along walking paths, safe night transit and green outdoor study areas.",
            solution: "Solar pathway illumination, CCTV coverage at key spots and anti-ragging security presence."
        }
    };

    window.showProblem = function(name) {
        const problem = window.problemData[name];
        if (!problem) return;

        const old = document.querySelector(".udaan-modal");
        if (old) old.remove();

        const modal = document.createElement("div");
        modal.className = "udaan-modal";
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-box">
                <button class="modal-close" onclick="closeProblemModal()">×</button>
                <div class="modal-icon">${problem.icon}</div>
                <span class="modal-label">CAMPUS CHALLENGE</span>
                <h2>${problem.title}</h2>
                <p>${problem.description}</p>
                <div class="modal-solution">
                    <span>💡 PROPOSED ACTION</span>
                    <p>${problem.solution}</p>
                </div>
                <a href="#voice" class="modal-action" onclick="closeProblemModal()">Report Grievance →</a>
            </div>
        `;
        document.body.appendChild(modal);
        requestAnimationFrame(() => modal.classList.add("show"));

        modal.querySelector(".modal-overlay").addEventListener("click", closeProblemModal);
    };

    window.closeProblemModal = function() {
        const modal = document.querySelector(".udaan-modal");
        if (modal) {
            modal.classList.remove("show");
            setTimeout(() => modal.remove(), 250);
        }
    };


    /* =====================================================
       13. NOTIFICATION SYSTEM
       ===================================================== */
    window.showNotification = function(text) {
        const old = document.querySelector(".notification");
        if (old) old.remove();

        const toast = document.createElement("div");
        toast.className = "notification";
        toast.innerHTML = `
            <span class="notification-dot">✓</span>
            <span>${text}</span>
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add("show"));

        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    };


    /* =====================================================
       14. CHARACTER COUNTER FOR TEXTAREA
       ===================================================== */
    const textarea = document.getElementById("problemIdea");
    const counter = document.querySelector(".character-counter");

    function updateCharacterCounter() {
        if (!textarea || !counter) return;
        const len = textarea.value.length;
        counter.textContent = `${len} / 600`;
        counter.style.color = len > 550 ? "var(--orange)" : "";
    }

    if (textarea) {
        textarea.addEventListener("input", updateCharacterCounter);
        updateCharacterCounter();
    }


    /* =====================================================
       15. UTILITIES & ESCAPE
       ===================================================== */
    function escapeHtml(str) {
        if (!str) return "";
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeProblemModal();
            closeTicketModal();
            toggleSosModal(false);
            toggleAiChatbot(false);
        }
    });

    console.log("%c PROJECT UDAAN ENGINE INITIALIZED 🚀", "color:#7357d9;font-weight:bold;font-size:16px;");
});
