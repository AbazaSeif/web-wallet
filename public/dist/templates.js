module.exports = function (Handlebars) {
var template = Handlebars.template, templates = {};

templates['partials/accounts'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<table>\n  <tr>\n    <th>\n      <i class=\"bitcoin-logo\"></i>\n      Bitcoin\n    </th>\n    <th>$2,429.74</th>\n  </tr>\n  <tr class=\"total\">\n    <td></td>\n    <td>5.0029</td>\n  </tr>\n  <tr>\n    <td>\n      <i class=\"fa fa-lock\"></i>\n      E-coin Trezor (white)\n    </td>\n    <td>4.0000</td>\n  </tr>\n  <tr>\n    <td>\n      <i class=\"fa fa-lock\"></i>\n      Test Trezor (black)\n    </td>\n    <td>0.0000</td>\n  </tr>\n  <tr>\n    <td>\n      <i class=\"fa fa-lock\"></i>\n      Will's Ledger Wallet\n    </td>\n    <td>0.0000</td>\n  </tr>\n  <tr>\n    <td>\n      <i class=\"fa fa-unlock\"></i>\n      Will's Hot Wallet\n    </td>\n    <td>0.8750</td>\n  </tr>\n  <tr>\n    <td>\n      <i class=\"fa fa-share-alt\"></i>\n      My Joint Account\n    </td>\n    <td>1.0029</td>\n  </tr>\n  <tr>\n    <td class=\"add-new-account\">\n      <i class=\"fa fa-plus-circle\"></i>\n      Add new account\n    </td>\n    <td></td>\n  </tr>\n</table>\n";
},"useData":true});

