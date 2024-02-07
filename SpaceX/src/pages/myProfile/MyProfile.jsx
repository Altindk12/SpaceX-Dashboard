import { useSelector } from "react-redux";
import "./MyProfile.css";

const MyProfile = () => {
  const rockets = useSelector((state) => state.rockets);
  const reservedRockets = rockets.filter((rocket) => rocket.reserved);
  const missions = useSelector((state) => state.missions);
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
              {"            🡠Reserve  a rocket if you want to appear here "}
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
              No missions joined!{"🡠Join a mission  if you want to appear here"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
