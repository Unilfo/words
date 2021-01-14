var fs = require("fs");

const add = (obj) => {
  fs.writeFile('./object.json', JSON.stringify(obj, null), (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('File has been created')
  })
}

module.exports = {
  add
}
