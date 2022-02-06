let query = "";
let filters = [];
const dataFetch = async () => await fetch("./js/data.json").then(res => res.json());

const indexFill = async () => {
    let res = await dataFetch();
    let index = document.querySelector("#resultOut");
    res.forEach((e) => {
        index.appendChild(cardNode(e))
    })
}

indexFill();