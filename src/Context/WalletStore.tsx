'use client';

import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { AccountId } from "@polkadot/types/interfaces";
import { Signer } from "@polkadot/types/types";
import { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode } from "react";

type Props = {
    children: ReactNode
}

// Wallet Context
interface WalletInfo {
    account?: InjectedAccountWithMeta;
    setAccount: Dispatch<InjectedAccountWithMeta>;
    accounts?:Array<AccountId>;
    setAccounts: Dispatch<AccountId[]>;
    signer?: Signer;
    setSigner: Dispatch<Signer>
}

// Add Account caching

const defaultStateWallet:WalletInfo = {
    account: undefined,
    setAccount: (account:InjectedAccountWithMeta) =>{return },
    accounts: undefined,
    setAccounts:(accs:AccountId[]) =>{return},
    signer: undefined,
    setSigner: (signer:Signer) => {return}
}

const WalletContext = createContext<WalletInfo>(defaultStateWallet);

export const WalletContextProvider = ({children}:Props) =>{
    const [account, setAccount] = useState<InjectedAccountWithMeta>();
    const [signer, setSigner] = useState<Signer>();
    const [accounts, setAccounts] = useState<AccountId[]>([]);

    return (
        <WalletContext.Provider value={{account,setAccount,accounts,setAccounts,signer,setSigner}}>
            {children}
        </WalletContext.Provider>
    )
};

export const useWalletContext = () => useContext(WalletContext);
