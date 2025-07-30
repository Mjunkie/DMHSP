// assets/js/history.js

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const container = document.getElementById("history-container");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch("/api/user/history", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to load history");

    if (data.history && data.history.length > 0) {
      data.history.forEach((entry, index) => {
        const div = document.createElement("div");
        div.classList.add("card", "mb-3");
        div.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">#${index + 1} — ${entry.type}</h5>
            <p class="card-text"><strong>Date:</strong> ${new Date(entry.date).toLocaleString()}</p>
            <p class="card-text"><strong>Summary:</strong> ${entry.summary || "N/A"}</p>
            ${
              entry.details
                ? `<pre class="bg-light p-2 rounded"><code>${JSON.stringify(entry.details, null, 2)}</code></pre>`
                : ""
            }
          </div>
        `;
        container.appendChild(div);
      });
    } else {
      container.innerHTML = `<div class="alert alert-info">No history found yet.</div>`;
    }
  } catch (err) {
    container.innerHTML = `<div class="alert alert-danger">Error loading history: ${err.message}</div>`;
  }
});
