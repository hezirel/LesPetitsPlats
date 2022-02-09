const dataFetch = () => fetch("./js/data.json").then(res => res.json());
let index = document.querySelector("#resultOut");
let searchInput = document.querySelector(".searchInput");
let ingDrawer = document.querySelector("#hiddenTags_1>ul");
let appDrawer = document.querySelector("#hiddenTags_2>ul");
let ustDrawer = document.querySelector("#hiddenTags_3>ul");
let appBtn = document.querySelector(".appartus_button");
let tagsAvailable = {
    ingredients: [],
    apparels: [],
    ustensils: []
}, tagsUserChoice = tagsAvailable;

searchInput.addEventListener('keyup', (e) => {
    if (searchInput.value.length > 2) {
        indexFill();
    }
})


