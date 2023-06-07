import { create } from "zustand";

type TimeStore = {
  time: number;
  timeUp: () => void;
  resetTime: () => void;
};

const useTime = create<TimeStore>((set) => ({
  time: 0,
  timeUp: () => set((state) => ({ time: state.time + 1 })),
  resetTime: () => set(() => ({ time: 0 })),
}));

export default useTime;
