import { useContext } from 'react';

import { ServerCheckContext } from '../contexts/ServerCheckContext';

export function useServerCheck() {
  return useContext(ServerCheckContext);
}
