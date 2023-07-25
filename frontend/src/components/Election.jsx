import React, { useState } from "react";
import CountdownTimer from "./CountDownTimer";
import { Link } from "react-router-dom";

const ElectionCard = ({
    id,
    title,
    description,
    deadline,
    duration,
}) => {

    return (
        <div className="card">
            <div className="card__head">
                <h1 className="card__title">{`${title}`}</h1>
            </div>
            <div className="card__footer">
                <ul>
                    <li>
                        <Link to={`/election/${id}`} className="card__btn">
                            Read More
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ElectionCard;
