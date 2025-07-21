import { getProduct2 } from "./featured.js";
import { getProduct3 } from "./best-selling.js";
const hamBurger = document.getElementById("hamburger");
const nav = document.getElementById("main-nav");

hamBurger.addEventListener("click", () => {
    nav.classList.toggle("open");
    hamBurger.textContent = nav.classList.contains("open") ? "X" : "☰"
});

const productContainer = document.getElementById("product-container");
const url = './data/products.json';

async function getProducts() {
    try {
        const response = await fetch(url);
        if(!response.ok){
            console.log("Product data fetching error" + response.status);
        }
        const product = await response.json();
        displayProducts(product);
    }
    catch(error){
        console.error("Error fetching data! ", error);
    }
}

const newArrival = document.getElementById('new-arrival');
const featuredBtn = document.getElementById('featured'); // 🔹 Get the featured button
const bestSelling = document.getElementById('best-selling');

newArrival.addEventListener('click', getProducts);

// 🔹 Add click event to load featured products
featuredBtn.addEventListener('click', async () => {
    const featuredProducts = await getProduct2();
    displayProducts(featuredProducts);
});

// 🔹 Add click event to load Best Selling products
bestSelling.addEventListener('click', async () => {
    const bestProducts = await getProduct3();
    displayProducts(bestProducts);
});

function pad(num) {
    return String(num).padStart(2, '0');
}

newArrival.addEventListener('click', () => {})
function displayProducts(products) {
    productContainer.innerHTML = '';
    products.forEach( product => {
        const card = document.createElement('div');
        card.classList.add('product-card')
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        const header = document.createElement('h5');
        header.classList.add('timer');

        let startTime = 500 * 24 * 60 * 60;

        // Timer logic scoped to this card
        const intervalId = setInterval(() => {
            if (startTime < 0) {
                clearInterval(intervalId);
                header.innerHTML = 'Already instock!';
            } else {
                const days = Math.floor(startTime / (3600 * 24));
                const hours = Math.floor((startTime % (3600 * 24)) / 3600);
                const minutes = Math.floor((startTime % 3600) / 60);
                const seconds = startTime % 60;

                header.innerHTML = `${pad(days)} : ${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
                startTime--;
            }
        }, 1000);

        const heading = document.createElement('h6');
        heading.textContent = product.name;
        const paragraph1 = document.createElement('p');
        paragraph1.textContent = product.rate;
        paragraph1.classList.add('rate')
        const paragraph2 = document.createElement('p');
        paragraph2.textContent = `$${product.price}`;
        const button = document.createElement('p');
        button.textContent = `Select`;

        card.appendChild(img);
        card.appendChild(header);
        card.appendChild(heading);
        card.appendChild(paragraph1);
        card.appendChild(paragraph2);
        card.appendChild(button);

        productContainer.appendChild(card);
    });
}

getProducts();


const sale = document.getElementById('sales');

let startTime = 674 * 24 * 60 * 60;

// Timer logic scoped to this card
const intervalId = setInterval(() => {
    if (startTime < 0) {
        clearInterval(intervalId);
        sale.innerHTML = 'Already instock!';
    } else {
            const days = Math.floor(startTime / (3600 * 24));
            const hours = Math.floor((startTime % (3600 * 24)) / 3600);
            const minutes = Math.floor((startTime % 3600) / 60);
            const seconds = startTime % 60;

            sale.innerHTML = `${pad(days)} Days : ${pad(hours)} Hours : ${pad(minutes)} Mins : ${pad(seconds)} Secs`;
            startTime--;
        }
}, 1000);