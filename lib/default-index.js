var fs = require('fs')
var path = require('path')
var handlebars = require('handlebars')
var through = require('through2')

var html = fs.readFileSync(path.join(__dirname, 'default.html'), 'utf8')
var template = handlebars.compile(html)

module.exports = function(opt) {
  var out = through()
  var str = template(opt)
  out.end(str)
  return out
}