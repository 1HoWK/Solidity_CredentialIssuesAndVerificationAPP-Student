import Web3 from "web3";

console.log("some shitter");

let web3;
try {
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/aa90d83a5ef743cdb1f5e88f373ab881"
  );
  web3 = new Web3(provider);

}

}catch(err){
  console.log(err);
}

export default web3;
