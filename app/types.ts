export type Roles = {
  driver: string | undefined;
  navigator: string | undefined;
  facilitator: string | undefined;
  mob: string[] | undefined;
};

export type Goal = {
  id: string;
  title: string;
  description: string;
  complete: boolean;
};
