import { createSlice } from "@reduxjs/toolkit";

const missionsSlice = createSlice({
  name: "missions",
  initialState: [],
  reducers: {
    setMissions: (state, action) =>
      action.payload.map(({ mission_id, mission_name, description }) => ({
        mission_id,
        mission_name,
        description,
        reserved: false,
      })),
    joinMission: (state, action) => {
      const { mission_id } = action.payload;
      return state.map((mission) =>
        mission.mission_id === mission_id
          ? { ...mission, reserved: true }
          : mission
      );
    },
    leaveMission: (state, action) => {
      const { mission_id } = action.payload;
      return state.map((mission) =>
        mission.mission_id === mission_id
          ? { ...mission, reserved: false }
          : mission
      );
    },
  },
});

export const { setMissions, joinMission, leaveMission } = missionsSlice.actions;
export default missionsSlice.reducer;
