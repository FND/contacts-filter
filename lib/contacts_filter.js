/*jslint vars: true, white: true */
/*global jQuery */

var CONTACTSFILTER = (function($) {

"use strict";

// `contactList` is a jQuery object, DOM node or selector referencing a list of
// contacts using the h-card microformat
function FilterWidget(contactList) {
	this.contactList = contactList.jquery ? contactList : $(contactList);
	this.filterField = $('<input type="search" />').insertBefore(contactList).
		on("keyup", $.proxy(this, "onFilter"));
	this.caseToggle = $('<input type="checkbox" />').
		on("change", $.proxy(this, "onToggle"));
	$("<label />").text("case-sensitive").prepend(this.caseToggle).
		insertBefore(this.filterField);
}
FilterWidget.prototype.onFilter = function(ev) {
	var contacts = this.contactList.find("li .p-name");
	var input = this.filterField.val();

	var names = $.map(contacts, function(node) { return $(node).text(); });
	this.filter(names, input, function(match, name, i) {
		var contact = contacts.eq(i).closest(".h-card");
		if(match) {
			contact.slideDown();
		} else {
			contact.slideUp();
		}
	});
};
FilterWidget.prototype.onToggle = function(ev) {
	this.caseSensitive = this.caseToggle.prop("checked");
	this.filterField.trigger("keyup");
};
// filter a list of strings against the given value
// invokes optional callback for each item, passing a boolean indicating whether
// it matches the value along with the entry and its index
// returns a list of matching indexes
FilterWidget.prototype.filter = function(entries, value, callback) {
	var self = this;
	return $.map(entries, function(entry, i) {
		var match = startsWith(entry, value, self.caseSensitive);
		if(callback) {
			callback(match, entry, i);
		}
		return match ? i : null;
	});
};

function startsWith(str, value, caseSensitive) {
	if(!caseSensitive) {
		str = str.toLowerCase();
		value = value.toLowerCase();
	}
	return str.indexOf(value) === 0;
}

return FilterWidget;

}(jQuery));
