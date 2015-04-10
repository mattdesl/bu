#!/usr/bin/env node
var opts = require('minimist')(process.argv.slice(2))
var defined = require('defined')
var open = require('opn')
var budo = require('budo')
var getport = require('getport')
var defaultIndex = require('./lib/default-index')

var entries = opts._
delete opts._

var stream = require('garnish')()
stream.pipe(process.stdout)
opts.stream = stream

getport(opts.port || 9966, function(err, port) {
  if (err) {
    console.error("Could not find available port.")
    process.exit(1)
  }

  //default verbose
  var verbose = defined(opts.v, opts.verbose)
  if (verbose !== false)
    opts.verbose = true

  //ES6 by default, unless --es5 is specified
  var transforms = merge('t').concat(merge('transform'))
  if (transforms.indexOf('babelify') === -1 && !opts.es5)
    transforms.unshift(require.resolve('babelify'))

  //errorify by default unless --no-debug or --debug=false is passed
  var plugins = merge('p').concat(merge('plugin'))
  var debug = defined(opts.debug, opts.d)
  if (plugins.indexOf('errorify') === -1 && debug !== false)
    plugins.unshift(require.resolve('errorify'))

  var shouldOpen = opts.open || opts.o
  delete opts.t
  delete opts.p
  delete opts.o 
  opts.transform = transforms
  opts.plugin = plugins
  opts.port = port
  opts.defaultIndex = defaultIndex
  budo(entries, opts)
    .on('connect', function(ev) {
      if (shouldOpen)
        open(ev.uri)
    })
})

function merge(key) {
  var result = []
  var t = opts[key] || []
  if (Array.isArray(t))
    result = result.concat(t)
  else 
    result.push(t)
  return result
}