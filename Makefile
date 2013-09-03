.PHONY: dependencies

jquery_version = 2.0.3

download = \
	curl --output $(1) --time-cond $(1) --remote-time $(2)

dependencies:
	mkdir -p extlib
	$(call download, "extlib/jquery.js", \
		"http://ajax.googleapis.com/ajax/libs/jquery/$(jquery_version)/jquery.js")
