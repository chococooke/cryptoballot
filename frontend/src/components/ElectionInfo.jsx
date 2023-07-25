import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import CountDownTimer from "./CountDownTimer";
import RegisterCandidate from "./RegisterCandidate";
import Alert from "./Alert";

const ElectionInfo = ({ contract }) => {
    const navigate = useNavigate();
    const params = useParams();
    const [showForm, setShowForm] = useState(false);
    const [election, setElection] = useState(null);
    const [registrationValidity, setRegistrationValidity] = useState(false);
    const [voteValidity, setVoteValidity] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [winner, setWinner] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleAlertClose = () => {
        setShowAlert(false);
    };

    const handleShowAlert = () => {
        setShowAlert(true);
    };
    // Toggle the display of the candidate registration form
    const toggleShowForm = () => {
        setShowForm(!showForm);
    };


    const toggleRefresh = () => {
        setRefresh(!refresh);
    }

    // Check the validity of registration and voting based on deadlines
    const checkValidity = (deadline, duration) => {
        const timeStamp = Date.now() / 1000;
        setVoteValidity(duration - timeStamp > 0);
        setRegistrationValidity(deadline - timeStamp > 0);
    };

    // Fetch the election details and registered candidates
    const getElection = async () => {
        try {
            const candidateData = [];
            const tx = await contract.elections(params.id);
            setElection(tx);

            checkValidity(
                Number(tx.registrationDeadline),
                Number(tx.endTimestamp)
            );

            setLoading(true)
            const electionCandidates = await contract.getCandidates(tx.id);

            for (let i = 0; i < Number(tx.candidateCount); i++) {
                const candidate = electionCandidates[i];
                candidateData.push(candidate);
            }

            setCandidates(candidateData);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const getWinner = async () => {
        try {
            const tx = await contract.getWinner(election.id);
            setWinner(tx);
        } catch (err) {
            console.error(err);
        }
    }

    // Vote for a candidate
    const vote = async (candidateId) => {
        try {
            const tx = await contract.castVote(election.id, candidateId);
            const receipt = await tx.wait();
        } catch (err) {
            setAlertMessage(err.revert.args[0]);
            setShowAlert(true);
        }
    };

    // Fetch the election details and candidates on component mount
    useEffect(() => {
        getElection();

        if (!voteValidity) {
            getWinner();
        }
    }, [contract, refresh]);

    // Log the candidates array when it changes
    useEffect(() => {
        console.log(candidates);
    }, [candidates, refresh]);

    return (
        <>
            {showAlert && <Alert message={alertMessage} type={'error'} onClose={handleAlertClose} />}
            <div className="election-info-page">
                <button onClick={() => navigate(-1)}>back</button>
                {/* Display the candidate registration form if showForm is true */}
                {showForm && (
                    <RegisterCandidate
                        showForm={toggleShowForm}
                        contract={contract}
                        electionId={election.id}
                        refresh={toggleRefresh}
                    />
                )}
                {election === null ? (
                    // Display a loader while fetching the election details
                    <Loader size={50} type={"full"} />
                ) : (
                    <div className="election-info">
                        {/* Display the election title and description */}
                        <h1 className="election-info__title">
                            <span>Subject: </span>{election.title}
                        </h1>
                        <p className="election-info__description">
                            <span>Description:</span> {election.description}
                        </p>
                        {/* Display the countdown timer */}
                        <div className="election-info__cd">
                            <CountDownTimer
                                duration={Number(election.endTimestamp)}
                                deadline={Number(election.registrationDeadline)}
                            />
                        </div>
                        <div className="election-info__candidates">
                            <div className="election-info__candidates-options">
                                <h2 className="election-info__candidates-heading">Candidates</h2>
                                {/* Display the register candidate button if registration is still valid */}
                                {registrationValidity && (
                                    <button className="btn-imp" onClick={toggleShowForm}>
                                        Register Candidate
                                    </button>
                                )}
                            </div>
                            <div className="election-info__candidates-list">
                                {/* Display the registered candidates */}
                                {
                                    loading
                                        ? <Loader size={30} type={"normal"} />
                                        : candidates.map((candidate, index) => (
                                            <div className="election-info__candidate" key={index}>
                                                <div className="election-info__candidate-head">
                                                    <img
                                                        src={`https://api.dicebear.com/6.x/croodles/svg?seed=Felix${index}`}
                                                        alt="avatar"
                                                    />
                                                    <p className="election-info__candidate-head-name">{candidate.name}</p>
                                                    {
                                                        !voteValidity && Number(election.id) === index + 1 ? <small className="election-info__candidate-winnertag">winner</small> : <small></small>
                                                    }
                                                </div>
                                                <div className="election-info__candidate-body">
                                                    <p className="election-info__candidate-info">{candidate.info}</p>
                                                    {/* Display the vote button if voting is still valid */}
                                                </div>
                                                <div className="election-info__candidate-footer">
                                                    <button
                                                        className={voteValidity ? "election-info__btn" : "election-info__btn disabled"}
                                                        onClick={() => { voteValidity ? vote(candidate.id) : console.error("Not allowed") }}>
                                                        Vote
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ElectionInfo;