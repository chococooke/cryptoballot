import { useEffect, useState } from "react";

const CountDownTimer = ({ deadline, duration }) => {
  const [registrationDeadline, setRegistrationDeadline] = useState(deadline);
  const [electionDuration, setElectionDuration] = useState(duration);

  // Remaining time until registration deadline
  useEffect(() => {
    const deadlineInterval = setInterval(() => {
      const timestamp = Math.floor(Date.now() / 1000);
      const difference = deadline - timestamp;
      setRegistrationDeadline(difference);
    }, 1000);

    return () => {
      clearInterval(deadlineInterval);
    };
  }, [deadline]);

  // Remaining time until election ends
  useEffect(() => {
    const durationInterval = setInterval(() => {
      const timestamp = Math.floor(Date.now() / 1000);
      const difference = duration - timestamp;
      setElectionDuration(difference);
    }, 1000);

    return () => {
      clearInterval(durationInterval);
    };
  }, [duration]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");

    return {
      h: hours, m: minutes, s: seconds
    };
  };

  return (
    <div className="countdown-container">
      <ul className="countdown-container-list">
        <li>
          {registrationDeadline < 0 ? (
            <p className="expired-text">Registration Ended</p>
          ) : (
            <p className="countdown-text">
              <span>Registration deadline : </span>
              <ul className="countdown-text-list">
                <li className="countdown-text-list--item">{formatTime(registrationDeadline).h}</li>
                :<li className="countdown-text-list--item">{formatTime(registrationDeadline).m}</li>
                :<li className="countdown-text-list--item">{formatTime(registrationDeadline).s}</li>
              </ul>
            </p>
          )}
        </li>
        |
        <li>
          {electionDuration < 0 ? (
            <p className="expired-text">Election ended</p>
          ) : (
            <p className="countdown-text">
              <span>Election ends in: </span>
              <ul style={{ listStyleType: "none" }} className="countdown-text-list">
                <li className="countdown-text-list--item">{formatTime(electionDuration).h}</li>
                :<li className="countdown-text-list--item">{formatTime(electionDuration).m}</li>
                :<li className="countdown-text-list--item">{formatTime(electionDuration).s}</li>
              </ul>
            </p>
          )}
        </li>
      </ul>
    </div>
  );
};

export default CountDownTimer;
