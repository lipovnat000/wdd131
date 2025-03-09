import aCourse from "./course.mjs"

aCourse.showSection();

document.querySelector("#enrollStudent").addEventListener("click"), function () {
    const sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.enrollStudent(sectionNum);
}