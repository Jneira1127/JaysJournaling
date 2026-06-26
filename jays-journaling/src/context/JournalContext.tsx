"use client";
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { NoteType, GroupType, DbNote, DbGroup } from "@/src/app/types";
import {
  createNoteAction,
  createGroupAction,
  deleteNoteAction,
  updateNoteGroupAction,
  editGroup,
} from "@/src/app/action";

interface JournalContextType {
  addGroup: (name: string, color: string) => Promise<DbGroup | undefined>;
  addNote: () => Promise<DbNote | undefined>;
  deleteSelectedNotes: () => Promise<void>;
  deleteSingleNote: (id: number) => Promise<void>;
  groupSelectedNotes: (groupId: number) => Promise<void>;
  groups: GroupType[];
  notes: NoteType[];
  toggleNoteSelection: (id: number) => void;
  updateGroup: (
    groupId: number,
    name: string,
    color: string,
  ) => Promise<DbGroup | undefined>;
}

interface JournalProviderProps {
  children: ReactNode;
  initialNotes: DbNote[];
  initialGroups: DbGroup[];
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({
  children,
  initialNotes,
  initialGroups,
}: JournalProviderProps) {
  // 1. Only store the IDs of selected notes in state
  const [selectedNoteIds, setSelectedNoteIds] = useState<Set<number>>(
    new Set(),
  );

  // 2. Derive the notes list by combining server props with selection state
  // This is lightning fast and never triggers "cascading renders"
  const notes = useMemo(() => {
    return initialNotes.map((n) => ({
      ...n,
      isSelected: selectedNoteIds.has(n.id),
    }));
  }, [initialNotes, selectedNoteIds]);

  // Groups come directly from server props
  const groups = initialGroups as GroupType[];

  const toggleNoteSelection = (id: number) => {
    setSelectedNoteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addNote = async () => {
    return await createNoteAction();
  };

  const addGroup = async (name: string, color: string) =>
  {return await createGroupAction(name, color)};

  const deleteSingleNote = async (id: number) => {
    await deleteNoteAction(id);
  };

  const deleteSelectedNotes = async () => {
    const ids = Array.from(selectedNoteIds);
    await Promise.all(ids.map((id) => deleteNoteAction(id)));
    setSelectedNoteIds(new Set()); // Clear selection
  };

  const groupSelectedNotes = async (groupId: number) => {
    const targetGroup = groups.find((g) => g.id === groupId);
    if (!targetGroup) return;
    const ids = Array.from(selectedNoteIds);
    await updateNoteGroupAction(ids, targetGroup.color, groupId);
    setSelectedNoteIds(new Set());
  };

  const updateGroup = async (groupId: number, name: string, color: string) => {
    return await editGroup(name, color, groupId);
  };

  return (
    <JournalContext.Provider
      value={{
        addGroup,
        addNote,
        notes,
        groups,
        deleteSelectedNotes,
        deleteSingleNote,
        groupSelectedNotes,
        toggleNoteSelection,
        updateGroup,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context)
    throw new Error("useJournal must be used within JournalProvider");
  return context;
};
