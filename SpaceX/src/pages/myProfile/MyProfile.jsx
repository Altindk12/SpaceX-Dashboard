import { useSelector } from "react-redux";
import "./MyProfile.css";

const MyProfile = () => {
  const rockets = useSelector((state) => state.rockets);
  const reservedRockets = rockets.filter((rocket) => rocket.reserved);
  const missions = useSelector((state) => state.missions);
  const joinedMissions = missions.filter((mission) => mission.reserved);

  return (
    <div className="my-profile">
      <div className="stats">
        <div className="item-stats grid-item">
          <h2>Reserved Rockets</h2>
          <div className="rocket-list">
            {reservedRockets.length !== 0 ? (
              reservedRockets.map((rocket) => (
                <div key={rocket.id} className="rocket">
                  <p>{rocket.rocket_name}</p>
                  <div className="rocket-animation">🛰️</div>
                </div>
              ))
            ) : (
              <p>No rockets reserved!</p>
            )}
          </div>
        </div>
        <div className="item-stats grid-item">
          <h2>Joined Missions</h2>
          <div className="mission-list">
            {joinedMissions.length !== 0 ? (
              joinedMissions.map((mission) => (
                <div key={mission.mission_id} className="mission">
                  <p>{mission.mission_name}</p>
                </div>
              ))
            ) : (
              <p>No missions joined!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
