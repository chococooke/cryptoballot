import React, { useState } from "react";

const Alert = ({ type, message, onClose }) => {
  const [showAlert, setShowAlert] = useState(true);

  const handleClose = () => {
    setShowAlert(false);
    onClose();
  };

  return (
    showAlert && (
      <div className={`alert alert-${type}`}>
        <p>{message}</p>
        <button className="close-btn" onClick={handleClose}>
          &times;
        </button>
      </div>
    )
  );
};

export default Alert;