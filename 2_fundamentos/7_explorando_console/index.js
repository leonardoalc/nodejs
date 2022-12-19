// mais um valor

const x = 53
const y = "Lel"
const z = [1, 2]

console.log(x, y, z)

// contagem de impressões

for (let c = 0; c<10; c++) {
    console.count(`o valor de x é: ${x}, contagem`)
}

// variavel entre string
console.log("O nome é: %s", y)

// limpar console
setTimeout(() => {
    console.clear()
}, 5000);