/**
 * * Controls the document scroll.
 * @export
 * @class ScrollDetection
 */
export class ScrollDetection{
    /**
     * * Creates an instance of ScrollDetection.
     * @param {Object} properties ScrollDetection properties.
     * @param {Object} properties.location ScrollDetection location to detect properties.
     * @param {Number} properties.location.min ScrollDetection min scroll to detect.
     * @param {Number} properties.location.max ScrollDetection max scroll to detect.
     * @param {String} properties.direction ScrollDetection direction to scroll, vertical (Y) or horizontal (X).
     * @param {Object} callbacks ScrollDetection success & error callbacks. 
     * @param {Object} callbacks.success ScrollDetection success callback properties.
     * @param {Function} callbacks.success.function ScrollDetection success callback function.
     * @param {*} callbacks.success.params ScrollDetection success callback function params.
     * @param {Object} callbacks.error ScrollDetection error callback properties.
     * @param {Function} callbacks.error.function ScrollDetection error callback function.
     * @param {*} callbacks.error.params ScrollDetection error callback function params.
     * @param {HTMLElement} html Html Element to do the ScrollDetection.
     * @memberof ScrollDetection
     */
    constructor(properties = {
        location: {
            min: 0,
            max: 500,
        }, direction: 'Y',
    }, callbacks = {
        success: {
            function: function() { /* console.log('SUCCESS') */ },
            params: {
                //
            },
        }, error: {
            function: function() { /* console.log('ERROR') */ },
            params: {
                //
            },
    }, }, html = null){
        this.setProperties(properties);
        this.setCallbacks(callbacks);
        this.setHTML(html);
        this.detect();
    }

    /**
     * * Set the ScrollDetection properties.
     * @param {Object} properties.location ScrollDetection location to detect properties.
     * @param {Number} properties.location.min ScrollDetection min scroll to detect.
     * @param {Number} properties.location.max ScrollDetection max scroll to detect.
     * @param {String} properties.direction ScrollDetection direction to scroll, vertical (Y) or horizontal (X).
     * @memberof ScrollDetection
     */
    setProperties(properties = {
        location: {
            min: 0,
            max: 500,
        }, direction: 'Y',
    }){
        this.properties = {};
        this.setLocation(properties);
        this.setDirection(properties);
    }

    /**
     * * Returns the ScrollDetection properties.
     * @returns {Object} The ScrollDetection properties.
     * @memberof ScrollDetection
     */
    getProperties(){
        return this.properties;
    }

    /**
     * * Set the ScrollDetection location to detect properties.
     * @param {Object} properties.location ScrollDetection location to detect properties.
     * @param {Number} properties.location.min ScrollDetection min scroll to detect.
     * @param {Number} properties.location.max ScrollDetection max scroll to detect.
     * @memberof ScrollDetection
     */
    setLocation(properties = {
        location: {
            min: 0,
            max: 500,
        },
    }){
        if (properties.hasOwnProperty('location')) {
            this.properties.location = properties.location;
        } else {
            this.properties.location = {
                min: 0,
                max: 500,
            };
        }
    }

    /**
     * * Returns the ScrollDetection location to detect properties.
     * @returns {Object} The ScrollDetection location to detect properties.
     * @memberof ScrollDetection
     */
    getLocation(){
        return this.properties.location;
    }
    
    /**
     * * Set the ScrollDetection direction to scroll.
     * @param {String} properties.direction ScrollDetection direction to scroll, vertical (Y) or horizontal (X).
     * @memberof ScrollDetection
     */
    setDirection(properties = {
        direction: 'Y',
    }){
        this.properties.direction = {};
        if (properties.hasOwnProperty('direction')) {
            this.properties.direction.scrollbar = properties.direction.toUpperCase();
        } else {
            this.properties.direction.scrollbar = 'Y';
        }
    }

    /**
     * * Returns the ScrollDetection direction to scroll.
     * @returns {String} The ScrollDetection direction to scroll.
     * @memberof ScrollDetection
     */
    getDirection(){
        return this.properties.direction.scrollbar;
    }

    /**
     * * Returns the ScrollDetection direction scrolled.
     * @returns {Boolean|null} The ScrollDetection direction scrolled (true is an scrollbar superior position, false is an inferior position and null the scrollbar returns to the original position).
     * @memberof ScrollDetection
     */
    getDirectionScrolled(){
        return this.properties.direction.scrolledTo;
    }

    /**
     * * Set the ScrollDetection callbacks.
     * @param {Object} callbacks ScrollDetection success & error callbacks. 
     * @param {Object} callbacks.success ScrollDetection success callback properties.
     * @param {Function} callbacks.success.function ScrollDetection success callback function.
     * @param {*} callbacks.success.params ScrollDetection success callback function params.
     * @param {Object} callbacks.error ScrollDetection error callback properties.
     * @param {Function} callbacks.error.function ScrollDetection error callback function.
     * @param {*} callbacks.error.params ScrollDetection error callback function params.
     * @memberof ScrollDetection
     */
    setCallbacks(callbacks = {
        success: {
            function: function() { /* console.log('SUCCESS') */ },
            params: {
                //
            },
        }, error: {
            function: function() { /* console.log('ERROR') */ },
            params: {
                //
            },
    }, }){
        this.callbacks = {};
        this.setSuccess(callbacks);
        this.setError(callbacks);
    }

    /**
     * * Returns the ScrollDetection callbacks.
     * @returns {Object} The ScrollDetection callbacks.
     * @memberof ScrollDetection
     */
    getCallbacks(){
        return this.callbacks;
    }

