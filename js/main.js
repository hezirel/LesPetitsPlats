const cacheFill = async () => {

	cache = await dataFetch();
	outFeed(applyQuery(null));

};

oUserQuery = new UserQuery();
window.onload = cacheFill();

let outFeed = (flag) => {

	if (!(flag.length)) {
		index.appendChild(noResults());
	}

};

//¿:RenderSelFilters proxy, redraw all oUserQuery.[tags] when modified

//All the algorithmic code to filter results happens here
let applyQuery = (filter = null) => {

	tagsAvailable = new Tags();
	tagsAvailable.clear();
	//€:circumvent useless comparison code if no filters to speed up query
	if (!(filter) || Object.keys(filter).forEach(e => e.length <= 0)) {

		cache.forEach((e) => {
			tagsAvailable.populate(e);
		});
		tagsAvailable.uniq().renderFiltersDOM();

		return true;
	} else {

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
			//#:refactor for better readability
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
					((cardAdder(fSea.toLowerCase(), ({
						name: c.name.toLowerCase(),
						description: c.description.toLowerCase(),
						ingredients: aIng.join(" ").toLowerCase()
					}))) ?
						list.push(tagsAvailable.populate(c)) : false) :
					list.push(tagsAvailable.populate(c))) :
				false;
		});

		tagsAvailable.uniq().renderFiltersDOM();
		return list;
	}
};