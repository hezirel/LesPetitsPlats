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

    //Reset tags drawer content
    tagsDrawers.forEach(e => {
        e.innerHTML = "";
    })

    //#:refactorize tagsAvailable button list constructors
    tagsAvailable.ingredients.forEach(e => {

        let node = document.createElement('a');
        node.textContent = e;
        node.href = "#";

        //Css styling choice doesn't allow for full click behavior

        node.addEventListener("mousedown", (e) => {
            //#:createElt, addClassList class => ("Ing":"ingBG" ...)[tags.cat]
            if (!(oUserQuery.ingredients.includes(e.target.innerText))) {
                let a = document.createElement('a');

                a.href = "#";
                a.textContent = e.target.innerText;
                a.classList.add("tagsIng");
                oUserQuery.ingredients.push(e.target.innerText);

                a.addEventListener("click", (e) => {
                    oUserQuery.ingredients.splice(oUserQuery.ingredients.indexOf(e.target.innerText), 1);
                    searchTagsDisplay.removeChild(e.target);
                    outFeed(applyQuery(oUserQuery));
                })

                oUserQuery.ingredients.includes(node.innerText) ? searchTagsDisplay.appendChild(a) : false;

                outFeed(applyQuery(oUserQuery));
            }
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
            searchTagsDisplay.innerHTML += `<a class='tagsApp'>${e.target.innerText}</a>`
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
            searchTagsDisplay.innerHTML += `<a class='tagsUst'>${e.target.innerText}</a>`
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
    let {
        ingredients: fIng,
        apparels: fApp,
        ustensils: fUst,
        searchUserInput: fSea
    } = filter;

    cache.forEach(c => {
        let {
            name,
            description,
            ingredients,
            appliance,
            ustensils
        } = c;

        //Array from filters.every{1 false return block list.push}
        conditionArray.every(c => {

        }) ? list.push(c) : false;


        if (fIng) {
            fIng.every(name => {
                return ingredients.some(e => {
                    return e.ingredient === name ? true : false;
                })
            }) ? list.push(c) : false;
        }
        //Filter by tags first, if successful, filter by searchUserInput
    })
    return list;
}