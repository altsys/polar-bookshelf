const {Application} = require('spectron');
const assert = require('assert');
const electronPath = require('electron');
const path = require('path');

describe('Test Electron IPC for annotation.', function () {
    this.timeout(10000);

    beforeEach(async function (done) {

        let mainPath = path.join(__dirname, "main.js");
        let appOptions = {

            // Your electron path can be any binary
            // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
            // But for the sake of the example we fetch it from our node_modules.
            path: electronPath,

            // Assuming you have the following directory structure

            args: [mainPath],

        };

        console.log("appOptions: " + JSON.stringify(appOptions, null, "  "));

        this.app = new Application(appOptions);

        console.log("FIXME: waiting for start");
        this.app.start();
        console.log("Calling done");
        done();

    });

    afterEach(function (done) {

        console.log("FIXME2");

        if (this.app && this.app.isRunning()) {
            return this.app.stop()
        }

        done();

    });

    it('Test IPC with two windows', function () {

        console.log("FIXME3");

        //await this.app.client.waitUntilTextExists('.textLayer', 'Trace-based Just-in-Time', 10000)

        return this.app.client.getWindowCount().then(function (count) {
            assert.equal(count, 1)
            // Please note that getWindowCount() will return 2 if `dev tools` are opened.
            // assert.equal(count, 2)
        })

    });

});