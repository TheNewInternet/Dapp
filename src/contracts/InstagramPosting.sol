// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;

contract InstagramPosting {

    struct Post{
        address owner;
        string imgHash;
        string textHash;
        string typeHash;
    }
    Post[] public post;
    
    mapping(address => uint) public lastUpdate;
    

    // Event which will notify new posts.    
    event NewPost();
    
    /**
     * @dev Function to store image & text hashes.
     * @param _img hash from IPFS.
     * @param _text hash from IPFS.
     */ 
     function sendHash(
        address _contract,
        string memory _img, 
        string memory _text,
        string memory _type
    ) 
        public 
        payable
    {
        (bool success, bytes memory data) = _contract.delegatecall(
            abi.encodeWithSignature("sendHash(string,string,string)", _img, _text, _type)
        );
        emit NewPost();
    }
    
    function getHash(uint256 _index) 
        public 
        view 
        returns (
            string memory img, 
            string memory text, 
            string memory fileType, 
            address owner
        ) 
    {
        owner = post[_index].owner;
        img = post[_index].imgHash;
        text = post[_index].textHash;
        fileType = post[_index].typeHash;
    }
    
    /**
     * @dev Function to get length of total posts.
     * @return The total count of posts.
     */
    function getCounter() public view returns(uint256) { return post.length; }
    
    function checkStamp(address _contract) 
        external
    {
        (bool success, bytes memory data) = _contract.delegatecall(
            abi.encodeWithSignature("checkStamp()")
        );
    }
}
