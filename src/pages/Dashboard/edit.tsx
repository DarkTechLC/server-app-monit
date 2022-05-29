import { FormEvent, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { Container, Header } from '../../components/Containers';
import { BackButton } from '../../components/BackButton';
import { ToggleThemeButton } from '../../components/ToggleThemeButton';

import { useServerCheck } from '../../hooks/useServerCheck';

export function DashboardEdit() {
  const { servers } = useServerCheck();

  const { serverId = '' } = useParams();

  const server = servers.findById(serverId);

  if (!server) {
    return <Navigate to="/" />;
  }

  const [name, setName] = useState(server.name);
  const [url, setUrl] = useState(server.url);

  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    servers.update({ id: String(server?.id), name, url });
    navigate('/');
  }

  return (
    <Container>
      <Header>
        <div className="flex items-center justify-center gap-8">
          <BackButton />
        </div>

        <div className="flex items-center justify-center gap-2">
          <ToggleThemeButton />
        </div>
      </Header>

      <main className="max-w-xl mx-auto py-20">
        <h1 className="font-semibold text-2xl md:text-3xl">Edit App Server</h1>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          <label>
            <span className="block font-semibold">Server name</span>
            <input
              type="text"
              value={name}
              placeholder="Ex: Server 1"
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full p-4 rounded-xl bg-zinc-50 text-zinc-900 text-base border-2 border-transparent placeholder:text-zinc-500 transition-colors focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-600"
            />
          </label>

          <label>
            <span className="block font-semibold">URL</span>
            <input
              type="url"
              value={url}
              placeholder="Ex: https://example.com"
              onChange={(event) => setUrl(event.target.value)}
              className="mt-1 w-full p-4 rounded-xl bg-zinc-50 text-zinc-900 text-base border-2 border-transparent placeholder:text-zinc-500 transition-colors focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-600"
            />
          </label>

          <button
            type="submit"
            disabled={name.trim() === '' || url.trim() === ''}
            className="inline-flex items-center justify-center gap-2 rounded-xl p-4 bg-blue-500 text-zinc-50 font-semibold transition-colors md:px-4 md:py-3 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 disabled:cursor-not-allowed disabled:bg-opacity-60"
          >
            Save
          </button>
        </form>
      </main>
    </Container>
  );
}
