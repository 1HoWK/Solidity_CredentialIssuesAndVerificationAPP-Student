import web3 from './web3';
import CredentialsFactory from './build/CredentialsFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CredentialsFactory.interface),
  '0x4D19f0aE138e5965e94A24259cF5fb0C4da37B49'
);

export default instance;