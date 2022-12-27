import web3 from './web3';
import CredentialsFactory from './build/CredentialsFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CredentialsFactory.interface),
  '0x2E22cdA00bA37580855cFF3D692415568C4e4e56'
);

export default instance;