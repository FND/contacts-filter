.PHONY: test lint

export PATH := ./node_modules/.bin:$(PATH)

test:
	`which node-qunit-phantomjs` test/index.html

lint:
	jslint-reporter `find {scripts,test} -type f -name "*.js"`
