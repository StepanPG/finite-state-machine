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
      this.currentState = {
        name: this.config.initial,
        index: 0,
      };
      this._history = [{
        name: this.config.initial,
        index: 0,
      }];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.currentState.name;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      let newState = {};

      for(let stateName in this.config.states){
        if(stateName == state){
          newState.name = state;
          newState.index = this._history.length;
          this._history.push(newState);
          this.currentState = newState;
          return;
        }
      }
      throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      for(let transition in this.config.states[this.currentState.name].transitions){
        if(event == transition){
          this.changeState(this.config.states[this.currentState.name].transitions[transition]);
          return;
        }
      }
      throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.currentState.name = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      let allStates = [],
          statesWithEvent = [];

      for(let state in this.config.states){
        for(let transition in this.config.states[state].transitions){

          if(event == transition){
            statesWithEvent.push(state);
          }

        }
        allStates.push(state);
      }

      if(!event){
        return allStates;
      } else {
        return statesWithEvent;
      }

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if(this._history.length == 0 || this._history.length == 1 || this.currentState.index == this._history[0].index){
        return false;
      } else {
        for(let i = 0; i <= this._history.length; i++){
          if(this.currentState.index == this._history[i].index){
            this.currentState = this._history[i - 1];
            return true;
          }
        }
      }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if(this._history.length == 0 || this._history.length == 1 || this.currentState.index == this._history[this._history.length - 1].index){
        return false;
      } else {
        for(let i = 0; i <= this._history.length; i++){
          if(this.currentState.index == this._history[i].index){
            this.currentState = this._history[i + 1];
            return true;
          }
        }
      }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this._history = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
