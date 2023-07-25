// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Election {
    uint256 public electionDuration; // Duration of the election in seconds
    uint256 public registrationDeadline; // Deadline for voter registration in seconds

    struct Candidate {
        uint256 id; // Unique ID of the candidate
        string name; // Name of the candidate
        string info; // Additional information about the candidate
        uint256 voteCount; // Total number of votes received by the candidate
    }

    constructor() {
        electionDuration = 75 minutes;
        registrationDeadline = 15 minutes;
    }

    event VoterRegistered(address indexed voter, string name);
    event ElectionCreated(uint256 indexed electionId, string title, string description);
    event CandidateRegistered(uint256 indexed electionId, uint256 indexed candidateId, string name, string info);
    event VoteCast(uint256 indexed electionId, uint256 indexed candidateId, address indexed voter);

    struct ElectionData {
        uint256 id; // Unique ID of the election
        uint256 endTimestamp; // End timestamp of the election
        uint256 registrationDeadline; // Registration deadline timestamp
        string title; // Title of the election
        string description; // Description of the election
        string host; // Name of the host who created the election
        uint256 candidateCount; // Total number of candidates in the election
        uint256[] candidateIds; // Array of candidate IDs
        address[] voters; // Array of voter addresses
    }

    // Mapping to store elections by their unique ID
    mapping(uint256 => ElectionData) public elections;

    // Mapping to store candidates by their unique ID
    mapping(uint256 => Candidate) public candidates;

    // Mapping to track whether a voter has participated in an election or not
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    uint256 public electionCount; // Counter to track the number of elections created
    uint256 public voterCount; // Counter to track the number of voters registered

    // Function to create an election
    function createElection(string memory _title, string memory _description) public {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");

        electionCount++;
        ElectionData storage election = elections[electionCount];
        election.id = electionCount;
        election.title = _title;
        election.description = _description;
        election.endTimestamp = block.timestamp + electionDuration;
        election.registrationDeadline = block.timestamp + registrationDeadline;

        emit ElectionCreated(electionCount, _title, _description);
    }

    // Function to register a candidate for an election
    function registerCandidate(uint256 _electionId, string memory _name, string memory _info) public {
        ElectionData storage election = elections[_electionId];
        require(block.timestamp < election.registrationDeadline, "Registration deadline has ended");
        election.candidateCount++;
        Candidate storage candidate = candidates[election.candidateCount];

        candidate.id = election.candidateCount;
        candidate.name = _name;
        candidate.info = _info;

        election.candidateIds.push(election.candidateCount);

        emit CandidateRegistered(_electionId, election.candidateCount, _name, _info);
    }

    // Function to cast a vote in an election
    function castVote(uint256 _electionId, uint256 _candidateId) public {
        require(_electionId > 0, "Invalid election Id");
        require(_candidateId > 0, "Invalid Candidate Id");

        ElectionData storage election = elections[_electionId];
        require(block.timestamp < election.endTimestamp, "Election has ended");
        require(!hasVoted[_electionId][msg.sender], "Cannot cast a vote more than once");

        Candidate storage candidate = candidates[_candidateId];
        candidate.voteCount++;

        hasVoted[_electionId][msg.sender] = true;

        election.voters.push(msg.sender);

        emit VoteCast(_electionId, _candidateId, msg.sender);
    }

    // Function to get the candidates of an election
    function getCandidates(uint256 _electionId) public view returns (Candidate[] memory) {
        ElectionData storage election = elections[_electionId];
        Candidate[] memory result = new Candidate[](election.candidateCount);

        for (uint256 i = 0; i < election.candidateCount; i++) {
            uint256 candidateId = election.candidateIds[i];
            result[i] = candidates[candidateId];
        }

        return result;
    }

    // Function to get the voters of an election
    function getVoters(uint256 _electionId) public view returns (address[] memory) {
        ElectionData storage election = elections[_electionId];
        return election.voters;
    }

    function getWinner(uint256 _electionId) public view returns (Candidate memory) {
        ElectionData storage election = elections[_electionId];
        require(election.endTimestamp <= block.timestamp, "Election not yet ended");

        uint256 winningVoteCount = 0;
        uint256 winningCandidateId;

        for (uint256 i = 0; i < election.candidateCount; i++) {
            uint256 candidateId = election.candidateIds[i];
            Candidate storage candidate = candidates[candidateId];
            if (candidate.voteCount > winningVoteCount) {
                winningVoteCount = candidate.voteCount;
                winningCandidateId = candidateId;
            }
        }

        return candidates[winningCandidateId];
    }
}
