pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    // Use the constructor keyword instead of a function with the same name as the contract
    constructor(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }
}