document.addEventListener("DOMContentLoaded", function () {
  console.log("loaded");
  const hash = window.location.hash.substring(1);
  setActiveSection(hash || "home");

  const form = document.getElementById("schedule-a-call");
  const errorList = document.getElementById("error-list");
  const thanks = document.getElementById("thanks");

  if (form)
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      errorList.innerHTML = "";
      let errors = [];

      const businessName = document.getElementById("business_name");
      const phoneNumber = document.getElementById("Phone Number");
      const email = document.getElementById("email");

      if (!businessName.value.trim()) {
        errors.push({
          field: businessName,
          message: "Business Name is required",
        });
      }

      if (!phoneNumber.value.trim()) {
        errors.push({
          field: phoneNumber,
          message: "Phone Number is required",
        });
      }

      if (!email.value.trim()) {
        errors.push({ field: email, message: "Email is required" });
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
          errors.push({ field: email, message: "Email format is invalid" });
        }
      }
     
      if (errors.length > 0) {
        event.preventDefault();
        errors.forEach(function (error) {
          const li = document.createElement("li");
          const errorLink = document.createElement("a");
          errorLink.href = "#";
          errorLink.textContent = error.message;
          errorLink.addEventListener("click", function (e) {
            e.preventDefault();
            error.field.focus();
          });

          li.appendChild(errorLink);
          errorList.appendChild(li);
        });
      } else {
        thanks.style.display = 'block';
      }
    });



  
  document.querySelectorAll(".topnav a").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const sectionId = this.getAttribute("href").substring(1);
      setActiveSection(sectionId);

      
      history.pushState(null, null, `#${sectionId}`);
    });
  });


  const dialog = document.querySelector("dialog");
  const closeButton = document.querySelector("dialog button#close");
  const openButton = document.querySelector("#open");

  closeButton.addEventListener('click', () => {
    dialog.close();
  });

  openButton.addEventListener('click', () => {
    dialog.showModal();
  });

  const textarea = document.getElementById("tell-us");
  const checkBox = document.getElementById("checkboxB");

  checkBox.addEventListener('change', (e) => {
    const checked = checkBox.checked;
    if (checked) {
      textarea.style.display = 'block'; 
    } else {
      textarea.style.display = 'none';
    }
  });

  const toggleSwitch = document.getElementById('toggleSwitch');
  const status = document.getElementById('status');
  
  toggleSwitch.addEventListener('change', (e) => {
    if (e.target.checked) {
      status.setAttribute('aria-label', 'You have chosen to receive email updates');
    } else {
      status.setAttribute('aria-label', 'You will not receive email updates');
    }
  });
});


function hideAllSections() {
  document.querySelectorAll("div[id]").forEach((section) => {
    section.style.display = "none";
  });
}


function setActiveSection(sectionId) {
  hideAllSections();
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.style.display = "block";
  }
}

window.addEventListener("popstate", function (event) {
  const hash = window.location.hash.substring(1);
  setActiveSection(hash || "home");
});