    /**
     * * Set the ScrollDetection success callback.
     * @param {Object} callbacks ScrollDetection success & error callbacks. 
     * @param {Object} callbacks.success ScrollDetection success callback properties.
     * @param {Function} callbacks.success.function ScrollDetection success callback function.
     * @param {*} callbacks.success.params ScrollDetection success callback function params.
     * @memberof ScrollDetection
     */
    setSuccess(callbacks = {
        success: {
            function: function() { /* console.log('SUCCESS') */ },
            params: {
                //
            },
    }, }){
        this.callbacks.success = {};
        if (callbacks.hasOwnProperty('success')) {
            this.callbacks.success = {
                function: callbacks.success.function,
                params: (callbacks.success.hasOwnProperty('params')) ? callbacks.success.params : {},
            };
        }
    }

    /**
     * * Returns the ScrollDetection success callback.
     * @returns {Object} The ScrollDetection success callback.
     * @memberof ScrollDetection
     */
    getSuccess(){
        return this.callbacks.success;
    }

    /**
     * * Check if ScrollDetection has an success callback.
     * @returns {Boolean} The "ScrollDetection has success callback" boolean.
     * @memberof ScrollDetection
     */
    hasSuccessCallback(){
        if (this.callbacks.hasOwnProperty('success') && this.callbacks.success.hasOwnProperty('function')) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Set the ScrollDetection error callback.
     * @param {Object} callbacks ScrollDetection success & error callbacks. 
     * @param {Object} callbacks.success ScrollDetection success callback properties.
     * @param {Function} callbacks.success.function ScrollDetection success callback function.
     * @param {*} callbacks.success.params ScrollDetection success callback function params.
     * @param {Object} callbacks.error ScrollDetection error callback properties.
     * @param {Function} callbacks.error.function ScrollDetection error callback function.
     * @param {*} callbacks.error.params ScrollDetection error callback function params.
     * @memberof ScrollDetection
     */
    setError(callbacks = {
        error: {
            function: function() { /* console.log('ERROR') */ },
            params: {
                //
            },
    }, }){
        this.callbacks.error = {};
        if (callbacks.hasOwnProperty('error')) {
            this.callbacks.error = {
                function: callbacks.error.function,
                params: (callbacks.error.hasOwnProperty('params')) ? callbacks.error.params : {},
            };
        }
    }

    /**
     * * Returns the ScrollDetection error callback.
     * @returns {Object} The ScrollDetection error callback.
     * @memberof ScrollDetection
     */
    getError(){
        return this.callbacks.error;
    }

    /**
     * * Check if ScrollDetection has an error callback.
     * @returns {Boolean} The "ScrollDetection has error callback" boolean.
     * @memberof ScrollDetection
     */
    hasErrorCallback(){
        if (this.callbacks.hasOwnProperty('error') && this.callbacks.error.hasOwnProperty('function')) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Set the HTML Element to do ScrollDetection.
     * @param {HTMLElement|Null} html Html Element to do the ScrollDetection.
     * @memberof ScrollDetection
     */
    setHTML(html = null){
        if (html) {
            this.html = html;
        } else {
            this.html = null;
        }
    }

    /**
     * * Detect the scrollbar event & execute the callbacks.
     * @memberof ScrollDetection
     */
    detect(){
        let instance = this,
            toScroll = window,
            scrollPosition;
        if(instance.getDirection() == 'X'){
            scrollPosition = 'scrollX';
        }else if(instance.getDirection() == 'Y'){
            scrollPosition = 'scrollY';
        }
        let previousPosition = 0;
        if(this.html){
            toScroll = this.html;
            if(instance.getDirection() == 'X'){
                scrollPosition = 'scrollLeft';
            }else if(instance.getDirection() == 'Y'){
                scrollPosition = 'scrollTop';
            }
        }
        toScroll.addEventListener('scroll', function(e){
            let scroll = this[scrollPosition];
            if (previousPosition == 0) {
                previousPosition = scroll;
            }
            instance.comparatePositions(previousPosition, scroll);
            previousPosition = scroll;
            if(scroll >= instance.getLocation().min && scroll <= instance.getLocation().max){
                ScrollDetection.execute(instance, true);
            }else{
                ScrollDetection.execute(instance, false);
            }
        });
    }

    /**
     * * Check where the scrollbar is heading.
     * @param {Number} previousPosition Scrollbar previous position.
     * @param {Number} newPosition Scrollbar new position.
     * @memberof ScrollDetection
     */
    comparatePositions(previousPosition, newPosition){
        if (previousPosition > newPosition) {
            this.properties.direction.scrolledTo = true;
        } else if(previousPosition < newPosition) {
            this.properties.direction.scrolledTo = false;
        } else {
            this.properties.direction.scrolledTo = null;
        }
    }

    /**
     * * Executte the callback function.
     * @param {ScrollDetection} instance ScrollDetection instance.
     * @param {Boolean} bool Callback to execute.
     * @memberof ScrollDetection
     */
    static execute(instance, bool){
        let params;
        if (bool) {
            if (instance.hasSuccessCallback()) {
                params = instance.getSuccess().params;
                params.scrolldetection = instance;
                instance.getSuccess().function(params);
            }
        } else {
            if (instance.hasErrorCallback()) {
                params = instance.getError().params;
                params.scrolldetection = instance;
                instance.getError().function(params);
            }
        }
    }

    /**
     * * Returns the scrollbar current location.
     * @param {String} direction Scrollbar direction to scroll.
     * @returns {Number} scrollbar current locaion.
     * @memberof ScrollDetection
     */
    static currentLocation(direction = 'Y'){
        switch (direction.toUpperCase()) {
            case 'Y':
                return window.scrollY;
            case 'X':
                return window.scrollX;
        }
    }
}