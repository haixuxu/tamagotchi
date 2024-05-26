const generateRandomId = () => Math.floor(Math.random() * 100000000);

// enum RpcMethods {
//   GetProgram = 'program.data',
//   GetAllPrograms = 'program.all',
//   AddMetadata = 'meta.add',
//   AddProgramName = 'program.name.add',
//   AddCodeName = 'code.name.add',
//   GetMetadata = 'meta.get',
//   GetMessage = 'message.data',
//   GetAllMessages = 'message.all',
//   GetCode = 'code.data',
//   GetAllCodes = 'code.all',
//   GetTestBalance = 'testBalance.get',
//   NetworkData = 'networkData.available',
//   TestBalanceAvailable = 'testBalance.available',
//   AddState = 'program.state.add',
//   GetStates = 'program.state.all',
//   GetState = 'state.get',
// }

const GENESIS = {
  MAINNET: '0xfe1b4c55fd4d668101126434206571a7838a8b6b93a6d1b95d607e78e6c53763',
  TESTNET: '0x525639f713f397dcf839bd022cd821f367ebcf179de7b9253531f8adbe5436d6',
};

export default function (method,postParams) {
  const headers = {
    accept: "application/json",
    "content-type": "application/json;charset=utf-8",
    "sec-ch-ua": '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    Referer: "https://idea.gear-tech.io/programs/upload?node=wss%3A%2F%2Ftestnet.vara.network",
    "Referrer-Policy": "same-origin",
  };
  const payload = {
    id: generateRandomId(),
    jsonrpc: "2.0",
    method: method,
    params: {
      ...postParams,
      genesis: GENESIS.TESTNET,
    },
  };
  return fetch("https://idea.gear-tech.io/api", { headers: headers, body: JSON.stringify(payload), method: "POST" });
}
