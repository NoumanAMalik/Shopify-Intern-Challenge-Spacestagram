const API_KEY = "?api_key=NNsdz9Xmem8H58k778mGY7dpDkcT38gWXYY05MEd";
const API_URL = "https://api.nasa.gov/planetary/apod";

const main = document.querySelector("main");

getData(API_URL, API_KEY);

async function getData(url, key) {
    const response = await fetch(url + key + "&count=10");
    const responseData = await response.json();

    console.log(responseData);

    addCards(responseData);
}

function addCards(cards) {
    main.innerHTML = "";

    cards.forEach((card) => {
        if (card.media_type === "image") {
            const { date, explanation, hdurl, title } = card;

            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
    
            cardElement.innerHTML = `
                <img src="${hdurl}" alt="${title}" />
                <div class="info">
                    <div class="text">
                        <h3 class="title">${title}</h3>  
                        <p>${date}</p>
                    </div>
                    <div class="buttons">
                        <button class="like-button">Like</button>
                        <button class="info-button">Info</button>
                    </div>
                </div>
                <div class="explanation">
                    <h4>Explanation</h4>
                    <p>${explanation}</p>
                </div>
            `;

            const info = cardElement.querySelector(".info-button");
            const like = cardElement.querySelector(".like-button");
            const explanationElement = cardElement.querySelector(".explanation");

            info.addEventListener("click", () => {
                explanationElement.classList.add("show");
            })

            explanationElement.addEventListener("click", () => {
                explanationElement.classList.remove("show");
            })
    
            main.appendChild(cardElement);
        }
    });
}