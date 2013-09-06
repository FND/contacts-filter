(function() {

"use strict";

QUnit.module("contacts filtering");

QUnit.asyncTest("filtering by initials", function() {
	QUnit.expect(3);

	var contacts = jQuery("ul.contacts");
	var filterField = jQuery("input[type=search]");

	QUnit.strictEqual(filterField.length, 1);
	var names = extractNames(contacts.find("li:visible"));
	QUnit.deepEqual(names, ["Jake Archibald", "Christian Heilmann",
			"John Resig", "Nicholas Zakas"]);

	filterField.val("J").trigger("keyup");
	setTimeout(function() {
		var names = extractNames(contacts.find("li:visible"));
		QUnit.deepEqual(names, ["Jake Archibald", "John Resig"]);
		QUnit.start();
	}, 500);
});

function extractNames(items) {
	var names = items.map(function(i, node) {
		return jQuery(".p-name", node).text();
	});
	return Array.prototype.slice.call(names);
}

}());
