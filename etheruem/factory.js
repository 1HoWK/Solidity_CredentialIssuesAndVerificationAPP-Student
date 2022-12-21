import web3 from './web3';
import CredentialsFactory from './build/CredentialsFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CredentialsFactory.interface),
  '0xD43D002165662d4ae787b12e55DE9Fe0Eec93c42'
);

export default instance;