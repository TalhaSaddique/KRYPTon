// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

contract Transactions {
    uint256 transactionCount; // declaring a variable to store the number of transactions

    // declaring an event to emit when a transaction occurs
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    // declaring a struct to store transaction details
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions; // declaring an array to store all transactions

    // function to add a new transaction
    function addTransaction(address payable receiver, uint amount, string memory message, string memory keyword ) public {
        transactionCount += 1; // incrementing the transaction count
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword)); // adding a new transaction to the array

        // emitting the Transfer event with transaction details
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    // function to get all transactions
    function getAllTransactions() public view returns(TransferStruct[] memory) {
        return transactions; // returning the array of transactions
    }

    // function to get the total number of transactions
    function getTransactionCount() public view returns (uint256) {
        return transactionCount; // returning the transaction count
    }
}
