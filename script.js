const form = document.getElementById("contact-form");
const successState = document.getElementById("success-state");

// Inputs
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const consent = document.getElementById("consent");
const queryTypes = document.getElementsByName("query-type");

// Error elements
const firstNameError = document.getElementById("first-name-error");
const lastNameError = document.getElementById("last-name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
const consentError = document.getElementById("consent-error");
const queryError = document.getElementById("query-error");

// radio group
const fieldset = document.querySelector("fieldset");

//validation helper
const isValidEmail = (emailValue) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
};

// --- Reusable error toggle ---
const toggleError = (inputEl, errorEl, isError) => {
  if (isError) {
    errorEl.hidden = false;
    inputEl.classList.add("input-error");
    inputEl.setAttribute("aria-invalid", "true");
  } else {
    errorEl.hidden = true;
    inputEl.classList.remove("input-error");
    inputEl.setAttribute("aria-invalid", "false");
  }
};

// --- Real-time validation ---
[firstName, lastName, email, message].forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("input-error");
    input.setAttribute("aria-invalid", "false");
  });
});

consent.addEventListener("change", () => {
  consentError.hidden = consent.checked;
});

queryTypes.forEach((radio) => {
  radio.addEventListener("change", () => {
    queryError.hidden = true;
    fieldset.classList.remove("input-error");
  });
});

// --- Form Submit ---
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  //  First Name
  if (firstName.value.trim() === "") {
    toggleError(firstName, firstNameError, true);
    isValid = false;
  } else {
    toggleError(firstName, firstNameError, false);
  }

  //  Last Name
  if (lastName.value.trim() === "") {
    toggleError(lastName, lastNameError, true);
    isValid = false;
  } else {
    toggleError(lastName, lastNameError, false);
  }

  //  Email
  if (!isValidEmail(email.value.trim())) {
    toggleError(email, emailError, true);
    isValid = false;
  } else {
    toggleError(email, emailError, false);
  }

  //  Query Type
  const querySelected = Array.from(queryTypes).some((radio) => radio.checked);

  if (!querySelected) {
    queryError.hidden = false;
    fieldset.classList.add("input-error");
    isValid = false;
  } else {
    queryError.hidden = true;
    fieldset.classList.remove("input-error");
  }

  // Message
  if (message.value.trim() === "") {
    toggleError(message, messageError, true);
    isValid = false;
  } else {
    toggleError(message, messageError, false);
  }

  //  Consent
  if (!consent.checked) {
    consentError.hidden = false;
    isValid = false;
  } else {
    consentError.hidden = true;
  }

  // --- Focus first error ---
  if (!isValid) {
    const firstError = document.querySelector(".input-error");
    firstError?.focus();
    return;
  }

  // --- Success
  successState.hidden = false;
  form.reset();

  // Reset styles 
  document.querySelectorAll(".input-error").forEach((el) => {
    el.classList.remove("input-error");
    el.setAttribute("aria-invalid", "false");
  });

  fieldset.classList.remove("input-error");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Hide success after 4 seconds
  setTimeout(() => {
    successState.hidden = true;
  }, 4000);
});