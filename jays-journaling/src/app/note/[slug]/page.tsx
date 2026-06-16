import { prisma } from "@/src/lib/db";
import NoteEditor from "@/src/components/notes/NoteBox/NoteEditor";
import { notFound } from "next/navigation";

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Convert slug to number since your DB IDs are Integers
  const noteId = parseInt(slug);

  const note = await prisma.note.findUnique({
    where: { id: noteId },
  });

  if (!note) notFound();

  return (
    <div
      className="border-r-4 border-l-4 border-b-4 rounded-lg m-10"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--note-border)",
        minHeight: "calc(100dvh - 5rem)",
      }}
    >
      <NoteEditor
        id={note.id}
        initialText={note.text}
        initialLabel={note.label}
        groupColor={note.groupColor}
      />
    </div>
  );
}