templates['pages/app'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "\n<header>\n  <img src=\"./images/logo.png\" class=\"logo\" />\n  <nav>\n    <div class=\"exchange-rate\">\n      1 BTC = $449.65\n    </div>\n    <div class=\"profile-menu\">\n      Satoshi Nakamoto\n      <i class=\"fa fa-caret-down\"></i>\n    </div>\n  </nav>\n</header>\n\n<main>\n  <div id=\"accounts\">\n"
    + ((stack1 = container.invokePartial(partials["partials/accounts"],depth0,{"name":"partials/accounts","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "  </div>\n\n  <div id=\"actions\">\n    <ul id=\"tabs\">\n      <li data-view=\"transactions\" class=\"active\"><div><i>Transactions</i></div></li>\n      <li data-view=\"deposit\"><div><i>Deposit</i></div></li>\n      <li data-view=\"request-payment\"><div><i>Request Payment</i></div></li>\n      <li data-view=\"send\"><div><i>Send</i></div></li>\n    </ul>\n    <div id=\"content\">\n"
    + ((stack1 = container.invokePartial(partials["pages/transactions"],depth0,{"name":"pages/transactions","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n  </div>\n\n</main>\n\n<footer>\n  <div>\n    &copy; "
    + container.escapeExpression(((helper = (helper = helpers.year || (depth0 != null ? depth0.year : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"year","hash":{},"data":data}) : helper)))
    + " E-COIN LLC, All Rights Reserved\n  </div>\n  <div>\n    This software is open source. Star it on github <a href=\"https://github.com/hotwallet/web-wallet\">here</a>!\n  </div>\n</footer>";
},"usePartial":true,"useData":true});

templates['pages/deposit'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"deposit\">\n  <ol>\n    <li>\n      <div>Deposit to wallet</div>\n      <div>\n        <select>\n          <option>Will's Hot Wallet (0.8750)</option>\n        </select>\n      </div>\n    </li>\n    <li>\n      <div>\n        Deposit funds to your bitcoin address:\n      </div>\n      <div class=\"address\">\n        <span>1HMA5UM6VTXADm7McQ7G66sqtgYW96KBBD</span>\n      </div>\n      <div>\n        <img src=\"https://blockchain.info/qr?data=1QoZmSz3ftNh5eegv1HR3inrAUJhUcY2v&size=125\" />\n      </div>\n    </li>\n    <li>\n      <i class=\"fa fa-refresh\"></i> Get new address\n    </li>\n  </ol>\n</div>";
},"useData":true});

templates['pages/request-payment'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<h2>Create a payment page</h2>\n\n<form id=\"request-payment\">\n\n  <ul>\n\n    <li>\n      <label>\n      Amount:\n      </label>\n      <div>\n        <div class=\"amount btc\">\n          <i class=\"fa fa-btc\"></i>\n          <input type=\"text\" id=\"amount\" placeholder=\"0.0000\" />\n        </div><div class=\"amount usd\">\n          <i>$</i>\n          <input type=\"text\" id=\"amount-usd\" placeholder=\"0.00\" />\n        </div>\n      </div>\n      <div>\n        <select>\n          <option value=\"abc\">Will's Hot Wallet (0.8750)</option>\n        </select>\n      </div>\n    </li>\n\n    <li>\n      <label>\n      What for?\n      </label>\n      <div>\n        <textarea id=\"description\" placeholder=\"pizza\"></textarea>\n      </div>\n    </li>\n\n    <li>\n      <label class=\"use-escrow\">\n        <input type=\"checkbox\" />\n        Use escrow service +$5\n      </label>\n      <i class=\"fa fa-info-circle help-tip\">\n        <p>\n          Funds are held in a 2-of-3 joint account until delivery.\n          E-COIN LLC charges 15% arbitration fee if there is a dispute.\n        </p>\n      </i>\n    </li>\n\n    <li>\n      <label>\n        Send payment link to:\n        <i class=\"fa fa-info-circle help-tip\">\n          <p>A link to a  recipient.</p>\n        </i>\n      </label>\n      <div>\n        <input type=\"text\" id=\"recipient\" placeholder=\"Email address\" />\n      </div>\n    </li>\n\n    <li>\n      <a href=\"#\" id=\"send-button\" class=\"button\">Send Payment</a>\n    </li>\n  </ul>\n\n</form>";
},"useData":true});

templates['pages/send'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<form id=\"send\">\n\n  <ul>\n\n    <li>\n      <label>\n        Send payment to:\n        <i class=\"fa fa-info-circle help-tip\">\n          <p>Enter email address or bitcoin address of the recipient.</p>\n        </i>\n      </label>\n      <div>\n\n        <input type=\"text\" id=\"recipient\" placeholder=\"Email or bitcoin address\" />\n      </div>\n    </li>\n\n    <li>\n      <label>\n      Amount:\n      </label>\n      <div>\n        <div class=\"amount btc\">\n          <i class=\"fa fa-btc\"></i>\n          <input type=\"text\" id=\"amount\" placeholder=\"0.0000\" />\n        </div><div class=\"amount usd\">\n          <i class=\"fa fa-usd\"></i>\n          <input type=\"text\" id=\"amount-usd\" placeholder=\"0.00\" />\n        </div>\n      </div>\n      <div>\n        <select>\n          <option value=\"abc\">Will's Hot Wallet (0.8750)</option>\n        </select>\n      </div>\n    </li>\n\n    <li>\n      <label>\n      What for?\n      </label>\n      <div>\n        <textarea id=\"description\" placeholder=\"pizza\"></textarea>\n      </div>\n    </li>\n\n    <li>\n      <label class=\"use-escrow\">\n        <input type=\"checkbox\" />\n        Use escrow service\n      </label>\n      <i class=\"fa fa-info-circle help-tip\">\n        <p>\n          Funds are held in a 2-of-3 joint account until delivery.\n          E-COIN LLC charges 15% arbitration fee if there is a dispute.\n        </p>\n      </i>\n    </li>\n\n    <li>\n      <a href=\"#\" id=\"send-button\" class=\"button\">Send Payment</a>\n    </li>\n  </ul>\n\n</form>";
},"useData":true});

templates['pages/transactions'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"transactions\">\n  <table>\n    <thead>\n      <tr>\n        <th>Date</th>\n        <th>Description</th>\n        <th>Category</th>\n        <th>Amount</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Jan 11</td>\n        <td>Coinbase</td>\n        <td>Transfer</td>\n        <td>-1.5000</td>\n      </tr>\n      <tr>\n        <td>Jan 4</td>\n        <td>BTCC</td>\n        <td>Transfer</td>\n        <td>2.0000</td>\n      </tr>\n    </tbody>\n  </table>\n</div>";
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