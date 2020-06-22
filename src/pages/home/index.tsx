import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from '../../redux/reducers/rootReducers';
import { getAccounts } from '../../redux/fetch/fetchAccounts';
import { convertRate } from '../../redux/fetch/fetchAccounts';
import { Table } from 'antd';
import "react-svg-map/lib/index.css";
import Loading from "../../components/loading";

interface Props {
}

const Home: React.FC<Props> = () => {
    const accounts = useSelector((state: AppState) => state.accounts?.accounts);
    const loading = useSelector((state: AppState) => state.accounts?.loading);

    const dispatch = useDispatch();

    const [solde, setSolde] = useState(0); // set solde 0 as default
    const [accountsState, setAccountsState] = useState(); // set solde 0 as default
    
    useEffect(() => {
      dispatch(getAccounts(dispatch));
    }, []);
    
    useEffect(() => {
        setAccountsState(accounts);
        accounts?.map(async (account: any, index: number) => {
            await convertRate(account?.currency, 'EUR').then((val) => {
                setSolde(solde + (account.amount * val));
            });
        });
    },[accounts]) // set the relation between redux accounts and local state
    
    /* Columns for the antd table */
    const columns = [
        {
            title: 'Account name',
            dataIndex: 'tag',
        },
        {
            title: 'Account code',
            dataIndex: 'accountNumber',
        },
        {
            title: ' BIC of the bank',
            dataIndex: 'holderBank',
            render: (holderBank:any) => <p>{holderBank.bic}</p>,
        },
        {
            title: 'Account currency',
            dataIndex: 'currency',
        },
        {
            title: 'Account amount',
            dataIndex: 'amount',
        },
    ];
    return (
        !loading ?
        <>
            <h1>Le solde consolidé de tout les comptes : {solde} EUR</h1>

            <Table
                columns={columns}
                dataSource={accountsState}
            />
        </> :
        <Loading />
    )
};
export default Home;