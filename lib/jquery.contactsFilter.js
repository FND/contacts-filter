jQuery.fn.contactsFilter = function() {
	this.each(function(i, node) {
		new CONTACTSFILTER(node);
	});
	return this;
};
