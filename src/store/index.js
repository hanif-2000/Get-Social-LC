import { create } from "zustand";

export const useStore = create((set) => ({
  token: null,
  accessToken: null,
  refreshToken: null,
  userID: null,
  roomData: null,
  fecthRooms: false,
  userDetails: {},

  setFecthRooms: (fecthRooms) => set(() => ({ fecthRooms: fecthRooms })),
  setRoomData: (roomData) => set(() => ({ roomData: roomData })),
  setToken: (token) => set(() => ({ token: token })),
  setAccessToken: (accessToken) => set(() => ({ accessToken: accessToken })),
  setRefreshToken: (refreshToken) =>
    set(() => ({ refreshToken: refreshToken })),
  setUserID: (userID) => set(() => ({ userID: userID })),
  setUserDetails: (userDetails) => set(() => ({ userDetails: userDetails })),
}));

export default () => {
  return [
    {
      token: useStore((state) => state.token),
      accessToken: useStore((state) => state.accessToken),
      refreshToken: useStore((state) => state.refreshToken),
      userID: useStore((state) => state.userID),
      roomData: useStore((state) => state.roomData),
      fecthRooms: useStore((state) => state.fecthRooms),
      userDetails: useStore((state) => state.userDetails),
    },
  ];
};
