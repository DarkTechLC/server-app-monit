import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Container, Header } from '../../components/Containers';
import { Logo } from '../../components/Logo';
import { ServerCard } from '../../components/ServerCard';
import { ToggleThemeButton } from '../../components/ToggleThemeButton';

import { useServerCheck } from '../../hooks/useServerCheck';
import { Notify } from '../../services/Notify';

export function DashboardHome() {
  const { servers } = useServerCheck();

  useEffect(() => {
    Notify.allow();
  }, []);

  return (
    <Container>
      <Header>
        <Logo />

        <div className="flex items-center justify-center gap-2">
          <ToggleThemeButton />

          <Link
            to="/new"
            tabIndex={0}
            className="inline-flex items-center justify-center gap-2 rounded-xl p-2 bg-blue-500 text-zinc-50 font-semibold transition-colors md:px-4 md:py-3 hover:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="sr-only sm:not-sr-only">Add server</span>
          </Link>
        </div>
      </Header>

      <main className="py-4">
        {servers.items.length === 0 ? (
          <div className="text-center max-w-md mx-auto py-52">
            <p className="text-lg text-zinc-700 dark:text-zinc-200">
              No registered server
            </p>
            <Link
              to="/new"
              tabIndex={0}
              className="inline-block mt-2 text-blue-500 font-semibold"
            >
              Add server
            </Link>
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servers.items?.map((server) => (
              <ServerCard key={server.id} server={server} />
            ))}
          </ul>
        )}
      </main>
    </Container>
  );
}
