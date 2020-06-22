import { SoldeActions } from "../actions/soldeActions"
type SoldeState = {
    solde: string;
}
const initialState: SoldeState = {
    solde: '',
}
const SoldeReducer = (state: SoldeState = initialState, action: SoldeActions) => {
    switch(action.type) {
        case 'GET_SOLDE':
            return {
                ...state,
                solde: action.payload,
            }
        default:
            return state;
    }
}
export default SoldeReducer;