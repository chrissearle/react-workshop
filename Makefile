MOCHA := ./node_modules/.bin/mocha
BROWSERIFY := ./node_modules/.bin/browserify
ESLINT := ./node_modules/.bin/eslint
UGLIFYJS := ./node_modules/.bin/uglifyjs

all: lint test build

lint:
	$(ESLINT) .

test:
	$(MOCHA) --recursive --compilers js:babel/register

watch:
	$(MOCHA) --watch --reporter min --recursive --compilers js:babel/register

build:
	[[ -d dist ]] || mkdir dist
	cp src/index.html dist/
	cp src/styles.css dist/
	$(BROWSERIFY) src/application.js -t babelify -o dist/application.js
	$(UGLIFYJS) dist/application.js --compress warnings=false --mangle --output dist/application.js

.PHONY: lint test build
