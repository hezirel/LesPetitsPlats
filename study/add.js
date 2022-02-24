//#:refactor cardAdder with Object keys
let cardAdder = (query, recipe) => {
	return (recipe.name.includes(query) ||
    recipe.description.includes(query) ||
    recipe.ingredients.includes(query));
};