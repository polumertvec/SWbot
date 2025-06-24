document.addEventListener('DOMContentLoaded', () => {
    // Получаем элементы DOM
    const loadingScreen = document.getElementById('loading-screen');
    const introSceneScreen = document.getElementById('intro-scene-screen');
    const mainMenuScreen = document.getElementById('main-menu-screen');

    const gameLogo = document.getElementById('game-logo');
    const introLogo = document.getElementById('intro-logo'); // НОВЫЙ КОД: Получаем лого из интро
    const loadingEllipsis = document.getElementById('loading-ellipsis');
    const loadingStartButton = document.getElementById('loading-start-button');

    const startGameBtnIntro = document.getElementById('startGameBtnIntro');
    const allGamesBtnIntro = document.getElementById('allGamesBtnIntro');
    const langRuBtn = document.getElementById('langRuBtn');
    const langEngBtn = document.getElementById('langEngBtn');

    const mainMenuLangRuButton = document.getElementById('mainMenuLangRuButton');
    const mainMenuLangEngButton = document.getElementById('mainMenuLangEngButton');

    const mainMenuStartButton = document.getElementById('mainMenuStartButton');
    const mainMenuBackButton = document.getElementById('mainMenuBackButton');

    const creditsModal = document.getElementById('creditsModal');
    const creditsInput = document.getElementById('credits-input');
    const confirmCreditsBtn = document.getElementById('confirmCreditsBtn');

    const analysisMessageModal = document.getElementById('analysisMessageModal');
    const syncMessagesContainer = document.getElementById('sync-messages-container');

    const analysisBarContainer = document.getElementById('analysis-bar-container');
    const analysisProgressBar = document.getElementById('analysis-progress-bar');

    const predictionResultModal = document.getElementById('predictionResultModal');
    const predictionResultsDiv = document.getElementById('prediction-results');
    const closePredictionResultBtn = document.getElementById('closePredictionResultBtn');

    // НОВЫЙ КОД: Элементы админ-панели (требуют наличия HTML-кода)
    const adminPanelModal = document.getElementById('adminPanelModal');
    const confirmAdminDataBtn = document.getElementById('confirmAdminDataBtn');
    const closeAdminPanelBtn = document.getElementById('closeAdminPanelBtn');
    const adminCreditsInput = document.getElementById('admin-credits-input');
    const adminGamesInput = document.getElementById('admin-games-input');
    const adminZanosInput = document.getElementById('admin-zanos-input');
    const adminChanceInput = document.getElementById('admin-chance-input');

    // Глобальные переменные для управления состояниями
    let currentScreen = loadingScreen;
    let loadingDotsInterval;
    let adminData = null; // НОВЫЙ КОД: Переменная для хранения админских данных

    // --- Обновленный код для облаков ---
    const cloudsBackground = document.getElementById('clouds-background');
    const cloudImages = ['cloud1.png', 'cloud2.png']; // Ваши изображения облаков

    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createCloud() {
        const cloud = document.createElement('img');
        cloud.classList.add('moving-cloud');
        const randomImage = cloudImages[Math.floor(Math.random() * cloudImages.length)];
        cloud.src = randomImage;
        cloud.alt = 'Cloud';
        const randomWidth = getRandomNumber(108, 240);
        cloud.style.width = `${randomWidth}px`;
        cloud.style.height = 'auto';
        const randomTop = getRandomNumber(0, 30);
        cloud.style.top = `${randomTop}%`;
        cloud.style.left = `${getRandomNumber(-randomWidth * 0.8, -randomWidth * 0.2)}px`;
        cloud.style.animationName = 'moveAndFadeCloud';
        const randomDuration = getRandomNumber(20, 40);
        cloud.style.animationDuration = `${randomDuration}s`;
        cloud.style.opacity = getRandomNumber(0.4, 0.9);
        cloudsBackground.appendChild(cloud);
        cloud.addEventListener('animationend', () => {
            cloudsBackground.removeChild(cloud);
            createCloud();
        });
    }

    const numberOfClouds = 8;
    for (let i = 0; i < numberOfClouds; i++) {
        setTimeout(createCloud, i * 2000);
    }
    
    // --- Вспомогательные функции для показа/скрытия экранов и модальных окон ---
    function showScreen(screenToShow) {
        currentScreen.classList.remove('active');
        currentScreen.classList.add('hidden');
        screenToShow.classList.remove('hidden');
        screenToShow.classList.add('active');
        currentScreen = screenToShow;
    }

    function showModal(modalToShow) {
        modalToShow.style.display = 'flex';
        requestAnimationFrame(() => {
            modalToShow.classList.remove('hidden');
            modalToShow.classList.add('active');
        });
    }

    function hideModal(modalToHide) {
        modalToHide.classList.remove('active');
        modalToHide.classList.add('hidden');
        setTimeout(() => {
            modalToHide.style.display = 'none';
        }, 300);
    }

    // --- Логика загрузочного экрана ---
    function startLoadingAnimation() {
        let dots = 0;
        loadingDotsInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            loadingEllipsis.textContent = '.'.repeat(dots);
        }, 300);

        setTimeout(() => {
            clearInterval(loadingDotsInterval);
            loadingEllipsis.textContent = '';
            loadingStartButton.classList.remove('hidden');
            gameLogo.style.opacity = '1';
        }, 3000);
    }

    // --- Объекты переводов ---
    // ИЗМЕНЕНО: Добавлены переводы для админ-панели
    const translations = {
        ru: {
            title: "Avia Masters Hack",
            loading: "Загрузка",
            start: "НАЧАТЬ",
            chooseLanguage: "Выбор языка:",
            ruLangCode: "RU",
            enLangCode: "ENG",
            allGames: "Все игры",
            predictorTitle: "ПРЕДСКАЗАТЕЛЬ",
            changeLangRu: "Смена языков RUS",
            changeLangEng: "Смена языков ENG",
            allGamesBack: "Все игры = назад",
            analyzing: "Идет анализ...",
            enterCreditsTitle: "Введите сумму ставки:",
            enterAmountPlaceholder: "Введите сумму",
            confirm: "ПОДТВЕРДИТЬ",
            syncDataTitle: "СИНХРОНИЗАЦИЯ ДАННЫХ",
            flightFinishedTitle: "ПОЛЕТ ЗАВЕРШЕН",
            close: "Закрыть",
            // НОВЫЕ ПЕРЕВОДЫ
            adminPanelTitle: "Админ-панель",
            adminCreditsLabel: "Сумма ставки",
            adminGamesLabel: "Игр осталось",
            adminZanosLabel: "Коэффициент X",
            adminChanceLabel: "Шанс %",
            alertMessages: {
                invalidCredits: "Пожалуйста, введите корректную сумму кредитов.",
                allGamesNotImplemented: "Переход к списку всех игр (пока не реализовано)",
                adminDataIncomplete: "Пожалуйста, заполните все поля в админ-панели."
            },
            syncMessages: [
                { text: "Инициализация модулей...", type: "normal" },
                { text: "Попытка подключения к BGAMING API...", type: "normal" },
                { text: "Ошибка подключения к BGAMING API. Код: 503.", type: "error" },
                { text: "Повторная попытка подключения...", type: "warning" },
                { text: "Подключение установлено.", type: "success" },
                { text: "Загрузка параметров клиента...", type: "normal" },
                { text: "Синхронизация данных пользователя...", type: "normal" },
                { text: "Обнаружены новые обновления...", type: "normal" },
                { text: "Применение обновлений...", type: "normal" },
                { text: "Все системы синхронизированы. Запуск.", type: "success" }
            ],
            aircraftCarrierAlt: "Авианосец",
            airplaneAlt: "Самолет",
            gameLogoAlt: "Логотип Игры",
            introLogoAlt: "Логотип Avia Masters Hack",
            predictionMessage: "Вам осталось <span class=\"highlight-text\">${games}</span> игр со ставкой <span class=\"highlight-text\">${userCredits}</span>, до заноса <span class=\"highlight-text\">x${zanos}</span> c шансом <span class=\"highlight-text\">${chance}%</span>"
        },
        en: {
            title: "Avia Masters Hack",
            loading: "Loading",
            start: "START",
            chooseLanguage: "Choose language:",
            ruLangCode: "RU",
            enLangCode: "ENG",
            allGames: "All Games",
            predictorTitle: "PREDICTOR",
            changeLangRu: "Switch to Russian",
            changeLangEng: "Switch to English",
            allGamesBack: "All games = back",
            analyzing: "Analyzing...",
            enterCreditsTitle: "Enter bet amount:",
            enterAmountPlaceholder: "Enter amount",
            confirm: "CONFIRM",
            syncDataTitle: "DATA SYNCHRONIZATION",
            flightFinishedTitle: "FLIGHT COMPLETED",
            close: "Close",
            // НОВЫЕ ПЕРЕВОДЫ
            adminPanelTitle: "Admin Panel",
            adminCreditsLabel: "Bet Amount",
            adminGamesLabel: "Games Left",
            adminZanosLabel: "Multiplier X",
            adminChanceLabel: "Chance %",
            alertMessages: {
                invalidCredits: "Please enter a valid amount of credits.",
                allGamesNotImplemented: "Transition to all games list (not yet implemented)",
                adminDataIncomplete: "Please fill in all fields in the admin panel."
            },
            syncMessages: [
                { text: "Initializing modules...", type: "normal" },
                { text: "Attempting to connect to BGAMING API...", type: "normal" },
                { text: "BGAMING API connection error. Code: 503.", type: "error" },
                { text: "Retrying connection...", type: "warning" },
                { text: "Connection established.", type: "success" },
                { text: "Loading client parameters...", type: "normal" },
                { text: "Synchronizing user data...", type: "normal" },
                { text: "New updates detected...", type: "normal" },
                { text: "Applying updates...", type: "normal" },
                { text: "All systems synchronized. Launching.", type: "success" }
            ],
            aircraftCarrierAlt: "Aircraft Carrier",
            airplaneAlt: "Airplane",
            gameLogoAlt: "Game Logo",
            introLogoAlt: "Avia Masters Hack Logo",
            predictionMessage: "You have <span class=\"highlight-text\">${games}</span> games left with a bet of <span class=\"highlight-text\">${userCredits}</span>, until a cash-out of <span class=\"highlight-text\">x${zanos}</span> with <span class=\"highlight-text\">${chance}%</span> chance"
        }
    };

    let currentLang = localStorage.getItem('language') || 'ru';

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        document.title = translations[lang].title;

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (element.id === 'loading-ellipsis' && element.parentNode.querySelector('p')) {
                     element.parentNode.querySelector('p').childNodes[0].textContent = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            if (translations[lang][key]) {
                element.alt = translations[lang][key];
            }
        });
        
        const loadingParagraph = document.querySelector('#loading-screen p');
        if (loadingParagraph) {
            if (loadingParagraph.firstChild && loadingParagraph.firstChild.nodeType === Node.TEXT_NODE) {
                loadingParagraph.firstChild.textContent = translations[lang].loading;
            } else {
                loadingParagraph.prepend(document.createTextNode(translations[lang].loading));
            }
        }
    }


    function showSyncProgress() {
        return new Promise(resolve => {
            syncMessagesContainer.innerHTML = '';
            showModal(analysisMessageModal);
            let i = 0;
            const delayBetweenMessages = 1000;
            const messages = translations[currentLang].syncMessages;

            function displayNextSyncMessage() {
                if (i < messages.length) {
                    const messageData = messages[i];
                    const messageElement = document.createElement('p');
                    messageElement.classList.add('sync-message');
                    messageElement.textContent = messageData.text;
                    if (messageData.type && messageData.type !== "normal") {
                        messageElement.classList.add(messageData.type);
                    }
                    syncMessagesContainer.appendChild(messageElement);
                    syncMessagesContainer.scrollTop = syncMessagesContainer.scrollHeight;
                    i++;
                    setTimeout(displayNextSyncMessage, delayBetweenMessages);
                } else {
                    setTimeout(() => {
                        hideModal(analysisMessageModal);
                        resolve();
                    }, 1000);
                }
            }
            displayNextSyncMessage();
        });
    }

    function startAnalysisProgressBar() {
        return new Promise(resolve => {
            analysisProgressBar.style.width = '0%';
            analysisBarContainer.style.display = 'block';
            let width = 0;
            const duration = Math.random() * (6000 - 3000) + 3000;
            const interval = duration / 100;

            let progressInterval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        analysisBarContainer.style.display = 'none';
                        resolve();
                    }, 300);
                } else {
                    width++;
                    analysisProgressBar.style.width = width + '%';
                }
            }, interval);
        });
    }

    // --- Логика генерации предсказания ---
    // ИЗМЕНЕНО: Функция теперь в первую очередь проверяет наличие админских данных
    function generatePrediction(userCredits) {
        const messageTemplate = translations[currentLang].predictionMessage;

        // ШАГ 1: Проверить, есть ли данные от админа
        if (adminData) {
            console.log("Используем данные из админ-панели.");
            return messageTemplate
                .replace('${games}', `<span class="highlight-text">${adminData.games}</span>`)
                .replace('${userCredits}', `<span class="highlight-text">${adminData.credits}</span>`)
                .replace('${zanos}', `<span class="highlight-text">${adminData.zanos}</span>`)
                .replace('${chance}', `<span class="highlight-text">${adminData.chance}</span>`);
        }
        
        // ШАГ 2: Если админских данных нет, выполняем старую логику
        const STORAGE_KEY_PREFIX = 'prediction_';
        const EXPIRATION_TIME = 2 * 60 * 1000;
        const storageKey = STORAGE_KEY_PREFIX + userCredits;
        const storedPredictionString = localStorage.getItem(storageKey);
        let games, zanos, chance;

        if (storedPredictionString) {
            try {
                const storedPrediction = JSON.parse(storedPredictionString);
                if (Date.now() - storedPrediction.timestamp < EXPIRATION_TIME) {
                    console.log(`Используем сохраненное предсказание для ставки ${userCredits}`);
                    games = storedPrediction.games;
                    zanos = storedPrediction.zanos;
                    chance = storedPrediction.chance;
                } else {
                    console.log(`Срок действия предсказания для ставки ${userCredits} истек.`);
                    localStorage.removeItem(storageKey);
                }
            } catch (e) {
                console.error("Ошибка при парсинге сохраненного предсказания из localStorage:", e);
                localStorage.removeItem(storageKey);
            }
        }

        if (games === undefined) {
            console.log(`Генерируем новое предсказание для ставки ${userCredits}`);
            const minZanos = 68.00;
            const maxZanos = 159.95;
            zanos = (Math.random() * (maxZanos - minZanos) + minZanos).toFixed(2);
            chance = zanos < 90 ? Math.floor(Math.random() * (92 - 80) + 80) : zanos < 120 ? Math.floor(Math.random() * (85 - 75) + 75) : Math.floor(Math.random() * (75 - 69) + 69);
            chance = Math.max(69, Math.min(92, chance));
            games = zanos < 90 ? Math.floor(Math.random() * (25 - 19) + 19) : zanos < 120 ? Math.floor(Math.random() * (40 - 25) + 25) : Math.floor(Math.random() * (53 - 40) + 40);
            games = Math.max(19, Math.min(53, games));
            const newPrediction = {
                games: games,
                zanos: zanos,
                chance: chance,
                timestamp: Date.now()
            };
            localStorage.setItem(storageKey, JSON.stringify(newPrediction));
        }

        return messageTemplate
            .replace('${games}', `<span class="highlight-text">${games}</span>`)
            .replace('${userCredits}', `<span class="highlight-text">${userCredits}</span>`)
            .replace('${zanos}', `<span class="highlight-text">${zanos}</span>`)
            .replace('${chance}', `<span class="highlight-text">${chance}</span>`);
    }

    // --- Обработчики событий ---

    loadingStartButton.addEventListener('click', () => {
        showScreen(introSceneScreen);
    });

    startGameBtnIntro.addEventListener('click', () => {
        showModal(creditsModal);
    });

    // ИЗМЕНЕНО: Логика кнопки подтверждения ставки
    confirmCreditsBtn.addEventListener('click', async () => {
        const credits = creditsInput.value;
        // Позволяем продолжить, если активен админ-режим (даже если поле пустое), или если введены корректные кредиты
        if (adminData || (credits && parseInt(credits) > 0)) {
            hideModal(creditsModal);
            showScreen(mainMenuScreen);

            await showSyncProgress();
            await startAnalysisProgressBar();

            showModal(predictionResultModal);
            // Функция generatePrediction сама решит, какие данные использовать
            const finalCredits = adminData ? adminData.credits : parseInt(credits);
            predictionResultsDiv.innerHTML = `<p>${generatePrediction(finalCredits)}</p>`;
        } else {
            alert(translations[currentLang].alertMessages.invalidCredits);
        }
    });

    closePredictionResultBtn.addEventListener('click', () => {
        hideModal(predictionResultModal);
    });

    allGamesBtnIntro.addEventListener('click', () => {
        window.open('https://polumertvec.github.io/SWbot/', '_blank');
    });

    mainMenuBackButton.addEventListener('click', () => {
        showScreen(introSceneScreen);
    });

    mainMenuStartButton.addEventListener('click', async () => {
        showModal(creditsModal);
    });

    const setLang = (lang) => {
        setLanguage(lang);
        currentLang = lang;
    };

    langRuBtn.addEventListener('click', () => setLang('ru'));
    langEngBtn.addEventListener('click', () => setLang('en'));
    if (mainMenuLangRuButton) {
        mainMenuLangRuButton.addEventListener('click', () => setLang('ru'));
    }
    if (mainMenuLangEngButton) {
        mainMenuLangEngButton.addEventListener('click', () => setLang('en'));
    }
    
    // НОВЫЙ КОД: Обработчики для админ-панели
    if (introLogo) {
        introLogo.addEventListener('click', () => {
            console.log('Логотип нажат, открываем админ-панель.');
            showModal(adminPanelModal);
        });
    }

    if(closeAdminPanelBtn) {
        closeAdminPanelBtn.addEventListener('click', () => {
            hideModal(adminPanelModal);
        });
    }
    
    if(confirmAdminDataBtn) {
        confirmAdminDataBtn.addEventListener('click', () => {
            const credits = adminCreditsInput.value;
            const games = adminGamesInput.value;
            const zanos = adminZanosInput.value;
            const chance = adminChanceInput.value;

            if (credits && games && zanos && chance) {
                adminData = {
                    credits: parseInt(credits),
                    games: parseInt(games),
                    zanos: parseFloat(zanos).toFixed(2),
                    chance: parseInt(chance)
                };
                console.log('Админские данные сохранены:', adminData);
                hideModal(adminPanelModal);
            } else {
                alert(translations[currentLang].alertMessages.adminDataIncomplete);
            }
        });
    }

    // Запускаем анимацию загрузочного экрана при старте
    startLoadingAnimation();
    // Применяем язык при загрузке страницы
    setLanguage(currentLang);
});
