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
    const brandInfoButton = item.querySelector(".brand-info-button");
    const orderButton = item.querySelector(".order-button");
    const brandName = item.getAttribute("data-brand");

    if (brandInfoButton) {
      brandInfoButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const brandData = brandsData[brandName];
        if (brandData) {
          openBrandModal(brandData);
        }
      });
    }

    if (orderButton) {
      orderButton.addEventListener("click", (e) => {
        e.stopPropagation();
        openOrderModal(brandName);
      });
    }
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
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <div class="brand-info">
        <img src="${brandData.image}" alt="${
    brandData.name
  }" class="brand-logo">
        <h2>${brandData.name}</h2>
        <div class="brand-description">
          <p>${brandData.description || "Описание бренда отсутствует"}</p>
        </div>
        <div class="brand-features">
          <h3>Особенности:</h3>
          <ul>
            ${brandData.features
              .map((feature) => `<li>${feature}</li>`)
              .join("")}
          </ul>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  modal.style.display = "block";

  const closeBtn = modal.querySelector(".close");
  closeBtn.onclick = function () {
    modal.remove();
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.remove();
    }
  };
}

function openOrderModal(brandName) {
  const brandItem = document.querySelector(`[data-brand="${brandName}"]`);
  const brandImage = brandItem ? brandItem.querySelector("img").src : "";

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <div class="order-form">
        <div class="brand-image">
          <img src="${brandImage}" alt="${brandName}">
        </div>
        <h2>Заказать оборудование ${brandName}</h2>
        <form id="orderForm">
          <div class="form-group">
            <label for="name">Ваше имя:</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="phone">Телефон:</label>
            <input type="tel" id="phone" name="phone" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="message">Сообщение:</label>
            <textarea id="message" name="message" rows="4"></textarea>
          </div>
          <button type="submit" class="submit-button">Отправить заявку</button>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  modal.style.display = "block";

  const closeBtn = modal.querySelector(".close");
  closeBtn.onclick = function () {
    modal.remove();
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.remove();
    }
  };

  const form = modal.querySelector("#orderForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Здесь можно добавить логику отправки формы
    alert("Спасибо за заявку! Мы свяжемся с вами в ближайшее время.");
    modal.remove();
  });
}
