const cacheFill = async () => {

    cache = await dataFetch();
    outFeed(cache);

}

window.onload = cacheFill();

let outFeed = (data) => {

    searchTagsDisplay.innerHTML = "";
    index.innerHTML = "";
    //#:Object function to reset all fields;
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

    renderSelFilters(oUserQuery.ingredients, 1);
    renderAdvancedFiltersDom();
}

let renderSelFilters = (arr, cat) => {

    arr.forEach(e => {
        searchTagsDisplay.appendChild(tagNode(e, cat))
    })

}

let renderAdvancedFiltersDom = () => {

    //Reset tags drawer content
    tagsDrawers.forEach(e => {
        e.innerHTML = "";
    })

    //#:refactorize tagsAvailable button list constructors
    tagsAvailable.ingredients.forEach(e => {

        let node = tagNode(e, 1);

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

        //Css styling choice doesn't allow for full click behavior

        node.addEventListener("mousedown", (e) => {
            //#:createElt, addClassList class => ("Ing":"ingBG" ...)[tags.cat]
            if (!(oUserQuery.apparels.includes(e.target.innerText))) {
                let a = document.createElement('a');

                a.href = "#";
                a.textContent = e.target.innerText;
                a.classList.add("tagsApp");
                oUserQuery.apparels.push(e.target.innerText);

                a.addEventListener("click", (e) => {
                    oUserQuery.apparels.splice(oUserQuery.apparels.indexOf(e.target.innerText), 1);
                    searchTagsDisplay.removeChild(e.target);
                    outFeed(applyQuery(oUserQuery));
                })

                oUserQuery.apparels.includes(node.innerText) ? searchTagsDisplay.appendChild(a) : false;

                outFeed(applyQuery(oUserQuery));
            }
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

        //Css styling choice doesn't allow for full click behavior

        node.addEventListener("mousedown", (e) => {
            //#:createElt, addClassList class => ("Ing":"ingBG" ...)[tags.cat]
            if (!(oUserQuery.ustensils.includes(e.target.innerText))) {
                let a = document.createElement('a');

                a.href = "#";
                a.textContent = e.target.innerText;
                a.classList.add("tagsUst");
                oUserQuery.ustensils.push(e.target.innerText);

                a.addEventListener("click", (e) => {
                    oUserQuery.ustensils.splice(oUserQuery.ustensils.indexOf(e.target.innerText), 1);
                    searchTagsDisplay.removeChild(e.target);
                    outFeed(applyQuery(oUserQuery));
                })

                oUserQuery.ustensils.includes(node.innerText) ? searchTagsDisplay.appendChild(a) : false;

                outFeed(applyQuery(oUserQuery));
            }
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

    let {
        ingredients: fIng,
        apparels: fApp,
        ustensils: fUst,
        searchUserInput: fSea
    } = filter;

    let aFilter = [fIng, fApp, fUst];

    cache.forEach(c => {
        let {
            ingredients,
            appliance,
            ustensils
        } = c;

        let aIng = [];
        ingredients.forEach(e => {
            aIng.push(e.ingredient);
        })

        //Array from filters.every{1 false return block list.push}
        aFilter.every(r => {
                if (r.length > 0) {
                    return r.every(t => {
                        if (aIng.includes(t) || appliance.includes(t) || ustensils.includes(t)) {
                            return true;
                        } else {
                            return false;
                        }
                    }) ? true : false;
                } else {
                    return true;
                }
            }) ? ((fSea.length > 0) ?
                ((cardAdder(fSea, c, aIng)) ?
                    list.push(c) : false) :
                list.push(c)) :
            false;
    })
    return list;
}


let cardAdder = (query, recipe, ings) => {
    return (recipe.name.includes(query) || recipe.description.includes(query) || ings.includes(query))
}