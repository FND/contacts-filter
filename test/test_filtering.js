/*jslint vars: true, browser: true, white: true */
/*global CONTACTSFILTER, jQuery, QUnit */

(function($) {

"use strict";

var module = QUnit.module,
	test = QUnit.test,
	asyncTest = QUnit.asyncTest,
	expect = QUnit.expect,
	strictEqual = QUnit.strictEqual,
	deepEqual = QUnit.deepEqual,
	start = QUnit.start;

"use strict";

module("contacts filtering", {
	setup: function() {
		this.fixtures = $("#qunit-fixture");
		this.contacts = $("ul.contacts", this.fixtures);
		new CONTACTSFILTER(this.contacts);
		this.filterField = $("input[type=search]", this.fixtures);
		this.checkbox = $("input:checkbox", this.fixtures);
	}
});

test("initialization", function() {
	strictEqual(this.filterField.length, 1);
	strictEqual(this.checkbox.length, 1);
	strictEqual(this.checkbox.prop("checked"), false);
});

asyncTest("filtering by initials", function() {
	expect(2);

	var names = extractNames(this.contacts.find("li:visible"));
	deepEqual(names, ["Jake Archibald", "Christian Heilmann",
			"John Resig", "Nicholas Zakas"]);

	this.filterField.val("J").trigger("keyup");
	var self = this;
	setTimeout(function() {
		var names = extractNames(self.contacts.find("li:visible"));
		deepEqual(names, ["Jake Archibald", "John Resig"]);
		start();
	}, 500);
});

asyncTest("case sensitivity", function() {
	expect(2);
	var self = this;

	var assertContactCount = function(count) {
		var names = extractNames(self.contacts.find("li:visible"));
		deepEqual(names.length, count);
	};

	this.filterField.val("j").trigger("keyup");
	setTimeout(function() {
		assertContactCount(2);

		self.checkbox.prop("checked", true).trigger("change");
		setTimeout(function() {
			assertContactCount(0);

			start();
		}, 500);
	}, 500);
});

function extractNames(items) {
	var names = items.map(function(i, node) {
		return $(".p-name", node).text();
	});
	return Array.prototype.slice.call(names);
}

}(jQuery));
