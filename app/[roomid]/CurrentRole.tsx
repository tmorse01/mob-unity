import React from "react";

interface CurrentRolesProps {
  driver: string | undefined;
  navigator: string | undefined;
  mob: string[] | undefined;
}

const CurrentRoles: React.FC<CurrentRolesProps> = ({
  driver,
  navigator,
  mob,
}) => {
  return (
    <div className="prose">
      <h1 className="mb-0">Roles</h1>
      <div className="flex flex-cols gap-8 items-center w-full">
        <div>
          <h3>Driver</h3>
          <p>{driver}</p>
        </div>
        <div>
          <h3>Navigator</h3>
          <p>{navigator}</p>
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
