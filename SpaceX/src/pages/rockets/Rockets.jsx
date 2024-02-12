import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  cancelReservation,
  reserveRocket,
  setRockets,
} from "../../redux/rockets/rocketSlice";
import backgroundImage from "../../assets/images/backround.jpg";
import "../../Cssfiles/Rockets.css";

const Rockets = () => {
  const rockets = useSelector((state) => state.rockets);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRockets = async () => {
      try {
        if (!rockets || rockets.length === 0) {
          const response = await axios.get(
            "https://api.spacexdata.com/v3/rockets"
          );
          dispatch(setRockets(response.data));
        }
      } catch (error) {
        console.error("Error fetching rockets:", error);
      }
    };

    fetchRockets();
  }, [dispatch, rockets]);

  const renderRocketItems = () => {
    if (!rockets) {
      return <div>Loading...</div>;
    }

    return rockets.map((rocket) => (
      <RocketItem key={rocket.id} rocket={rocket} />
    ));
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="rockets-container">{renderRocketItems()}</div>
    </div>
  );
};

const RocketItem = ({ rocket }) => {
  const dispatch = useDispatch();

  const toggleReservation = () => {
    if (rocket.reserved) {
      dispatch(cancelReservation({ id: rocket.id }));
    } else {
      dispatch(reserveRocket({ id: rocket.id }));
    }
  };

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
          <button className="rocket-btn" onClick={toggleReservation}>
            {rocket.reserved ? "Cancel Reservation" : "Reserve Rocket"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rockets;
