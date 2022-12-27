try{

    const HDWalletProvider = require("@truffle/hdwallet-provider");
    const Web3 = require("web3");
    const CredentialsFactory = require("./build/CredentialsFactory.json");
    
    const path = require("path");
    
    const dotenv = require("dotenv");
    require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
    
    console.log(`"this is the NME : "${process.env.NME}`);
    console.log(`"this is infura :"${process.env.INFURA}`);
    
    const provider = new HDWalletProvider(process.env.NME, process.env.INFURA);
    const web3 = new Web3(provider);
    
    const deploy = async () => {
      const accounts = await web3.eth.getAccounts();
    
      console.log("Attempting to deploy from account", accounts[2]);
      
    
    
      const result = await new web3.eth.Contract(
        JSON.parse(CredentialsFactory.interface)
      )
        .deploy({ data: CredentialsFactory.bytecode })
        .send({ from: accounts[2],gas: "10000000" });
    
      
      console.log("Contract deployed to", result.options.address);
      provider.engine.stop();
    };
    
    deploy();
    
    }catch(err){
      console.log(err);
    }
    