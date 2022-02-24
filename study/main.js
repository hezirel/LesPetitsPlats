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

let strStr = (hay, needle) => {
	
	let i = 0;

	for (let char of hay) {
		if (char === needle[i]) {
			i++;
		} else if (i === needle.length) {
			return true;
		}
		else {
			i = 0;
		}
	}
	return false;
};

let f = (query, recipe) => {
	
	return Object.keys(recipe).some(e => {
		return strStr(recipe[e].toLowerCase(), query.toLowerCase());
	});

};


cardTest("Coco");