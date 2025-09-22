// function categories() {
//     fetch('https://openapi.programming-hero.com/api/categories')
//         .then(res => res.json())
//         .then(data => displayCategories(data.categories));
// }

// function displayCategories(categories) {
//     const categoriesContainer = document.getElementById('categories-container');
//     categoriesContainer.innerHTML = "";

//     categories.forEach(category => {
//         const categoryDiv = document.createElement('div');
//         categoryDiv.innerHTML = `
//             <div id="cat-${category.id}" 
//                  onclick="filter('${category.id}')" 
//                  class="mx-2 text-black font-semibold hover:text-yellow-300 cursor-pointer">
//                 ${category.category_name}
//             </div>
//         `;
//         categoriesContainer.appendChild(categoryDiv);
//     });
// }


// function filter(categoryId) {

//     document.querySelectorAll("#categories-container div > div").forEach(el => {
//         el.classList.remove("text-green-600", "border-b-2", "border-green-600");
//     });


//     const activeCategory = document.getElementById(`cat-${categoryId}`);
//     if (activeCategory) {
//         activeCategory.classList.add("text-green-600", "border-b-2", "border-green-600");
//     }

//     fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
//         .then(res => res.json())
//         .then(data => {
//             if (data.plants && data.plants.length > 0) {
//                 displayCards(data.plants);
//             } else {
//                 document.getElementById('card-container').innerHTML =
//                     `<p class="text-center text-gray-500">No plants found in this category</p>`;
//             }
//         })
//         .catch(err => console.error("Error fetching category plants:", err));
// }


// function displayCards(cards) {
//     const cardContainer = document.getElementById('card-container');
//     cardContainer.innerHTML = "";

//     cards.forEach(card => {
//         const cardDiv = document.createElement('div');
//         cardDiv.className = "bg-white p-5 rounded-2xl shadow-md w-80 mx-auto";
//         cardDiv.innerHTML = `
//   <img class="w-full h-48 object-cover rounded-lg" src="${card.image}" alt="${card.name}" />
//   <div class="mt-3">
//     <h2 class="font-bold text-lg">${card.name}</h2>
//     <p class="text-gray-500 text-sm">${card.description}</p>
//     <div class="flex justify-between items-center mt-2">
//       <div class="bg-green-200 px-2 py-1 rounded-2xl">
//         <h2 class="text-green-600 font-bold">${card.category}</h2>
//       </div>
//       <div>
//         <h2 class="font-bold">$${card.price}</h2>
//       </div>
//     </div>
//     <button onclick="addToCart('${card.id}')" 
//             class="w-full btn mt-3 bg-green-600 text-white">
//       Add to Cart
//     </button>
//   </div>
// `;

//         cardContainer.appendChild(cardDiv);
//     });
// }


// fetch('https://openapi.programming-hero.com/api/plants')
//     .then(res => res.json())
//     .then(data => displayCards(data.plants));

// categories();

// category load
const categories = () => {
    url = `https://openapi.programming-hero.com/api/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.categories));
}

// function displayCategories(categories) {
//     const categoryContainer = document.getElementById('categories-container');
//     categoryContainer.innerHTML = "";

//     categories.forEach(category => {
//         // console.log(category);
//         const categoryDiv = document.createElement('div');
//         categoryDiv.innerHTML = `
//             <h1 id="cat-${category.id}" class="categories p-2" onclick="filter(${category.id}), categoryHightligh(${category.id}, '${category.category_name}')">
//                 ${category.category_name}
//             </h1>
//         `;

//         categoryContainer.appendChild(categoryDiv);
//     });
// }

function displayCategories(categories) {
    const categoryContainer = document.getElementById('categories-container');
    categoryContainer.innerHTML = "";

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <h1 id="cat-${category.id}" 
                class="categories p-2 cursor-pointer" 
                onclick="filter(${category.id}); categoryHighlight(${category.id})">
                ${category.category_name}
            </h1>
        `;
        categoryContainer.appendChild(categoryDiv);
    });
}


// filter
const filter = (id) => {
    showSpinner();
    url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => 
            {
                filterPlants(data.plants)
                hideSpinner();
            }
        );

}

function filterPlants(plants) {
    console.log(plants);
    const categoryContainer = document.getElementById('card-container');
    categoryContainer.innerHTML = "";

    plants.forEach(plant => {
        console.log(plant);
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <div class="bg-white p-5 rounded-2xl shadow-md w-80 mx-auto">
            <img class="w-full h-48 object-cover rounded-lg" src="${plant.image}" alt="${plant.name}" />
            <div class="mt-3">
            <h2 class="font-bold text-lg">${plant.name}</h2>
            <p class="text-gray-500 text-sm">${plant.description}</p>
            <div class="flex justify-between items-center mt-2">
            <div class="bg-green-200 px-2 py-1 rounded-2xl">
            <h2 class="text-green-600 font-bold">${plant.category}</h2>
            </div>
            <div>
                <h2 class="font-bold">$${plant.price}</h2>
            </div>
            </div>
            <button onclick="addToCart('${plant.name}', ${plant.price})" 
                class="w-full btn mt-3 bg-green-600 text-white">
            Add to Cart
            </button>
            </div>
        </div>
        `;

        categoryContainer.appendChild(categoryDiv);
    });
}

