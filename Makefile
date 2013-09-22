.PHONY: test lint dependencies

jquery_version = 2.0.3
qunit_version = 1.12.0
blanket_version = 1.1.5

download = curl --output $(1) --time-cond $(1) --remote-time $(2)

test:
	@set -o pipefail && \
			phantomjs test/extlib/phantomjs-qunit-runner.js test/index.html | \
			grep -v "extlib/qunit.js" | \
			sed -e "s/[^0 ][^0 ]* failed/\x1b[31m&\x1b[0m/" \
					-e  "s/Failed assertion: expected: \(.*\), but was: \(.*\)/\n    assertion failed\n    \x1b[31;1mexpected: \1\x1b[0m\n    \x1b[32;1mactual  : \2\x1b[0m/"

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
	$(call download, "test/extlib/phantomjs-qunit-runner.js", \
		"https://raw.github.com/jquery/qunit/master/addons/phantomjs/runner.js")
