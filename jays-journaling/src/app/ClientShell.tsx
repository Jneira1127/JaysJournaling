"use client";
import { UIProvider } from "../context/UIContext";
import { JournalProvider } from "../context/JournalContext";
import Header from "../components/header/Header";
import Sidebar from "../components/header/sidebar/Sidebar";
import Notes from "../components/notes/Notes";
import { DbNote, DbGroup } from "./types";

export default function ClientShell({
  dbNotes,
  dbGroups,
}: {
  dbNotes: DbNote[];
  dbGroups: DbGroup[];
}) {
  return (
    <UIProvider>
      <JournalProvider initialNotes={dbNotes} initialGroups={dbGroups}>
        <div className="flex flex-col w-screen h-screen font-sans">
          <Header />
          <div className="flex flex-1 w-full overflow-hidden">
            <Sidebar />
            <Notes />
          </div>
        </div>
      </JournalProvider>
    </UIProvider>
  );
}
