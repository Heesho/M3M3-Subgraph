import {
  MemeFactory__MemeCreated as MemeFactory__MemeCreatedEvent,
  MemeFactory__TreasuryUpdated as MemeFactory__TreasuryUpdatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/MemeFactory/MemeFactory";
import { Directory } from "../generated/schema";
import { BigInt, Address } from "@graphprotocol/graph-ts";
import { MemeFactory as FactoryContract } from "../generated/MemeFactory/MemeFactory";
import { FACTORY_ADDRESS } from "./helpers";

export function handleMemeFactory__MemeCreated(
  event: MemeFactory__MemeCreatedEvent
): void {
  let factory = Directory.load(FACTORY_ADDRESS);
  if (factory === null) {
    factory = new Directory(FACTORY_ADDRESS);
    factory.memeCount = 0;
    factory.transactionCount = BigInt.fromI32(0);
    factory.totalVolume = BigInt.fromI32(0);
    factory.totalLiquidity = BigInt.fromI32(0);
    let factoryContract = FactoryContract.bind(
      Address.fromString(FACTORY_ADDRESS)
    );
    factory.owner = factoryContract.owner();
    factory.treasury = factoryContract.treasury();
  }
  factory.memeCount = factory.memeCount + 1;
  factory.save();
}

export function handleMemeFactory__TreasuryUpdated(
  event: MemeFactory__TreasuryUpdatedEvent
): void {
  let factory = Directory.load(FACTORY_ADDRESS);
  let factoryContract = FactoryContract.bind(
    Address.fromString(FACTORY_ADDRESS)
  );
  if (factory === null) {
    factory = new Directory(FACTORY_ADDRESS);
    factory.memeCount = 0;
    factory.transactionCount = BigInt.fromI32(0);
    factory.totalVolume = BigInt.fromI32(0);
    factory.totalLiquidity = BigInt.fromI32(0);
    factory.owner = factoryContract.owner();
    factory.treasury = factoryContract.treasury();
  } else {
    factory.treasury = factoryContract.treasury();
  }
  factory.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let factory = Directory.load(FACTORY_ADDRESS);
  let factoryContract = FactoryContract.bind(
    Address.fromString(FACTORY_ADDRESS)
  );
  if (factory === null) {
    factory = new Directory(FACTORY_ADDRESS);
    factory.memeCount = 0;
    factory.transactionCount = BigInt.fromI32(0);
    factory.totalVolume = BigInt.fromI32(0);
    factory.totalLiquidity = BigInt.fromI32(0);
    factory.owner = factoryContract.owner();
    factory.treasury = factoryContract.treasury();
  } else {
    factory.owner = factoryContract.treasury();
  }
  factory.save();
}
