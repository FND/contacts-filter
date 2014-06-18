.PHONY: test lint dependencies

jquery_version = 2.0.3
qunit_version = 1.12.0
blanket_version = 1.1.5

download = curl --output $(1) --time-cond $(1) --remote-time $(2)

export PATH := ./node_modules/.bin:$(PATH)

test:
	`which node-qunit-phantomjs` test/index.html

lint:
	jslint-reporter `find {scripts,test} -type f -name "*.js"`

dependencies:
	mkdir -p extlib
	$(call download, "extlib/jquery.js", \
		"http://ajax.googleapis.com/ajax/libs/jquery/$(jquery_version)/jquery.js")
	mkdir -p test/extlib
	$(call download, "test/extlib/qunit.js", \
		"http://code.jquery.com/qunit/qunit-$(qunit_version).js")
	$(call download, "test/extlib/qunit.css", \
		"http://code.jquery.com/qunit/qunit-$(qunit_version).css")
	$(call download, "test/extlib/blanket.js", \
		"https://raw.github.com/alex-seville/blanket/v$(blanket_version)/dist/qunit/blanket.min.js")
