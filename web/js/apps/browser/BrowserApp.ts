import {Logger} from '../../logger/Logger';
import {isPresent} from '../../Preconditions';
import {CaptureClient} from '../../capture/controller/CaptureClient';

const log = Logger.create();

export class BrowserApp {

    public start(): void {

        const element = <HTMLInputElement> document.querySelector("#link")!;

        element.addEventListener('keypress', (event) => this.onLinkKeyPress(event));

        log.info("started");

    }


    private onLinkKeyPress(event: Event) {

        if (event instanceof KeyboardEvent && event.which === 13) {

            console.log("GOT enter");

            const element = <HTMLInputElement> document.querySelector("#link")!;

            this.onLinkChange(element.value);

        }

    }

    private onLinkChange(value: string) {

        if (isPresent(value) && ! value.startsWith("http:") && ! value.startsWith("https:")) {
            log.debug("Not a URL: " + value);
            return;
        }

        log.debug("Starting capture on URL: " + value);

        CaptureClient.startCapture(value);

    }

}