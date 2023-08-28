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
    <div className="prose">
      <div className="flex flex-cols gap-4 items-center">
        <h1 className="mb-0">Roles</h1>
        <div className="flex gap-4">
          <div>
            <h3>Driver</h3>
            <p>{driver}</p>
          </div>
          <div>
            <h3>Navigator</h3>
            <p>{navigator}</p>
          </div>
          <div>
            <h3>Facilitator</h3>
            <p>{facilitator}</p>
          </div>
        </div>
      </div>
      <div className="prose">
        <div className="flex flex-cols gap-4 items-center">
          <h2 className="mb-12">Mob</h2>
          <div className="flex flex-row gap-4">
            {mob?.map((mobster, i) => (
              <div key={mobster + i} className="text-center">
                <p>{mobster}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentRoles;
