// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;

contract reward {
    
    //set time stamp
     mapping(address => uint) internal lastUpdate;

     //error report
     error timeStampError();

    //renew time stamp
     function timeStamp(address _owner) 
        internal 
    {
        lastUpdate[_owner] = block.timestamp;
    }
    
    //check time stamp
    function checkStamp(address _owner) 
        external
    {
        if(lastUpdate[_owner] == 0)
        {
            timeStamp(_owner);
        }   
        
        if(block.timestamp >= lastUpdate[_owner] + 1 days)
        {
            timeStamp(_owner); 
            payable(msg.sender).transfer(1 ether);
        }
        else{ revert timeStampError(); }
    }

}