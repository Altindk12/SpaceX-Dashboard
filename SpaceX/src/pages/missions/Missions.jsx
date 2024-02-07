import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMissions,
  joinMission,
  leaveMission,
} from "../../redux/missions/missionSlice";
import axios from "axios";
import "./missions.css";

const Missions = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions);
  const [expandedMissions, setExpandedMissions] = useState([]);

  useEffect(() => {
    if (missions.length === 0) {
      axios
        .get("https://api.spacexdata.com/v3/missions")
        .then((response) => {
          dispatch(setMissions(response.data));
        })
        .catch((error) => {
          console.error("Error fetching missions:", error);
        });
    }
  }, [dispatch, missions.length]);

  const handleToggleDescription = (missionId) => {
    if (expandedMissions.includes(missionId)) {
      setExpandedMissions(expandedMissions.filter((id) => id !== missionId));
    } else {
      setExpandedMissions([...expandedMissions, missionId]);
    }
  };

  const handleJoinMission = (mission_id) => {
    dispatch(joinMission({ mission_id }));
  };

  const handleLeaveMission = (mission_id) => {
    dispatch(leaveMission({ mission_id }));
  };

  return (
    <div className="missions-container">
      <h2 className="missions-heading">Missions</h2>
      <div className="table-box">
        <table className="missions-content">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {missions?.map((mission) => (
              <tr key={mission.mission_id}>
                <td>{mission.mission_id}</td>
                <td>{mission.mission_name}</td>
                <td className="mission-desc">
                  {expandedMissions.includes(mission.mission_id)
                    ? mission.description
                    : mission.description.slice(0, 100) + "... "}
                  <button
                    type="button"
                    className="read-more-btn"
                    onClick={() => handleToggleDescription(mission.mission_id)}
                  >
                    {expandedMissions.includes(mission.mission_id)
                      ? "Read less"
                      : "Read more"}
                  </button>
                </td>
                <td className="action-buttons">
                  <button
                    type="button"
                    className="btn join-btn"
                    onClick={() => handleJoinMission(mission.mission_id)}
                    style={{
                      display: mission.reserved ? "none" : "inline-block",
                    }}
                  >
                    Join Mission
                  </button>
                  <button
                    type="button"
                    className="btn leave-btn"
                    onClick={() => handleLeaveMission(mission.mission_id)}
                    style={{
                      display: mission.reserved ? "inline-block" : "none",
                    }}
                  >
                    Leave Mission
                  </button>
                  <span
                    className={`member ${mission.reserved ? "active" : ""}`}
                  >
                    {mission.reserved ? "Active Member" : "Not a Member"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Missions;
