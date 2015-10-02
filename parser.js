/**
* Just in case someone decided to be funny and
* update the data. I have a quick way to get it
* back.
*/
var fs = require('fs')
var rr = require('readline').createInterface({
  input: fs.createReadStream('data.txt')
})
var file = fs.createWriteStream('gh-pages/data/data.json')
var keys = ['Name', 'Common Name', 'Species', 'Location', 'Age', 'Image']
// file.write('exports.animals')
var data = []
rr.on('line', function (line) {
  // console.log('line:', line)
  if (line) {
    var values = line.split(',')
    // console.log('values', values)
    var obj = {}
    values.forEach(function (element, index, array) {
      obj[keys[index]] = element
    })
    data.push(obj)
    // console.log(data)
  }
})
rr.on('close', function () {
  // console.log(data)
  // file.write('exports.animals = ')
  var str = '['
  data.forEach(function (element, index, array) {
    var line = JSON.stringify(element)
    str += line
    if (data[index + 1]) {
      str += ','
    }
  })
  file.write(str + ']')
  file.close()
})
