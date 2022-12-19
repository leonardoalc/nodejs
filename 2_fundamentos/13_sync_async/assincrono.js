const fs = require("fs")

console.log("inicio")

fs.writeFile("arquivo2.txt", "Olá, mundo", function(err) {
    setTimeout(() => {
        console.log("Arquivo criado!")
    }, 3000);
})

console.log("Fim")