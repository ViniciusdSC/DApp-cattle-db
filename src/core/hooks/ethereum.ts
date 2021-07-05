import { useWeb3React } from "@web3-react/core";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { useEffect, useState } from "react";
import { injected } from "core/connectors";

export function useEthereumProvider() {
  const provider = useWeb3React<Web3Provider>();

  const { activate, active } = provider;

  useEffect(() => {
    console.log("useEthereumProvider[useEffect]");
    if (!active) {
      activate(injected);
    }
  }, [active, activate]);

  return provider;
}

export function useSigner() {
  const { active, library, account } = useEthereumProvider();
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  useEffect(() => {
    console.log("useSigner[useEffect]");
    if (active && library && account) {
      setSigner(library.getSigner(account as string));
    }
  }, [active, library, account]);

  return signer;
}
