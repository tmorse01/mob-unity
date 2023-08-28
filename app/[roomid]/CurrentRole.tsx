import React from "react";

interface CurrentRolesProps {
  driver: string | undefined;
  navigator: string | undefined;
  facilitator: string | undefined;
  mob: string[] | undefined;
}

const CurrentRoles: React.FC<CurrentRolesProps> = ({
  driver,
  navigator,
  facilitator,
  mob,
}) => {
  return (
    <div className="prose flex flex-col items-center justify-center space-y-2">
      <div className="flex flex-row gap-8">
        <div className="text-center">
          <h3 className="mb-0 mt-0">Driver</h3>
          <p>{driver}</p>
        </div>
        <div className="text-center">
          <h3 className="mb-0 mt-0">Navigator</h3>
          <p>{navigator}</p>
        </div>
        {facilitator && (
          <div className="text-center">
            <h3 className="mb-0 mt-0">Facilitator</h3>
            <p>{facilitator}</p>
          </div>
        )}
      </div>
      <div className="container">
        <h3 className="mb-0 mt-0 text-center">Mob</h3>
        <div className="flex flex-row gap-8 items-center justify-center">
          {mob?.map((mobster, i) => (
            <div key={mobster + i} className="text-center">
              <p>{mobster}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentRoles;
