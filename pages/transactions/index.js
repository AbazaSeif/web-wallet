var tablesort = require('tablesort')

module.exports = function () {

  var table = $('#transactions table')[0]
  tablesort(table)

}