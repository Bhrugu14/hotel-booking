import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { GetUserRegister } from "../api/models/usersAPITypes";

interface AuthStoreFn {
  resetStore: () => void;
  setAuthUser: (data: GetUserRegister | null) => void;
}

interface stateProps {
  currentUser: GetUserRegister | null;
  isLoggedIn: boolean;
}

const initialState: stateProps = {
  currentUser: null,
  isLoggedIn: false,
};

type Store = AuthStoreFn & stateProps;

export const useAuthStore = create(
  persist<Store>(
    (set) => ({
      ...initialState,
      resetStore: () => set(initialState),
      setAuthUser: (data) => {
        set(
          produce((state) => {
            state.currentUser = data;
            state.isLoggedIn = !!data;
          })
        );
      },
    }),
    {
      name: "auth-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      onRehydrateStorage: (state) => {
        console.log("auth-store hydration starts", state);
        // optional
        return (state, error) => {
          console.log("auth-store hydration Options", state);
          if (error) {
            console.log("an error happened during auth-store hydration", error);
          } else {
            console.log("auth-store hydration finished");
          }
        };
      },
    }
  )
);
