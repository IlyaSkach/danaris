// Конфигурация вопросов
const questions = [
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

let currentQuestion = 1;
const totalQuestions = questions.length;

function openQuizModal() {
  const modal = document.getElementById("quizModal");
  modal.style.display = "block";
  document.body.classList.add("modal-open");
  startQuiz();
}

function closeQuizModal() {
  const modal = document.getElementById("quizModal");
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
  // Сброс квиза
  currentQuestion = 1;
  document.querySelector(".chat").innerHTML = "";
  document.querySelector(".progress").style.width = "0%";
  document.querySelector(".welcome-text").style.display = "block";
}

// Добавим закрытие по клику вне модального окна
window.onclick = function (event) {
  const modal = document.getElementById("quizModal");
  const popup = document.getElementById("popup");
  if (event.target == modal) {
    closeQuizModal();
  }
  if (event.target == popup) {
    closePopup();
  }
};

function startQuiz() {
  const nextQuestionData = questions[0];
  const chat = document.querySelector(".chat");

  setTimeout(() => {
    const questionElement = document.createElement("div");
    questionElement.classList.add("chat-message", "operator");
    questionElement.innerHTML = `
      <div class="avatar operator-avatar">
        <img src="./images/olga.gif" alt="avatar">
      </div>
      <div class="message">${nextQuestionData.text}</div>
      <div class="options">
        ${nextQuestionData.options
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

function nextQuestion(questionNumber, userAnswer) {
  if (questionNumber !== currentQuestion) {
    return;
  }

  // Скрываем текст приветствия после ответа на первый вопрос
  if (currentQuestion === 1) {
    document.querySelector(".welcome-text").style.display = "none";
  }

  // Добавляем ответ пользователя в чат
  const userAnswerMessage = document.createElement("div");
  userAnswerMessage.classList.add("chat-message", "user-answer");
  userAnswerMessage.innerHTML = `
    <div class="message">${userAnswer}</div>
  `;
  document.querySelector(".chat").appendChild(userAnswerMessage);

  // Автоскролл после ответа пользователя
  const chatContainer = document.querySelector("main");
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Показываем "печатает..."
  const typingMessage = document.createElement("div");
  typingMessage.classList.add("chat-message", "operator", "typing-message");
  typingMessage.innerHTML = `
    <div class="avatar operator-avatar">
      <img src="./images/olga.gif" alt="avatar">
    </div>
    <div class="message typing">
      Оля печатает<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
    </div>
  `;
  document.querySelector(".chat").appendChild(typingMessage);

  // Автоскролл после добавления "печатает..."
  chatContainer.scrollTop = chatContainer.scrollHeight;

  setTimeout(() => {
    // Удаляем сообщение "печатает..."
    typingMessage.remove();

    if (currentQuestion < totalQuestions) {
      const nextQuestionData = questions[currentQuestion];
      const nextQuestionElement = document.createElement("div");
      nextQuestionElement.classList.add("chat-message", "operator");
      nextQuestionElement.innerHTML = `
        <div class="avatar operator-avatar">
          <img src="./Images/olga.gif" alt="avatar">
        </div>
        <div class="message">${nextQuestionData.text}</div>
        <div class="options">
          ${nextQuestionData.options
            .map(
              (option) =>
                `<button class="option" onclick="nextQuestion(${
                  currentQuestion + 1
                }, '${option}')">${option}</button>`
            )
            .join("")}
        </div>
      `;
      document.querySelector(".chat").appendChild(nextQuestionElement);
      currentQuestion++;

      // Автоскролл после добавления нового вопроса
      chatContainer.scrollTop = chatContainer.scrollHeight;
    } else {
      // Форма для контактных данных
      const formElement = document.createElement("div");
      formElement.classList.add("chat-message", "operator");
      formElement.innerHTML = `
        <div class="avatar operator-avatar">
          <img src="./images/olga.gif" alt="avatar">
        </div>
        <div class="message">
          <p>Введите Ваше имя:</p>
          <input type="text" id="user-name" placeholder="Ваше имя">
          <p>Введите Ваш телефон:</p>
          <input type="tel" id="user-phone" placeholder="+7 (999) 999-99-99" maxlength="18" oninput="formatPhoneNumber(this)">
          <button class="submit-button" onclick="submitForm()">Отправить</button>
        </div>
      `;
      document.querySelector(".chat").appendChild(formElement);

      // Автоскролл после добавления формы
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Обновляем прогресс-бар
    const progress = (currentQuestion / totalQuestions) * 100;
    document.querySelector(".progress").style.width = `${progress}%`;

    // Скролл вниз
    window.scrollTo(0, document.body.scrollHeight);
  }, 1500);
}

function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.startsWith("7")) {
    value = value.slice(1);
  }
  let formattedValue = "+7";
  if (value.length > 0) {
    formattedValue += " (" + value.substring(0, 3);
  }
  if (value.length >= 3) {
    formattedValue += ")";
  }
  if (value.length > 3) {
    formattedValue += " " + value.substring(3, 6);
  }
  if (value.length >= 6) {
    formattedValue += "-";
  }
  if (value.length > 6) {
    formattedValue += value.substring(6, 8);
  }
  if (value.length >= 8) {
    formattedValue += "-";
  }
  if (value.length > 8) {
    formattedValue += value.substring(8, 10);
  }
  input.value = formattedValue.slice(0, 18);
}

function submitForm() {
  const name = document.getElementById("user-name").value;
  const phone = document.getElementById("user-phone").value;
  const phonePattern = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;

  if (!name || !phonePattern.test(phone)) {
    showPopup("Введите корректное имя и номер телефона");
    return;
  }

  // Добавляем сообщение об успешной отправке
  const thankYouMessage = document.createElement("div");
  thankYouMessage.classList.add("chat-message", "operator");
  thankYouMessage.innerHTML = `
    <div class="avatar operator-avatar">
      <img src="./images/olga.gif" alt="avatar">
    </div>
    <div class="message">
      Спасибо за ваши ответы, ${name}! Мы свяжемся с вами в ближайшее время по телефону ${phone}
    </div>
  `;
  document.querySelector(".chat").appendChild(thankYouMessage);

  // Автоскролл после добавления сообщения
  const chatContainer = document.querySelector("main");
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Закрываем модальное окно через 3 секунды
  setTimeout(closeQuizModal, 3000);
}

function showPopup(message) {
  const popup = document.getElementById("popup");
  document.getElementById("popup-message").textContent = message;
  popup.style.display = "flex";
  // Добавляем небольшую задержку перед добавлением класса show для анимации
  setTimeout(() => {
    popup.classList.add("show");
  }, 10);
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.classList.remove("show");
  setTimeout(() => {
    popup.style.display = "none";
  }, 300); // Время должно совпадать с длительностью transition в CSS
}
