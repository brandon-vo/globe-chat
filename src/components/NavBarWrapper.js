import { Logo } from "./Icon";

function NavBarWrapper({ children }) {
  return (
    <nav className="fixed left-0 right-0">
      <div className="bg-gray-100 dark:bg-gray-800 px-8 py-5 flex justify-between">
        <Logo />
        {children}
      </div>
    </nav>
  );
}

export default NavBarWrapper;
