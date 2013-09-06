(function() {

var contacts = jQuery("ul.contacts");
var filterField = jQuery('<input type="search" />').insertBefore(contacts).
	on("keyup", onFilter);

function onFilter(ev) {
	var filterField = $(this);
	var contacts = filterField.next();
	var input = filterField.val();

	var names = contacts.find("li .p-name");
	names.each(function(i, node) {
		var el = $(node);
		var name = el.text();

		var match = name.indexOf(input) === 0;
		var container = el.closest(".h-card");
		if(match) {
			container.slideDown();
		} else {
			container.slideUp();
		}
	});
}

}());
