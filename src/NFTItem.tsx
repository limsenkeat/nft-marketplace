
import { useState } from 'react';
import BuyButton from './BuyButton';

function NFTItem({ nfts: initialNfts }: { nfts: any[] }) {

    const [nfts, setNfts] = useState(initialNfts);

    const handleNFTBought = (boughtNFT: any) => {
        setNfts(prevNfts => prevNfts.filter(nft => 
            nft.contract !== boughtNFT.contract || nft.tokenId.toString() !== boughtNFT.tokenId.toString()
        ));
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-slate-600">
                    <tr className="border-b dark:border-slate-500">
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-100">NFT 合约地址</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-100">Token ID</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-100">价格</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-100">卖家</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-100">操作</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-100 dark:bg-slate-700">
                    {nfts?.map((nft: any, index: number) => (
                    <tr key={index} className="border-b dark:border-slate-500">
                        <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-200">{nft.contract}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-200">{nft.tokenId.toString()}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-200">{nft.price} $FEA</td>
                        <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-200">{nft.seller}</td>
                        <td className="px-4 py-2">
                            <BuyButton nft={ nft } onBuySuccess={handleNFTBought} />
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        // 	{nfts?.map((nft: any, index: number) => (
        // 	<div key={index} className="bg-gray-100 dark:bg-slate-600 rounded-lg p-4 shadow">
        // 		<p className="text-sm text-gray-600 dark:text-gray-100">NFT 合约地址: {nft.contract}</p>
        // 		<p className="text-sm text-gray-600 dark:text-gray-100">Token ID: {nft.tokenId.toString()}</p>
        // 		<p className="text-lg text-gray-600 dark:text-gray-100">价格: {nft.price}</p>
        // 		<p className="text-sm text-gray-600 dark:text-gray-100">Seller: {nft.seller}</p>
        // 		<BuyButton nft={nft} contractAddress={nft.nftAddress} />
        // 	</div>
        // 	))}
        // </div>
    )
}
export default NFTItem