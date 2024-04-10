// file: stores/modalStore.ts
import type { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';

interface ModalState {
  isOpen: boolean;
  content: typeof SvelteComponent<Record<string, any>> | null;
  props: Record<string, any>;
  onClose: () => void;
  onSubmit?: (data: any) => void;
  widthOverride: number | undefined;
}

function createModalStore() {
  const { subscribe, set, update } = writable<ModalState>({
    isOpen: false,
    content: null,
    props: {},
    onClose: () => {
      return;
    },
    widthOverride: undefined,
  });

  return {
    subscribe,
    open: (
      content: typeof SvelteComponent<Record<string, any>>,
      props: Record<string, any> = {},
      onClose: () => void = () => {
        return;
      },
      onSubmit?: (data: any) => void,
      widthOverride?: number,
    ) => {
      set({ isOpen: true, content, props, onClose, onSubmit, widthOverride });
    },
    close: () => {
      update((n) => {
        if (n.onClose) n.onClose();
        return { ...n, isOpen: false };
      });
    },
    submit: (data: any) => {
      update((n) => {
        if (n.onSubmit) n.onSubmit(data);
        return { ...n, isOpen: false };
      });
    },
  };
}

export const modalStore = createModalStore();
