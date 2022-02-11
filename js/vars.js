const dataFetch = () => fetch("./js/data.json").then(res => res.json());
let index = document.querySelector("#resultOut");
let searchInput = document.querySelector("#mainSearchInput");

let appInputZone = document.querySelector("#test");
let appInput = document.querySelector("#tagsSearchInputApp");
let appDrawer = document.querySelector("#tagsDrawerApp")
let appDrawerul = document.querySelector("#tagsDrawerApp")
let appBtn = document.querySelector(".appartus_button");
let tagsAvailable = {
        ingredients: [],
        apparels: [],
        ustensils: []
    },
    tagsUserChoice = tagsAvailable;

searchInput.addEventListener('keyup', (e) => {
    if (searchInput.value.length > 2) {
        indexFill();
    }
})

appInput.addEventListener('click', () => {
    appDrawer.style.display = 'grid';
})