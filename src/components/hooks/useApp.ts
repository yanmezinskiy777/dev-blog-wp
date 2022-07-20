import { createContext, useContext } from 'react';
import { SiteProps } from '../../pages/_app';

const initalState = {
  metadata: {
    title: 'Dev Blog',
    siteTitle: 'Dev Blog',
    description: 'Dev Blog',
    social: undefined,
    webmaster: {},
    twitter: {
      username: undefined,
      cardType: undefined,
    },
  },
};

export const AppContext = createContext<SiteProps>(initalState);

export function useAppContext(data: SiteProps): SiteProps {
  return data;
}

export default function useApp() {
  const app = useContext(AppContext);
  return app;
}
