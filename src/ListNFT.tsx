import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { abi } from "./abi/NFTMarket.json";
import { abi as nft_abi } from "./abi/MomBirds.json";
import React from "react";
import { NFT_ADDRESS, NFT_MARKET_ADDRESS } from "./config";

function ListNFT() {

	const [nftAddress, setNftAddress] = useState(NFT_ADDRESS)
	const [tokenId, setTokenId] = useState('')
	const [price, setPrice] = useState('')
	const [ownedNFTs, setOwnedNFTs] = useState<number[]>([])

	const { address } = useAccount()

	// 读取用户拥有的 NFT 数量
	const { data: balanceData } = useReadContract({
		abi: nft_abi,
		address: NFT_ADDRESS,
		functionName: 'balanceOf',
		args: [address],
	})

	// 获取用户拥有的所有 NFT 的 tokenId
	useEffect(() => {
		const fetchOwnedNFTs = async () => {
			console.log(balanceData)
			if (balanceData) {
				const balance = Number(balanceData)
				const tokenIds = []
				for (let i = 0; i < balance; i++) {
					const { data: tokenId } = await useReadContract({
						abi: nft_abi, 
						address: NFT_ADDRESS,
						functionName: 'isNFTListed',
						args: [address, i],
					})
					if (tokenId) tokenIds.push(Number(tokenId))
				}
				setOwnedNFTs(tokenIds)
			}
		}
		fetchOwnedNFTs()
	}, [address, balanceData])

	const { writeContract } = useWriteContract()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		writeContract({
			abi,
			address: NFT_MARKET_ADDRESS,
			functionName: 'listNFT',
			args: [nftAddress, tokenId, (Number(price) * 10 ** 18)],
		})
	}

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
		<h2 className="text-2xl font-semibold text-gray-800 mb-4">List NFT</h2>
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
			<label htmlFor="nftAddress" className="block text-sm font-medium text-gray-700">NFT 合约地址</label>
			<input
				id="nftAddress"
				type="text"
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
				value={nftAddress}
				disabled 
				onChange={(e) => setNftAddress(e.target.value)}
			/>
			</div>
			<div>
			<label htmlFor="tokenId" className="block text-sm font-medium text-gray-700">Token ID</label>
			<select
				id="tokenId"
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
				value={tokenId}
				onChange={(e) => setTokenId(e.target.value)}
			>
				<option value="">Select Token ID</option>
				{ownedNFTs.map((id) => (
				<option key={id} value={id}>{id}</option>
				))}
			</select>
			</div>
			<div>
			<label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (FEA)</label>
			<input
				id="price"
				type="text"
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
				value={price}
				onChange={(e) => setPrice(e.target.value)}
			/>
			</div>
			<button
			type="submit"
			className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
			List NFT
			</button>
		</form>
		</div>
	)
}

export default ListNFT