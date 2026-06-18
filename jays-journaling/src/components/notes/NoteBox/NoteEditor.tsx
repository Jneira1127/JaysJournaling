"use client";
import { updateNoteAction } from "@/src/app/action";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { BackArrow } from "../../material-ui-components";

type NoteEditorProps = {
  id: number;
  initialText?: string;
  initialLabel?: string;
  groupColor?: string | null;
};

export default function NoteEditor({
  id,
  initialText,
  initialLabel,
  groupColor,
}: NoteEditorProps) {
  const headerContainerRef = useRef<HTMLDivElement>(null);

  // Create refs for the actual textareas to grab their values for saving
  const labelRef = useRef<HTMLTextAreaElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  // This function gathers current values from both refs and saves to Postgres
  const handleSave = () => {
    const currentLabel = labelRef.current?.value || "";
    const currentText = textRef.current?.value || "";

    // Call the Prisma Server Action
    updateNoteAction(id, currentLabel, currentText);
  };

  return (
    <div>
      <div
        ref={headerContainerRef}
        className="font-righteous flex border-t-3 border-b-3 justify-center items-center sticky top-0 z-10"
        style={{
          background: groupColor || "var(--card-footer)",
          height: "6rem",
          paddingBottom: "0.5rem",
          borderColor: "var(--note-border)",
        }}
      >
        <button onClick={() => router.push(`/`)} className="absolute left-3 hover:opacity-60">
          <BackArrow
            className="cursor-pointer"
            sx={{ width: 55, height: 55 }}
            style={{
              color: "var(--note-label-txt-color)",
            }}
          />
        </button>
        <textarea
          ref={labelRef}
          className="bg-transparent outline-none text-center text-3xl w-full resize-none overflow-hidden leading-tight"
          style={{
            color: "var(--note-label-txt-color)",
          }}
          rows={1}
          maxLength={20}
          defaultValue={initialLabel}
          // SAVE TO DB WHEN USER CLICKS AWAY
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
        />
      </div>
      <textarea
        ref={textRef}
        className="font-mono flex text-center w-full bg-transparent resize-none outline-none pt-5 text-lg font-extrabold"
        style={{
          color: "var(--text-card)",
          minHeight: "calc(100dvh - 5rem - 6rem)",
          height: "auto",
        }}
        defaultValue={initialText}
        // SAVE TO DB WHEN USER CLICKS AWAY
        onBlur={handleSave}
        onChange={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
      />
    </div>
  );
}
