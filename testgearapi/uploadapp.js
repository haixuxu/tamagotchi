import fs from "fs";
import { GearKeyring, GearApi, ProgramMetadata } from "@gear-js/api";
import { resolve } from "./utils.js";

const keyring = await GearKeyring.fromSuri("//Alice");

const code = fs.readFileSync(resolve("tmg.opt.wasm"));
const gearApi = await GearApi.create({ providerAddress: "wss://testnet.vara.network" });



// const somePayload = {
//   name: "haixuxu_tmg",
//   symbol: "BBK47"
// }

const program = {
  code,
  gasLimit: 1000_000,
  value: 1000_000_000_000,
  initPayload: '0x',
};

try {
  const meta = ProgramMetadata.from("0x" + fs.readFileSync(resolve("tmg.meta.txt")));
  const { programId, salt, submitted } = await gearApi.program.upload(program, meta);
  console.log("programId====", programId);
  console.log("salt====", salt);
  console.log("submitted====", submitted);
} catch (error) {
  console.log(error);
  console.error(`${error.name}: ${error.message}`);
}

try {
  await gearApi.program.signAndSend(keyring, (event) => {
    console.log(event.toHuman());
  });
} catch (error) {
  console.error(`${error.name}: ${error.message}`);
}
