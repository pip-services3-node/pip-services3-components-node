"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Callback object returned by {@link ICounters.beginTiming} to end timing
 * of execution block and update the associated counter.
 *
 * ### Example ###
 *
 *     let timing = counters.beginTiming("mymethod.exec_time");
 *     try {
 *         ...
 *     } finally {
 *         timing.endTiming();
 *     }
 *
 */
class Timing {
    /**
     * Creates a new instance of the timing callback object.
     *
     * @param counter 		an associated counter name
     * @param callback 		a callback that shall be called when endTiming is called.
     */
    constructor(counter = null, callback = null) {
        this._counter = counter;
        this._callback = callback;
        this._start = new Date().getTime();
    }
    /**
     * Ends timing of an execution block, calculates elapsed time
     * and updates the associated counter.
     */
    endTiming() {
        if (this._callback != null) {
            let elapsed = new Date().getTime() - this._start;
            this._callback.endTiming(this._counter, elapsed);
        }
    }
}
exports.Timing = Timing;
//# sourceMappingURL=Timing.js.map