import AddNoteButton from "./sidebar/AddNoteButton";
import { Hamburger } from "../material-ui-components";

const Header = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="relative flex justify-center items-center align h-30 bg-zinc-600 min-h-[10vh] min-w-[100vw] sticky top-0 ">
      <div className="absolute left-4">
        <Hamburger className="text-lg cursor-pointer">
          <AddNoteButton onClick={onClick} />
        </Hamburger>
      </div>
      <h1 className=" font-sans text-5xl">Jays Journaling App</h1>
    </div>
  );
};

export default Header;
