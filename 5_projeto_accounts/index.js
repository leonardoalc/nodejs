const fs = require("fs")
const chalk = require("chalk")
const inquirer = require("inquirer")

iniciar()

function iniciar() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "O que você deseja fazer?",
            choices: [
                "Criar conta",
                "Consultar saldo",
                "Depositar",
                "Sacar",
                "Sair"
            ]
        }
    ]).then(awnser => {
        const action = awnser["action"]

        if (action === "Criar conta") {
            createAccount()
        } else if (action === "Consultar saldo") {
            consult()
        } else if (action === "Depositar") {
            accountAmount(true)
        } else if (action === "Sacar") {
            accountAmount(false)
        } else if (action === "Sair") {
            console.log("Obrigado por usar o Accounts!")
            process.exit()
        }
    })
}
function getAccountData(accountName) {
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: "utf-8",
        flag: "r"
    })
    return JSON.parse(accountJson)
}
function createAccount() {
    inquirer.prompt([
        {
            name: "conta",
            message: "Qual será o nome da conta?"
        }
    ]).then(awnser => {
        const accountName = awnser["conta"]
        console.log(accountName)
        // checando se a pasta que guarda as constas existe
        if (fs.existsSync("accounts") === false) {
            fs.mkdirSync("accounts")
        }


        //checando se o nome já existe
        if (fs.existsSync(`accounts/${accountName}.json`) || accountName === "") {
            console.log(chalk.red("ERRO!"), "Nome inválido ou já existente.")
        } else {
            // criando conta
            fs.writeFileSync(
                `accounts/${accountName}.json`,
                '{"balance":0}',
                function (err) {
                    console.log(err)
                }
            )
            console.log(chalk.green('Parabéns, sua conta foi criada!'))
        }
        setTimeout(() => {
            console.clear()
            iniciar()
        }, 3000);
    })
}

function consult() {
    inquirer.prompt([
        {
            name: "accountName",
            message: "Qual a conta a ser consultada?"
        }
    ]).then(awnser => {
        const accountName = awnser["accountName"]

        // verificando se a conta existe
        if (fs.existsSync(`accounts/${accountName}.json`) === false) {
            console.log(chalk.bgRed.black("Esta conta não existe!"))
            setTimeout(() => {
                console.clear()
                iniciar()
            }, 3000);
        } else {
            const accountData = getAccountData(accountName)
            console.log(chalk.bold(`Conta: ${accountName}`))
            if (accountData.balance === 0) {
                console.log(chalk.bold("Saldo disponível: "), chalk.bold(accountData.balance))
            } else {
                console.log(chalk.bold("Saldo disponível: R$"), chalk.bold.green(accountData.balance))
            }
            setTimeout(() => {
                console.clear()
                iniciar()
            }, 3000);
        }
    })
}
function accountAmount(add) {
    inquirer.prompt([
        {
            name: "accountName",
            message: "Qual o nome da conta?"
        },
        {
            name: "amount",
            message: "Qual o valor?"
        }
    ]).then(awnser => {
        const name = awnser["accountName"]
        const amount = awnser["amount"]
        if (add) {
            addAmount(name, amount)
        } else {
            withDraw(name, amount)
        }
    })
}
function addAmount(accountName, amount) {
    if (amount <= 0 || amount === NaN || typeof(amount) === String){
        // verificando valor
        console.log(chalk.red("ERRO!"), "Valor inválido!")
        setTimeout(() => {
            console.clear()
            accountAmount(true) 
        }, 3000);
    } else if (fs.existsSync(`accounts/${accountName}.json`) === false) {
        // verificando se a conta existe
        console.log(chalk.bgRed.black("Esta conta não existe!"))
        setTimeout(() => {
            console.clear()
            accountAmount(true) 
        }, 3000)
    } else {
        const accountData = getAccountData(accountName)

        // adicionando o dinheiro na conta 

        accountData.balance = Number(accountData.balance) + Number(amount)
        fs.writeFileSync(
            `accounts/${accountName}.json`,
            JSON.stringify(accountData), 
            function (err) {
                console.log(err)
            }
        )
        console.log(chalk.bgCyan.black(`Adicionados: R$${amount}`))
        setTimeout(() => {
            console.clear()
            iniciar()
        }, 3000);
    }    
}

function withDraw(accountName, amount) {
        // verificando se a conta existe
        if (fs.existsSync(`accounts/${accountName}.json`) === false) {
            console.log(chalk.bgRed.black("Esta conta não existe!"))
            setTimeout(() => {
                console.clear()
                accountAmount(false)
            }, 3000);
        } else {
            const accountData = getAccountData(accountName)
            if (amount > accountData.balance) {
                // verificando se o valor é válido
                console.log(chalk.bgRed.black.bold("Saldo insuficiente!"))
                setTimeout(() => {
                    console.clear()
                    iniciar()
                }, 3000);
            } else {
                // adicionando o dinheiro na conta 
                accountData.balance = Number(accountData.balance) - Number(amount)
                fs.writeFileSync(
                    `accounts/${accountName}.json`,
                    JSON.stringify(accountData), 
                    function (err) {
                        console.log(err)
                    }
                )
                console.log(chalk.bgCyan.black(`Sacando: R$${amount}`))
                setTimeout(() => {
                    iniciar()
                }, 3000);
            }
        }
}