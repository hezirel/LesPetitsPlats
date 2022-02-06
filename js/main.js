let query = "";
let filters = [];
const dataFetch = async () => await fetch("./js/data.json").then(res => res.json());
let index = document.querySelector("#resultOut");
let searchInput = document.querySelector(".searchInput");

let queryFilterValidator = (request, data) => {
    if (!request) {
        return true;
    }
    let {
        name,
        description,
        ingredients
    } = data;
    if (name.includes(request) || description.includes(request) || ingredients.some(e => e.ingredient.includes(request))) {
        return true;
    }
    return false;
}

const indexFill = async () => {
    let resultArray = await dataFetch();
    index.textContent = '';
    resultArray.forEach((e) => {
        if (queryFilterValidator(searchInput.value, e)) {
            index.appendChild(cardNode(e))
        }
    })
}

searchInput.addEventListener('keyup', (e) => {
    indexFill();
})

indexFill();