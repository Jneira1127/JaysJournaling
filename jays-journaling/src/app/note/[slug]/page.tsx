import fs from "fs";
import { page } from "@/src/app/page";
import NoteEditor from "@/src/components/notes/NoteBox/NoteEditor";

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = fs.readFileSync("src/noteData.json");
  const json = JSON.parse(data.toString()) as page[];
  console.log(json);
  const note = json.find((value) => {
    console.log(value.id.toString() === slug);

    return value.id.toString() === slug;
  });
  return (
    <div
      className="border-3 rounded-lg overflow-hidden m-10"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--note-border)",
        minHeight: "calc(100vh - 5rem)",
      }}
    >
      {/* <div
        className="font-oi relative flex justify-center items-center h-20 text-3xl"
        style={{
          background: note?.groupColor || "var(--card-footer)",
          color: "var(--note-label-txt-color)",
        }}
      >
        {note?.label}
      </div> */}
      <NoteEditor
        initialText={note?.text}
        initialLabel={note?.label}
        groupColor={note?.groupColor}
      />
    </div>
  );
}
