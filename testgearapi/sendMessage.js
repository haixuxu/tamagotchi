try {
    const message = {
      destination: destination, // programId
      payload: "PING",
      gasLimit: 100_000_000,
      value: 1000,
    };

    const gearApi = await GearApi.create({
        providerAddress: "wss://testnet.vara.network",
      });
    // By default, the payload will be encoded using meta.handle_input type
    const submitted = await gearApi.message.submit(message, meta);
    // If you need to specify a different handler
    // For example
    await gearApi.message.submit(message, meta, meta.async_handle_input);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
  try {
    await gearApi.message.signAndSend(keyring, (event) => {
      console.log(event.toHuman());
    });
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }