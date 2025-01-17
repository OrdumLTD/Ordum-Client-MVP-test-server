'use client'


import Link from "next/link";
import Image from "next/image";

import circle from "@/assets/svg-icons/circle-plus.svg";
import { Mail, GitHub } from "react-feather";
import Discord from "../../assets/svg-icons/discord.svg";
import Twitter from "../../assets/svg-icons/twitter-icon.svg";
import Matrix from "../../assets/svg-icons/matrix.png";
import Website from "../../assets/svg-icons/global.png";
import { useProfileContext } from "@/Context/ProfileStore";
import { useChainApiContext } from "@/Context/ChainApiStore";
import { usePhalaContractContext } from "@/Context/PhalaContractApiStore";
import { useEffect } from "react";
import ConnectWallet from "@/Components/ConnectWallet/page";
import { onSignCertificate } from "@/lib/PhalaContract/Utils/phalaCertificate";
import { useWalletContext } from "@/Context/WalletStore";

const ChooseProfileStep2 = () => {
   //Context
   const {profileData, setProfile} = useProfileContext()
   const {teamType, teamName, userType} = profileData
   
   const {fetchPoc5Api,poc5} = useChainApiContext()
   const {loadContractApi, contractApi,setCertificate,cache} = usePhalaContractContext();
   const {account,signer} = useWalletContext()

   useEffect(()=>{
       if(poc5){
           if(contractApi){
               
           }else{
               loadContractApi()
           }
       }else{
           fetchPoc5Api();
           loadContractApi()
       }
       
   })

   const handleIndividual =async()=>{
      if(poc5 && signer && account){
        const certData =await onSignCertificate(
          poc5,
          signer,
          account
        );
        setCertificate(certData);
        //@ts-ignore
        setProfile({teamType:"Individual"})
      }else{
        console.log("Failing to sign certificate due to missing params")
      }
   }

   const handleTeam =async()=>{
    if(poc5 && signer && account){
      const certData =await onSignCertificate(
        poc5,
        signer,
        account
      );
      setCertificate(certData);
      //@ts-ignore
      setProfile({teamType:"Foundation"})
    }else{
      console.log("Failing to sign certificate due to missing params")
    }
 }


  return (
    <div className="grid h-screen place-items-center text-sm sm:text-base bg-[url('/background/grain-cover.png')] bg-cover text-sm md:text-base">
      <div className="border border-2 border-white backdrop-blur-md rounded-lg p-5 xl:p-16 w-7/12 xl:w-6/12 2xl:w-5/12 grid">
        <div className="grid place-items-center text-white">
          <div className="justify-self-start font-medium">
            Are you a team or an individual
          </div>
          <div
            className="
            justify-self-start
            w-full
            border border-1 border-white rounded-full shadow-xl
            backdrop-blur-xl bg-white/20
            mt-5 p-4
            text-xs sm:text-base
            flex justify-around gap-2"
          >
            <Link href="/signup/createteam">
              <button
              //@ts-ignore
              onClick={() => handleTeam()}
               className="w-[5rem] sm:w-[7rem] md:w-[12rem] lg:w-[16rem] 2xl:w-[18rem] rounded-full py-2.5 md:py-4 bg-[#467EEE] hover:bg-blue-700 shadow-md hover:shadow-2xl font-semibold">
                Team
              </button>
            </Link>
            <Link href="/signup/createindividual">
            <button
             //@ts-ignore
             onClick={() => handleIndividual()}
             className="w-[5rem] sm:w-[7rem] md:w-[12rem] lg:w-[16rem] 2xl:w-[18rem] rounded-full py-2.5 md:py-4 bg-[#0A1D47] hover:bg-purple-700 shadow-md hover:shadow-2xl font-semibold"
             >
              Indvidual
            </button>
            </Link>
          </div>
          <ConnectWallet/>
          <div
            className="mt-10
          w-full
           flex flex-col gap-4"
          >
            <Link href={"/createprofile"}>
            <button
             className="rounded-full py-2.5 md:py-3 bg-ordum-purple font-semibold shadow-md shadow-md hover:shadow-2xl">
              Back
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseProfileStep2;
