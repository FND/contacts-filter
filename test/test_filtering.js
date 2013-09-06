(function($) {

var module = QUnit.module,
	asyncTest = QUnit.asyncTest,
	expect = QUnit.expect,
	strictEqual = QUnit.strictEqual,
	deepEqual = QUnit.deepEqual,
	start = QUnit.start;

"use strict";

module("contacts filtering");

asyncTest("filtering by initials", function() {
	expect(3);

	var contacts = $("ul.contacts");
	var filterField = $("input[type=search]");

	strictEqual(filterField.length, 1);
	var names = extractNames(contacts.find("li:visible"));
	deepEqual(names, ["Jake Archibald", "Christian Heilmann",
			"John Resig", "Nicholas Zakas"]);

	filterField.val("J").trigger("keyup");
	setTimeout(function() {
		var names = extractNames(contacts.find("li:visible"));
		deepEqual(names, ["Jake Archibald", "John Resig"]);
		start();
	}, 500);
});

function extractNames(items) {
	var names = items.map(function(i, node) {
		return $(".p-name", node).text();
	});
	return Array.prototype.slice.call(names);
}

}(jQuery));
