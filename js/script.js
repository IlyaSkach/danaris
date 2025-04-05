import { brandsData } from "./brands-data.js";

// Проверяем, что данные брендов загружены
console.log("Loaded brands data:", brandsData);

document.addEventListener("DOMContentLoaded", () => {
  // Обработчик для кнопки CTA
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", () => {
      console.log("CTA button clicked");
    });
  }

  // Обработчик для элементов брендов
  const brandItems = document.querySelectorAll(".brand-item");
  brandItems.forEach((item) => {
    item.addEventListener("click", () => {
      const brandName = item.querySelector("h3").textContent;
      // Преобразуем название бренда в ключ
      const brandKey = brandName
        .toLowerCase()
        .replace(/\+/g, "")
        .replace(/\s+/g, "")
        .replace(/[^a-zа-я0-9]/g, "");

      console.log("Brand Name:", brandName);
      console.log("Brand Key:", brandKey);
      console.log("Available brands:", Object.keys(brandsData));

      const brandData = brandsData[brandKey];
      console.log("Brand Data:", brandData);

      if (brandData) {
        openBrandModal(brandData);
      } else {
        openBrandModal({
          name: brandName,
          description: "Информация о бренде находится в разработке.",
          features: [],
          image: item.querySelector("img").src,
        });
      }
    });
  });

  // Добавляем плавную прокрутку для всех внутренних ссылок
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

// Функция для открытия модального окна с информацией о бренде
function openBrandModal(brandData) {
  // Создаем модальное окно, если его еще нет
  let brandModal = document.getElementById("brandModal");
  if (!brandModal) {
    brandModal = document.createElement("div");
    brandModal.id = "brandModal";
    brandModal.className = "modal";
    brandModal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div class="brand-info">
          <h2 id="brandTitle"></h2>
          <img id="brandImage" src="" alt="">
          <div class="brand-description"></div>
          <div class="brand-features"></div>
          <div class="brand-form">
            <div class="form-group">
              <label for="brandName">Ваше имя</label>
              <input type="text" id="brandName" placeholder="Введите ваше имя">
            </div>
            <div class="form-group">
              <label for="brandPhone">Телефон</label>
              <input type="tel" id="brandPhone" placeholder="+7 (___) ___-__-__">
            </div>
            <div class="form-group">
              <label for="brandEmail">Email</label>
              <input type="email" id="brandEmail" placeholder="Введите ваш email">
            </div>
            <div class="form-group">
              <label for="brandMessage">Сообщение</label>
              <textarea id="brandMessage" placeholder="Опишите, какое оборудование вас интересует"></textarea>
            </div>
            <button class="submit-button">Отправить</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(brandModal);

    // Добавляем обработчик для крестика
    const closeBtn = brandModal.querySelector(".close-modal");
    closeBtn.addEventListener("click", () => closeBrandModal());

    // Добавляем обработчик для кнопки отправки
    const submitBtn = brandModal.querySelector(".submit-button");
    submitBtn.addEventListener("click", () => submitBrandForm());

    // Закрытие модального окна при клике вне его области
    brandModal.addEventListener("click", (e) => {
      if (e.target === brandModal) {
        closeBrandModal();
      }
    });
  }

  // Заполняем данные о бренде
  document.getElementById("brandTitle").textContent = brandData.name;
  document.getElementById("brandImage").src = brandData.image;
  document.getElementById("brandImage").alt = brandData.name;

  const descriptionElement = brandModal.querySelector(".brand-description");
  descriptionElement.innerHTML = `<p>${brandData.description}</p>`;

  const featuresElement = brandModal.querySelector(".brand-features");
  if (brandData.features && brandData.features.length > 0) {
    featuresElement.innerHTML = `
      <h3>Особенности и преимущества:</h3>
      <ul>
        ${brandData.features.map((feature) => `<li>${feature}</li>`).join("")}
      </ul>
    `;
  } else {
    featuresElement.innerHTML = "";
  }

  // Показываем модальное окно
  brandModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Функция для закрытия модального окна
function closeBrandModal() {
  const brandModal = document.getElementById("brandModal");
  if (brandModal) {
    brandModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Функция для отправки формы
function submitBrandForm() {
  const name = document.getElementById("brandName").value;
  const phone = document.getElementById("brandPhone").value;
  const email = document.getElementById("brandEmail").value;
  const message = document.getElementById("brandMessage").value;
  const brandName = document.getElementById("brandTitle").textContent;

  if (name && phone) {
    console.log("Форма отправлена:", {
      name,
      phone,
      email,
      message,
      brandName,
    });
    closeBrandModal();
    alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
  } else {
    alert("Пожалуйста, заполните имя и телефон");
  }
}
