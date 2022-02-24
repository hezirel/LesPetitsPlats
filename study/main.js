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
		query) ? console.log(c.name) : false;
	});
	console.timeEnd();

};

let f = (recipe, query) => {
	
	return Object.keys(recipe).some(e => {
		return recipe[e].includes(query) ? true : false;
	});

};

cardTest("Coco");