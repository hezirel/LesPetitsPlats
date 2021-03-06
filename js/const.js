class cardNode {
	constructor(obj) {
		let elt = document.createElement("article");
		elt.classList.add("resultNode");

		elt.innerHTML += `
		<figure class="resultNodeImg">
		</figure>
		<section class="resultNodeInfo">
			<section class="resultNodeHeader">
				<h2>${obj.name}</h2>
				<h3>${obj.time}mn<i class="far fa-clock"></i>
				</h3>
			</section>
			<section class="resultNodeBody">
				<ul class="resultNodeComponents">
				</ul>
				<p>${obj.description}</p>
			</section>
		</section>
    `;

		let list = elt.querySelector(".resultNodeComponents");
		obj.ingredients.forEach(e => {
			let x;
			let component = document.createElement("li");
			component.innerHTML += `<span><b>${e.ingredient}:</b></span>`;
			if (x = (e.quantity ?? e.quantite)) {
				component.append((x) + (((e.unit) ? (" " + e.unit) : "")));
			}
			list.appendChild(component);
		});
		return elt;
	}
}

class filterNode {

	constructor(name, cat) {

		let a = document.createElement("a");

		a.href = "#";
		a.textContent = name;
		a.classList.add(`tags${cssApply(cat)}`);

		a.addEventListener("mousedown", (e) => {

			oUserQuery[`${propApply(cat)}`].push(e.target.textContent);
			searchTagsDisplay.appendChild(new tagNode(e.target.textContent, cat));
			inputs[cat].value = "";
			outFeed(applyQuery(oUserQuery));

		});

		return a;
	}
}

class tagNode extends filterNode {
	constructor(e, cat) {

		let a = super(e, cat).cloneNode(true);

		//€:Disable click event for nested a tag
		let span = document.createElement("span");
		span.classList.add(`tags${cssApply(cat)}`);

		let icon = document.createElement("i");
		icon.classList.add("far");
		icon.classList.add("fa-times-circle");

		span.addEventListener("click", (b) => {

			oUserQuery[`${propApply(cat)}`].includes(e) ?
				(oUserQuery[`${propApply(cat)}`].splice(oUserQuery[`${propApply(cat)}`].indexOf(e), 1)) : false;

			b.target.remove(b.target);

			outFeed(applyQuery(oUserQuery));

		});

		a.style["pointer-events"] = "none";
		icon.style["pointer-events"] = "none";
		icon.style["padding"] = "none";
		span.appendChild(a);
		span.appendChild(icon);
		return span;
	}
}

class Tags {

	constructor() {
		this.ingredients = [];
		this.apparels = [];
		this.ustensils = [];
	}

	clear() {
		while (index.firstChild) {
			index.removeChild(index.firstChild);
		}
	}
	uniq() {
		Object.keys(this).forEach((key) => {
			this[key] = [...new Set(this[key])];
		});
		return this;
	}

	populate(recipe) {
		recipe.ingredients.forEach((e) => {
			this.ingredients.push(e.ingredient);
		});

		this.apparels.push(recipe.appliance);

		recipe.ustensils.forEach((e) => {
			this.ustensils.push(e);
		});

		index.appendChild(new cardNode(recipe));
		return recipe;
	}

	renderFilteredDrawer(query = "", cat) {
		while (drawers[cat].firstChild) {
			drawers[cat].removeChild(drawers[cat].firstChild);
		}

		this[propApply(cat)].forEach((e) => {
			//€:no need to display tag if already selected
			if (!(oUserQuery[`${propApply(cat)}`].includes(e))) {

				query === "" ?
					drawers[cat].appendChild(new filterNode(e, cat)) :
					(e.toLowerCase()).includes(query.toLowerCase()) ? drawers[cat].appendChild(new filterNode(e, cat)) : false;

			}
		});
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
//¿:Naming convention workaround => Refactorize for improvement
const cssApply = (cat) => {

	return ({
		0: "Ing",
		1: "App",
		2: "Ust"
	})[cat];

};

const css2Apply = (cat) => {

	return ({
		0: "ing",
		1: "app",
		2: "ust"
	})[cat];

};

const propApply = (cat) => {

	return ({
		0: "ingredients",
		1: "apparels",
		2: "ustensils"
	})[cat];

};

const noResults = () => {
	let x = document.createElement("h1");
	x.innerText = "Sorry no result match your query ...";
	x.classList.add("blankFeed");
	return x;
};