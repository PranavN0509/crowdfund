import React, { useState, useEffect } from "react";
import { client } from "@/app/client";
import { useParams } from "next/navigation";
import { getContract, prepareContractCall, ThirdwebContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { lightTheme, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";


const account = useActiveAccount();
const { campaignAddress } = useParams();

const contract = getContract({
    client: client,
    chain: baseSepolia,
    address: campaignAddress as string,
});


const { data: owner, isLoading: isLoadingOwner } = useReadContract({
    contract: contract,
    method: "function owner() view returns (address)",
    params: [],
});

export const ownerOfCampaign = () =>{
    if(account?.address===owner){
        return "Hello"
    }
    else{
        return "Bye"
    }
}