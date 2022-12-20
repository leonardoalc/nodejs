const url = require("url")
const addres = "htpps://www.meusite.com.br/catalog?produtos=cadeira"
const parsedUrl = new url.URL(addres)

console.log(parsedUrl.host)
console.log(parsedUrl.pathname)
console.log(parsedUrl.search)
console.log(parsedUrl.searchParams)
console.log(parsedUrl.searchParams.get(parsedUrl.search.split("?")[1].split("=")[0])) //fatiei a string ?produtos=cadeira para apenas produtos