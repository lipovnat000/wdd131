const fullname1 = "Nathan Lipovich";

// Can't change a constant, throws an error
// fullname1 = "Chad Lipovich";

let fullname2 = "Jonah Lipovich";
//TEMP:
console.log(fullname2);

const h1 = document.querySelector("h1");
h1.innerHTML += "<em>" + fullname2 + "<em>";
// Same thing
// document.querySelector("h1").innerHTML += `<em>${fullname1}</em>`;


fullname2 = "Hannah Lipovich";
//TEMP:
console.log(fullname2);

const section = document.createElement("section");
const h2 = document.createElement("h2");
h2.textContent = "Section 3";

const p = document.createElement("p");
p.textContent = "This is a paragraph in section 3";


section.appendChild(h2);
section.appendChild(p);
document.body.appendChild(section);
