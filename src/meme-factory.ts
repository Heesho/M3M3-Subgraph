import {
  MemeFactory__MemeCreated as MemeFactory__MemeCreatedEvent,
  MemeFactory__TreasuryUpdated as MemeFactory__TreasuryUpdatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/MemeFactory/MemeFactory"
import {
  MemeFactory__MemeCreated,
  MemeFactory__TreasuryUpdated,
  OwnershipTransferred
} from "../generated/schema"

export function handleMemeFactory__MemeCreated(
  event: MemeFactory__MemeCreatedEvent
): void {
  let entity = new MemeFactory__MemeCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.index = event.params.index
  entity.meme = event.params.meme

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMemeFactory__TreasuryUpdated(
  event: MemeFactory__TreasuryUpdatedEvent
): void {
  let entity = new MemeFactory__TreasuryUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.treasury = event.params.treasury

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
