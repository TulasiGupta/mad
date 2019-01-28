
function reducer(state={
                        events:[], 
                        timeInterval:[], 
                        infoCount: 0, 
                        warnCount: 0, 
                        errorCount: 0}, 
                    action) {
    console.log("actiontype ", action.type)
    switch(action.type){
        case 'fetched':
         console.log("in reducer..");
         console.log(state.events)
            return {
                events: action.events,
                timeInterval: state.timeInterval,
                infoCount: state.infoCount,
                warnCount: state.warnCount,
                errorCount: state.errorCount
            }
        case 'actionTimeInterval':
            console.log("in action time ", state, action.timeInterval)
            return {
                events: state.events,
                timeInterval: action.timeInterval,
                infoCount: state.infoCount,
                warnCount: state.warnCount,
                errorCount: state.errorCount
            }        
        case 'fetchEventsCount':
            console.log("in fetchEventsCount reducer")
            return {
                events: state.events,
                timeInterval: state.timeInterval,
                infoCount: action.eventsCount[1].INFO,
                warnCount: action.eventsCount[2].WARNING,
                errorCount: action.eventsCount[0].ERROR
            }
        default:
            return state;
    }
}

export default reducer;