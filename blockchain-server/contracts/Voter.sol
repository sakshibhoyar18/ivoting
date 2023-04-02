// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract VoterRegistrationContract {
    struct Voter {
        address voterAddress;
        string name;
        uint256 age;
        string emailAddress;
        string phoneNumber;
        string residentialAddress;
        string image;
        string idNumber;
        bool registered;
        uint256[] votes;
    }

    struct UpcomingElections {
        address electionAddress;
        string electionName;
        uint256 date;
        string votingEligibility;
        string pollingLocations;
        uint256 registrationDeadline;
        string earlyVotingInformation;
        string absenteeVotingInformation;
        string voterIDRequirements;
        string electionImage;
        uint256[] positions;
    }

    struct Position {
        string postionName;
        string description;
        uint256 positon_date;
        string positionImage;
        string requirements;
        string termLength;
        string electionCycle;
        address[] candidates;
        address[] voters;
    }

    mapping(address => Voter) public voters;
    address[] public voterAddresses;
    mapping(address => UpcomingElections) public upcomingelections;
    address[] public electionAddress;
    mapping(uint256 => Position) public positions;
    uint256 public numPositions;

    function registerVoter(
        string memory _name,
        uint256 _age,
        string memory _emailAddress,
        string memory _phoneNumber,
        string memory _residentialAddress,
        string memory _image,
        string memory _idNumber
    ) public {
        require(
            _age >= 18,
            "You must be 18 years or older to register to vote."
        );
        require(
            !voters[msg.sender].registered,
            "You have already registered to vote."
        );

        // Check if the voter with the provided name and ID number already exists
        for (uint i = 0; i < voterAddresses.length; i++) {
            Voter storage existingVoter = voters[voterAddresses[i]];
            require(
                keccak256(bytes(existingVoter.name)) !=
                    keccak256(bytes(_name)) ||
                    keccak256(bytes(existingVoter.idNumber)) !=
                    keccak256(bytes(_idNumber)),
                "A voter with the same name or ID number already exists."
            );
        }

        Voter storage voter = voters[msg.sender];

        voter.voterAddress = msg.sender;
        voter.name = _name;
        voter.age = _age;
        voter.emailAddress = _emailAddress;
        voter.phoneNumber = _phoneNumber;
        voter.residentialAddress = _residentialAddress;
        voter.image = _image;
        voter.idNumber = _idNumber;
        voter.registered = true;
        voterAddresses.push(msg.sender);
    }

    function getAllVoters() public view returns (Voter[] memory) {
        uint256 numberOfVoters = voterAddresses.length;
        Voter[] memory allVoters = new Voter[](numberOfVoters);
        for (uint256 i = 0; i < numberOfVoters; i++) {
            allVoters[i] = voters[voterAddresses[i]];
        }
        return allVoters;
    }

    function addElection(
        string memory _electionName,
        uint256 _date,
        string memory _votingEligibility,
        string memory _pollingLocations,
        uint256 _registrationDeadline,
        string memory _earlyVotingInformation,
        string memory _absenteeVotingInformation,
        string memory _voterIDRequirements,
        string memory _electionImage
    ) public {
        UpcomingElections storage election = upcomingelections[msg.sender];

        election.electionAddress = msg.sender;
        election.electionName = _electionName;
        election.date = _date;
        election.votingEligibility = _votingEligibility;
        election.pollingLocations = _pollingLocations;
        election.registrationDeadline = _registrationDeadline;
        election.earlyVotingInformation = _earlyVotingInformation;
        election.absenteeVotingInformation = _absenteeVotingInformation;
        election.voterIDRequirements = _voterIDRequirements;
        election.electionImage = _electionImage;
        electionAddress.push(msg.sender);
    }

    function getAllElections()
        public
        view
        returns (UpcomingElections[] memory)
    {
        uint256 numberOfElections = electionAddress.length;
        UpcomingElections[] memory allElections = new UpcomingElections[](
            numberOfElections
        );
        for (uint256 i = 0; i < numberOfElections; i++) {
            allElections[i] = upcomingelections[electionAddress[i]];
        }
        return allElections;
    }

    function addPositions(
        string memory postionName,
        string memory description,
        uint256 positon_date,
        string memory positionImage,
        string memory requirements,
        string memory termLength,
        string memory electionCycle
    ) public {
        positions[numPositions] = Position(
            postionName,
            description,
            positon_date,
            positionImage,
            requirements,
            termLength,
            electionCycle,
            new address[](0),
            new address[](0)
        );
        numPositions++;
    }

    function getAllPositions() public view returns (Position[] memory) {
        Position[] memory allPositions = new Position[](numPositions);
        for (uint256 i = 0; i < numPositions; i++) {
            allPositions[i] = positions[i];
        }
        return allPositions;
    }

   function addPositionToElection(address newelectionAddress, uint256 positionId) public {
    require(positionId < numPositions, "Invalid position ID");
    require(upcomingelections[newelectionAddress].electionAddress != address(0), "Election not found");

    // Get the position and election objects
    Position storage position = positions[positionId];
    UpcomingElections storage election = upcomingelections[newelectionAddress];

    // Make sure the position is not already added to the election
    for (uint i = 0; i < election.positions.length; i++) {
        require(election.positions[i] != positionId, "Position already added to election");
    }

    // Add the position to the election's list of positions
    election.positions.push(positionId);

    // Add the election to the position's list of elections
    position.candidates.push(newelectionAddress);
}

function addVoterToPosition(address electionId, uint256 positionId, address voter) external {
    UpcomingElections storage election = upcomingelections[electionId];
    require(election.positions.length > positionId, "Invalid position ID");
    uint256 positionIndex = election.positions[positionId];
    Position storage position = positions[positionIndex];
    position.voters.push(voter);
}



    // Define a function to add a candidate to a position
    function addCandidateToPosition(
        uint256 positionId,
        address candidate
    ) public {
        require(positionId < numPositions, "Invalid position ID");
        positions[positionId].candidates.push(candidate);
    }

    function becomeCandidate(uint256 positionId) public {
        require(
            voters[msg.sender].registered,
            "You must be a registered voter to become a candidate."
        );
        require(positionId < numPositions, "Invalid position ID");
        Position storage position = positions[positionId];
        require(
            position.candidates.length < 10,
            "Maximum number of candidates reached."
        );

        // Check if the voter is already a candidate for this position
        for (uint i = 0; i < position.candidates.length; i++) {
            require(
                position.candidates[i] != msg.sender,
                "You are already a candidate for this position."
            );
        }

        // Add the voter as a candidate for the position
        position.candidates.push(msg.sender);
    }
}
