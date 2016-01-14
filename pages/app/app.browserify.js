// init handlebars templates
Handlebars = require('handlebars-helpers')(Handlebars)
Handlebars.templates = require('handlebars-templates')(Handlebars)
Handlebars.partials = Handlebars.templates
var render = window.render = function (name, data) {
  return Handlebars.templates[name](data)
}

// render the app html
$('#body').html(render('pages/app', {
  year: 2016
}))

var controllers = {
  transactions: require('../transactions'),
  deposit: require('../deposit'),
  'request-payment': require('../request-payment'),
  send: require('../send')
}

var openTab = function (view) {
  // render the view
  $('#content').html(render('pages/' + view))
  // run the view's javascript
  controllers[view]()
  // change selected tab
  $('#tabs li').removeClass('active')
  $('#tabs li[data-view=' + view + ']').addClass('active')
}

$(document).ready(function () {
  openTab('transactions')
})

$(document).on('click', '#tabs li', function () {
  var $this = $(this)
  var view = $this.data('view')
  openTab(view)
})

