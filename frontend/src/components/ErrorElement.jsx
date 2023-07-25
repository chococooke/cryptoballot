import React from "react";
import img from "../images/404.svg";
import { useNavigate } from "react-router-dom";

const ErrorElement = () => {
    const navigate = useNavigate();
    return (
        <div className="not-found-error-element">
            <button onClick={() => {navigate(-1)}} className="not-found-error-element-back">Back</button>
            <img src={img} alt="" className="not-found-error-element-img" />
            <h1 className="not-found-error-element__message">404 - Not Found</h1>
            <p className="not-found-error-element__description">The page you are looking for does not exist.</p>
        </div>
    );
};

export default ErrorElement;
