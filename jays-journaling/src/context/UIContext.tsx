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
  activeActions: boolean;
  activeFilterId: number | null;
  activeSorting: boolean;
  burgerRef: RefObject<HTMLDivElement | null>;
  closeAllSidebars: () => void;
  editingGroupName: boolean;
  headerColor: string;
  headerTitle: string;
  isAddingGroup: boolean;
  openBurger: boolean;
  openGroups: boolean;
  pendingGroupName: string;
  selectedGroupId: number | null;
  setActiveActions: (val: boolean) => void;
  setActiveFilterId: (id: number | null) => void;
  setActiveSorting: (val: boolean) => void;
  setEditingGroupName: (val: boolean) => void;
  setHeaderColor: (val: string) => void;
  setHeaderTitle: (val: string) => void;
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
  const [activeActions, setActiveActions] = useState(false);
  const [activeFilterId, setActiveFilterId] = useState<number | null>(null);
  const [activeSorting, setActiveSorting] = useState(false);
  const burgerRef = useRef<HTMLDivElement>(null);
  const [editingGroupName, setEditingGroupName] = useState(false);
  const [headerColor, setHeaderColor] = useState("var(--header-bg)");
  const [headerTitle, setHeaderTitle] = useState("Jays Journaling App");
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [openBurger, setOpenBurger] = useState(false);
  const [openGroups, setOpenGroups] = useState(false);
  const [pendingGroupName, setPendingGroupName] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleGrouping, setVisibleGrouping] = useState(false);

  const closeAllSidebars = () => {
    setOpenBurger(false);
    setOpenGroups(false);
  };

  return (
    <UIContext.Provider
      value={{
        activeActions,
        activeFilterId,
        activeSorting,
        burgerRef,
        closeAllSidebars,
        editingGroupName,
        headerColor,
        headerTitle,
        isAddingGroup,
        openBurger,
        openGroups,
        pendingGroupName,
        selectedGroupId,
        setActiveActions,
        setActiveFilterId,
        setActiveSorting,
        setEditingGroupName,
        setHeaderColor,
        setHeaderTitle,
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
