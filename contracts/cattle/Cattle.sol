// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Cattle {
  string public name;
  string public description;
  address public token;

  uint public votes = 0;

  function addVote () public {
    votes++;
  }

  function setName(string memory _name) public {
    name = _name;
  }

  function setDescription(string memory _description) public {
    description = _description;
  }

  function setToken (address _token) public {
    token = _token;
  }
}