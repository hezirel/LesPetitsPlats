const cacheFill = async () => {
    cache = await dataFetch();
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
    //#:queryselectorAll(".drawer")forEach(e => e.innerHTML = "");
    ingDrawer.innerHTML = "";
    appDrawer.innerHTML = "";
    ustDrawer.innerHTML = "";


    //#:refactorize tagsAvailable button list constructors
    tagsAvailable.ingredients.forEach(e => {
        let node = document.createElement('a');
        node.textContent = e;
        node.href = "#";
        node.addEventListener("mousedown", (e) => {
            //#:createElt, addClassList class => ("Ing":"ingBG" ...)[tags.cat]
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

//All the algorithmic code to filter results happens here
let applyQuery = (filter) => {
    let list = [];

    cache.forEach(c => {
        let {
            name,
            description,
            ingredients,
            appliance,
            ustensils
        } = c;

        if (filter.searchUserInput) {
            name.includes(filter.searchUserInput) ? list.push(c) : false;
        }
    })
    return list;
}