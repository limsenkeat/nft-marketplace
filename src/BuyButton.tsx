import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { NFT_MARKET_ADDRESS } from "./config";
import NFT_MARKET_ABI from './abi/NFTMarket.json'

const BuyButton = ({ nft, onBuySuccess }: { nft: any, onBuySuccess: (nft: any) => void }) => {
    const { writeContract, data: hash, error, isPending } = useWriteContract()

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    })

    const handleBuy = () => {
        writeContract({
            address: NFT_MARKET_ADDRESS,
            abi: NFT_MARKET_ABI,
            functionName: 'buyNFT',
            args: [nft.nftAddress, nft.tokenId],
        })
    }

    let buttonText = 'Buy'
    let buttonClass = 'bg-blue-500 hover:bg-blue-600 text-white'
    if (isPending || isConfirming) {
        buttonText = 'Loading...'
        buttonClass = 'bg-yellow-500 text-white cursor-not-allowed'
    } else if (isSuccess) {
        buttonText = 'Success!'
        buttonClass = 'bg-green-500 text-white'
        onBuySuccess(nft)
    } else if (error) {
        buttonText = 'Fail'
        buttonClass = 'bg-red-500 text-white'
    }

    return (
        <button 
            onClick={handleBuy}
            disabled={isPending || isConfirming}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${buttonClass}`}
        >
            {buttonText}
        </button>
    )
}

export default BuyButton