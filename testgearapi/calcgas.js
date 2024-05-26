import fs from "fs";
import { GearKeyring, GearApi, ProgramMetadata } from "@gear-js/api";

import { resolve } from "./utils.js";

const code = fs.readFileSync(resolve("tmg.opt.wasm"));
const gearApi = await GearApi.create({
  providerAddress: "wss://testnet.vara.network",
});
// get init gas
const sourceId = "0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d";
const gas = await gearApi.program.calculateGas.initUpload(sourceId, code, "0x00", 0, true);
console.log(gas.toJSON());
console.log(gas.toHuman());

// // get handle gas
// const meta = ProgramMetadata.from("0x" + fs.readFileSync(resolve("tmg.meta.txt")));
// const programId = "0xa178362715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d";
// const payload = "0x00";
// const estimatedGas = await gearApi.program.calculateGas.handle(sourceId, programId, payload, 0, false, meta);
// console.log(estimatedGas.toHuman());

// // get reply gas
// const messageId = "0x518e6bc03d274aadb3454f566f634bc2b6aef9ae6faeb832c18ae8300fd72635";
// const gas2 = await gearApi.program.calculateGas.reply(sourceId, messageId, 0, "PONG", 0, true, meta);
// console.log(gas2.toHuman());
