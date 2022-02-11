//All the algorithmic code to filter results happens here
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
    //#: tags query validator sequence here
    return false;
}

const indexFill = async () => {
    let resultArray = await dataFetch();
    index.innerHTML = '';
    resultArray.forEach((e) => {
        //#:add tags query as 2nd parameter of query filter if existing (...args ?)
        tagsAvailable.apparels.push(e.appliance);
        tagsAvailable.ustensils.push(e.ustensils);
        if (queryFilterValidator(searchInput.value, e)) {
            index.appendChild(cardNode(e))
        }
    })
    tagsAvailable.apparels = [...new Set(tagsAvailable.apparels)];
    tagsAvailable.apparels.forEach(e => appDrawerul.innerHTML += `<a>${e}</a>`)
}

indexFill();