import { useState } from "react";
import Loader from "./Loader";

const RegisterCandidate = ({ electionId, contract, showForm, refresh }) => {
    const [formData, setFormData] = useState({ name: "", info: "" });
    const [loading, setLoading] = useState(false);


    const updateFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const registerCandidate = async (e) => {
        const name = formData.name;
        const info = formData.info;
        e.preventDefault();
        try {
            setLoading(true);
            const tx = await contract.registerCandidate(electionId, name, info);
            const receipt = await tx.wait();
            refresh();
            setLoading(false);
            showForm();
        } catch (err) {
            console.error(err);
            showForm();
            setLoading(false);
        }
    };

    return (
        <>
            <div className="form__wrapper">
                <form className="form">
                    <h2 className="form__title">Register New Candidate</h2>
                    <div className="form__group">
                        <label className="form__label" htmlFor="title">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form__input"
                            placeholder="e.g., John Doe"
                            onChange={(e) => updateFormData(e)}
                        />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="info">Info</label>
                        <input
                            name="info"
                            className="form__input" id=""
                            placeholder="about the candidate in brief."
                            onChange={(e) => updateFormData(e)}
                        />
                    </div>
                    <div className="form__buttons">
                        <button
                            className="form-btn submit"
                            onClick={(e) => registerCandidate(e)}>
                            {loading ? <Loader size={30} type={"normal"} /> : "Submit"}
                        </button>
                        <button
                            className={loading ? "form-btn disabled" : "form-btn exit"}
                            onClick={showForm}>
                            Cancel
                        </button>
                        <small>
                            {loading ? "Hold on until transaction confirmation..." : ""}
                        </small>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterCandidate;