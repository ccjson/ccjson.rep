#!/usr/bin/env bash.origin.test via github.com/nightwatchjs/nightwatch
/*
module.config = {
    "browsers": [
        "chrome"
    ],
    "test_runner": "mocha"
}
*/

describe("Suite", function() {

    require('bash.origin.workspace').forPackage(__dirname + '/../..').LIB.BASH_ORIGIN_EXPRESS.runForTestHooks(before, after, {
        "routes": {
            "^/": {
                "@github.com~ccjson~ccjson.rep#s1": {
                    "@": {
                        "@rep.ccjson": {
                            "ccjson": __dirname + "/../../src/ccjson.rep.js"
                        }                        
                    },
                    "$page": {
                        "@ccjson": {

                        }
                    }
                }
            }
        }
    });

    it('Test', function (client) {

        client.url('http://localhost:' + process.env.PORT + '/').pause(500);

        var selector = 'BODY[renderer="jsonrep"]';

        client.waitForElementPresent(selector, 3000);
if (process.env.BO_TEST_FLAG_DEV) client.pause(60 * 60 * 24 * 1000);
        
        client.expect.element(selector).text.to.contain([
            'CCJSON'
        ].join("\n"));

        if (process.env.BO_TEST_FLAG_DEV) client.pause(60 * 60 * 24 * 1000);

    });
});
