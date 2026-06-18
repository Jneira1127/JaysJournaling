export type NoteType = {
  id: number;
  label: string;
  text: string;
  isSelected: boolean;
  groupColor?: string | null;
  groupId?: number | null;
};

export type GroupType = {
  id: number;
  name: string;
  notes: NoteType[];
  color: string;
};

// Database helper types
export type DbNote = Omit<NoteType, "isSelected">;
export type DbGroup = Omit<GroupType, "notes"> & { notes: DbNote[] };