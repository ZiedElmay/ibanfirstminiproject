export interface IGetSoldeAction {
    readonly type: 'GET_SOLDE';
    payload: string;
}
export type SoldeActions =
| IGetSoldeAction