import { Hamburger } from "../material-ui-components";

type HeaderProps = {
  handleCloseBurger: () => void;
  handleOpenBurger: (value: boolean) => void;
  openBurger: boolean;
  burgerRef: React.RefObject<HTMLDivElement | null>;
};

const Header = ({
  handleCloseBurger,
  handleOpenBurger,
  openBurger,
  burgerRef,
}: HeaderProps) => {
  return (
    <div className="relative flex justify-center items-center h-30 border-b-4 border-gray-400 bg-black min-h-[10vh] min-w-[100vw] sticky top-0 z-50 overflow-visible">
      <div className="absolute left-4" ref={burgerRef}>
        <Hamburger
          onClick={() =>
            openBurger ? handleCloseBurger() : handleOpenBurger(true)
          }
          className="relative text-lg cursor-pointer"
          sx={{ width: 60, height: 60 }}
        />
      </div>
      <h1 className="font-sans text-5xl text-white">Jays Journaling App</h1>
    </div>
  );
};

export default Header;
