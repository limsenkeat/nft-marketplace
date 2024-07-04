import { http, createConfig } from '@wagmi/core'
import { sepolia } from '@wagmi/core/chains'

export const BASE_URL = 'https://sepolia.etherscan.io/tx/';

export const TOKEN_ADDRESS = '0x1c77D69E8B6822Db7faE1D08D43d6786014Cc132';
export const NFT_ADDRESS = '0xe7cEeCe6fe81f95840A406B0bb4f8dBe1eE0524d';
export const NFT_MARKET_ADDRESS = '0xB905F0dBA16c603fA8ea35883F5FbcF5A24e7A1b';

export const config = createConfig({
    chains: [sepolia],
    transports: {
        [sepolia.id]: http(),
    },
})