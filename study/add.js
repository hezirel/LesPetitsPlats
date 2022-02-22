//#:Function to change for native loop branch
let cardAdder = (query, recipe) => {
	return (recipe.name.includes(query) || recipe.description.includes(query) || recipe.ingredients.includes(query));
};