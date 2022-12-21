const fs = require("fs")

const name1 = "arquivo.txt"
const name2 = "novoarquivo.txt"

fs.rename(name1, name2, function(err) {
    let name
    if(err) {
        if(err.errno === -4058){
            fs.rename("novoarquivo.txt", "arquivo.txt", function(err) {
                console.log(`Renomeando ${name2} para ${name1}`)
            })
        } else {
            console.log(err)
        }
        return
    }

    console.log(`Renomeando ${name1} para ${name2}`)
})