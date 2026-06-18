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
      className={`w-full text-center text-white px-3 py-2 text-sm transition-colors bg-[#2E2E2E] hover:bg-[#444555] ${className}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default DropdownItem;
