import { ConnectButton } from '@rainbow-me/rainbowkit';
import ListNFT from './listNFT';
import NFTMarket from './NFTMarket';

const App = () => {
	const isConnected = true; // Declare and initialize the 'isConnected' variable
	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 text-white">
			<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold text-center mb-8">NFT Market</h1>
			<div className="flex justify-center mb-8">
				<ConnectButton />
			</div>
			{isConnected && (
				<div className="space-y-8">
				<ListNFT />
				<NFTMarket />
				</div>
			)}
			</div>
		</div>
	);
};

export default App;
