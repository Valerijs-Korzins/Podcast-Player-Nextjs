import AES from "crypto-js/aes";
import { enc } from "crypto-js";

export const decryptId = (str) => {
  const decodedStr = decodeURIComponent(str);
  return AES.decrypt(decodedStr, "super").toString(enc.Utf8);
};

export const encryptId = (str) => {
  const ciphertext = AES.encrypt(str, "super");
  return encodeURIComponent(ciphertext.toString());
};
