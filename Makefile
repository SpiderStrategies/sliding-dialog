VERSION = $(shell node -e 'require("./package.json").version' -p)
HEADER = "/*!\n * sliding-dialog.js v$(VERSION) \n * Copyright 2012, Spider Strategies <nathan.bowser@spiderstrategies.com> \n * sliding-dialog.js may be freely distributed under the BSD license. \n*/"
DIST = dist/sliding-dialog-$(VERSION).js
MIN = dist/sliding-dialog-$(VERSION).min.js

clean:
	@rm -rf dist

build: clean
	@mkdir dist
	@cp src/sliding-dialog.css dist/sliding-dialog-$(VERSION).css
	@echo $(HEADER) > $(DIST) && cat src/sliding-dialog.js >> $(DIST)
	@echo $(HEADER) > $(MIN) && node_modules/.bin/uglifyjs src/sliding-dialog.js >> $(MIN)

test:

.PHONY: build clean test
