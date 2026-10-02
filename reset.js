"use strict";

const SUPABASE_URL = "https://aignxkrtyuyutqnibilz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpZ254a3J0eXV5dXRxbmliaWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NDU3MTQsImV4cCI6MjA5ODIyMTcxNH0.c6nUO8QyKdFV7OLpySedE0qpfShLOo87d3b5bRMT4DI";

const checking = document.getElementById("checking");
const invalid = document.getElementById("invalid");
const invalidMessage = document.getElementById("invalid-message");
const verified = document.getElementById("verified");
const resetForm = document.getElementById("reset-form");
const complete = document.getElementById("complete");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");
const formMessage = document.getElementById("form-message");
const submitButton = document.getElementById("submit-button");

function showInvalid(message) {
  checking.hidden = true;
  invalid.hidden = false;
  invalidMessage.textContent = message;
}

const fragment = new URLSearchParams(window.location.hash.slice(1));
let accessToken = fragment.get("access_token") || "";
const recoveryType = fragment.get("type");
const authError = fragment.get("error_description") || fragment.get("error");

// The recovery token is needed only in this page's memory. Remove it from the address bar.
history.replaceState(null, document.title, window.location.pathname + window.location.search);

if (authError) {
  showInvalid("This reset link expired or was already used. Request a new reset email from Mesh Painter.");
} else if (!accessToken) {
  showInvalid("Open the latest reset link from your email. If it has expired, request another reset email from Mesh Painter.");
} else if (recoveryType === "recovery") {
  checking.hidden = true;
  resetForm.hidden = false;
} else {
  // Supabase may also return users here after confirming a signup email.
  checking.hidden = true;
  verified.hidden = false;
}

resetForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  formMessage.textContent = "";

  const password = passwordInput.value;
  const confirmation = confirmInput.value;
  if (password.length < 6) {
    formMessage.textContent = "Use at least 6 characters for your password.";
    return;
  }
  if (password !== confirmation) {
    formMessage.textContent = "The passwords do not match.";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Saving…";
  try {
    const response = await fetch(SUPABASE_URL + "/auth/v1/user", {
      method: "PUT",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password: password })
    });

    const result = await response.json().catch(function () { return {}; });
    if (!response.ok) {
      formMessage.textContent = result.msg || result.message || "Supabase couldn't update the password. Request a fresh reset link and try again.";
      return;
    }

    passwordInput.value = "";
    confirmInput.value = "";
    accessToken = "";
    resetForm.hidden = true;
    complete.hidden = false;
  } catch (_error) {
    formMessage.textContent = "Couldn't reach Supabase. Check your connection and try again.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Save new password";
  }
});
