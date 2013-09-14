var CONTACTSFILTER = (function($) {

"use strict";

function FilterWidget(contactList) {
	var filterField = $('<input type="search" />').insertBefore(contactList).
		on("keyup", this.onFilter);

	var caseToggle = $('<input type="checkbox" />').on("change", this.onToggle);
	$("<label />").text("case-sensitive").prepend(caseToggle).
		insertBefore(filterField);
}
FilterWidget.prototype.onFilter = function(ev) {
	var filterField = $(this);
	var contacts = filterField.next();
	var input = filterField.val();
	var caseSensitive = filterField.prev().find("input:checkbox").
		prop("checked");

	if(!caseSensitive) {
		input = input.toLowerCase();
	}

	var names = contacts.find("li .p-name");
	names.each(function(i, node) {
		var el = $(node);
		var name = el.text();
		if(!caseSensitive) {
			name = name.toLowerCase();
		}

		var match = name.indexOf(input) === 0;
		var container = el.closest(".h-card");
		if(match) {
			container.slideDown();
		} else {
			container.slideUp();
		}
	});
}

FilterWidget.prototype.onToggle = function(ev) {
	var checkbox = $(this);
	var filterField = checkbox.parent().next();
	filterField.trigger("keyup");
};

return FilterWidget;

}(jQuery));
