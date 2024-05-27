import fs from "fs";
import { GearKeyring, GearApi, ProgramMetadata } from "@gear-js/api";
import { resolveOut, getKeyring, timeoutPromise } from "./utils.js";

const gearApi = await GearApi.create({ providerAddress: "wss://testnet.vara.network" });

// const meta = ProgramMetadata.from("0x" + fs.readFileSync(resolveOut("tmgbbk.meta.txt")));
while (true) {
  await timeoutPromise(1000);
  const mailbox = await gearApi.mailbox.read("0xed95f29c90bb50b2e39cc9593428a44f2e13809c1b69421a2b2629e3dfec286a");
  console.log(mailbox);
}

// 0x127f231b64ce3f948559fb8e453b73b1872f241560ebbd3658cdd7324f638270
