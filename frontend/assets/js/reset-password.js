// assets/js/reset.js

document.addEventListener("DOMContentLoaded", () => {
  const isResetForm = document.getElementById("reset-form");
  const isNewPasswordForm = document.getElementById("new-password-form");
  const messageDiv = document.getElementById("reset-message");

  // Phase 1: Request password reset
  if (isResetForm) {
    isResetForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("reset-email").value.trim();

      try {
        const res = await fetch("/api/auth/reset-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Reset failed");

        messageDiv.innerHTML = `<div class="alert alert-success">🔗 Reset link sent to your email!</div>`;
      } catch (err) {
        messageDiv.innerHTML = `<div class="alert alert-danger">❌ ${err.message}</div>`;
      }
    });
  }

  // Phase 2: Submit new password with token
  if (isNewPasswordForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      messageDiv.innerHTML = `<div class="alert alert-danger">Invalid or missing token.</div>`;
      isNewPasswordForm.style.display = "none";
      return;
    }

    isNewPasswordForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const password = document.getElementById("new-password").value;

      try {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Reset failed");

        messageDiv.innerHTML = `<div class="alert alert-success">✅ Password reset! You can now <a href="login.html">log in</a>.</div>`;
        isNewPasswordForm.reset();
      } catch (err) {
        messageDiv.innerHTML = `<div class="alert alert-danger">❌ ${err.message}</div>`;
      }
    });
  }
});
