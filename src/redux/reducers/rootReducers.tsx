import { combineReducers } from 'redux'
import AccountsReducer from './accountReducers'
import SoldesReducer from './soldeReducers';
const rootReducer = combineReducers({
    accounts: AccountsReducer,
    solde: SoldesReducer,
})
export type AppState = ReturnType<typeof rootReducer>
export default rootReducer;