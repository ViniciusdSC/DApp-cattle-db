// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './Cattle.sol';

contract CattleFactory {
  Cattle[] public data;

  function quickSort(Cattle[] memory arr, int left, int right) public view {
    int i = left;
    int j = right;
    if (i == j) return;
    Cattle pivot = arr[uint(left + (right - left) / 2)];
    while (i <= j) {
        while (arr[uint(i)].votes() > pivot.votes()) i++;
        while (pivot.votes() > arr[uint(j)].votes()) j--;
        if (i <= j) {
            (arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
            i++;
            j--;
        }
    }
    if (left < j)
        quickSort(arr, left, j);
    if (i < right)
        quickSort(arr, i, right);
  }

  function store (string memory _name, string memory _description, address _token) public {
    Cattle model = new Cattle();
    model.setName(_name);
    model.setDescription(_description);
    model.setToken(_token);

    data.push(model);
  }

  function getSize () public view returns (uint size) {
    return data.length;
  }

  function find (uint limit, uint page) public view returns (Cattle[] memory _data) {
    Cattle[] memory _cattles = data;

    quickSort(_cattles, int(0), int(_cattles.length - 1));

    if (limit > _cattles.length) {
      limit = _cattles.length;
    }
    
    uint skip = limit * (page - 1);
    Cattle[] memory cattles = new Cattle[](limit);

    if (_cattles.length < skip) {
      return cattles;
    }


    for (uint256 i = 0; i < limit; i++) {
      cattles[i] = _cattles[i + skip];
    }

    return cattles;
  }
}