import {
  defaultQuestions,
  getQuestions,
  setQuestions,
  getTotalQuestions,
  setTotalQuestions,
  getCurrentQuestion,
  setCurrentQuestion,
  startQuiz,
} from "./quiz.js";

// Файл для автоматического показа квиза через 15-20 секунд после загрузки страницы
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded в quiz-auto.js");

  // Показываем квиз через 15-20 секунд после загрузки страницы
  const randomDelay = Math.floor(Math.random() * 5000) + 15000; // 15-20 секунд
  console.log("Запланирован показ квиза через", randomDelay, "мс");

  setTimeout(() => {
    console.log("Показываем квиз");
    // Сбрасываем состояние квиза перед показом
    setQuestions([...defaultQuestions]);
    setTotalQuestions(defaultQuestions.length);
    setCurrentQuestion(1);

    // Показываем квиз в правом нижнем углу
    const quizModal = document.getElementById("quizModal");
    if (!quizModal) {
      console.error("Элемент quizModal не найден");
      return;
    }
    quizModal.style.display = "block";
    document.body.style.overflow = "auto"; // Не блокируем прокрутку страницы

    // Запускаем квиз
    startQuiz();
  }, randomDelay);
});
