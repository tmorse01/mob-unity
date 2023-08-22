import React from "react";
import Image from "next/image";
const Logo = () => {
  return (
    <Image
      src="/logos/group-64.png"
      alt="Mobster Logo"
      width={64}
      height={64}
    />
  );
};

export default Logo;
