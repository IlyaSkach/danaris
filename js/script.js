// Базовые вопросы для кнопки "Подобрать оборудование"
const defaultQuestions = [
  {
    text: "Какой тип компрессора вас интересует?",
    options: ["Винтовой", "Поршневой", "Спиральный", "Не знаю"],
  },
  {
    text: "Какая производительность вам необходима?",
    options: ["До 500 л/мин", "500-1000 л/мин", "Более 1000 л/мин", "Не знаю"],
  },
  {
    text: "Для каких целей нужен компрессор?",
    options: [
      "Промышленное производство",
      "Строительство",
      "Сервис и ремонт",
      "Другое",
    ],
  },
];

// Копия вопросов для изменения при клике на бренд
let questions = [...defaultQuestions];

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
      const brandName = this.alt;

      // Создаем новый массив вопросов для бренда
      questions = [
        {
          text: `Вас интересует оборудование ${brandName}?`,
          options: ["Да", "Нет, другой производитель", "Нужна консультация"],
        },
        ...defaultQuestions.slice(1), // Добавляем остальные вопросы из базового набора
      ];

      currentQuestion = 1;
      openQuizModal();
    });
  });

  // Добавляем обработчик для кнопки "Подобрать оборудование"
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      // Возвращаем исходные вопросы
      questions = [...defaultQuestions];
      currentQuestion = 1;
      openQuizModal();
    });
  }

  // Закрытие модального окна по клику вне его области
  window.onclick = function (event) {
    const modal = document.getElementById("quizModal");
    if (event.target == modal) {
      closeQuizModal();
    }
  };
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
