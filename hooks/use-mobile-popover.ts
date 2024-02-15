import { create } from "zustand";

type MobilePopoverStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useMobilePopover = create<MobilePopoverStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
