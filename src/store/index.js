import { create } from "zustand";

export const useStore = create((set) => ({
  token: null,
  accessToken: null,
  userID: null,
  roomData: null,
  fecthRooms: false,
  userDetails: {},
  profileToken:null,

  setFecthRooms: (fecthRooms) => set(() => ({ fecthRooms: fecthRooms })),
  setRoomData: (roomData) => set(() => ({ roomData: roomData })),
  setToken: (token) => set(() => ({ token: token })),
  setAccessToken: (accessToken) => set(() => ({ accessToken: accessToken })),
  setUserID: (userID) => set(() => ({ userID: userID })),
  setUserDetails: (userDetails) => set(() => ({ userDetails: userDetails })),
  setProfileToken: (profileToken) => set(() => ({ profileToken: profileToken })),

}));

export default () => {
  return [
    {
      token: useStore((state) => state.token),
      accessToken: useStore((state) => state.accessToken),
      userID: useStore((state) => state.userID),
      roomData: useStore((state) => state.roomData),
      fecthRooms: useStore((state) => state.fecthRooms),
      userDetails: useStore((state) => state.userDetails),
      profileToken: useStore((state) => state.profileToken),

      
    },
  ];
};
