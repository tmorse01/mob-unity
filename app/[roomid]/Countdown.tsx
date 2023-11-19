type CountdownProps = {
  remainingTime: number;
};

const Countdown = ({ remainingTime }: CountdownProps) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const timerClass = remainingTime < 30 ? "text-error animate-pulse" : "";

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className={"countdown font-mono text-5xl"}>
          <span
            className={timerClass}
            // @ts-ignore
            style={{ "--value": minutes }}
          ></span>
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className={"countdown font-mono text-5xl"}>
          <span
            className={timerClass}
            // @ts-ignore

            style={{ "--value": seconds }}
          ></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default Countdown;
