//#:refactor cardAdder with Object keys
let cardAdder = (query, recipe) => {
	return Object.keys(recipe).some(e => {
		return recipe[e].includes(query) ? true : false;
	});
};