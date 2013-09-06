QUnit.module("contacts filtering");

QUnit.test("filtering by initials", function() {
	var contacts = jQuery("ul.contacts");
	var filterField = jQuery("input[type=search]");

	QUnit.strictEqual(filterField.length, 1);
	var names = extractNames(contacts.find("li:visible"));
	QUnit.deepEqual(names, ["Jake Archibald", "Christian Heilmann",
			"John Resig", "Nicholas Zakas"]);

	filterField.val("J").trigger("keyup");
	var names = extractNames(contacts.find("li:visible"));
	QUnit.deepEqual(names, ["Jake Archibald", "John Resig"]);
});

function extractNames(items) {
	var names = items.map(function(i, node) {
		return jQuery(".p-name", node).text();
	});
	return Array.prototype.slice.call(names);
}
