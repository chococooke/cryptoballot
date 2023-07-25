import { useState } from "react";
import Loader from "./Loader";

const CreateProposal = ({ showForm, contract, refresh }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })

    const updateFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const tx = await contract.createElection(formData.title, formData.description);
            const receipt = await tx.wait();
            refresh();
            showForm();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="form__wrapper">
                <form className="form">
                    <h2 className="form__title">Create New Election</h2>
                    <div className="form__group">
                        <label className="form__label" htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form__input"
                            placeholder="Title of the election"
                            onChange={(e) => updateFormData(e)}
                        />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="description">Description</label>
                        <input
                            name="description"
                            className="form__input" id=""
                            placeholder="This voting is about..."
                            onChange={(e) => updateFormData(e)}
                        />
                    </div>
                    <div className="form__buttons">
                        <button
                            className="form-btn submit"
                            onClick={(e) => { handleSubmit(e) }}>
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

export default CreateProposal;