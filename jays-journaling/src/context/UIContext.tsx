"use client";
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  RefObject,
} from "react";

interface UIContextType {
  burgerRef: RefObject<HTMLDivElement | null>;
  closeAllSidebars: () => void;
  openBurger: boolean;
  setOpenBurger: (val: boolean) => void;
  openGroups: boolean;
  setOpenGroups: (val: boolean) => void;
  visibleDelete: boolean;
  setVisibleDelete: (val: boolean) => void;
  visibleGrouping: boolean;
  setVisibleGrouping: (val: boolean) => void;
  selectedGroupId: number | null;
  setSelectedGroupId: (id: number | null) => void;
  sidebarRef: RefObject<HTMLDivElement | null>;
  isAddingGroup: boolean;
  setIsAddingGroup: (val: boolean) => void;
}

interface UIProviderProps {
  children: ReactNode;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: UIProviderProps) {
  const burgerRef = useRef<HTMLDivElement>(null);
  const [openBurger, setOpenBurger] = useState(false);
  const [openGroups, setOpenGroups] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleGrouping, setVisibleGrouping] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const closeAllSidebars = () => {
    setOpenBurger(false);
    setOpenGroups(false);
  };


  return (
    <UIContext.Provider
      value={{
        burgerRef,
        openBurger,
        setOpenBurger,
        openGroups,
        setOpenGroups,
        visibleDelete,
        setVisibleDelete,
        visibleGrouping,
        setVisibleGrouping,
        selectedGroupId,
        setSelectedGroupId,
        sidebarRef,
        isAddingGroup,
        setIsAddingGroup,
        closeAllSidebars,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
};
