import AddNoteButton from "./sidebar/AddNoteButton";
import { Hamburger, IconButton } from "../material-ui-componets";

const Header = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex h-30 border-orange-500 border-2">
      <Hamburger className="text-lg"/>
      <h1 className=" font-sans text-5xl">Jays Journaling App</h1>
      <div className="border-orange-500 border-2 h-40 w-40 sticky top-0">
        <AddNoteButton onClick={onClick} />
      </div>
    </div>
  );
};

export default Header;
