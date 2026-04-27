import Image from "next/image";
import NoteBox from "../components/NoteBox";
import AddNoteButton from "../components/AddNoteButton";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-600 font-sans">
      <div className="flex h-30 font-sans items-center text-5xl">Jay's Journaling App</div>
      <div className="flex w-450 h-300 bg-red-500 justify-center rounded-lg">
        <NoteBox></NoteBox>
        <AddNoteButton></AddNoteButton>
      </div>
    </div>
  );
}
