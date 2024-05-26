import { GearApi } from "@gear-js/api";

async function connect() {
  const gearApi = await GearApi.create({
    providerAddress: "wss://testnet.vara.network",
  });
  const genesis = gearApi.genesisHash.toHex();
  console.log("genesis====", genesis);
  const [chain, nodeName, nodeVersion] = await Promise.all([
    gearApi.chain(),
    gearApi.nodeName(),
    gearApi.nodeVersion(),
  ]);

  console.log(
    `You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`
  );

  const unsub = await gearApi.gearEvents.subscribeToNewBlocks((header) => {
    console.log(
      `New block with number: ${header.number.toNumber()} and hash: ${header.hash.toHex()}`
    );
  });
}
connect().catch(console.error);

// export {connect}
