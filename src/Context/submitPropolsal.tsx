"use client"

import { AccountId, Categories } from '@/lib/PhalaContract/Types/types';
import React, {createContext, useState, ReactNode, useContext} from 'react';

export type tldr = {
  account: AccountId,
  projectType: Categories[],
  teamName: string,
  track: string,
  contact: string,
  propolsalName: string,
  recieveDate: string,
  startingDate: string,
  fundingAmount: number,
  exchangeRate: number,
  deadLine: string,
  shortDescription: string,
  whyDifferentDescription: string,
  externalLinks: string,
};

export type context = {
  howDidItComeToMind: string,
  howDoesItHelp: string,
  goal: string,
  whyKSM: string,
}

type problemSolution = {
  problem: string
}

export type submitContext = {

    proposalStep?: number,
    proposalIndex?: number,
    setProposalIndex: (index:number) => void,
    changeToStep: (number:number) => void,
    tldr?: tldr,
    context?: context,
    problemSolution?: problemSolution,
    readyToSubmit:boolean,
    setReadyToSubmit:(v:boolean) => void,
    changeTLDR: (tldr:tldr) => void,
    changeContext: (changeCtx: context) => void,
    changeProblemSolution: (problem: problemSolution) => void

}

const defaultState = {
  proposalStep: undefined,
  proposalIndex: undefined,
  setProposalIndex: (index:number) => {return},
  changeToStep: (number:number) => {return},
  tldr: undefined ,
  context: undefined,
  problemSolution: undefined,
  readyToSubmit:false,
  setReadyToSubmit:(v:boolean) => {return},
  changeTLDR: (tldr:tldr) => {return},
  changeContext: (changeCtx: context) => {return},
  changeProblemSolution: (problem: problemSolution) => {return}
}

type Props = {
  children: ReactNode;
};

const ProposalContext = createContext<submitContext>(defaultState);

export const ProposalContextProvider =({ children }: Props)=> {
  const [step, setStep] = useState<number>(1);
  const [proposalIndex, setProposalIndex] = useState<number>()
  const [tldr, setTldr] = useState<tldr>()
  const [propolsalContext, setPropolsalContext] = useState<context>();
  const [propolsalProblemSolution, setPropolsalProblemSolution] = useState<problemSolution>();
  const [readyToSubmit,setReadyToSubmit] = useState<boolean>(false);

  const changeTLDR = (itemToChange:tldr) => {
    setTldr({ ...tldr, ...itemToChange });
  };

  const changeContext = (itemToChange:context) => {
    setPropolsalContext({ ...propolsalContext, ...itemToChange });
  };

  const changeProblemSolution = (itemToChange:problemSolution) => {
    setPropolsalProblemSolution({ ...propolsalProblemSolution, ...itemToChange });
  };

  function changeStepHandler(num:number) {
    setStep(num);
  }

  const setPropIndex = (index:number) =>{
    setProposalIndex(index)
  }

  const context = {
    propolsalStep: step,
    proposalIndex,
    setProposalIndex: setPropIndex,
    changeToStep: changeStepHandler,
    tldr: tldr,
    changeTLDR: changeTLDR,
    context: propolsalContext,
    problemSolution: propolsalProblemSolution,
    readyToSubmit,setReadyToSubmit,
    changeProblemSolution: changeProblemSolution,
    changeContext,
  };

  return (
    <ProposalContext.Provider value={context}>
      {children}
    </ProposalContext.Provider>
  );
}

export const useProposalContext =()=> useContext(ProposalContext);
