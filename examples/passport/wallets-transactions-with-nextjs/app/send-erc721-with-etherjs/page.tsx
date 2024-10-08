'use client';

import { useState } from 'react';
import { passportInstance } from '../utils/passport';
import { Button, Heading, Link, Table } from '@biom3/react';
import NextLink from 'next/link';
import { ethers, providers } from 'ethers';

export default function ConnectWithEtherJS() {
  // setup the accounts state
  const [accountsState, setAccountsState] = useState<any>([]);

  // setup the loading state to enable/disable buttons when loading
  const [loading, setLoadingState] = useState<boolean>(false);

  // fetch the Passport provider from the Passport instance
  const passportProvider = passportInstance.connectEvm();

  const passportLogin = async () => {
    // disable button while loading
    setLoadingState(true);
    // #doc passport-wallets-nextjs-connect-eip1193-request
    // calling eth_requestAccounts triggers the Passport login flow
    const accounts = await passportProvider.request({ method: 'eth_requestAccounts' });
    // #enddoc passport-wallets-nextjs-connect-eip1193-request
    // once logged in Passport is connected to the wallet and ready to transact
    setAccountsState(accounts);
    // enable button once loading finished
    setLoadingState(false);
  };

  // reset the accounts state when logout is called
  const passportLogout = async () => {
    // disable button while loading
    setLoadingState(true);
    // logout from passport
    await passportInstance.logout();
  };

  const sendTransaction = async () => {
    // disable button while loading
    setLoadingState(true);
    // send the transaction
   
    const provider = passportInstance.connectEvm();
    const web3Provider = new providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
  
    const [userAddress] = await provider.request({ method: 'eth_requestAccounts' });
    const toAddress = process.env.NEXT_PUBLIC_TO_ADDRESS ?? '0x000';
    const erc721Address = process.env.NEXT_PUBLIC_ERC721_ADDRESS ?? '0x000';
    const tokenId = process.env.NEXT_PUBLIC_TOKEN_ID ?? '0';
  
    // The Application Binary Interface (ABI) of a contract provides instructions for
    // encoding and decoding typed transaction data.
    // Read more about [ABI Formats](https://docs.ethers.org/v5/api/utils/abi/formats/).
    const abi = ['function safeTransferFrom(address from, address to, uint256 tokenId)'];
  
    // Ethers provides a helper class called `Contract` that allows us to interact with smart contracts
    // by abstracting away data-encoding using the contract ABI (definition of the contract's interface).
    const contract = new ethers.Contract(erc721Address, abi, signer);
    let tx;

    console.log('userAddress', userAddress);
    console.log('toAddress', toAddress);
    console.log('erc721Address', erc721Address);
    console.log('tokenId', tokenId);
    // Send the transaction
    try {
      tx = await contract.safeTransferFrom(userAddress, toAddress, tokenId);
    } catch (error: any) {
      // Handle user denying signature
      if (error.code === 4001) {
        console.error('user denied signature');
      } else {
        console.error('something went wrong: ', error.message);
      }
    }
  
    // Wait for the transaction to complete
    // On Immutable zkEVM, this takes 1-8 seconds in 99.9% of cases
    const receipt = await tx.wait();
  
    switch (receipt.status) {
      // Failure
      case 0:
        console.error('transaction failed', receipt);
        break;
      // Success
      case 1:
      console.log('transaction success', receipt);
        break;
      default:
        break;
    }

    // enable button once loading finished
    setLoadingState(false);
  };

  // render the view to login/logout and show the connected accounts
  return (
    <>
      <Heading className="mb-1">Send ERC-721 with EtherJS</Heading>
      {accountsState.length === 0
      ? (
        <Button       
        className="mb-1"
        size="medium" 
        onClick={passportLogin}
        disabled={loading}>
        Passport Login
      </Button> 
      ): (<>
        <Button       
        className="mb-1"
        size="medium" 
        onClick={passportLogout}
        disabled={loading}>
          Passport Logout
        </Button> 
        <Button       
        className="mb-1"
        size="medium" 
        onClick={sendTransaction}
        disabled={loading}>
          Send Transaction
        </Button> 
      </>)}
      <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Item</Table.Cell>
          <Table.Cell>Value</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell><b>Connected Account</b></Table.Cell>
          <Table.Cell>
            {accountsState.length > 0 ? accountsState[0]
            :(<span>(not&nbsp;connected)</span>)
            }
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    <br />
    <Link rc={<NextLink href="/" />}>Return to Examples</Link>
  </>
  );
}
