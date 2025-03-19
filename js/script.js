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
});
