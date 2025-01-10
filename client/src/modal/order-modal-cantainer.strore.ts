import { create } from 'zustand';

type ModalStore = {
    isOpen: boolean;
    project: string | null;
    title: string | null;
    openModal: (project: string, title: string) => void;
    closeModal: () => void;
  };

  export const useModalStore = create<ModalStore>((set) => ({
    isOpen: false,
    project: null,
    title: null,
    openModal: (project: string, title: string) =>
      set({ isOpen: true, project, title }),
    closeModal: () =>
      set({ isOpen: false, project: null, title: null }),
  }));