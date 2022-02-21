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

	renderFilteredDrawer(query, cat) {
		//€:no need to display tag if already selected
		while (drawers[cat].firstChild) {
			drawers[cat].removeChild(drawers[cat].firstChild);
		}

		this[propApply(cat)].forEach((e) => {
			if (!(oUserQuery[`${propApply(cat)}`].includes(e))) {
				if (!(query === "")) {
					e.includes(query) ? drawers[cat].appendChild(new filterNode(e, cat)) : false;
				} else {
					drawers[cat].appendChild(new filterNode(e, cat)); 
				}
			}
		}
		);
	} 

	renderFiltersDOM() {
		Object.keys(this).forEach((e, index) => {
			this.renderFilteredDrawer("", index);
		});
	}

}

class UserQuery extends Tags {

	constructor() {
		super();
		this.searchUserInput = "";
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

tagsDisplay.forEach((e, index) => {

	e[0].addEventListener("focusin", () => {
		e[1].style.display = "grid";
	});

	e[0].addEventListener("focusout", () => {
		e[1].style.display = "none";
	});

	//€:Add listener to all inputs for filtering filters selection list
	e[0].addEventListener("keyup", () => {
		tagsAvailable.renderFilteredDrawer(e[0].value, index);
	});

});
