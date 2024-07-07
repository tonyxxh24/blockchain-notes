// migrations/1_deploy_contracts.js
const Notes = artifacts.require("Notes");

module.exports = function(deployer) {
  deployer.deploy(Notes);
};