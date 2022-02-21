const cacheFill = async () => {

	cache = await dataFetch();
	outFeed(cache);

};

window.onload = cacheFill();

let outFeed = (data) => {

	index.innerHTML = "";

	tagsAvailable = new Tags().populate(data).uniq();
	tagsAvailable.renderFiltersDOM();
	//#:replace with func ? send new Tags to it

	//#:should happen above index.appendchild
	renderSelFilters(oUserQuery.ingredients, 0);
	renderSelFilters(oUserQuery.apparels, 1);
	renderSelFilters(oUserQuery.ustensils, 2);
};

//#:RenderSelFilters proxy, redraw all oUserQuery.[tags] when modified
let renderSelFilters = (arr, cat) => {

	arr.forEach(e => {
		searchTagsDisplay.appendChild(filterNode(e, cat));
	});

};

//All the algorithmic code to filter results happens here
//#:filter default value ? none return cache ?
let applyQuery = (filter = null) => {

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