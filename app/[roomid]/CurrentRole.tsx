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
    <div className="flex flex-col items-center space-y-2">
      <div className="text-center">
        <p className="text-gray-600">Driver:</p>
        <p className="text-xl font-bold">{driver}</p>
      </div>
      <div className="text-center">
        <p className="text-gray-600">Navigator:</p>
        <p className="text-xl font-bold">{navigator}</p>
      </div>
      {facilitator && (
        <div className="text-center">
          <p className="text-gray-600">Facilitator:</p>
          <p className="text-xl font-bold">{facilitator}</p>
        </div>
      )}
      <div className="flex flex-row gap-4">
        <p className="text-gray-600">Mobsters:</p>
        {mob?.map((mobster, i) => (
          <div key={mobster + i} className="text-center">
            <p className="text-xl font-bold">{mobster}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentRoles;
