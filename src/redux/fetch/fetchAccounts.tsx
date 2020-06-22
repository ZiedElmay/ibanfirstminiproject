import axios from 'axios';
import { Dispatch } from "react";
import Config from '../../Config';

export const getAccounts = (dispatch: Dispatch<any>) => {
    return (dispatch: Dispatch<any>) => {
        dispatch({type: "FETCH_ACCOUNTS_START"});
        
        axios.get(`${Config.apiUrl}/accounts/`)
        .then((res: any) => {
            const accounts = res.data?.accounts;
            dispatch({
                type: "FETCH_ACCOUNTS_SUCCESS",
                payload: accounts
            });
        }).catch((response) => {
            dispatch({
                type: "FETCH_ACCOUNTS_ERROR",
                payload: response
            });
        })
    };
};

export function convertRate(from: any, to: string):Promise<any> {
    return axios.get(`${Config.apiUrl}/?instrument=${from}${to}`)
        .then((res: any) => {
            return res.data;
        })
};