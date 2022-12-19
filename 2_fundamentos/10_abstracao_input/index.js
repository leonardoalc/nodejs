const inquirer = require("inquirer")

inquirer.prompt([
{
    name: "p1",
    message: "Primeira nota: "
},
{
    name: "p2",
    message: "Segunda nota: "
}
]).then((answers) => {
    console.log(answers)
    const media = (Number(answers.p1) + Number(answers.p2)) / 2 
    console.log(media)
}).catch(err => console.log("deu errro %s", err))