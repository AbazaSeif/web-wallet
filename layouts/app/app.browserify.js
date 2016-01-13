// init handlebars templates
Handlebars = require('handlebars-helpers')(Handlebars)
Handlebars.templates = require('handlebars-templates')(Handlebars)
Handlebars.partials = Handlebars.templates
window.render = function (name, data) {
  return Handlebars.templates[name](data)
}

console.log('test!')

var html = window.render('layouts/app', {
  year: 2016
})

$('#body').html(html)