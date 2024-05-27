import fs from "fs";
import { GearKeyring, GearApi, ProgramMetadata } from "@gear-js/api";
import { resolveOut, getKeyring, timeoutPromise } from "./utils.js";

const gearApi = await GearApi.create({ providerAddress: "wss://testnet.vara.network" });

// const unsub = await gearApi.query.system.events((events) => {
//     console.log(events.toHuman());
//   });
//   // Unsubscribe
//   unsub();

// const unsub = await gearApi.gearEvents.subscribeToTransferEvents(({ data: { from, to, amount } }) => {
//   console.log(`
//       Transfer balance:
//       from: ${from.toHex()}
//       to: ${to.toHex()}
//       amount: ${+amount.toString()}
//       `);
// });
// Unsubscribe
// unsub();

const unsub2 = await gearApi.gearEvents.subscribeToNewBlocks((header) => {
  console.log(`New block with number: ${header.number.toNumber()} and hash: ${header.hash.toHex()}`);
});
// Unsubscribe
// unsub2();

const unsub5 =await gearApi.gearEvents.subscribeToGearEvent(
    'UserMessageSent',
    ({
      data: {
        message: { id, source, destination, payload, value, reply },
      },
    }) => {
      console.log(`
    messageId: ${id.toHex()}
    source: ${source.toHex()}
    payload: ${payload.toHuman()}
    `);
    },
  );


const unsub3 = gearApi.gearEvents.subscribeToGearEvent(
    'MessageQueued',
    ({ data: { id, source, destination, entry } }) => {
      console.log({
        messageId: id.toHex(),
        programId: destination.toHex(),
        userId: source.toHex(),
        // entry: entry.isInit
        //   ? entry.asInit
        //   : entry.isHandle
        //   ? entry.asHandle
        //   : entry.asReply,
      });
    },
  );