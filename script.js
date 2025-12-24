const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;
const stored = localStorage.getItem("theme");
  function updateToggle() {
    const isDark = root.getAttribute("data-theme") === "dark";
    if(!toggle) return;

    toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    toggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
}

function applyTheme(theme) {
    if(theme === "dark") {
        root.setAttribute("data-theme", "dark");
    } else {
        root.removeAttribute("data-theme");
    }
    updateToggle();
} if(stored) {
    applyTheme(stored);
} else if (window.matchMedia && window.matchMedia(
    "(prefers-color-scheme: dark)").matches) {
        applyTheme("dark");
    } else {
        applyTheme("light");

    } if(toggle) {toggle.addEventListener("click", ()=> {
        const next  = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next); 
        localStorage.setItem("theme", next);
    });
}

// set current year in footer
const yearEl = document.getElementById('year');
if(yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* Contact form handling */
const contactForm = document.getElementById('contact-form');
if(contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.elements['name'].value.trim();
    const email = this.elements['email'].value.trim();
    const message = this.elements['message'].value.trim();
    const successEl = document.getElementById('contact-success');

    if(!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }

  
    const subject = encodeURIComponent('Contact from portfolio: ' + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:okoloebuka756@gmail.com?subject=${subject}&body=${body}`;

    if(successEl) {
      successEl.textContent = 'Thanks! Your email client has been opened.';
      successEl.style.opacity = 1;
      setTimeout(()=>{ successEl.style.opacity = 0; }, 5000);
      contactForm.reset();
    }
  });
}