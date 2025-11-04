import {webcrypto} from 'node:crypto'

function resolveCrypto() {
  if (globalThis?.crypto && typeof globalThis.crypto.getRandomValues === 'function') {
    return globalThis.crypto
  }
  if (webcrypto && typeof webcrypto.getRandomValues === 'function') {
    return webcrypto
  }
  throw new Error('WebCrypto getRandomValues is not available in this environment')
}

export default function getRandomValues(typedArray) {
  if (!typedArray || typeof typedArray.length !== 'number') {
    throw new TypeError('Expected a typed array instance')
  }
  return resolveCrypto().getRandomValues(typedArray)
}
