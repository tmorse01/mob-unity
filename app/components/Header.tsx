import React from "react";
import TitleLogo from "./TitleLogo";
import ThemeSwitcher from "./ThemeSelect";

const Header: React.FC = () => {
  return (
    <header className="prose w-100 px-8 flex items-center justify-between">
      <div className="container mx-auto flex justify-between items-center">
        <TitleLogo
          className="prose flex items-center justify-center gap-8"
          titleClassName="text-3xl font-bold"
          logoClassName="w-12 h-12"
        />
        <ThemeSwitcher className="absolute right-2 mt-2" />
      </div>
    </header>
  );
};

export default Header;
