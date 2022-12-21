const http = require("http")
const fs = require("fs")

const port = 3000

const server = http.createServer((req, res) => {
    const urlInfo = require("url").parse(req.url, true)
    const name = urlInfo.query.name
    // query está pegando o parâmetro name na url == /?name="name"

    if (!name) {
        // caso não exista parâmetro name na url, ou seja, nunca foi enviado
        // ele irá mandar o index.html puro, com o formulário
        fs.readFile("index.html", function(err, data) {
            res.writeHead(200, { "Content-Type": "text/html" })
            res.write(data)
            return res.end()
        })
    } else {
        // caso exista o parâmetro name na url, ele irá criar o "arquivo.txt" caso ele não exista, e salvar o valor
        // de name lá, caso exista ele irá apenas subscrever. Então, ele redirecionará para o path principal, que é
        // o index.html puro.

        // O arquivo.txt pode ser interpretado como um banco de dados no futuro, essa aqui é a base de como o node lida
        // com o formulário.
        fs.writeFile("arquivo.txt", name, function(err, data) {
            res.writeHead(302, {
                location: "/",
            })
            return res.end()
        })
    }
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})