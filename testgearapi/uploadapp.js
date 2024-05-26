import fs from "fs";
import { GearKeyring, GearApi, ProgramMetadata } from "@gear-js/api";
import { resolveOut, getKeyring, maskInput } from "./utils.js";
import rpcservice from "./rpcservice.js";

const keyring =  await getKeyring();

const code = fs.readFileSync(resolveOut("tmgbbk.opt.wasm"));
const gearApi = await GearApi.create({ providerAddress: "wss://testnet.vara.network" });

// get init gas
const sourceId = "0x127f231b64ce3f948559fb8e453b73b1872f241560ebbd3658cdd7324f638270";

// const gasObj = gas.toJSON();
// console.log(gas.toJSON());
// console.log(gas.toHuman());

const somePayload = {
  name: "haixuxu_tmg",
};

try {
  
  const meta = ProgramMetadata.from("0x" + fs.readFileSync(resolveOut("tmgbbk.meta.txt")));
  const gas = await gearApi.program.calculateGas.initUpload(sourceId, code, somePayload, 0, true, meta);
  const payload = {
    code,
    gasLimit: gas.min_limit,
    value: 1000_000_000_000,
    initPayload: somePayload,
  };
  const { programId, salt, extrinsic } = await gearApi.program.upload(payload, meta);
  console.log("programId====", programId);
  console.log("salt====", salt);
  // console.log("extrinsic====", extrinsic);
  await doSignAndSend(programId, "tmg_xuxihai" + Date.now());
} catch (error) {
  console.log(error);
  console.error(`${error.name}: ${error.message}`);
}

function setProgramName(programId, name) {
  console.log("set program.name call");
  rpcservice("program.name.add", { id: programId, name: name })
    .then((res) => res.json())
    .then(console.log)
    .catch((err) => console.log(err));
}

async function doSignAndSend(programId, name) {
  try {
    await gearApi.program.signAndSend(keyring, ({ status, events }) => {
      if (status.isReady) {
        console.log("ready====");
      } else if (status.isInBlock) {
        console.log("ready====is in block");
      } else if (status.isFinalized) {
        console.log("ready====isFinalized");

        // timeout cuz wanna be sure that block data is ready
        setTimeout(() => setProgramName(programId, name), 2000);
      }
    });
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
}

// 1. 名字是一串hex的问题  //见  https://idea.gear-tech.io/programs/0x4a32a284c5b52f15d1ecbf0a1dd9f20ff0ae366ab36630f83dfbd5edd294bcc6
// 2. 状态不正常的问题     //见 https://idea.gear-tech.io/programs/0x4a32a284c5b52f15d1ecbf0a1dd9f20ff0ae366ab36630f83dfbd5edd294bcc6
// 3. initPayload和meta关系，上传时如何处理initPayload?
