import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from '../../redux/reducers/rootReducers';
import { getAccounts } from '../../redux/fetch/fetchAccounts';
import { convertRate } from '../../redux/fetch/fetchAccounts';
import { Table } from 'antd';
import { RadioSVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import World from "@svg-maps/world";
import Loading from "../../components/loading";

interface Props {
}

const FilterMap: React.FC<Props> = () => {
    const accounts = useSelector((state: AppState) => state.accounts?.accounts);
    const loading = useSelector((state: AppState) => state.accounts?.loading);

    const dispatch = useDispatch();

    const [solde, setSolde] = useState(0); // set solde 0 as default
    const [accountsState, setAccountsState] = useState(); // set solde 0 as default
    
    const setFilter = (countryId: string) => {
        const newaccountsState = accounts?.filter((account: any, index: number) => {
            return account.holder.address.country.toUpperCase() === countryId.toUpperCase();
        });
        setAccountsState(newaccountsState);
    }

    const resetFilter = () => {
        setAccountsState(accounts);
    }

    useEffect(() => {
      dispatch(getAccounts(dispatch));
    }, []);
    
    useEffect(() => {
        setAccountsState(accounts);
        accounts?.map(async (account: any, index: number) => {
            await convertRate(account?.currency, 'EUR').then((val) => {
                setSolde(solde + (account.amount * val));
                return index;
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
            <p>Click on country to filter</p>
            <RadioSVGMap  map={World} onChange={(selectedLocation: any)=>{setFilter(selectedLocation.id)}}/>
            <button onClick={() => {resetFilter()}}>Reset Map Filter</button>
        </> :
        <Loading />
    )
};
export default FilterMap;