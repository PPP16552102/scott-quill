import { createStore } from 'zustand/vanilla';

interface MenuItem { 
  name: string;
  href: string;
  external?: boolean;
}

export type MenuState = {
  menus: MenuItem[]
}

export type MenuActions = {
  setMenu: () => void;
}

export type MenuStore = MenuState & MenuActions;
  
export const defaultInitState: MenuState = {
  menus: []
}

export const createMenuStore = (initState: MenuState = defaultInitState) => { 
  return createStore<MenuStore>()((set) => ({ 
    ...initState,
    setMenu: () => set((state) => ({ menus: state.menus})),
  }))
}