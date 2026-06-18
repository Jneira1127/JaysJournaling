"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { NoteType, GroupType, DbNote, DbGroup } from "@/src/app/types";
import {
  createNoteAction,
  deleteNoteAction,
  updateNoteGroupAction,
} from "@/src/app/action";

interface JournalContextType {
  notes: NoteType[];
  groups: GroupType[];
  addNote: () => Promise<void>;
  deleteSingleNote: (id: number) => Promise<void>;
  deleteSelectedNotes: () => Promise<void>;
  groupSelectedNotes: (groupId: number) => Promise<void>;
  toggleNoteSelection: (id: number) => void;
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
  const [notes, setNotes] = useState<NoteType[]>(
    initialNotes.map((n) => ({ ...n, isSelected: false })),
  );
  const [groups] = useState<GroupType[]>(
    initialGroups.map((g) => ({
      ...g,
      notes: g.notes.map((n) => ({ ...n, isSelected: false })),
    })),
  );

  const addNote = async () => {
    const newNote = await createNoteAction();
    setNotes((prev) => [...prev, { ...newNote, isSelected: false }]);
  };

  const deleteSingleNote = async (id: number) => {
    await deleteNoteAction(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const deleteSelectedNotes = async () => {
    const selectedIds = notes.filter((n) => n.isSelected).map((n) => n.id);
    for (const id of selectedIds) {
      await deleteNoteAction(id);
    }
    setNotes((prev) => prev.filter((n) => !n.isSelected));
  };

  const toggleNoteSelection = (id: number) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isSelected: !n.isSelected } : n)),
    );
  };

  const groupSelectedNotes = async (groupId: number) => {
    const targetGroup = groups.find((g) => g.id === groupId);
    if (!targetGroup) return;

    const selectedIds = notes.filter((n) => n.isSelected).map((n) => n.id);
    await updateNoteGroupAction(selectedIds, targetGroup.color, groupId);

    setNotes((prev) =>
      prev.map((n) =>
        n.isSelected
          ? { ...n, isSelected: false, groupColor: targetGroup.color, groupId }
          : n,
      ),
    );
  };

  return (
    <JournalContext.Provider
      value={{
        notes,
        groups,
        addNote,
        deleteSingleNote,
        deleteSelectedNotes,
        toggleNoteSelection,
        groupSelectedNotes,
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
