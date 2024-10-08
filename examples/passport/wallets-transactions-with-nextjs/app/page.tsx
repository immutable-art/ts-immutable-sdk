'use client';
import { Button, Heading } from '@biom3/react';
import NextLink from 'next/link';

export default function Home() {
  return (<>
      <Heading 
      size="medium" 
      className="mb-1">
        Passport Send Transaction Examples
      </Heading>
      <Button       
      className="mb-1"
      size="medium" 
      rc={<NextLink href="/send-erc721-with-etherjs" />}>
        Send ERC-721 with EtherJS
      </Button> 
  </>);
}
