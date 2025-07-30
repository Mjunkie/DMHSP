// assets/js/dashboard.js

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) return window.location.href = "login.html";

  try {
    const res = await fetch("/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch profile");
    const user = await res.json();

    // Fill profile modal
    document.getElementById("profileName").textContent = user.name;
    document.getElementById("profileEmail").textContent = user.email;
    document.getElementById("profilePhone").textContent = user.phone || "-";

    // Set inputs for editing
    document.getElementById("editName").value = user.name;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editPhone").value = user.phone || "";

  } catch (err) {
    console.error(err);
    alert("Session expired or failed to load profile");
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
});

// Save profile changes
document.getElementById("saveProfileBtn")?.addEventListener("click", async () => {
  const name = document.getElementById("editName").value.trim();
  const email = document.getElementById("editEmail").value.trim();
  const phone = document.getElementById("editPhone").value.trim();
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email, phone }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Update failed");

    alert("Profile updated successfully");
    location.reload();
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// Reset password
document.getElementById("resetPasswordBtn")?.addEventListener("click", async () => {
  const newPassword = prompt("Enter new password:");
  const token = localStorage.getItem("token");

  if (!newPassword) return;

  try {
    const res = await fetch("/api/user/reset-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password: newPassword }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Password reset failed");

    alert("Password reset successful");
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// Sign out
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});
