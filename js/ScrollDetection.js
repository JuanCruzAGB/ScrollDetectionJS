/**
 * * Controls the document scroll.
 * @export
 * @class ScrollDetection
 */
export class ScrollDetection{
    /**
     * * Creates an instance of ScrollDetection.
     * @param {object} location
     * @param {string} direction
     * @param {object} actions
     * @memberof ScrollDetection
     */
    constructor(properties = {
        location: {
            min: 0,
            max: 500,
        }, direction: 'Y',
    }, functions = {
        success: {
            functionName: function() { console.log('SUCCESS') },
            params: {},
        }, error: {
            functionName: function() { console.log('ERROR') },
            params: {},
    }, }, html = null){
        this.setProperties(properties);
        this.setFunctions(functions);
        this.setHTML(html);
        this.detect();
    }

    /**
     * * Set the ScrollDetection properties.
     * @param {object} properties - ScrollDetection properties.
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
     * * Set the ScrollDetection functions.
     * @param {object} functions - ScrollDetection functions.
     * @memberof ScrollDetection
     */
    setFunctions(functions = {
        success: {
            functionName: function() { console.log('SUCCESS') },
            params: {},
        }, error: {
            functionName: function() { console.log('ERROR') },
            params: {},
    }, }){
        this.functions = {};
        this.setSuccess(functions);
        this.setError(functions);
    }

    /**
     * * Set the ScrollDetection location to search.
     * @param {object} properties - ScrollDetection properties.
     * @memberof ScrollDetection
     */
    setLocation(properties = {
        location: {
            min: 0,
            max: 500,
        },
    }){
        this.properties.location = properties.location;
    }
    
    /**
     * * Set the ScrollDetection direction to scroll.
     * @param {object} properties - ScrollDetection properties.
     * @memberof ScrollDetection
     */
    setDirection(properties = {
        direction: 'Y',
    }){
        this.properties.direction = properties.direction.toUpperCase();
    }

    /**
     * * Set the ScrollDetection success function.
     * @param {object} functions - ScrollDetection functions.
     * @memberof ScrollDetection
     */
    setSuccess(functions = {
        success: {
            functionName: function() { console.log('SUCCESS') },
            params: {},
    }, }){
        this.functions.success = {
            functionName: functions.success.functionName,
            params: (functions.success.params && typeof functions.success.params == 'object') ? functions.success.params : {},
        };
    }

    /**
     * * Set the ScrollDetection error function.
     * @param {object} functions - ScrollDetection functions.
     * @memberof ScrollDetection
     */
    setError(functions = {
        error: {
            functionName: function() { console.log('ERROR') },
            params: {},
    }, }){
        this.functions.error = {
            functionName: functions.error.functionName,
            params: (functions.error.params && typeof functions.error.params == 'object') ? functions.error.params : {},
        };
    }

    /**
     * * Set the ScrollDetection HTML Element to detect.
     * @param {HTMLElement} html - ScrollDetection HTML Element.
     * @memberof ScrollDetection
     */
    setHTML(html = null){
        this.html = html;
    }

    /**
     * * Execute or not the action.
     * @memberof ScrollDetection
     */
    detect(){
        let instance = this,
            toScroll = window,
            scrollPosition;
        if(instance.properties.direction == 'X'){
            scrollPosition = 'scrollX';
        }else if(instance.properties.direction == 'Y'){
            scrollPosition = 'scrollY';
        }
        if(this.html){
            toScroll = this.html;
            if(instance.properties.direction == 'X'){
                scrollPosition = 'scrollLeft';
            }else if(instance.properties.direction == 'Y'){
                scrollPosition = 'scrollTop';
            }
        }
        toScroll.addEventListener('scroll', function(e){
            let scroll = this[scrollPosition];
            if(scroll >= instance.properties.location.min && scroll <= instance.properties.location.max){
                ScrollDetection.check(instance, true);
            }else{
                ScrollDetection.check(instance, false);
            }
        });
    }

    /**
     * * Check if the scroll is between the values.
     * @param {ScrollDetection} instance
     * @param {boolean} bool
     * @memberof ScrollDetection
     */
    static check(instance, bool){
        if(bool){
            instance.functions.success.functionName(instance.functions.success.params);
        }else{
            if(instance.functions.error.functionName){   
                instance.functions.error.functionName(instance.functions.error.params);
            }
        }
    }

    static currentLocation(direction = 'Y'){
        switch(direction.toUpperCase()){
            case 'Y':
                return window.scrollY;
            case 'X':
                return window.scrollX;
        }
    }
}