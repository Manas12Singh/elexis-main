const fs = require('fs');
const path = require('path');
async function main() {
  const Voting = await ethers.getContractFactory("Voting");
  const Voting_ = await Voting.deploy(["Lewis Hamilton", "Max Verstappen", "Charles Leclerc", "Ayrton Senna", "Micheal Schumacher"], 10);
  console.log("Contract deployed. ");
  const mainJsPath = path.join(__dirname, '..', 'main.js');
  const mainJsContent = fs.readFileSync(mainJsPath, 'utf-8');
  const updatedMainJsContent = mainJsContent.replace(/let contractAddress = "(.*)";/, `let contractAddress = "${Voting_.address}";`);
  fs.writeFileSync(mainJsPath, updatedMainJsContent, 'utf-8');
}
main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });
