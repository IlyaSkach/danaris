document.addEventListener("DOMContentLoaded", () => {
  // Здесь будет основная логика приложения
  console.log("Приложение загружено");

  const tracks = document.querySelectorAll(".brands-track");

  // Функция для проверки видимости элемента
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Останавливаем анимацию, когда карусели не видны
  window.addEventListener("scroll", () => {
    tracks.forEach((track) => {
      if (isElementInViewport(track)) {
        track.style.animationPlayState = "running";
      } else {
        track.style.animationPlayState = "paused";
      }
    });
  });

  // Добавляем обработчики для всех логотипов
  const brandImages = document.querySelectorAll(".brands-slide img");

  brandImages.forEach((img) => {
    img.addEventListener("click", function () {
      // Получаем название бренда из alt атрибута
      const brandName = this.alt;

      // Обновляем первый вопрос в квизе
      questions[0] = {
        text: `Вас интересует оборудование ${brandName}?`,
        options: ["Да", "Нет, другой производитель", "Нужна консультация"],
      };

      // Открываем модальное окно с квизом
      openQuizModal();
    });
  });
});

// Обновляем функцию startQuiz
function startQuiz() {
  const chat = document.querySelector(".chat");

  setTimeout(() => {
    const questionElement = document.createElement("div");
    questionElement.classList.add("chat-message", "operator");
    questionElement.innerHTML = `
      <div class="avatar operator-avatar">
        <img src="./assets/olga.gif" alt="avatar">
      </div>
      <div class="message">${questions[0].text}</div>
      <div class="options">
        ${questions[0].options
          .map(
            (option) =>
              `<button class="option" onclick="nextQuestion(1, '${option}')">${option}</button>`
          )
          .join("")}
      </div>
    `;
    chat.appendChild(questionElement);
  }, 1000);
}
