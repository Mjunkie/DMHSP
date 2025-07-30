// assets/js/quiz.js

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) return (window.location.href = "login.html");

  const quizForm = document.getElementById("quiz-form");
  const quizContainer = document.getElementById("quiz-questions");
  const resultDiv = document.getElementById("quiz-result");

  let quizQuestions = [];

  // Load quiz questions (replace with dynamic loading if needed)
  quizQuestions = [
    {
      id: 1,
      question: "How often have you felt anxious in the past week?",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      id: 2,
      question: "How well have you been sleeping?",
      options: ["Very well", "Okay", "Poorly", "Not at all"],
    },
    {
      id: 3,
      question: "Do you feel supported by those around you?",
      options: ["Always", "Sometimes", "Rarely", "Never"],
    },
  ];

  function renderQuestions() {
    quizQuestions.forEach((q, index) => {
      const qDiv = document.createElement("div");
      qDiv.classList.add("mb-4");
      qDiv.innerHTML = `
        <p><strong>Q${index + 1}:</strong> ${q.question}</p>
        ${q.options
          .map(
            (opt, i) => `
            <div class="form-check">
              <input class="form-check-input" type="radio" name="q${q.id}" value="${opt}" id="q${q.id}_${i}" required>
              <label class="form-check-label" for="q${q.id}_${i}">
                ${opt}
              </label>
            </div>
          `
          )
          .join("")}
      `;
      quizContainer.appendChild(qDiv);
    });
  }

  renderQuestions();

  quizForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const answers = quizQuestions.map((q) => {
      const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
      return {
        questionId: q.id,
        question: q.question,
        answer: selected ? selected.value : "",
      };
    });

    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Submission failed");

      resultDiv.innerHTML = `<div class="alert alert-success">✅ Quiz submitted successfully!</div>`;
    } catch (err) {
      console.error(err);
      resultDiv.innerHTML = `<div class="alert alert-danger">❌ ${err.message}</div>`;
    }
  });
});
