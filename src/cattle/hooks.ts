import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";

import { useSigner } from "core/hooks/ethereum";
import { abi as CattleFactoryABI } from "contracts/CattleFactory.json";
import { abi as CattleABI } from "contracts/Cattle.json";
import {
  CattleFactoryContractAddress,
  CattleContractAddress,
} from "config/contracts";
import { Cattle } from "./interfaces";
import { JsonRpcSigner } from "@ethersproject/providers";

export function useCattleFactoryContract() {
  const signer = useSigner();
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    console.log("useCattleFactoryContract[useEffect]");
    if (signer) {
      const CattleFactory = new ethers.Contract(
        CattleFactoryContractAddress,
        CattleFactoryABI,
        signer
      );

      CattleFactory.deployed().then((_contract) => {
        setContract(_contract);
      });
    }
  }, [signer]);

  return contract;
}

export function useCattleContract() {
  const signer = useSigner();
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    if (signer) {
      const CattleFactory = new ethers.Contract(
        CattleContractAddress,
        CattleABI,
        signer
      );

      CattleFactory.deployed().then((_contract) => {
        setContract(_contract);
      });
    }
  }, [signer]);

  return contract;
}

export function useCattleList() {
  const factory = useCattleFactoryContract();
  const signer = useSigner();
  const [cattles, setCattles] = useState<Cattle[]>([]);

  useEffect(() => {
    console.log("useCattleList[useEffect]");

    async function fetchFactory(
      factory: ethers.Contract,
      signer: JsonRpcSigner
    ) {
      console.log("useCattleList[useEffect][fetchFactory]");
      const data: string[] = await factory.find(10, 1);
      console.log("data", data);

      const models: Cattle[] = [];

      for (const _address of data) {
        const Model = new ethers.Contract(_address, CattleABI, signer);

        const _cattle = await Model.deployed();

        models.push({
          address: _address,
          name: await _cattle.name(),
          description: await _cattle.description(),
          token: await _cattle.token(),
          votes: ((await _cattle.votes()) as BigNumber).toNumber(),
          addVote: _cattle.addVote,
        });
      }

      setCattles(models);
    }

    let interval: any = null;

    if (factory && signer) {
      fetchFactory(factory, signer);

      interval = setInterval(() => {
        fetchFactory(factory, signer);
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [factory, signer]);

  return cattles;
}
