import fs from "fs";
import { page } from "@/src/app/page";
import NoteEditor from "@/src/components/notes/NoteBox/NoteEditor";
import { notFound } from "next/navigation";

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = fs.readFileSync("src/noteData.json");
  const json = JSON.parse(data.toString()) as page[];
  console.log(json);
  const note = json.find((value) => value.id.toString() === slug);

  if (!note) {
    notFound(); // This shows your 404 page and stops execution
  }

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
        id={note?.id}
        initialText={note?.text}
        initialLabel={note?.label}
        groupColor={note?.groupColor}
      />
    </div>
  );
}
