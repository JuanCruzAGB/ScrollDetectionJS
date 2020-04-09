/**
 * Detect the scroll bar from a webpage, and execute his correct function.
 * @class ScrollDetection
 */
class ScrollDetection{
    /**
     * Creates an instance of ScrollDetection.
     * @param {object} location
     * @param {string} direction
     * @param {object} actions
     * @memberof ScrollDetection
     */
    constructor(location, direction, actions){
        this.location = location;
        this.direction = direction;
        this.actions = actions;
        this.detect();
    }
    /**
     * Execute or not the action.
     * @memberof ScrollDetection
     */
    detect(){
        let instance = this;
        window.addEventListener('scroll', function(event){
            let scroll;
            if(instance.direction == 'X'){
                scroll = this.scrollX;
            }else if(instance.direction == 'Y'){
                scroll = this.scrollY;
            }
            if(scroll >= instance.location.min && scroll <= instance.location.max){
                ScrollDetection.check(instance, true);
            }else{
                ScrollDetection.check(instance, false);
            }
        });
    }
    /**
     * Check if the scroll is between the values.
     * @param {ScrollDetection} instance
     * @param {boolean} bool
     * @memberof ScrollDetection
     */
    static check(instance, bool){
        if(bool){
            instance.actions.success();
        }else{
            if(instance.actions.error){   
                instance.actions.error();
            }
        }
    }
}