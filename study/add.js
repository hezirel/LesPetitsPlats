let cache = require("./data.json");

//#:refactor cardAdder with Object keys
let cardAdder = (query, recipe) => {
	return (recipe.name.includes(query) ||
    recipe.description.includes(query) ||
    recipe.ingredients.includes(query));
};

let cardTest = (query) => {

	cache.forEach(c => {
		let aIng = [];
		c.ingredients.forEach(e => {
			aIng.push(e.ingredient);
		});

		f({ name: c.name,
			// description: c.description,
			ingredients: aIng},
		query);
	});

};

//#:Code native loop algo
let f = (recipe, query) => {

	Object.keys(recipe).forEach(e => {
		recipe[e].includes(query) ? console.log(recipe) : false;
	});

	return true;

};

cardTest("Crème de coco");