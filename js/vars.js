const dataFetch = () => fetch("./js/data.json").then(res => res.json());
let cache, tagsAvailable;

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

let tagsDisplay = [
	[ingInput, ingDrawer],
	[appInput, appDrawer],
	[ustInput, ustDrawer]
];

let inputs = [ingInput, appInput, ustInput];

let drawers = [ingDrawer, appDrawer, ustDrawer];

class Tags {

	constructor() {
		this.ingredients = [];
		this.apparels = [];
		this.ustensils = [];
	}

	uniq() {
		Object.keys(this).forEach((key) => {
			this[key] = [...new Set(this[key])];
		});
		return this;
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
			index.appendChild(new cardNode(e));
		});
		return this;
	}

	renderFiltersDOM(query = null) {
		tagsDrawers.forEach(e => {
			while (e.firstChild) {
				e.removeChild(e.firstChild);
			}
		});

		Object.keys(this).forEach((e, index) => {
			this[e].forEach((f) => {
				let input = oUserQuery[`${css2Apply(index)}UserInput`];
				if (!(input === "")) {
					f.includes(input) ? drawers[index].appendChild(new filterNode(f, index)) : false;
				} else {
					drawers[index].appendChild(new filterNode(f, index));
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

	//#:UserQuery method to render selected tags
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

tagsDisplay.forEach(e => {

	e[0].addEventListener("focusin", () => {
		e[1].style.display = "grid";
	});

	e[0].addEventListener("focusout", () => {
		e[1].style.display = "none";
	});
});

//€:Add listener to all inputs for filtering filters selection list
inputs.forEach((i, index) => {
	i.addEventListener("keyup", () => {
		oUserQuery[`${css2Apply(index)}UserInput`] = i.value;
		tagsAvailable.renderFiltersDOM(oUserQuery);});
});