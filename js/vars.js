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

class Tags {

	constructor() {
		this.ingredients = [];
		this.apparels = [];
		this.ustensils = [];
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