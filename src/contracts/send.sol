// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;
contract send{
    struct Post{
        address owner;
        string imgHash;
        string textHash;
        string typeHash;
    }
    Post[] public post;
    
    mapping(address => uint) public lastUpdate;
    
    function sendHash(
        string memory _img, 
        string memory _text,
        string memory _type
    ) 
        public 
        payable
    {
        post.push(Post(msg.sender, _img, _text, _type));
    }
    
    function timeStamp() 
        internal 
    {
        lastUpdate[msg.sender] = block.timestamp;
    }
    
    //check time stamp
    function checkStamp() 
        external
        returns(bool)
    {
        if(lastUpdate[msg.sender] == 0)
        {
            timeStamp();
            return false;
        }   
        
        if(block.timestamp >= lastUpdate[msg.sender] + 1 seconds)
        {
            timeStamp();
            return true;
        }
        
        else { return false; }
    }
    
}