let query = "";
let filters = [];
const dataFetch = async () => await fetch("./js/data.json").then(res => res.json());
let index = document.querySelector("#resultOut");
let searchInput = document.querySelector(".searchInput");


let queryFilterValidator = (request, input) => {
    if (!request) {
        return true;
    }
    if (input.name.includes(request)) {
        return true;
    }
    return false;
}

const indexFill = async () => {
    let res = await dataFetch();
    index.textContent = '';
    res.forEach((e) => {
        if (queryFilterValidator(searchInput.value, e)) {
            index.appendChild(cardNode(e))
        }
    })
}

indexFill();
searchInput.addEventListener('keyup', (e) => {
        indexFill();
})