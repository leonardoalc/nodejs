const _ = require("lodash")

const arr = [1, 2, 2, 3, 3, 4, 4, 5]
const arrUniq =  _.sortedUniq(arr)

console.log(arrUniq)