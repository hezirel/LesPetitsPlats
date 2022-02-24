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

let cardAdder = (query, recipe) => {
	
	return Object.keys(recipe).some(e => {
		return strStr(recipe[e], query);
	});

};
