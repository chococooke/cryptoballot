const { ethers } = require("hardhat");

const main = async () => {
  const Election = await ethers.getContractFactory("Election")

  const election = await Election.deploy();

  console.log(await (election));
}

main();