import { AccountProps } from '../../interfaces';

export interface IGetAccountStartAction {
    readonly type: 'FETCH_ACCOUNTS_START';
}
export interface IGetAccountSuccessAction {
    readonly type: 'FETCH_ACCOUNTS_SUCCESS';
    payload: Array<AccountProps>;
}
export interface IGetAccountErrorAction {
    readonly type: 'FETCH_ACCOUNTS_ERROR';
    payload: Array<AccountProps>;
}

export type AccountsActions =
| IGetAccountStartAction
| IGetAccountSuccessAction
| IGetAccountErrorAction
