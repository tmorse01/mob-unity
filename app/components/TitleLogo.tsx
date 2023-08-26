import Logo from "./Logo";

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
      <h1 className={titleClassName}>Mob Unity</h1>
    </div>
  );
};

export default TitleLogo;
