const cardNode = (obj) => {
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
};

const tagNode = (name, cat) => {

	let a = document.createElement("a");

	a.href = "#";
	a.textContent = name;
	a.classList.add("tagsIng");

	a.addEventListener("mousedown", (e) => {

		oUserQuery.ingredients.includes(name) ?
			( oUserQuery.ingredients.splice(oUserQuery.ingredients.indexOf(name), 1)) : 
			oUserQuery.ingredients.push(name);

		outFeed(applyQuery(oUserQuery));
	});
	return a;
};