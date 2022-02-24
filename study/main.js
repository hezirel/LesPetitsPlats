let cache = require("./data.json");

let cardTest = (query) => {

	console.time();
	cache.forEach(c => {
		let aIng = [];
		c.ingredients.forEach(e => {
			aIng.push(e.ingredient);
		});

		f({ name: c.name,
			//€:Testing description: c.description,
			ingredients: aIng},
		query);
	});
	console.timeEnd();

};

//#:Code native loop algo
let f = (recipe, query) => {
	

	Object.keys(recipe).forEach(e => {
		recipe[e].includes(query) ? console.log(recipe[e]) : false;
	});

	return true;

};