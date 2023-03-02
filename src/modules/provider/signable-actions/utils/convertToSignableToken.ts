import { TokenAmount, SignableToken } from "src/types"

/**
 * Helper method to convert token type to a SignableToken type
 * @param token - the token type to convert to a SignableToken type
 * @returns the converted SignableToken
 */
export function convertToSignableToken(token: TokenAmount): SignableToken {
  switch (token.type) {
    case 'ERC721':
      return {
        type: 'ERC721',
        data: {
          token_id: token.tokenId,
          token_address: token.tokenAddress,
        },
      };
    case 'ERC20':
      return {
        type: 'ERC20',
        data: {
          token_address: token.tokenAddress,
        },
      };
    case 'ETH':
      return {
        type: 'ETH',
        data: {
          decimals: 18,
        },
      };
  }
}
