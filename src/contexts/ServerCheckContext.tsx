import { createContext, ReactNode } from 'react';

import { generateId } from '../helpers';
import { useStorage } from '../hooks/useStorage';

import { IServer, IServerBasic } from '../@types';

export type IServerCheck = {
  servers: {
    items: IServer[];
    add: (server: IServerBasic) => void;
    update: (server: IServer) => void;
    findById: (id: string) => IServer | undefined;
    deleteById: (id: string) => void;
  };
  defaultCheckInterval: number;
};

export const ServerCheckContext = createContext({} as IServerCheck);

export function ServerCheckProvider({ children }: { children: ReactNode }) {
  const [servers, setServers] = useStorage<IServer[]>('servers', []);
  const defaultCheckInterval = 10 * 60 * 1000;

  function add(server: IServerBasic) {
    setServers((prevServers) => [
      {
        id: generateId(),
        ...server,
        checkInterval: server.checkInterval || defaultCheckInterval,
      },
      ...prevServers,
    ]);
  }

  function update({ id, ...rest }: IServer) {
    setServers(
      servers.map((server) => (server.id === id ? { id, ...rest } : server))
    );
  }

  function findById(id: string) {
    return servers.find((server) => server.id === id);
  }

  function deleteById(id: string) {
    setServers(servers.filter((server) => server.id !== id));
  }

  return (
    <ServerCheckContext.Provider
      value={{
        servers: { items: servers, add, update, findById, deleteById },
        defaultCheckInterval,
      }}
    >
      {children}
    </ServerCheckContext.Provider>
  );
}
