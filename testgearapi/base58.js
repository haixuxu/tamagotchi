const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

function base58Encode(bytes) {
  let base = BigInt(58);
  let result = '';
  let value = BigInt('0');

  for (let i = 0; i < bytes.length; i++) {
    value = value * BigInt(256) + BigInt(bytes[i]);
  }

  while (value > BigInt(0)) {
    let remainder = value % base;
    value = value / base;

    // 将余数对应的字符添加到结果中
    result = ALPHABET[Number(remainder)] + result;
  }

  // 处理前导零
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] !== 0) {
      break;
    }
    result = '1' + result;
  }

  return result;
}

function base58Decode(str) {
  let base = BigInt(58);
  let result = BigInt('0');

  for (let i = 0; i < str.length; i++) {
    let index = ALPHABET.indexOf(str[i]);
    if (index === -1) {
      throw new Error('Invalid Base58 character: ' + str[i]);
    }
    result = result * base + BigInt(index);
  }

  let bytes = [];
  while (result > BigInt(0)) {
    let byte = Number(result % BigInt(256));
    result = result / BigInt(256);
    bytes.unshift(byte);
  }

  // 处理前导零
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== '1') {
      break;
    }
    bytes.unshift(0);
  }

  return new Uint8Array(bytes);
}

function uint8ArrayToHex(uint8Array) {
    return Array.from(uint8Array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

// 示例用法
const bytes = new Uint8Array([0x12, 0x34, 0x56, 0x78]);
const encoded = base58Encode(bytes);
console.log('Encoded:', encoded);

const decoded = base58Decode(encoded);
console.log('Decoded:', decoded);

const decoded2 = base58Decode("kGfxF2ew9eSRnSAdj92xzW2kFXa47MX6g9vT5aZQr2ehe56T5");
console.log('Decoded:', uint8ArrayToHex(decoded2));

