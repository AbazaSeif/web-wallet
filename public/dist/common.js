require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"handlebars-helpers":[function(require,module,exports){
module.exports = function (Handlebars) {

  Handlebars.registerHelper('dump', function (data) {
    return new Handlebars.SafeString(
      JSON.stringify(data, null, '  ')
    )
  })

  Handlebars.registerHelper('ifequal', function (a, b, opts) {
    if (a === b) {
      return opts.fn(this)
    }
    return opts.inverse(this)
  })

  return Handlebars
}
},{}],"handlebars-templates":[function(require,module,exports){
module.exports = function (Handlebars) {
var template = Handlebars.template, templates = {};

templates['layouts/app'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "\n<header>\n  <img src=\"./images/logo.png\" class=\"logo\" />\n  <nav>\n    <div>\n      1 BTC = $449.65\n    </div>\n    <div>\n      Satoshi Nakamoto\n    </div>\n  </nav>\n</header>\n\n<main>\n  <div id=\"accounts\">\n    <table>\n      <tr>\n        <th>\n          <i class=\"bitcoin-logo\"></i>\n          Bitcoin\n        </th>\n        <th>$2,429.74</th>\n      </tr>\n      <tr>\n        <td></td>\n        <td>5.0029 BTC</td>\n      </tr>\n      <tr>\n        <td>\n          <i class=\"fa fa-lock\"></i>\n          E-coin Trezor (white)\n        </td>\n        <td>4.0000</td>\n      </tr>\n      <tr>\n        <td>\n          <i class=\"fa fa-lock\"></i>\n          Test Trezor (black)\n        </td>\n        <td>0.0000</td>\n      </tr>\n      <tr>\n        <td>\n          <i class=\"fa fa-lock\"></i>\n          Will's Ledger Wallet\n        </td>\n        <td>0.0000</td>\n      </tr>\n      <tr>\n        <td>\n          <i class=\"fa fa-unlock\"></i>\n          Will's Hot Wallet\n        </td>\n        <td>0.8750</td>\n      </tr>\n      <tr>\n        <td>\n          <i class=\"fa fa-share-alt\"></i>\n          My Joint Account\n        </td>\n        <td>1.0029</td>\n      </tr>\n    </table>\n  </div>\n\n  <div id=\"actions\">\n    <ul id=\"tabs\">\n      <li class=\"active\"><div><i>Transactions</i></div></li>\n      <li><div><i>Deposit</i></div></li>\n      <li><div><i>Request Payment</i></div></li>\n      <li><div><i>Send</i></div></li>\n    </ul>\n    <div id=\"content\">\n\n    </div>\n  </div>\n\n</main>\n\n<footer>\n  <div>\n    &copy; "
    + container.escapeExpression(((helper = (helper = helpers.year || (depth0 != null ? depth0.year : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"year","hash":{},"data":data}) : helper)))
    + " E-COIN LLC, All Rights Reserved\n  </div>\n  <div>\n    This software is open source. Star it on github <a href=\"https://github.com/hotwallet/web-wallet\">here</a>!\n  </div>\n</footer>";
},"useData":true});

templates['layouts/html5'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "    <link href=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\" media=\"all\" rel=\"stylesheet\" type=\"text/css\" />\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <script type=\"text/javascript\" src=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\"></script>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=helpers.blockHelperMissing, buffer = 
  "<!doctype html>\n<html>\n  <head>\n    <title>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</title>\n";
  stack1 = ((helper = (helper = helpers.css || (depth0 != null ? depth0.css : depth0)) != null ? helper : alias2),(options={"name":"css","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.css) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += ((stack1 = ((helper = (helper = helpers.head || (depth0 != null ? depth0.head : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"head","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n  </head>\n  <body>\n"
    + ((stack1 = ((helper = (helper = helpers.main || (depth0 != null ? depth0.main : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"main","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n";
  stack1 = ((helper = (helper = helpers.js || (depth0 != null ? depth0.js : depth0)) != null ? helper : alias2),(options={"name":"js","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.js) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </body>\n</html>";
},"useData":true});

return templates;
}
},{}]},{},[]);
