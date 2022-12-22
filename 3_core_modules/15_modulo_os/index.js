const os = require("os")

console.log(os.cpus())
console.log(`${(os.freemem()/ (1 * 10**9)).toFixed(2)}GB`) // o valor vem em bytes, portanto, estou fazendo a conversão para GB
console.log(os.homedir())
console.log(os.type())
console.log(os.version())