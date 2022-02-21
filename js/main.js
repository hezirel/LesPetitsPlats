const cacheFill = async () => {

	cache = await dataFetch();
	outFeed(applyQuery(null));

};

window.onload = cacheFill();

let outFeed = (data) => {

	searchTagsDisplay.innerHTML = "";
	index.innerHTML = "";

	let tagsAvailable = new Tags();
	tagsAvailable.populate(data);
	tagsAvailable.uniq();
	console.log(tagsAvailable);
	//#:replace with func ? send new Tags to it

	//#:Change this with proxy so filters redraw dosesn't have to happen every time
	//#:should happen above index.appendchild
	renderSelFilters(oUserQuery.ingredients, 1);
	renderAdvancedFiltersDom(tagsAvailable);
};

//#:RenderSelFilters proxy, redraw all oUserQuery.[tags] when modified
let renderSelFilters = (arr, cat) => {

	arr.forEach(e => {
		searchTagsDisplay.appendChild(tagNode(e, cat));
	});

};

let renderAdvancedFiltersDom = (tagsAv) => {

	//Reset tags drawer content
	tagsDrawers.forEach(e => {
		while (e.firstChild) {
			e.removeChild(e.firstChild);
		}
	});

	//#:refactorize tagsAvailable button list constructors
	tagsAv.ingredients.forEach(e => {

		let node = tagNode(e, 1);

		if (!(oUserQuery.ingUserInput === "")) {
			e.includes(oUserQuery.ingUserInput) ? ingDrawer.appendChild(node) : false;
		} else {
			ingDrawer.appendChild(node);
		}
	});

	tagsAv.apparels.forEach(e => {
		let node = document.createElement("a");
		node.textContent = e;
		node.href = "#";

		//Css styling choice doesn't allow for full click behavior

		node.addEventListener("mousedown", (e) => {
			//#:createElt, addClassList class => ("Ing":"ingBG" ...)[tags.cat]
			if (!(oUserQuery.apparels.includes(e.target.innerText))) {
				let a = document.createElement("a");

				a.href = "#";
				a.textContent = e.target.innerText;
				a.classList.add("tagsApp");
				oUserQuery.apparels.push(e.target.innerText);

				a.addEventListener("click", (e) => {
					oUserQuery.apparels.splice(oUserQuery.apparels.indexOf(e.target.innerText), 1);
					searchTagsDisplay.removeChild(e.target);
					outFeed(applyQuery(oUserQuery));
				});

				oUserQuery.apparels.includes(node.innerText) ? searchTagsDisplay.appendChild(a) : false;

				outFeed(applyQuery(oUserQuery));
			}
		});

		if (!(oUserQuery.appUserInput === "")) {

			e.includes(oUserQuery.appUserInput) ? appDrawer.appendChild(node) : false;

		} else {

			appDrawer.appendChild(node);
		}
	});

	tagsAv.ustensils.forEach(e => {
		let node = document.createElement("a");
		node.textContent = e;
		node.href = "#";

		//Css styling choice doesn't allow for full click behavior

		node.addEventListener("mousedown", (e) => {
			//#:createElt, addClassList class => ("Ing":"ingBG" ...)[tags.cat]
			if (!(oUserQuery.ustensils.includes(e.target.innerText))) {
				let a = document.createElement("a");

				a.href = "#";
				a.textContent = e.target.innerText;
				a.classList.add("tagsUst");
				oUserQuery.ustensils.push(e.target.innerText);

				a.addEventListener("click", (e) => {
					oUserQuery.ustensils.splice(oUserQuery.ustensils.indexOf(e.target.innerText), 1);
					searchTagsDisplay.removeChild(e.target);
					outFeed(applyQuery(oUserQuery));
				});

				oUserQuery.ustensils.includes(node.innerText) ? searchTagsDisplay.appendChild(a) : false;

				outFeed(applyQuery(oUserQuery));
			}
		});

		if (!(oUserQuery.ustUserInput === "")) {

			e.includes(oUserQuery.ustUserInput) ? ustDrawer.appendChild(node) : false;

		} else {

			ustDrawer.appendChild(node);
		}
	});
};

//All the algorithmic code to filter results happens here
//#:filter default value ? none return cache ?
let applyQuery = (filter) => {

	if (!filter) {
		return cache;
	}

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
		});

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
	});
	return list;
};

//#:Function to change for native loop branch
let cardAdder = (query, recipe, ings) => {
	return (recipe.name.includes(query) || recipe.description.includes(query) || ings.includes(query));
};