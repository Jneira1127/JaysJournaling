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
  isAddingGroup: boolean;
  openBurger: boolean;
  openGroups: boolean;
  pendingGroupName: string;
  selectedGroupId: number | null;
  setIsAddingGroup: (val: boolean) => void;
  setOpenBurger: (val: boolean) => void;
  setOpenGroups: (val: boolean) => void;
  setPendingGroupName: (val: string) => void;
  setSelectedGroupId: (id: number | null) => void;
  setVisibleDelete: (val: boolean) => void;
  setVisibleGrouping: (val: boolean) => void;
  sidebarRef: RefObject<HTMLDivElement | null>;
  visibleDelete: boolean;
  visibleGrouping: boolean;
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
  const [pendingGroupName, setPendingGroupName] = useState("")
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const closeAllSidebars = () => {
    setOpenBurger(false);
    setOpenGroups(false);
  };


  return (
    <UIContext.Provider
      value={{
        burgerRef,
        closeAllSidebars,
        isAddingGroup,
        openBurger,
        openGroups,
        pendingGroupName,
        selectedGroupId,
        setIsAddingGroup,
        setOpenBurger,
        setOpenGroups,
        setPendingGroupName,
        setSelectedGroupId,
        setVisibleDelete,
        setVisibleGrouping,
        sidebarRef,
        visibleDelete,
        visibleGrouping,
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
