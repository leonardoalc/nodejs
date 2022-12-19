const readLine = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})

readLine.question("Qual a sua linguagem preferida? ", (language) => {
    if (language === "C") {
        console.log("Isso nem é linguagem")
    } else {
        console.log(`A linguagem preferida é ${language}`)
    }
    readLine.close()
})