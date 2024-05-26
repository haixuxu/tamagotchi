import { GearKeyring } from '@gear-js/api';
// const { keyring, json } = await GearKeyring.create('keyringName', 'passphrase');

// console.log(keyring,json)

const str = GearKeyring.generateMnemonic();

// Getting a seed from mnemonic
const ret = GearKeyring.generateSeed(str);

console.log(str);
console.log(ret);