// all tree load
const allTree = () => {
    showSpinner();
    url = `https://openapi.programming-hero.com/api/plants`;
    fetch(url)
        .then(res => res.json())
        // .then(data => console.log(data.plants));
        .then(data => 
            {
                filterPlants(data.plants)
                hideSpinner();
            }
        );
}
// function allPlants(plants) {
//     const categoryContainer = document.getElementById('card-container');
//     categoryContainer.innerHTML = "";

//     plants.forEach(plant => {
//         console.log(plant);
//         const categoryDiv = document.createElement('div');
//         categoryDiv.innerHTML = `
//             <img class="w-full h-48 object-cover rounded-lg" src="${plant.image}" alt="${plant.name}" />
//             <div class="mt-3">
//             <h2 class="font-bold text-lg">${plant.name}</h2>
//             <p class="text-gray-500 text-sm">${plant.description}</p>
//             <div class="flex justify-between items-center mt-2">
//             <div class="bg-green-200 px-2 py-1 rounded-2xl">
//             <h2 class="text-green-600 font-bold">${plant.category}</h2>
//             </div>
//             <div>
//                 <h2 class="font-bold">$${plant.price}</h2>
//             </div>
//             </div>
//             <button onclick="addToCart(${plant.id})" 
//                 class="w-full btn mt-3 bg-green-600 text-white">
//             Add to Cart
//             </button>
//             </div>
//         `;

//         categoryContainer.appendChild(categoryDiv);
//     });
// }


// add to cart
// add to cart
const addToCart = (name, price) => {
    const cartElement = document.getElementById('cart-container');

    // create wrapper
    const cartDiv = document.createElement('div');
    cartDiv.className = "bg-green-100 mb-2 flex justify-between items-center p-2 rounded";

    cartDiv.innerHTML = `
      <div>
        <h1>${name}</h1>
        <h1>$<span>${price}</span> x 1</h1>
      </div>
      <button class="text-black-600 font-bold">x</button>
    `;

    // attach event listener to remove
    cartDiv.querySelector("button").addEventListener("click", () => {
        cartDiv.remove();
        updateTotal(-price); // decrease total
    });

    cartElement.appendChild(cartDiv);

    updateTotal(price); // increase total
};

// update total
function updateTotal(amount) {
    let total = parseInt(document.getElementById('total-amount').innerText);
    total += amount;
    document.getElementById('total-amount').innerText = total;
}

// delete cart item
// const deleteCartItem = () => {

//total price

const totalPrice = (price) => {
    console.log(price);
    let total = document.getElementById('total-amount').innerText;
    total = parseInt(total);
    const sum = total + price;
    document.getElementById('total-amount').innerText = sum;
}

// category highlight
function categoryHighlight(id) {
    const highlight = document.querySelectorAll('.categories');

    highlight.forEach(cat => {
        cat.classList.remove("bg-green-700", "text-white", "rounded");
    });

    const activeCategory = document.getElementById(id === "all" ? "cat-all" : "cat-" + id);
    if (activeCategory) {
        activeCategory.classList.add("bg-green-700", "text-white", "rounded", "w-3/4");
    }
}
function showSpinner() {
    document.getElementById("loading-spinner").classList.remove("hidden");
}
function hideSpinner() {
    document.getElementById("loading-spinner").classList.add("hidden");
}


categories();
allTree();
categoryHighlight("all");