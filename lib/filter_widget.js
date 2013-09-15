var CONTACTSFILTER = (function($) {

"use strict";

function FilterWidget(contactList) {
	var self = this;

	var filterField = $('<input type="search" />').insertBefore(contactList).
		on("keyup", function() {
			self.onFilter.apply({ self: self, field: this });
		});

	var caseToggle = $('<input type="checkbox" />').on("change", function() {
		self.onToggle.apply({ self: self, checkbox: this });
	});
	$("<label />").text("case-sensitive").prepend(caseToggle).
		insertBefore(filterField);
}
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
FilterWidget.prototype.onFilter = function(ev) {
	var filterField = $(this.field);
	var contacts = filterField.next().find("li .p-name");
	var input = filterField.val();

	var names = $.map(contacts, function(node) { return $(node).text(); });
	this.self.filter(names, input, function(match, name, i) {
		var contact = contacts.eq(i).closest(".h-card");
		if(match) {
			contact.slideDown();
		} else {
			contact.slideUp();
		}
	});
};
FilterWidget.prototype.onToggle = function(ev) {
	var checkbox = $(this.checkbox);
	this.self.caseSensitive = checkbox.prop("checked");

	var filterField = checkbox.parent().next();
	filterField.trigger("keyup");
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
