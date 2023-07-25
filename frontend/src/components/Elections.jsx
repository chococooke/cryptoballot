import { useState, useEffect } from "react";
import Loader from "./Loader";
import ElectionCard from "./Election";
import CreateProposal from "./CreateElection";

const Election = ({ contract, walletStatus, account }) => {
    const [loading, setLoading] = useState(false);
    const [contractElections, setContractElections] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [activeTab, setActiveTab] = useState("live");

    const toggleShowForm = () => {
        setShowForm(!showForm);
    };

    const refreshNow = () => {
        setRefresh(!refresh);
    };

    const getElections = async () => {
        setLoading(true);
        try {
            const noOfElections = await contract.electionCount();
            const elections = [];

            for (let i = 1; i <= Number(noOfElections); i++) {
                const election = await contract.elections(i);
                elections.push(await election);
            }

            setContractElections(elections);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const isElectionLive = (election) => {
        const timeStamp = Date.now() / 1000;
        return election.endTimestamp > timeStamp && election.registrationDeadline > timeStamp;
    };

    const getLiveElections = () => {
        return contractElections.filter((election) => isElectionLive(election));
    };

    const getPastElections = () => {
        return contractElections.filter((election) => !isElectionLive(election));
    };

    useEffect(() => {
        const fetchData = async () => {
            if (contractElections.length === 0) {
                await getElections();
            }
        };

        fetchData();
    }, [walletStatus]);

    useEffect(() => {
        getElections();
    }, [refresh,]);

    return (
        <>
            <div className="election-container">
                {account !== null && walletStatus && (
                    <button className="election-container-btn btn" onClick={() => toggleShowForm()}>
                        + Start new Election
                    </button>
                )}
                <div className="election-tabs">
                    <button
                        className={`tab ${activeTab === "live" ? "tab-active" : ""}`}
                        onClick={() => setActiveTab("live")}
                    >
                        Live
                    </button>
                    <button
                        className={`tab ${activeTab === "live" ? "" : "tab-active"}`}
                        onClick={() => setActiveTab("past")}
                    >
                        Past
                    </button>
                </div>
                {loading ? (
                    <Loader size={50} type={"full"} />
                ) : (
                    <div className="election-container-list">
                        {activeTab === "live" && getLiveElections().length > 0 ? (
                            getLiveElections().slice().reverse().map((election, index) => (
                                <ElectionCard
                                    key={index}
                                    id={election.id}
                                    title={election.title}
                                    description={election.description}
                                    deadline={Number(election.registrationDeadline)}
                                    duration={Number(election.endTimestamp)}
                                    totalCandidates={Number(election.candidateCount)}
                                />
                            ))
                        ) : activeTab === "live" ? (
                            <div className="no-election-message">No live elections at the moment.</div>
                        ) : null}

                        {activeTab === "past" && getPastElections().length > 0 ? (
                            getPastElections().slice().reverse().map((election, index) => (
                                <ElectionCard
                                    key={index}
                                    id={election.id}
                                    title={election.title}
                                    description={election.description}
                                    deadline={Number(election.registrationDeadline)}
                                    duration={Number(election.endTimestamp)}
                                    totalCandidates={Number(election.noOfCandidates)}
                                />
                            ))
                        ) : activeTab === "past" ? (
                            <div className="no-election-message">No past elections found.</div>
                        ) : null}
                    </div>
                )}
                {showForm && <CreateProposal contract={contract} showForm={toggleShowForm} refresh={refreshNow} />}
            </div>
        </>
    );
};

export default Election;
