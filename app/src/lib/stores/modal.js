import { writable } from 'svelte/store'

export function openmodal(initial) {
  const isOpen = writable(initial)
  const { set, update } = isOpen
  return {
    isOpen,
    open: () => set(true),
    close: () => set(false),
    toggle: () => update((n) => !n),
  }
}