const cacheFill = async () => {

	cache = await dataFetch();
	outFeed(cache);

};

let oUserQuery = new UserQuery();
window.onload = cacheFill();

let outFeed = (data) => {

	while (index.firstChild) {
		index.removeChild(index.firstChild);
	}

	tagsAvailable = new Tags().populate(data).uniq();
	tagsAvailable.renderFiltersDOM();
};

//¿:RenderSelFilters proxy, redraw all oUserQuery.[tags] when modified

//All the algorithmic code to filter results happens here
let applyQuery = (filter = null) => {

	//€:circumvent useless comparison code if no filters to speed up query
	if (!(filter) || Object.keys(filter).forEach(e => e.length <= 0)) {
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