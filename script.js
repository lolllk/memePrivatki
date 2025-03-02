const gallery = document.querySelector('.gallery');
const imageUrlInput = document.getElementById('imageUrl');
const descriptionInput = document.getElementById('description');
const publishButton = document.getElementById('publish');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const modalContent = modal.querySelector('.modal-content');

// Функция для создания карточки
function createCard(imageUrl, description, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${imageUrl}" alt="Картинка ${index + 1}">
        <h2>${description || `Огурчик ${index + 1}`}</h2>
    `;

    // Добавляем обработчик клика на карточку
    card.addEventListener('click', () => {
        openModal(imageUrl, description || `Огурчик ${index + 1}`);
    });

    gallery.appendChild(card);
}

// Функция для открытия модального окна
function openModal(imageUrl, description) {
    modal.style.display = 'flex'; // Показываем модальное окно
    modalContent.innerHTML = `
        <span class="close" id="close-modal">&times;</span>
        <img src="${imageUrl}" alt="Мем" style="width: 100%; max-height: 400px; object-fit: contain;">
        <h2>${description}</h2>
    `;
    // Обновляем кнопку закрытия модального окна
    document.getElementById('close-modal').addEventListener('click', closeModalFunction);
}

// Функция для закрытия модального окна
function closeModalFunction() {
    modal.style.display = 'none'; // Скрываем модальное окно
}

// Загрузка всех мемов с сервера
function loadMemes() {
    fetch('http://195.2.80.133:3000/api/memes')
        .then(response => response.json())
        .then(memes => {
            memes.forEach((meme, index) => {
                createCard(meme.imageUrl, meme.description, index);
            });
        })
        .catch(error => console.error('Error loading memes:', error));
}

// Добавление нового мема на сервер
publishButton.addEventListener('click', () => {
    const imageUrl = imageUrlInput.value;
    const description = descriptionInput.value;

    if (!imageUrl || !description) {
        alert('Заполните все поля!');
        return;
    }

    // Отправка данных на сервер
    fetch('http://195.2.80.133:3000/api/memes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl, description }),
    })
        .then(response => {
            if (response.ok) {
                loadMemes(); // Перезагружаем мемы после добавления
            } else {
                alert('Ошибка при добавлении мема');
            }
        })
        .catch(error => console.error('Error adding meme:', error));

    imageUrlInput.value = '';
    descriptionInput.value = '';
});

// Загружаем мемы при инициализации страницы
loadMemes();

// Убираем необходимость подтверждения, делаем кнопку доступной сразу
imageUrlInput.addEventListener('input', () => {
    publishButton.disabled = !(imageUrlInput.value && descriptionInput.value);
});

descriptionInput.addEventListener('input', () => {
    publishButton.disabled = !(imageUrlInput.value && descriptionInput.value);
});
