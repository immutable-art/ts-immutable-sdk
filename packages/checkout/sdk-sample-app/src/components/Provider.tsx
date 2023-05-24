import {
  Checkout,
  ConnectionProviders,
  DefaultProviders,
  Providers,
} from '@imtbl/checkout-sdk';
import { Web3Provider } from '@ethersproject/providers';
import LoadingButton from './LoadingButton';
import { useEffect, useMemo, useState } from 'react';
import { SuccessMessage, ErrorMessage } from './messages';
import { Environment } from '@imtbl/config';
import { Box } from '@biom3/react';
import Web3 from 'web3';
import HttpProvider from 'web3';

interface ProviderProps {
  checkout: Checkout;
  provider: Web3Provider | undefined;
  setProvider: (provider: Web3Provider) => void;
}

export default function Provider(props: ProviderProps) {
  const { setProvider, checkout, provider } = props;

  const [result1, setResult1] = useState<Web3Provider>();
  const [result2, setResult2] = useState<Providers>();
  const [result3, setResult3] = useState<Providers>();

  const [error1, setError1] = useState<any>(null);
  const [error2, setError2] = useState<any>(null);
  const [error3, setError3] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(false);

  async function createMetamaskClick() {
    setError1(null);
    setLoading(true);
    try {
      const resp = await checkout.createDefaultProvider({
        providerName: DefaultProviders.METAMASK,
      });
      setProvider(resp.web3Provider);
      setResult1(resp.web3Provider);
      setLoading(false);
    } catch (err: any) {
      setError1(err);
      setLoading(false);
      console.log(err.message);
      console.log(err.type);
      console.log(err.data);
      console.log(err.stack);
    }
  }

  async function setEIPProviderClick() {
    setError2(null);
    setLoading(true);
    try {
      const eipProvider = new Web3.providers.HttpProvider('https://eth.llamarpc.com')

      const resp = await checkout.setProvider({
        name: 'metamask',
        provider: eipProvider,
      });
      // setProvider(resp.web3Provider);
      console.log(resp);
      setResult2(resp.providers);
      setLoading(false);
    } catch (err: any) {
      setError2(err);
      setLoading(false);
      console.log(err.message);
      console.log(err.type);
      console.log(err.data);
      console.log(err.stack);
    }
  }

  async function setWeb3ProviderClick() {
    setError3(null);
    setLoading(true);
    try {
      const resp = await checkout.setProvider({
        name: 'metamask',
        web3Provider: provider,
      });
      // setProvider(resp.web3Provider);
      console.log(resp);
      setResult3(resp.providers);
      setLoading(false);
    } catch (err: any) {
      setError3(err);
      setLoading(false);
      console.log(err.message);
      console.log(err.type);
      console.log(err.data);
      console.log(err.stack);
    }
  }

  useEffect(() => {
    // reset state wehn checkout changes from environment switch
    setResult1(undefined);
    setResult2(undefined);
    setResult3(undefined);
    setError1(null);
    setError2(null);
    setError3(null);
    setLoading(false);
  }, [checkout]);

  return (
    <div>
      <Box
        sx={{
          marginTop: 'base.spacing.x4',
        }}
      >
        <LoadingButton onClick={createMetamaskClick} loading={loading}>
          Create Metamask Web3Provider
        </LoadingButton>
        {result1 && !error1 && (
          <SuccessMessage>Web3Provider Created.</SuccessMessage>
        )}
        {error1 && (
          <ErrorMessage>
            {error1.message}. Check console logs for more details.
          </ErrorMessage>
        )}
      </Box>
      <Box
        sx={{
          marginTop: 'base.spacing.x4',
        }}
      >
        <LoadingButton onClick={setEIPProviderClick} loading={loading}>
          Set provider using EIP-1193 Provider
        </LoadingButton>
        {result2 && !error2 && (
          <SuccessMessage>
            <Box>Providers Set for Available Networks.</Box>
          </SuccessMessage>
        )}
        {error2 && (
          <ErrorMessage>
            {error2.message}. Check console logs for more details.
          </ErrorMessage>
        )}
      </Box>
      <Box
        sx={{
          marginTop: 'base.spacing.x4',
        }}
      >
        <LoadingButton onClick={setWeb3ProviderClick} loading={loading}>
          Set Provider using Web3Provider
        </LoadingButton>
        {result3 && !error3 && (
          <SuccessMessage>
            <Box>Providers Set for Available Networks.</Box>
          </SuccessMessage>
        )}
        {error3 && (
          <ErrorMessage>
            {error2.message}. Check console logs for more details.
          </ErrorMessage>
        )}
      </Box>
    </div>
  );
}
