const dataFetch = () => fetch("./js/data.json").then(res => res.json());
let cache;

let index = document.querySelector("#resultOut");
let searchTagsDisplay = document.querySelector(".filterSelection");

let searchInput = document.querySelector("#mainSearchInput");

let tagsDrawers = document.querySelectorAll(".tagsDrawer");

let ingInput = document.querySelector("#tagsSearchInputIng");
let ingDrawer = document.querySelector("#tagsDrawerIng");

let appInput = document.querySelector("#tagsSearchInputApp");
let appDrawer = document.querySelector("#tagsDrawerApp");

let ustInput = document.querySelector("#tagsSearchInputUst");
let ustDrawer = document.querySelector("#tagsDrawerUst");

let inputs = [
	[ingInput, ingDrawer],
	[appInput, appDrawer],
	[ustInput, ustDrawer]
];

let drawers = [ingDrawer, appDrawer, ustDrawer];

class Tags {

	constructor() {
		this.ingredients = [];
		this.apparels = [];
		this.ustensils = [];
	}

	populate(recipes) {
		recipes.forEach((e) => {

			e.ingredients.forEach((e) => {
				this.ingredients.push(e.ingredient);
			});
	
			this.apparels.push(e.appliance);
	
			e.ustensils.forEach((e) => {
				this.ustensils.push(e);
			});
			index.appendChild(cardNode(e));
		});
	}

	uniq() {
		Object.keys(this).forEach((key) => {
			this[key] = [...new Set(this[key])];
		});
	}

	renderFiltersDOM(query = null) {
		//#:convert to arrow function
		tagsDrawers.forEach(e => {
			while (e.firstChild) {
				e.removeChild(e.firstChild);
			}
		});

		Object.keys(this).forEach((e, index) => {
			this[e].forEach((f) => {
				let node = tagNode(f, index);
				console.log(node);
				if (!(oUserQuery[`${css2Apply(index)}UserInput`] === "")) {
					e.includes(oUserQuery[`${css2Apply(index)}UserInput`]) ? drawers[index].appendChild(node) : false;
				} else {
					drawers[index].appendChild(node);
				}
			});
		});
	}
}

class UserQuery extends Tags {

	constructor() {
		super();
		this.ingUserInput = "";
		this.appUserInput = "";
		this.ustUserInput = "";
		this.searchUserInput = "";
	}
	//#:UserQuery => recipe compare, if match return recipe
	renderSelectedFilters() {

	}
}

let oUserQuery = new UserQuery();

searchInput.addEventListener("keyup", (e) => {
	if (searchInput.value.length > 2) {
		oUserQuery.searchUserInput = searchInput.value;
		outFeed(applyQuery(oUserQuery));
	} else {
		oUserQuery.searchUserInput = "";
		outFeed(applyQuery(oUserQuery));
	}
});

inputs.forEach(e => {

	e[0].addEventListener("focusin", () => {
		e[1].style.display = "grid";
	});

	e[0].addEventListener("focusout", () => {
		e[1].style.display = "none";
	});
});

ingInput.addEventListener("keyup", () => {
	oUserQuery.ingUserInput = ingInput.value;
	//#:need to pass tagsAvailable to function
	renderAdvancedFiltersDom();
});

appInput.addEventListener("keyup", () => {
	oUserQuery.appUserInput = appInput.value;
	renderAdvancedFiltersDom();
});

ustInput.addEventListener("keyup", () => {
	oUserQuery.ustUserInput = ustInput.value;
	renderAdvancedFiltersDom();
});