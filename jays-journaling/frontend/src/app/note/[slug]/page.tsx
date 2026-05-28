import fs from "fs";
import { page } from "@/src/app/page";

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(__dirname);

  const data = fs.readFileSync("src/noteData.json");
  const json = JSON.parse(data.toString()) as page[];
  console.log(json);
  const note = json.find((value) => {
    console.log(value.id.toString() === slug);

    return value.id.toString() === slug;
  });
  return <div>{note?.text}</div>;
}
