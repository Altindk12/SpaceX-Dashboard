import { useEffect } from "react";
import "./Rockets.css";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelReservation,
  reserveRocket,
  setRockets,
} from "../../redux/rockets/rocketSlice";
import axios from "axios";

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

  return (
    <div className="rockets-container">
      {rockets?.map((rocket) => (
        <div className="rocket-item" key={rocket.id}>
          <img
            className="rocket-image"
            src={rocket.flickr_images[0]}
            alt={rocket.rocket_name}
          />
          <div className="rocket-details">
            <h2 className="rocket-name">{rocket.rocket_name}</h2>
            <p className="rocket-description">{rocket.description}</p>
            <div className="rocket-status">
              <span
                className={`status ${
                  rocket.reserved ? "reserved" : "available"
                }`}
              >
                {rocket.reserved ? "Reserved" : "Available"}
              </span>
              <button
                className={`rocket-btn ${
                  rocket.reserved ? "cancel-btn" : "reserve-btn"
                }`}
                onClick={() => {
                  if (rocket.reserved) {
                    dispatch(cancelReservation({ id: rocket.id }));
                  } else {
                    dispatch(reserveRocket({ id: rocket.id }));
                  }
                }}
              >
                {rocket.reserved ? "Cancel Reservation" : "Reserve Rocket"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rockets;
