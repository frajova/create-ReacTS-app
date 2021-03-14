/* eslint-disable @typescript-eslint/no-explicit-any */
import SimpleCrypto, { PlainData } from 'simple-crypto-js';

type HandleEncrypt = (storageLabel: string, data: PlainData) => void;
type HandleDecrypt = (cipherData: string) => (string | null);

const simpleCrypto: SimpleCrypto = new SimpleCrypto(
  process.env.REACT_APP_SECRET_KEY || process.env.REACT_APP_SECRET_KEY_TEST
);

const encryptLocalStorage: HandleEncrypt = (storageLabel, data) => {
  const cipherData: PlainData = simpleCrypto.encrypt(data);

  localStorage.setItem(storageLabel, cipherData);
};

const decryptLocalStorage: HandleDecrypt = (cipherData) => {
  const dataStorage: string | null = localStorage.getItem(cipherData);
  if (dataStorage) {
    const decipherData: any = simpleCrypto.decrypt(dataStorage);
    return decipherData;
  }

  return null;
};

export { encryptLocalStorage, decryptLocalStorage };