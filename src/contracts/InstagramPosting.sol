// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract InstagramPosting {
    
    // This struct is for the properties of a post.
    struct Post{
        address owner;
        string imgHash;
        string textHash;
        string typeHash;
    }
    
    // A mapping list for posts from Post struct.
    mapping(uint256 => Post) posts;
    
    // A counter for the posts mapping list.
    uint256 postCtr;
    
    // Event which will notify new posts.    
    event NewPost();

    //Store new data 20,000 GAS。
    //Update Data 5000 GAS。
    function sendHash(
        string memory _img, 
        string memory _text,
        string memory _type
    ) 
        public 
    {
        postCtr++;
        posts[postCtr] = Post(msg.sender, _img, _text, _type);

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
        return
        (
            posts[_index].imgHash,
            posts[_index].textHash,
            posts[_index].typeHash,
            posts[_index].owner
        );
    }
    
    /**
     * @dev Function to get length of total posts.
     * @return The total count of posts.
     */
    function getCounter() public view returns(uint256) { return postCtr; }
}
