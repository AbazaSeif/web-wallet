(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
;(function() {
  function Tablesort(el, options) {
    if (!(this instanceof Tablesort)) return new Tablesort(el, options);

    if (!el || el.tagName !== 'TABLE') {
      throw new Error('Element must be a table');
    }
    this.init(el, options || {});
  }

  var sortOptions = [];

  var createEvent = function(name) {
    var evt;

    if (!window.CustomEvent || typeof window.CustomEvent !== 'function') {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(name, false, false, undefined);
    } else {
      evt = new CustomEvent(name);
    }

    return evt;
  };

  var getInnerText = function(el) {
    return el.getAttribute('data-sort') || el.textContent || el.innerText || '';
  };

  // Default sort method if no better sort method is found
  var caseInsensitiveSort = function(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    if (a === b) return 0;
    if (a < b) return 1;

    return -1;
  };

  // Stable sort function
  // If two elements are equal under the original sort function,
  // then there relative order is reversed
  var stabilize = function(sort, antiStabilize) {
    return function(a, b) {
      var unstableResult = sort(a.td, b.td);

      if (unstableResult === 0) {
        if (antiStabilize) return b.index - a.index;
        return a.index - b.index;
      }

      return unstableResult;
    };
  };

  Tablesort.extend = function(name, pattern, sort) {
    if (typeof pattern !== 'function' || typeof sort !== 'function') {
      throw new Error('Pattern and sort must be a function');
    }

    sortOptions.push({
      name: name,
      pattern: pattern,
      sort: sort
    });
  };

  Tablesort.prototype = {

    init: function(el, options) {
      var that = this,
          firstRow,
          defaultSort,
          i,
          cell;

      that.table = el;
      that.thead = false;
      that.options = options;

      if (el.rows && el.rows.length > 0) {
        if (el.tHead && el.tHead.rows.length > 0) {
          firstRow = el.tHead.rows[el.tHead.rows.length - 1];
          that.thead = true;
        } else {
          firstRow = el.rows[0];
        }
      }

      if (!firstRow) return;

      var onClick = function() {
        if (that.current && that.current !== this) {
          that.current.classList.remove('sort-up');
          that.current.classList.remove('sort-down');
        }

        that.current = this;
        that.sortTable(this);
      };

      // Assume first row is the header and attach a click handler to each.
      for (i = 0; i < firstRow.cells.length; i++) {
        cell = firstRow.cells[i];
        if (!cell.classList.contains('no-sort')) {
          cell.classList.add('sort-header');
          cell.tabindex = 0;
          cell.addEventListener('click', onClick, false);

          if (cell.classList.contains('sort-default')) {
            defaultSort = cell;
          }
        }
      }

      if (defaultSort) {
        that.current = defaultSort;
        that.sortTable(defaultSort);
      }
    },

    sortTable: function(header, update) {
      var that = this,
          column = header.cellIndex,
          sortFunction = caseInsensitiveSort,
          item = '',
          items = [],
          i = that.thead ? 0 : 1,
          sortDir,
          sortMethod = header.getAttribute('data-sort-method'),
          sortOrder = header.getAttribute('data-sort-order');

      that.table.dispatchEvent(createEvent('beforeSort'));

      // If updating an existing sort `sortDir` should remain unchanged.
      if (update) {
        sortDir = header.classList.contains('sort-up') ? 'sort-up' : 'sort-down';
      } else {
        if (header.classList.contains('sort-up')) {
          sortDir = 'sort-down';
        } else if (header.classList.contains('sort-down')) {
          sortDir = 'sort-up';
        } else if (sortOrder === 'asc') {
          sortDir = 'sort-down';
        } else if (sortOrder === 'desc') {
          sortDir = 'sort-up';
        } else {
          sortDir = that.options.descending ? 'sort-up' : 'sort-down';
        }

        header.classList.remove(sortDir === 'sort-down' ? 'sort-up' : 'sort-down');
        header.classList.add(sortDir);
      }

      if (that.table.rows.length < 2) return;

      // If we force a sort method, it is not necessary to check rows
      if (!sortMethod) {
        while (items.length < 3 && i < that.table.tBodies[0].rows.length) {
          item = getInnerText(that.table.tBodies[0].rows[i].cells[column]);
          item = item.trim();

          if (item.length > 0) {
            items.push(item);
          }

          i++;
        }

        if (!items) return;
      }

      for (i = 0; i < sortOptions.length; i++) {
        item = sortOptions[i];

        if (sortMethod) {
          if (item.name === sortMethod) {
            sortFunction = item.sort;
            break;
          }
        } else if (items.every(item.pattern)) {
          sortFunction = item.sort;
          break;
        }
      }

      that.col = column;
      var newRows = [],
          noSorts = {},
          j,
          totalRows = 0,
          noSortsSoFar = 0;

      for (i = 0; i < that.table.tBodies.length; i++) {
        for (j = 0; j < that.table.tBodies[i].rows.length; j++) {
          item = that.table.tBodies[i].rows[j];
          if (item.classList.contains('no-sort')) {
            // keep no-sorts in separate list to be able to insert
            // them back at their original position later
            noSorts[totalRows] = item;
          } else {
            // Save the index for stable sorting
            newRows.push({
              tr: item,
              td: getInnerText(item.cells[that.col]),
              index: totalRows
            });
          }
          totalRows++;
        }
      }

      // Before we append should we reverse the new array or not?
      // If we reverse, the sort needs to be `anti-stable` so that
      // the double negatives cancel out
      if (sortDir === 'sort-down') {
        newRows.sort(stabilize(sortFunction, true));
        newRows.reverse();
      } else {
        newRows.sort(stabilize(sortFunction, false));
      }

      // append rows that already exist rather than creating new ones
      for (i = 0; i < totalRows; i++) {
        if (noSorts[i]) {
          // We have a no-sort row for this position, insert it here.
          item = noSorts[i];
          noSortsSoFar++;
        } else {
          item = newRows[i - noSortsSoFar].tr;
        }

        // appendChild(x) moves x if already present somewhere else in the DOM
        that.table.tBodies[0].appendChild(item);
      }

      that.table.dispatchEvent(createEvent('afterSort'));
    },

    refresh: function() {
      if (this.current !== undefined) {
        this.sortTable(this.current, true);
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Tablesort;
  } else {
    window.Tablesort = Tablesort;
  }
})();

},{}],2:[function(require,module,exports){
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


},{"../deposit":3,"../request-payment":4,"../send":5,"../transactions":6,"handlebars-helpers":"handlebars-helpers","handlebars-templates":"handlebars-templates"}],3:[function(require,module,exports){
module.exports = function () {

  console.log('deposit.')

}
},{}],4:[function(require,module,exports){
module.exports = function () {

  console.log('request payment.')

}
},{}],5:[function(require,module,exports){
module.exports = function () {

  $('#recipient').focus()

}
},{}],6:[function(require,module,exports){
var tablesort = require('tablesort')

module.exports = function () {

  var table = $('#transactions table')[0]
  tablesort(table)

}
},{"tablesort":1}]},{},[2]);
