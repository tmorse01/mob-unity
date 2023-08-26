import Logo from "./Logo";
import Link from "next/link";

type TitleLogoProps = {
  className: string;
  logoClassName: string;
  titleClassName: string;
};

const TitleLogo = ({
  className,
  logoClassName,
  titleClassName,
}: TitleLogoProps) => {
  return (
    <div className={className}>
      <Logo className={logoClassName} />
      <h1 className={titleClassName}>
        <Link href="/">Mob Unity</Link>
      </h1>
    </div>
  );
};

export default TitleLogo;
