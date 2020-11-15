pragma solidity ^0.5.0;

contract AddData {
    string public name;
    uint public dataCount = 0;
    mapping(uint => Data) public datas;

    struct Data {
        uint id;
        string jsonvalue;
        string componentname;
        string packagename;
        string description;
        string version;
        uint trustscore;
        address payable publickey;
        bool purchased;
    }

    event DataCreated(
        uint id,
        string jsonvalue,
        string componentname,
        string packagename,
        string description,
         string version,
        uint trustscore,
        address payable publickey,
        bool purchased
    );


    constructor() public {
        name = "Secure Software Ecosystem";
    }

    

    function createData(string memory _jsonvalue,string memory _componentname,string memory _packagename,string memory _description ,string memory _version, uint _trustscore) public {
        // Require a valid jsonvalue
        require(bytes(_jsonvalue).length > 0);

        require(bytes(_componentname).length > 0);

        require(bytes(_packagename).length > 0);

        require(bytes(_description).length > 0);
        require(bytes(_version).length > 0);
        // Require a valid identity
        require(_trustscore > 0);
        // Increment product count
        dataCount ++;
        // Create the product
        datas[dataCount] = Data(dataCount, _jsonvalue, _componentname, _packagename, _description, _version, _trustscore, msg.sender, false);
        // Trigger an event
        emit DataCreated(dataCount, _jsonvalue, _componentname, _packagename, _description, _version, _trustscore, msg.sender, false);
    }

    
}
