import { MouseEventHandler } from "react";

interface IDropdownItemProps<T> {
  className?: string;
  disabled?: boolean;
  onClick: MouseEventHandler<T>;
}

const DropdownItem = ({
  className = "",
  disabled = false,
  onClick,
  children,
}: React.PropsWithChildren<IDropdownItemProps<HTMLButtonElement>>) => {
  return (
    <button
      className={`w-full text-center px-3 py-2 text-sm transition-colors font-rubik
        bg-sidebar text-text-main hover:bg-sidebar-group-hover-bg 
        border-b-2 border-sidebar-border last:border-b-0 pointer-cursor ${className}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default DropdownItem;
