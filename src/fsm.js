class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if(!config){
        throw new Error('Config doesn\'t passed');
      }
      this.config = config;
      this.currentState = config.initial;
      this.allStates = config.states;
      this.history = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      for(let propName in this.allStates){
        if(propName == state){
          //TODO: update history
          this.currentState = state;
          return;
        }
      }
      throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {}

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.currentState = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
