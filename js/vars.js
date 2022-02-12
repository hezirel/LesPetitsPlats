const dataFetch = () => fetch("./js/data.json").then(res => res.json());
let index = document.querySelector("#resultOut");
let searchTagsDisplay = document.querySelector(".filterSelection");

let searchInput = document.querySelector("#mainSearchInput");

let ingInput = document.querySelector("#tagsSearchInputIng");
let ingDrawer = document.querySelector("#tagsDrawerIng");

let appInput = document.querySelector("#tagsSearchInputApp");
let appDrawer = document.querySelector("#tagsDrawerApp");

let ustInput = document.querySelector("#tagsSearchInputUst");
let ustDrawer = document.querySelector("#tagsDrawerUst");

let cache;
let oUserQuery = {
    ingredients: [],
    apparels: [],
    ustensils: [],
    ingUserInput: "",
    appUserInput: "",
    ustUserInput: "",
    searchUserInput: "",
};
let tagsAvailable = oUserQuery;

searchInput.addEventListener('keyup', (e) => {
    if (searchInput.value.length > 2) {
        oUserQuery.searchUserInput = searchInput.value;
        outFeed(applyQuery(oUserQuery));
    } else {
        oUserQuery.searchUserInput = "";
        outFeed(applyQuery(oUserQuery));
    }
})


ingInput.addEventListener('focusin', () => {
    ingDrawer.style.display = 'grid';
})

ingInput.addEventListener('focusout', () => {
    ingDrawer.style.display = 'none';
})

ingInput.addEventListener('keyup', () => {
    oUserQuery.ingUserInput = ingInput.value;
    renderAdvancedFiltersDom();
})

appInput.addEventListener('focusin', () => {
    appDrawer.style.display = 'grid';
})

appInput.addEventListener('focusout', () => {
    appDrawer.style.display = 'none';
})

appInput.addEventListener('keyup', () => {
    oUserQuery.appUserInput = appInput.value;
    renderAdvancedFiltersDom();
})

ustInput.addEventListener('focusin', () => {
    ustDrawer.style.display = 'grid';
})

ustInput.addEventListener('focusout', () => {
    ustDrawer.style.display = 'none';
})

ustInput.addEventListener('keyup', () => {
    oUserQuery.ustUserInput = ustInput.value;
    renderAdvancedFiltersDom();
})
