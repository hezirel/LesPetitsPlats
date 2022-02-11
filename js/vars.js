const dataFetch = () => fetch("./js/data.json").then(res => res.json());
let index = document.querySelector("#resultOut");

let searchInput = document.querySelector("#mainSearchInput");

let ingInput = document.querySelector("#tagsSearchInputIng");
let ingDrawer = document.querySelector("#tagsDrawerIng");

let appInput = document.querySelector("#tagsSearchInputApp");
let appDrawer = document.querySelector("#tagsDrawerApp");

let ustInput = document.querySelector("#tagsSearchInputUst");
let ustDrawer = document.querySelector("#tagsDrawerUst");

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

ingInput.addEventListener('click', () => {
    ingDrawer.style.display === 'none' ? ingDrawer.style.display = 'grid' : ingDrawer.style.display = 'none';
})

appInput.addEventListener('click', () => {
    appDrawer.style.display === 'none' ? appDrawer.style.display = 'grid' : appDrawer.style.display = 'none';
})

ustInput.addEventListener('click', () => {
    ustDrawer.style.display === 'none' ? ustDrawer.style.display = 'grid' : ustDrawer.style.display = 'none';
})
