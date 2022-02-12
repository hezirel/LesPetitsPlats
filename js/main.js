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

const cacheFill = async () => {
    let resultArray = await dataFetch();
    cache = resultArray;
    outFeed(cache);
}

window.onload = cacheFill();

let outFeed = (data) => {
    index.innerHTML = "";
    tagsAvailable = {
        ingredients: [],
        apparels: [],
        ustensils: [],
        ingUserInput: "",
        appUserInput: "",
        ustUserInput: "",
        searchUserInput: "",
    }
    data.forEach((e) => {
        e.ingredients.forEach((e) => {
            tagsAvailable.ingredients.push(e.ingredient);
        })

        tagsAvailable.apparels.push(e.appliance);

        e.ustensils.forEach((e) => {
            tagsAvailable.ustensils.push(e)
        })

        index.appendChild(cardNode(e))
    })

    tagsAvailable.ingredients = [...new Set(tagsAvailable.ingredients)];
    tagsAvailable.apparels = [...new Set(tagsAvailable.apparels)];
    tagsAvailable.ustensils = [...new Set(tagsAvailable.ustensils)];

    renderAdvancedFiltersDom();
}

let renderAdvancedFiltersDom = () => {
    console.log("redrawing dom");
    ingDrawer.innerHTML = "";
    appDrawer.innerHTML = "";
    ustDrawer.innerHTML = "";


    tagsAvailable.ingredients.forEach(e => {
        let node = document.createElement('a');
        node.textContent = e;
        node.href = "#";
        node.addEventListener("mousedown", (e) => {
            searchTagsDisplay.innerHTML += `<a class='ingBg'>${e.target.innerText}</a>`
            oUserQuery.ingredients.push(e.target.innerText);
            outFeed(applyQuery(oUserQuery));
        })
        if (!(oUserQuery.ingUserInput === "")) {
            e.includes(oUserQuery.ingUserInput) ? ingDrawer.appendChild(node) : false;
        } else {
            ingDrawer.appendChild(node);
        }
    });

    tagsAvailable.apparels.forEach(e => {
        let node = document.createElement('a');
        node.textContent = e;
        node.href = "#";
        node.addEventListener("mousedown", (e) => {
            searchTagsDisplay.innerHTML += `<a class='appBg'>${e.target.innerText}</a>`
            oUserQuery.apparels.push(e.target.innerText);
            outFeed(applyQuery(oUserQuery));
        })
        if (!(oUserQuery.appUserInput === "")) {
            e.includes(oUserQuery.appUserInput) ? appDrawer.appendChild(node) : false;
        } else {
            appDrawer.appendChild(node);
        }
    });

    tagsAvailable.ustensils.forEach(e => {
        let node = document.createElement('a');
        node.textContent = e;
        node.href = "#";
        node.addEventListener("mousedown", (e) => {
            searchTagsDisplay.innerHTML += `<a class='ustBg'>${e.target.innerText}</a>`
            oUserQuery.ustensils.push(e.target.innerText);
            outFeed(applyQuery(oUserQuery));
        })
        if (!(oUserQuery.ustUserInput === "")) {
            e.includes(oUserQuery.ustUserInput) ? ustDrawer.appendChild(node) : false;
        } else {
            ustDrawer.appendChild(node);
        }
    });
}

let applyQuery = (filter) => {
    let list = [];

    cache.forEach(c => {
        let {
            name,
            description,
            ingredients,
            appliance
        } = c;
        ingredients.forEach(e => {
            if (filter.ingredients.includes(e.ingredient)) {
                list.push(c);
            }
        })
    })
    return list;
}