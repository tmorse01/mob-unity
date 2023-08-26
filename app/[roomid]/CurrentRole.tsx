import React from "react";

interface CurrentRolesProps {
  currentDriver: string;
  currentNavigator: string;
}

const CurrentRoles: React.FC<CurrentRolesProps> = ({
  currentDriver,
  currentNavigator,
}) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <h2 className="text-lg font-semibold">Current Driver and Navigator</h2>
      <div className="text-center">
        <p className="text-gray-600">Driver:</p>
        <p className="text-xl font-bold">{currentDriver}</p>
      </div>
      <div className="text-center">
        <p className="text-gray-600">Navigator:</p>
        <p className="text-xl font-bold">{currentNavigator}</p>
      </div>
    </div>
  );
};

export default CurrentRoles;
