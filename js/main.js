document.addEventListener("DOMContentLoaded", () => {
  // --- Skill Bars Animation ---
  const skillBars = document.querySelectorAll(".progress");

  function animateSkillBars() {
    const triggerBottom = window.innerHeight * 0.85;
    skillBars.forEach((bar) => {
      const barTop = bar.getBoundingClientRect().top;
      if (barTop < triggerBottom) {
        const targetWidth = bar.getAttribute("data-skill") || bar.style.width;
        bar.style.width = targetWidth;
      }
    });
  }

  window.addEventListener("scroll", animateSkillBars);
  animateSkillBars();

  // --- Project Filters ---
  const projectsSection = document.querySelector(".projects");
  const projectCards = document.querySelectorAll(".project");

  if (projectsSection && projectCards.length > 0) {
    // Avoid creating multiple filters if already exists
    if (!document.querySelector(".filter-container")) {
      const filterContainer = document.createElement("div");
      filterContainer.classList.add("filter-container");

      const filters = ["All", "IoT", "Web", "React", "JavaScript"];
      filters.forEach((tech) => {
        const btn = document.createElement("button");
        btn.textContent = tech;
        btn.classList.add("filter-btn");
        if (tech === "All") btn.classList.add("active");
        filterContainer.appendChild(btn);
      });

      // Insert above projects without overwriting content
      projectsSection.insertAdjacentElement("beforebegin", filterContainer);

      filterContainer.addEventListener("click", (e) => {
        if (!e.target.classList.contains("filter-btn")) return;

        document.querySelectorAll(".filter-btn").forEach((btn) =>
          btn.classList.remove("active")
        );
        e.target.classList.add("active");

        const selected = e.target.textContent.toLowerCase();
        projectCards.forEach((card) => {
          const text = card.textContent.toLowerCase();
          card.style.display =
            selected === "all" || text.includes(selected)
              ? "block"
              : "none";
        });
      });
    }
  }

  // --- Theme Toggle (Works Everywhere) ---
  const header = document.querySelector("header");
  if (header && !document.querySelector(".theme-toggle")) {
    const themeToggle = document.createElement("button");
    themeToggle.textContent = "Toggle Theme";
    themeToggle.classList.add("theme-toggle");
    header.appendChild(themeToggle);

    // Apply saved theme
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-theme");
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-theme") ? "dark" : "light"
      );
    });
  }

  // --- Live Clock ---
  if (!document.querySelector(".clock")) {
    const clock = document.createElement("div");
    clock.classList.add("clock");
    document.body.appendChild(clock);

    function updateClock() {
      const now = new Date();
      clock.textContent = `🕒 ${now.toLocaleTimeString()}`;
    }

    setInterval(updateClock, 1000);
    updateClock();
  }

  window.addEventListener("beforeunload", () => {
    console.log(
      "Thanks for visiting! Current time was " + new Date().toLocaleTimeString()
    );
  });
});
