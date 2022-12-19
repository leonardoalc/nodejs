// nome 

console.log(process.argv)

const args = process.argv.slice(2)

const name = args[0].split("=")[1]
const idade = args[1].split("=")[1]
console.log(`${name} tem ${idade} anos`)