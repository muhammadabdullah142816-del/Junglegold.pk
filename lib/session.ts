const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    return process.env.NODE_ENV === "production"
      ? "fallback-secret-key-must-be-set-in-env-vars-min-32-chars"
      : "development-secret-key-jungle-gold-min-32-chars-long";
  }
  return secret;
}

/**
 * Standard HMAC-SHA256 implemented using pure JS bitwise operations for universal
 * Edge, Node.js, and browser runtime compatibility without requiring Node 'crypto'.
 */
function sha256(ascii: string): Uint32Array {
  let i = 0, j = 0;
  const words: number[] = [];
  const asciiBitLength = ascii.length * 8;

  const hash: number[] = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ];

  const k: number[] = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  for (i = 0; i < ascii.length; i++) {
    const code = ascii.charCodeAt(i);
    words[i >> 2] |= (code & 0xff) << (24 - (i % 4) * 8);
  }

  words[asciiBitLength >> 5] |= 0x80 << (24 - (asciiBitLength % 32));
  words[(((asciiBitLength + 64) >> 9) << 4) + 15] = asciiBitLength;

  const w: number[] = new Array(64);
  for (i = 0; i < words.length; i += 16) {
    let a = hash[0], b = hash[1], c = hash[2], d = hash[3];
    let e = hash[4], f = hash[5], g = hash[6], h = hash[7];

    for (j = 0; j < 64; j++) {
      if (j < 16) {
        w[j] = words[i + j] | 0;
      } else {
        const gamma0 = ((w[j - 15] >>> 7) | (w[j - 15] << 25)) ^ ((w[j - 15] >>> 18) | (w[j - 15] << 14)) ^ (w[j - 15] >>> 3);
        const gamma1 = ((w[j - 2] >>> 17) | (w[j - 2] << 15)) ^ ((w[j - 2] >>> 19) | (w[j - 2] << 13)) ^ (w[j - 2] >>> 10);
        w[j] = (gamma1 + w[j - 7] + gamma0 + w[j - 16]) | 0;
      }

      const ch = (e & f) ^ (~e & g);
      const maj = (a & b) ^ (a & g ? a & c : b & c);
      const sigma0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
      const sigma1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
      const temp1 = (h + sigma1 + ch + k[j] + w[j]) | 0;
      const temp2 = (sigma0 + maj) | 0;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) | 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) | 0;
    }

    hash[0] = (hash[0] + a) | 0;
    hash[1] = (hash[1] + b) | 0;
    hash[2] = (hash[2] + c) | 0;
    hash[3] = (hash[3] + d) | 0;
    hash[4] = (hash[4] + e) | 0;
    hash[5] = (hash[5] + f) | 0;
    hash[6] = (hash[6] + g) | 0;
    hash[7] = (hash[7] + h) | 0;
  }

  return new Uint32Array(hash);
}

function wordsToHex(words: Uint32Array): string {
  let hex = "";
  for (let i = 0; i < words.length; i++) {
    hex += (words[i] >>> 0).toString(16).padStart(8, "0");
  }
  return hex;
}

function wordsToString(words: Uint32Array): string {
  let str = "";
  for (let i = 0; i < words.length; i++) {
    str += String.fromCharCode(
      (words[i] >>> 24) & 0xff,
      (words[i] >>> 16) & 0xff,
      (words[i] >>> 8) & 0xff,
      words[i] & 0xff
    );
  }
  return str;
}

function hmacSha256(message: string, key: string): string {
  const blockSize = 64;
  if (key.length > blockSize) {
    key = wordsToString(sha256(key));
  }
  while (key.length < blockSize) {
    key += "\0";
  }

  let oKeyPad = "";
  let iKeyPad = "";
  for (let i = 0; i < blockSize; i++) {
    const k = key.charCodeAt(i);
    oKeyPad += String.fromCharCode(k ^ 0x5c);
    iKeyPad += String.fromCharCode(k ^ 0x36);
  }

  const innerHash = wordsToString(sha256(iKeyPad + message));
  return wordsToHex(sha256(oKeyPad + innerHash));
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function generateSessionToken(): string {
  const secret = getSecret();
  const timestamp = Date.now().toString();
  const signature = hmacSha256(timestamp, secret);
  return `${timestamp}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    if (!token || typeof token !== "string") return false;
    const secret = getSecret();
    const dotIndex = token.indexOf(".");
    if (dotIndex === -1) return false;

    const timestamp = token.substring(0, dotIndex);
    const signature = token.substring(dotIndex + 1);

    const expectedSignature = hmacSha256(timestamp, secret);

    if (!constantTimeEqual(signature, expectedSignature)) {
      return false;
    }

    const tokenAge = Date.now() - parseInt(timestamp, 10);
    if (isNaN(tokenAge) || tokenAge < 0 || tokenAge > SESSION_MAX_AGE_MS) return false;

    return true;
  } catch {
    return false;
  }
}

