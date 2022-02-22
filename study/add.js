//#:setup Jest bench env, pursue with native loop branch from there
let cardAdder = (query, recipe) => {
	return (recipe.name.includes(query) ||
    recipe.description.includes(query) ||
    recipe.ingredients.includes(query));
};