import web3 from "./web3";
import Certificate from "./build/Certificate.json";

const certificate = (address) => {
  const instance = new web3.eth.Contract(
    JSON.parse(Certificate.interface),
    address
  );

  return instance;
};

export default certificate;
