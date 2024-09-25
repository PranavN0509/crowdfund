'use client'
import React, { useState, useEffect } from "react";
import { client } from "@/app/client";
import { useParams } from "next/navigation";
import { getContract, prepareContractCall, ThirdwebContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { lightTheme, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";


const page = () => {

  let isOwnerViewing = false;
  const account = useActiveAccount();
  const { campaignAddress } = useParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [isOwnerViewing, setIsOwnerViewing] = useState<boolean>(false);

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
  
  const { data: name, isLoading: isLoadingName } = useReadContract({
    contract: contract,
    method: "function name() view returns (string)",
    params: [],
  });
  
  if(account?.address === owner){
    isOwnerViewing = true

  }else{
    isOwnerViewing = false
  }
  console.log("Hello",isOwnerViewing);
  
  

  
  return (


    <>
      {/* Contributions received */}
      <div className="bg-gray-100 w-full h-full m-auto p-8">

        <div className="flex items-center justify-between pb-6">
          <div>
            <h1 className="text-2xl text-gray-600 font-semibold">Withdrawl Request for {name}</h1>
            <span className="mt-2 text-base">Milestones achieved</span>
          </div>
          <div className="flex items-center justify-between">
            {isOwnerViewing ?  
            (<div className="lg:ml-40 ml-10 space-x-8">
              <button className="bg-blue-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" onClick={() => { setIsModalOpen(true) }}>Add Withdrawl Request</button>
              {/* <button className="bg-blue-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button> */}
            </div>): (<></>)
            }
          </div>
        </div>

        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Receipent Wallet Address
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Approval Count
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Approve
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            1
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt="" />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Vera Carpenter
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Jan 21, 2020
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        43
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button className="bg-green-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Approve</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            1
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt="" />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Vera Carpenter
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Jan 21, 2020
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        43
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button className="bg-green-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Approve</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>


      {isModalOpen && (
        <CreateCampaignModal
          setIsModalOpen={setIsModalOpen}

        />
      )}
    </>
  )
};

export default page;



type CreateCampaignModalProps = {
  setIsModalOpen: (value: boolean) => void
}


const CreateCampaignModal = (
  { setIsModalOpen, }: CreateCampaignModalProps
) => {
  const account = useActiveAccount();
  const [isDeployingContract, setIsDeployingContract] = useState<boolean>(false);
  const [requestName, setrequestName] = useState<string>("");
  const [requestDescription, setrequestDescription] = useState<string>("");
  const [requestAmount, setrequestAmount] = useState<number>(1);
  const [campaignImageBefore, setCampaignImageBefore] = useState<string>("");


  const handleAddWithdrawRequest = async () => { }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center backdrop-blur-md">
      <div className="w-1/2 bg-slate-100 p-6 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Create a Milestone</p>
          <button
            className="text-sm px-4 py-2 bg-slate-600 text-white rounded-md"
            onClick={() => setIsModalOpen(false)}
          >Close</button>
        </div>
        <div className="flex flex-col">
          <label>Milestone Title:</label>
          <input
            type="text"
            value={requestName}
            onChange={(e) => setrequestName(e.target.value)}
            placeholder="Milestone Title"
            className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
          />

          <label>Milestone Description:</label>
          <textarea
            value={requestDescription}
            onChange={(e) => setrequestDescription(e.target.value)}
            placeholder="Milestone Description"
            className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
          ></textarea>

          <label>Request Amount:</label>
          <input
            type="number"
            value={requestAmount}
            onChange={(e) => setrequestAmount(parseInt(e.target.value))}
            className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
          />

          <label>Milestone Images:</label>
          <input
            type="file"
            value={campaignImageBefore}
            onChange={(e) => { }}
            className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
          />


          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleAddWithdrawRequest}
          >
            {isDeployingContract ? "Creating Request..." : "Create Milestone Request"}
          </button>

        </div>
      </div>
    </div>
  )
}
