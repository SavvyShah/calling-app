import { AircallIcon } from "./AircallIcon";

export const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 shadow-sm h-18 max-w-md w-full z-1">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <AircallIcon size={120} />
      </div>
    </nav>
  );
};
