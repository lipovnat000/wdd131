const years = [2022, 2000, 1997, 2010, 2020, 2015]

const section = document.querySelector("section");

years
    .sort((a, b) => b - a)
    .forEach(year => {
        const p = document.createElement("p");
        p.textContent = year;
        section.appendChild(p);
    })

const students = [
    {
        name: "Nathan",
        age: 22
    },
    {
        name: "Chad",
        age: 53
    },
    {
        name: "Jonah",
        age: 19
    }
]

students
    .sort((a, b) => a.age - b.age)
    .forEach(student => {
        const p = document.createElement("p");
        p.textContent = student.name;
        section.appendChild(p);
    })