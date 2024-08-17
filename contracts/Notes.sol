// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Notes is Ownable {
    struct Note {
        string content;
        uint256 timestamp;
    }
    
    mapping(address => Note[]) private userNotes;
    
    event NoteCreated(address indexed user, uint256 index);
    event NoteUpdated(address indexed user, uint256 index);
    event NoteDeleted(address indexed user, uint256 index);
    
    constructor() Ownable(msg.sender) {}  // This line fixes the previous error
    
    function createNote(string memory _content) public {
        userNotes[msg.sender].push(Note(_content, block.timestamp));
        emit NoteCreated(msg.sender, userNotes[msg.sender].length - 1);
    }
    
    function updateNote(uint256 _index, string memory _newContent) public {
        require(_index < userNotes[msg.sender].length, "Note does not exist");
        userNotes[msg.sender][_index].content = _newContent;
        userNotes[msg.sender][_index].timestamp = block.timestamp;
        emit NoteUpdated(msg.sender, _index);
    }
    
    function deleteNote(uint256 _index) public {
        require(_index < userNotes[msg.sender].length, "Note does not exist");
        userNotes[msg.sender][_index] = userNotes[msg.sender][userNotes[msg.sender].length - 1];
        userNotes[msg.sender].pop();
        emit NoteDeleted(msg.sender, _index);
    }
    
    function getNoteCount() public view returns (uint256) {
        return userNotes[msg.sender].length;
    }
    
    function getNote(uint256 _index) public view returns (string memory, uint256) {
        require(_index < userNotes[msg.sender].length, "Note does not exist");
        Note memory note = userNotes[msg.sender][_index];
        return (note.content, note.timestamp);
    }
}