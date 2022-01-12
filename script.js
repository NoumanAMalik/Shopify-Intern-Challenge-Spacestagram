const API_KEY = "?api_key=NNsdz9Xmem8H58k778mGY7dpDkcT38gWXYY05MEd";
const API_URL = "https://api.nasa.gov/planetary/apod";
 
const main = document.querySelector("main");
const date = document.getElementById("date");
const submit = document.getElementById("submit-button");

getData(API_URL, API_KEY);

submit.addEventListener("click", () => {
    if (date.value === "") {
        getData(API_URL, API_KEY);
    } else {
        getDataInRange(date.value, API_URL, API_KEY);
    }
});

async function getDataInRange(date, url, key) {
    const response = await fetch(url + key + `&date=${date}`);
    const responseData = await response.json();

    if (Array.isArray(responseData)) {
        addCards(responseData);
    } else {
        addCards([responseData])
    }
}

async function getData(url, key) {
    const response = await fetch(url + key + "&count=12");
    const responseData = await response.json();

    console.log(responseData);

    if (Array.isArray(responseData)) {
        addCards(responseData);
    } else {
        addCards([responseData])
    }
}

function addCards(cards) {
    main.innerHTML = "";

    cards.forEach((card) => {
        if (card.media_type === "image") {
            const { date, explanation, hdurl, title } = card;

            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
    
            cardElement.innerHTML = `
                <a href="${hdurl}" target="_blank" rel="noreferrer"><img src="${hdurl}" alt="${title}" /></a>
                <div class="info">
                    <div class="text">
                        <h3 class="title">${title}</h3>  
                        <p>${date}</p>
                        <small class="copy-notification">Image URL copied to clipboard</small>
                    </div>
                    <div class="buttons">
                        <button class="like-button">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" height="20px" width="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        <button class="share-button">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" heigth="20px" width="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </button>
                        <button class="info-button">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" height="20px" width="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="explanation">
                    <h4>Explanation</h4>
                    <p>${explanation}</p>
                </div>
            `;

            const copyNotif = cardElement.querySelector(".copy-notification");
            const info = cardElement.querySelector(".info-button");
            const share = cardElement.querySelector(".share-button");
            const like = cardElement.querySelector(".like-button");
            const explanationElement = cardElement.querySelector(".explanation");

            like.addEventListener("click", () => {
                if (like.classList.contains("liked")) {
                    like.classList.remove("liked");
                    like.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" height="20px" width="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>`;
                } else {
                    like.classList.add("liked");
                    like.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" height="20px" width="20px" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                                    </svg>`;
                }
            });

            share.addEventListener("click", () => {
                const textArea = document.createElement("textarea");

                textArea.value = hdurl;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                textArea.remove();

                copyNotif.classList.add("show");
                copyNotif.addEventListener("animationend", () => {
                    copyNotif.classList.remove("show");
                });
            });

            info.addEventListener("click", () => {
                explanationElement.classList.add("show");
            });

            explanationElement.addEventListener("click", () => {
                explanationElement.classList.remove("show");
            });
    
            main.appendChild(cardElement);
        }
    });
}