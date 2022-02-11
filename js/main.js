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

    resultArray.forEach((e) => {
        //#:add tags query as 2nd parameter of query filter if existing (...args ?)

        index.appendChild(cardNode(e))

        tagsAvailable.apparels.push(e.appliance);
        tagsAvailable.ustensils.push(e.ustensils);
    })

    tagsAvailable.ingredients
    tagsAvailable.apparels = [...new Set(tagsAvailable.apparels)];
    tagsAvailable.ustensils = [...new Set(tagsAvailable.ustensils)];

    tagsAvailable.ingredients.forEach(e => ingDrawer.innerHTML += `<a>${e}</a>`)
    tagsAvailable.apparels.forEach(e => appDrawer.innerHTML += `<a>${e}</a>`)
    tagsAvailable.ustensils.forEach(e => ustDrawer.innerHTML += `<a>${e}</a>`)
}

indexFill();