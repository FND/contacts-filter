/*jslint vars: true, white: true */
/*global CONTACTSFILTER, jQuery */

jQuery.fn.contactsFilter = function() {
	this.each(function(i, node) {
		new CONTACTSFILTER(node);
	});
	return this;
};
