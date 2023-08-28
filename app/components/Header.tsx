import React from "react";
import TitleLogo from "./TitleLogo";
import ThemeSwitcher from "./ThemeSelect";

const Header: React.FC = () => {
  return (
    <header className="prose py-4 w-100 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <TitleLogo
          className="prose flex items-center justify-center gap-8"
          titleClassName="text-2xl font-bold"
          logoClassName="w-8 h-8"
        />
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
