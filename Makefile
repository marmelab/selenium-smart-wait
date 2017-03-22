install:
	yarn

clean:
	rm -rf lib

build: clean
	NODE_ENV=production ./node_modules/.bin/babel \
		--out-dir=lib \
		--stage=0 \
		--ignore=*.spec.js \
		src

test:
	NODE_ENV=test ./node_modules/.bin/nyc \
		./node_modules/.bin/mocha \
		--opts ./mocha.opts \
		"./src/**/*.spec.js"

install-selenium:
	echo "Installing Selenium server"
	./node_modules/.bin/selenium-standalone install --version=3.3.0 --drivers.chrome.version=2.24

watch-test:
	NODE_ENV=test ./node_modules/.bin/nyc \
		./node_modules/.bin/mocha \
		--opts ./mocha.opts \
		--watch \
		"./src/**/*.spec.js"

lint:
	./node_modules/.bin/eslint ./src
