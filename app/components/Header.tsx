import React from "react";
import TitleLogo from "./TitleLogo";

const Header: React.FC = () => {
  return (
    <header className="bg-neutral py-4 w-100 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <TitleLogo
          className="prose flex items-center justify-center gap-8"
          titleClassName="text-2xl font-bold"
          logoClassName="w-8 h-8"
        />
      </div>
    </header>
  );
};

export default Header;
