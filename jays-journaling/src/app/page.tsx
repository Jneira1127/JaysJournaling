import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-600 font-sans">
      <div className="h-30 font-sans">Jays Journaling App</div>
      <div className="w-50 h-50 bg-red-500"></div>
    </div>
  );
}
