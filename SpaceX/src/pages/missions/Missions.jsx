import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMissions,
  joinMission,
  leaveMission,
} from "../../redux/missions/missionSlice";
import axios from "axios";
import "../../Cssfiles/missions.css";

const Missions = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions);
  const [expandedMissions, setExpandedMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        if (missions.length === 0) {
          const response = await axios.get(
            "https://api.spacexdata.com/v3/missions"
          );
          dispatch(setMissions(response.data));
        }
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };

    fetchMissions();
  }, [dispatch, missions.length]);

  const toggleDescription = (missionId) => {
    if (expandedMissions.includes(missionId)) {
      setExpandedMissions(expandedMissions.filter((id) => id !== missionId));
    } else {
      setExpandedMissions([...expandedMissions, missionId]);
    }
  };

  const handleAction = (mission_id, action) => {
    if (action === "join") {
      dispatch(joinMission({ mission_id }));
    } else if (action === "leave") {
      dispatch(leaveMission({ mission_id }));
    }
  };

  return (
    <div className="missions-container">
      <h2 className="missions-heading">Missions</h2>
      <div className="table-box">
        <table className="missions-content">
          <tbody>
            {missions &&
              missions.map((mission) => (
                <tr key={mission.mission_id}>
                  <td className="mission-row">
                    <div className="mission-details">
                      <div className="mission-id">ID: {mission.mission_id}</div>
                      <div className="mission-name">
                        Name: {mission.mission_name}
                      </div>
                      <div className="mission-desc">
                        {expandedMissions.includes(mission.mission_id)
                          ? mission.description
                          : mission.description.slice(0, 100) + "... "}
                      </div>
                      <button
                        type="button"
                        className="read-more-btn"
                        onClick={() => toggleDescription(mission.mission_id)}
                      >
                        {expandedMissions.includes(mission.mission_id)
                          ? "Read less"
                          : "Read more"}
                      </button>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="btn join-btn"
                          onClick={() =>
                            handleAction(mission.mission_id, "join")
                          }
                          style={{
                            display: mission.reserved ? "none" : "inline-block",
                          }}
                        >
                          Join Mission
                        </button>
                        <button
                          type="button"
                          className="btn leave-btn"
                          onClick={() =>
                            handleAction(mission.mission_id, "leave")
                          }
                          style={{
                            display: mission.reserved ? "inline-block" : "none",
                          }}
                        >
                          Leave Mission
                        </button>
                        <span
                          className={`member ${
                            mission.reserved ? "active" : ""
                          }`}
                        >
                          {mission.reserved ? "Active Member" : "Not a Member"}
                        </span>
                      </div>
                    </div>
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
