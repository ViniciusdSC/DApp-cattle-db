/* eslint-disable no-undef */
const Cattle = artifacts.require("cattle/Cattle");
const CattleFactory = artifacts.require("cattle/CattleFactory");

module.exports = function (_deployer) {
  _deployer.deploy(Cattle);
  _deployer.deploy(CattleFactory);
};
