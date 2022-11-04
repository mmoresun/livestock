import { tickerState } from "./tickerState";

export default function reducer(state = tickerState, action) {

    switch (action.type) {

        case 'NEW_QUOTES':

            // state.length > 0 && console.log('previous: ' + state.map(item => { return ' ' + item.price }));
            // action.payload.length > 0 && console.log('actual: ' + action.payload.map(item => { return ' ' + item.price }));

            // let prevPriceArr = state.map(item => +item.price) // take only prices from previous state and convert them from string to number

            // let newPriceArr = action.payload.map(item => +item.price) take only prices from new state and convert them from string to number

            let compareArr = [] // compare prices at state and payload and add 'true' if the price increased and 'false' if decreased

            for (let i = 0; i < state.map(item => +item.price).length; ++i) {

                if (state.map(item => +item.price)[i] < action.payload.map(item => +item.price)[i]) {

                    compareArr.push(false);
                }
                else {

                    compareArr.push(true)
                }
            }            
            // https://ru.stackoverflow.com/questions/1437301/%d0%9a%d0%b0%d0%ba-%d0%b4%d0%be%d0%b1%d0%b0%d0%b2%d0%b8%d1%82%d1%8c-%d0%ba%d0%b0%d0%b6%d0%b4%d1%8b%d0%b9-%d1%8d%d0%bb%d0%b5%d0%bc%d0%b5%d0%bd%d1%82-%d0%bc%d0%b0%d1%81%d1%81%d0%b8%d0%b2%d0%b0-%d0%b2-%d0%be%d0%b1%d1%8a%d0%b5%d0%ba%d1%82-%d1%82%d0%b0%d0%ba%d0%b8%d0%bc-%d0%be%d0%b1%d1%80%d0%b0%d0%b7%d0%be%d0%bc

            // add to every action.payload object one more key 'isIncreased' with value from compareArr

            for (let element in action.payload) {
                action.payload[element]['isIncreased'] = compareArr[element]
            }

            return action.payload

        default:

            return state;
    }
}