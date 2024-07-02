import { useReadContract, useWriteContract } from 'wagmi'
import { NFT_ADDRESS, NFT_MARKET_ADDRESS } from "./config";
import NFT_MARKET_ABI from "./abi/NFTMarket.json";

function NFTMarket() {

	interface listedNFTs {
		// nftAddress: string;
		// tokenId: bigint;
		price: bigint;
		seller: string;
	}

	const { data: listedNFTs } = useReadContract({
		abi: NFT_MARKET_ABI, 
		address: NFT_MARKET_ADDRESS,
		functionName: 'isNFTListed',
	}) as { data: listedNFTs[] | undefined }
	
	const { writeContract } = useWriteContract()

	const handleBuyNFT = (tokenId: string) => {
		writeContract({
			abi: NFT_MARKET_ABI, 
			address: NFT_MARKET_ADDRESS,
			functionName: 'buyNFT',
			args: [
				NFT_ADDRESS, 
				tokenId
			],
		})
	}

	return (
		<div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
			<h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">NFT Listing</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{listedNFTs?.map((nft: any, index: number) => (
				<div key={index} className="bg-gray-100 rounded-lg p-4 shadow">
					<p className="text-sm text-gray-600">NFT 合约地址: {nft.nftAddress}</p>
					<p className="text-sm text-gray-600">Token ID: {nft.tokenId.toString()}</p>
					<p className="text-lg font-semibold text-gray-800">价格: {nft.price.toString()} ERC20 代币</p>
					<p className="text-sm text-gray-600">Seller: {nft.seller}</p>
					<button
					onClick={() => handleBuyNFT(nft.tokenId)}
					className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
					Buy
					</button>
				</div>
				))}
			</div>
		</div>
	)
}

export default NFTMarket