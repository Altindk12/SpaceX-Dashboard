import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  cancelReservation,
  reserveRocket,
  setRockets,
} from "../../redux/rockets/rocketSlice";
import backgroundImage from "../../assets/images/backround.jpg";
import "./Rockets.css";

const Rockets = () => {
  const rockets = useSelector((state) => state.rockets);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!rockets || rockets.length === 0) {
      axios
        .get("https://api.spacexdata.com/v3/rockets")
        .then((response) => {
          dispatch(setRockets(response.data));
        })
        .catch((error) => {
          console.error("Error fetching rockets:", error);
        });
    }
  }, [dispatch, rockets]);

  const memoizedDispatch = useMemo(() => dispatch, [dispatch]);

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="rockets-container">
        {rockets ? (
          rockets.map((rocket) => (
            <RocketItem
              key={rocket.id}
              rocket={rocket}
              dispatch={memoizedDispatch}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

const RocketItem = ({ rocket, dispatch }) => {
  const reserve = () => dispatch(reserveRocket({ id: rocket.id }));
  const handleCancelReservation = () =>
    dispatch(cancelReservation({ id: rocket.id }));

  return (
    <div className="rocket-item">
      <div className="rocket-status">
        <span
          className={`status ${rocket.reserved ? "reserved" : "available"}`}
        >
          {rocket.reserved ? "Reserved" : "Available"}
        </span>
      </div>
      <img
        className="rocket-image"
        src={rocket.flickr_images[0]}
        alt={rocket.rocket_name}
      />
      <div className="rocket-details">
        <h2 className="rocket-name">{rocket.rocket_name}</h2>
        <p className="rocket-description">{rocket.description}</p>
        <div className="rocket-buttons">
          <button className="rocket-btn reserve-btn" onClick={reserve}>
            Reserve Rocket
          </button>
          <button
            className="rocket-btn cancel-btn"
            onClick={handleCancelReservation}
          >
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rockets;
