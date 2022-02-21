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

//#:change to class filterNode => tagNode extends this & add close button;
class filterNode  {

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

		let a = super(e, cat);
		a = a.cloneNode(true);

		//#:add icon

		a.addEventListener("click", (b) => {

			oUserQuery[`${propApply(cat)}`].includes(e) ?
				( oUserQuery[`${propApply(cat)}`].splice(oUserQuery[`${propApply(cat)}`].indexOf(e), 1)) : false;

			b.target.remove(b.target);

			outFeed(applyQuery(oUserQuery));

		});

		return a;
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