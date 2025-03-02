const gallery = document.querySelector('.gallery');
const imageURLs = [
    "https://i.imgur.com/nqRo4Jb.png",  // Заменить на прямую ссылку
    "https://i.imgur.com/08HG1se.png",
    "https://i.imgur.com/V4JchNn.png",
    "https://i.imgur.com/KaeGffu.png",
    "https://i.imgur.com/V5iVO1D.png",
    "https://i.imgur.com/RIZ3oO2.png",
    "https://i.imgur.com/5Likj4E.png",
    "https://i.imgur.com/6Ehjz5d.png",
    "https://i.imgur.com/rIXat4l.jpeg",
    "https://i.imgur.com/VsVIVbv.jpeg",
    "https://i.imgur.com/RfcHcGh.jpeg",
    "https://i.imgur.com/RY2vPhA.jpeg",
    "https://i.imgur.com/GcpL1Fs.jpeg",
    "https://i.imgur.com/QYTwZdk.jpeg",
    "https://i.imgur.com/4eCLw2P.jpeg",
    "https://i.imgur.com/GdTE06D.png"
];
const descriptions = [
    "Огурчик лучший👪",
    "Огурчик плаки🥰",
    "Огурчик💋",
    "Огурчик МВП🥵",
    "Огурчик красавчик👅",
    "ЭОгурчик Яйцо🙇",
    "Огурчик Страпони🦄",
    "Огурчик🙏",
    "Огурчик жена🤤"
];
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');

for (let i = 0; i < imageURLs.length; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${imageURLs[i]}" alt="Картинка ${i + 1}">
        <h2>Огурчик ${i + 1}</h2>
        <div class="rating" data-index="${i}">
            ${[...Array(5)].map((_, j) => `<span class="star" data-star="${j + 1}">★</span>`).join('')}
        </div>
        <div class="average-rating" id="average-${i}">Рейтинг: Нет оценок</div>
    `;
    gallery.appendChild(card);

    // Открытие модального окна при клике на карточку
    card.addEventListener('click', () => {
        const modalContent = `
            <img src="${imageURLs[i]}" alt="Картинка ${i + 1}" style="max-width: 100%; height: auto;">
            <h2>Огурчик ${i + 1}</h2>
            <p class="modal-description">${descriptions[i]}</p>
        `;
        modal.querySelector('.modal-content').innerHTML = modalContent;
        modal.style.display = 'flex';
    });

    // Загрузка рейтинга из localStorage
    const savedRating = localStorage.getItem(`rating-${i}`);
    if (savedRating) {
        updateRating(i, parseInt(savedRating));
    }
}

// Закрытие модального окна
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закрытие при клике на тёмный фон
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Обработчик для установки рейтинга
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = star.parentElement.getAttribute('data-index');
        const rating = parseInt(star.getAttribute('data-star'));

        localStorage.setItem(`rating-${index}`, rating);
        updateRating(index, rating);
    });
});

// Обновление отображения рейтинга
function updateRating(index, rating) {
    rating = parseInt(rating); // Преобразуем в число

    const stars = document.querySelectorAll(`.rating[data-index="${index}"] .star`);
    stars.forEach((star, i) => {
        if (i < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });

    // Проверяем, равен ли рейтинг числу 5
    const ratingText = rating === 5 ? "ОГУРЧИК" : rating;
    document.getElementById(`average-${index}`).innerText = `Рейтинг: ${ratingText} / 5`;
}
