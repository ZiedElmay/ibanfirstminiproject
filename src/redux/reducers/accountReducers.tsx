import { AccountsActions } from "../actions/accountsActions"
import { AccountProps } from "../../interfaces"
type AccountsState = {
    loading: boolean,
    accounts: Array<AccountProps>;
}
const initialState: AccountsState = {
    loading: true,
    accounts: [],
}
const AccountsReducer = (state: AccountsState = initialState, action: AccountsActions) => {
    switch(action.type) {
        case 'FETCH_ACCOUNTS_START':
            return {
                ...state,
                loading: true,
                accounts: [],
            }
        case 'FETCH_ACCOUNTS_SUCCESS':
            return {
                ...state,
                loading: false,
                accounts: action.payload,
            }
        case 'FETCH_ACCOUNTS_ERROR':
            return {
                ...state,
                loading: false,
                accounts: action.payload,
            }
        default:
            return state;
    }
}
export default AccountsReducer;