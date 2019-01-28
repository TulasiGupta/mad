import store from '../stores/store.js';

function fetchEvents() {
    console.log("in fetch events..");
    //return fetch('../data/events1.json').then(response => response.json()).then(events => {
    return fetch('/event/v1/events').then(response => response.json()).then(events => {
        store.dispatch({
            type: 'fetched',
            events: events
        })
    })
};

function fetchTimeInterval() {
    console.log("in fetchTimeInterval")
    const timeIntervalUnits = [5, 10, 20, 30, 40, 50, 60]
    store.dispatch({
        type: 'actionTimeInterval',
        timeInterval: timeIntervalUnits
    });
};

function fetchEventsCount() {
    console.log("in fetchEventsCount")
    //return fetch('../data/eventscount.json').then(response => response.json()).then(eventsCnt => {
    return fetch('/event/v1/countbytype').then(response => response.json()).then(eventsCnt => {
        store.dispatch({
            type: 'fetchEventsCount',
            eventsCount: eventsCnt
        })
    })

}

export  {fetchEvents, fetchTimeInterval, fetchEventsCount};