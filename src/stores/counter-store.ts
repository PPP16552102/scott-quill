import { createStore } from 'zustand/vanilla';

export type CounterState = {
  count: number
}

export type CounterActions = {
  decrement: () => void;
  increment: () => void;
}

export type CounterStore = CounterState & CounterActions;
  
export const defaultInitState: CounterState = {
  count: 0
}

export const createCounterStore = (initState: CounterState = defaultInitState) => { 
  return createStore<CounterStore>()((set) => ({ 
    ...initState,
    decrement: () => set((state) => ({ count: state.count - 1 })),
    increment: () => set((state) => ({ count: state.count + 1 })),
  }))
}