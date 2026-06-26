"use server";
import { prisma } from "@/src/lib/db";
import { revalidatePath } from "next/cache";

// SAVE/UPDATE NOTE
export async function updateNoteAction(
  id: number,
  label: string,
  text: string,
) {
  try {
    await prisma.note.update({
      where: { id },
      data: { label, text },
    });
    // This tells Next.js to clear the cache for these pages
    revalidatePath("/");
    revalidatePath(`/note/${id}`);
  } catch (error) {
    console.error("Failed to update note:", error);
  }
}

// NOTES SECTION
export async function createNoteAction() {
  const newNote = await prisma.note.create({
    data: { label: "Untitled", text: "Empty Page" },
  });
  revalidatePath("/");
  return newNote;
}

export async function deleteNoteAction(id: number) {
  await prisma.note.delete({ where: { id } });
  revalidatePath("/");
}

export async function updateNoteGroupAction(
  noteIds: number[],
  color: string,
  groupId: number,
) {
  await prisma.note.updateMany({
    where: { id: { in: noteIds } },
    data: { groupColor: color, groupId: groupId },
  });
  revalidatePath("/");
}

// GROUPS SECTION
export async function createGroupAction(name: string, color: string) {
  const newGroup = await prisma.group.create({
    data: { name, color },
    include: { notes: true },
  });
  revalidatePath("/");
  return newGroup;
}

export async function editGroup(name: string, color: string, groupId: number) {
  try {
    const updateGroup = await prisma.group.update({
      where: { id: groupId },
      data: { name, color },
      include: { notes: true },
    });

    // Remove revalidatePath("/") if you want the absolute fastest UI.
    // The Context update below handles the UI.
    return updateGroup;
  } catch (error) {
    console.error("Edit group failed:", error);
    return undefined
  }
}
