import web3 from './web3';
import CredentialsFactory from './build/CredentialsFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CredentialsFactory.interface),
  '0x2724792E3839A6Cc5b8437c4C4C40B3365794d79'
);

export default instance;