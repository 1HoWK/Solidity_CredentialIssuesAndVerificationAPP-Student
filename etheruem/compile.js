const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const credentialPath = path.resolve(
  __dirname,
  "contracts",
  "Credentials.sol"
);

// console.log(`This is the credential path: ${credentialPath}`);

const source = fs.readFileSync(credentialPath, "utf8");

// console.log(`This is the source path: ${source}`);

const output = solc.compile(source, 1).contracts;

// console.log(`This is the output: ${output}`);

fs.ensureDirSync(buildPath);

// console.log(credentialPath);
// console.log(source);
// console.log(output);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
