import React from "react";
import { useSelector } from "react-redux";
import "../../Cssfiles/MyProfile.css";

const MyProfile = () => {
  const { rockets, missions } = useSelector((state) => ({
    rockets: state.rockets,
    missions: state.missions,
  }));

  const reservedRockets = rockets.filter((rocket) => rocket.reserved);
  const joinedMissions = missions.filter((mission) => mission.reserved);

  return (
    <div className="my-profile-container">
      <div className="section">
        <h2 className="section-title">Reserved Rockets</h2>
        <div className="content">
          {reservedRockets.length !== 0 ? (
            <div className="rocket-list">
              {reservedRockets.map((rocket) => (
                <div key={rocket.id} className="rocket">
                  <p className="rocket-name">{rocket.rocket_name}</p>
                  <div className="rocket-animation">🛰️</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-content-message">
              No rockets reserved!{" "}
              <span
                role="img"
                aria-label="Reserve a rocket if you want to appear here"
              >
                🡠 Reserve a rocket if you want to appear here
              </span>
            </p>
          )}
        </div>
      </div>
      <div className="section">
        <h2 className="section-title">Joined Missions</h2>
        <div className="content">
          {joinedMissions.length !== 0 ? (
            <div className="mission-list">
              {joinedMissions.map((mission) => (
                <div key={mission.mission_id} className="mission">
                  <p className="mission-name">{mission.mission_name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-content-message">
              No missions joined!{" "}
              <span
                role="img"
                aria-label="Join a mission if you want to appear here"
              >
                🡠 Join a mission if you want to appear here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
