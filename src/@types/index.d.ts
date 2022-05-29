export type IServerBasic = {
  name: string;
  url: string;
  checkInterval?: number;
};

export type IServer = IServerBasic & {
  id: string;
};
