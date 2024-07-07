import CryptoJS from 'crypto-js';

export function encryptNote(content, secretPhrase) {
  return CryptoJS.AES.encrypt(content, secretPhrase).toString();
}

export function decryptNote(encryptedContent, secretPhrase) {
  const bytes = CryptoJS.AES.decrypt(encryptedContent, secretPhrase);
  return bytes.toString(CryptoJS.enc.Utf8);
}