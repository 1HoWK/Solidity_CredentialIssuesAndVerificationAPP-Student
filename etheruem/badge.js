import web3 from "./web3";
import Badge from "./build/Badge.json";

const badge = (address) => {
  const instance = new web3.eth.Contract(
    JSON.parse(Badge.interface),
    address
  );

  return instance;
};

export default badge;
