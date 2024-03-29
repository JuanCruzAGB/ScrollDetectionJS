// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/** @var {object} defaultProps Default properties. */
let defaultProps = {
    location: {
        min: 0,
        max: 500,
    }, direction: {
        scrollbar: 'Y',
}};

/** @var {object} defaultState Default state. */
let defaultState = {
    //
};

/**
 * * Controls the document scroll.
 * @export
 * @class ScrollDetection
 * @author Juan Cruz Armentia <juan.cruz.armentia@gmail.com>
 * @extends Class
 */
export class ScrollDetection extends Class {
    /**
     * * Creates an instance of ScrollDetection.
     * @param {object} [props] ScrollDetection properties:
     * @param {object} [props.location] ScrollDetection location to detect properties:
     * @param {number} [props.location.min=0] ScrollDetection min scroll to detect.
     * @param {number} [props.location.max=500] ScrollDetection max scroll to detect.
     * @param {string} [props.direction='Y'] ScrollDetection direction to scroll, vertical (Y) or horizontal (X).
     * @param {object} [callbacks] ScrollDetection success & error callbacks. 
     * @param {object} [callbacks.success] ScrollDetection success callback properties:
     * @param {function} [callbacks.success.function] ScrollDetection success callback function.
     * @param {*} [callbacks.success.params={}] ScrollDetection success callback function params.
     * @param {object} [callbacks.error] ScrollDetection error callback properties:
     * @param {function} [callbacks.error.function] ScrollDetection error callback function.
     * @param {*} [callbacks.error.params={}] ScrollDetection error callback function params.
     * @param {HTMLElement} [html] Html Element to do the ScrollDetection.
     * @memberof ScrollDetection
     */
    constructor(props = {
        location: {
            min: 0,
            max: 500,
        }, direction: {
            scrollbar: 'Y',
    }}, callbacks = {
        success: {
            function: function (params) { console.log('SUCCESS') },
            params: {},
        }, error: {
            function: function (params) { console.log('ERROR') },
            params: {},
    }}, html = null){
        super({ ...defaultProps, ...props });
        this.setCallbacks(callbacks);
        if (html) {
            this.setHTML(html);
        } else {
            this.html = null;
        }
        this.detect();
    }

    /**
     * * Detect the scrollbar event & execute the callbacks.
     * @memberof ScrollDetection
     */
    detect () {
        let instance = this,
            toScroll = window,
            scrollPosition;
        if(this.props.direction.scrollbar == 'X'){
            scrollPosition = 'scrollX';
        }else if(this.props.direction.scrollbar == 'Y'){
            scrollPosition = 'scrollY';
        }
        let previousPosition = 0;
        if(this.html){
            toScroll = this.html;
            if(this.props.direction.scrollbar == 'X'){
                scrollPosition = 'scrollLeft';
            }else if(this.props.direction.scrollbar == 'Y'){
                scrollPosition = 'scrollTop';
            }
        }
        toScroll.addEventListener('scroll', function (e) {
            let scroll = this[scrollPosition];
            if (previousPosition === 0) {
                previousPosition = scroll;
            }
            instance.comparatePositions(previousPosition, scroll);
            previousPosition = scroll;
            if(scroll >= instance.props.location.min && scroll <= instance.props.location.max){
                ScrollDetection.execute(instance, true);
            }else{
                ScrollDetection.execute(instance, false);
            }
        });
    }

    /**
     * * Check where the scrollbar is heading.
     * @param {number} previousPosition Scrollbar previous position.
     * @param {number} newPosition Scrollbar new position.
     * @memberof ScrollDetection
     */
    comparatePositions (previousPosition, newPosition) {
        if (previousPosition > newPosition) {
            this.props.direction.scrolledTo = true;
        } else if(previousPosition < newPosition) {
            this.props.direction.scrolledTo = false;
        } else {
            this.props.direction.scrolledTo = null;
        }
    }

    /**
     * * Executte the callback function.
     * @param {ScrollDetection} instance ScrollDetection instance.
     * @param {boolean} bool Callback to execute.
     * @memberof ScrollDetection
     */
    static execute (instance, bool) {
        if (bool) {
            if (instance.hasCallback('success')) {
                instance.callbacks.success.function({
                    ...instance.callbacks.success.params,
                    scrolldetection: instance,
                });
            }
        } else {
            if (instance.hasCallback('error')) {
                instance.callbacks.error.function({
                    ...instance.callbacks.error.params,
                    scrolldetection: instance,
                });
            }
        }
    }

    /**
     * * Returns the scrollbar current location.
     * @param {string} direction Scrollbar direction to scroll.
     * @returns {number} scrollbar current locaion.
     * @memberof ScrollDetection
     */
    static currentLocation (direction = 'Y') {
        switch (direction.toUpperCase()) {
            case 'Y':
                return window.scrollY;
            case 'X':
                return window.scrollX;
        }
    }
}

// ? Default export
export default ScrollDetection;