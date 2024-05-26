import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const keyring = await GearKeyring.fromSuri("//Alice");

const resolve = (file) => {
  return path.resolve(__dirname, "../target/wasm32-unknown-unknown/release", file);
};

export { resolve };
