import { Brand } from "./Icon";

import { ReactNode } from "react";

function NavBarWrapper({ children }: { children: ReactNode }) {
  return (
    <nav className="fixed left-0 right-0 z-10">
      <div className="bg-gray-100 dark:bg-gray-800 px-8 py-5 flex justify-between">
        <Brand />
        {children}
      </div>
    </nav>
  );
}

export default NavBarWrapper;
