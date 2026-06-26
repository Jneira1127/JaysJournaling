import { prisma } from "@/src/lib/db";
import ClientShell from "./ClientShell";

// This is now an async Server Component
export default async function Home() {
  // Fetch all notes and groups from the database on the server
  const dbNotes = await prisma.note.findMany({
    include: { group: true },
  });

  const dbGroups = await prisma.group.findMany({
    include: {
      notes: true, // This will include the notes associated with each group
    },
  });

  // Pass the fetched data as props to your existing ClientShell component
  return <ClientShell dbNotes={dbNotes} dbGroups={dbGroups} />;
}
