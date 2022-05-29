import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useServerCheck } from '../hooks/useServerCheck';
import { Notify } from '../services/Notify';

import { IServer } from '../@types';

const checkIntervalValues = [
  { value: 0, text: 'Disabled' },
  { value: 30 * 1000, text: '30s' },
  { value: 60 * 1000, text: '1min' },
  { value: 5 * 60 * 1000, text: '5min' },
  { value: 10 * 60 * 1000, text: '10min' },
  { value: 30 * 60 * 1000, text: '30min' },
];

export function ServerCard({ server }: { server: IServer }) {
  const { servers } = useServerCheck();
  const [online, setOnline] = useState(false);
  const [checkInterval, setCheckInterval] = useState(server.checkInterval!);
  const [lastDateCheck, setLastDateCheck] = useState<Date>();
  const [dropdownOpened, setDropdownOpened] = useState(false);

  function handleDropdown() {
    setDropdownOpened((prev) => !prev);
  }

  function handleDelete() {
    servers.deleteById(server.id);
  }

  function handleUpdateInterval(event: ChangeEvent<HTMLSelectElement>) {
    const value = Number(event.target.value);

    setCheckInterval(value);
    servers.update({
      ...server,
      checkInterval: value,
    });
  }

  async function isOnline({ notify = true } = {}) {
    setLastDateCheck(new Date());

    try {
      await fetch(server.url, {
        mode: 'no-cors',
        method: 'HEAD',
      });

      setOnline(true);
    } catch {
      setOnline(false);

      if (notify) {
        Notify.send(
          `${server.name} server is off-line ⚠️`,
          `URL: ${server.url}`
        );
      }
    }
  }

  useEffect(() => {
    (async () => {
      await isOnline({ notify: false });
    })();
  }, []);

  useEffect(() => {
    if (checkInterval > 0) {
      const intervalId = setInterval(isOnline, checkInterval);

      return () => clearInterval(intervalId);
    }
  }, [checkInterval]);

  return (
    <li>
      <article className="bg-zinc-50 rounded-2xl h-full p-4 transition-colors w-full shadow dark:bg-zinc-800">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 px-2 py-1 rounded-full transition-colors bg-zinc-100 dark:bg-zinc-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
              />
            </svg>

            {online ? (
              <span className="inline-block rounded-full h-4 w-4 bg-green-600 dark:bg-green-500"></span>
            ) : (
              <span className="inline-block rounded-full h-4 w-4 bg-red-600 dark:bg-red-500"></span>
            )}

            <span className="text-sm font-semibold">
              {online ? (
                <span className="text-green-600 dark:text-green-500">
                  Online
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-500">Offline</span>
              )}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <select
              onChange={handleUpdateInterval}
              defaultValue={checkInterval}
              className="appearance-none cursor-pointer px-2 py-1 rounded-lg bg-zinc-100 transition-colors dark:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-200 dark:focus:ring-zinc-600"
            >
              {checkIntervalValues.map(({ value, text }) => (
                <option key={value} value={value}>
                  {text}
                </option>
              ))}
            </select>

            <button
              onClick={() => isOnline({ notify: false })}
              className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              <span className="sr-only">Refresh</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>

            <div className="flex items-center justify-center relative">
              <button
                onClick={handleDropdown}
                className={`p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 ${
                  dropdownOpened && 'bg-zinc-100 dark:bg-zinc-900'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
                <span className="sr-only">More options</span>
              </button>

              {dropdownOpened && (
                <ul className="absolute top-full mt-1 right-0 overflow-hidden min-w-[136px] bg-zinc-100 shadow py-1 rounded-xl transition-colors dark:bg-zinc-900">
                  <li className="transition-colors w-full hover:bg-zinc-200 dark:hover:bg-zinc-800">
                    <Link
                      to={`/edit/${server.id}`}
                      tabIndex={0}
                      className="block px-4 py-2 w-full text-left"
                    >
                      Edit
                    </Link>
                  </li>
                  <li className="transition-colors w-full hover:bg-zinc-200 dark:hover:bg-zinc-800">
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 w-full text-left text-red-600 dark:text-red-500"
                    >
                      Remove
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <h3 className="mt-2 text-lg font-semibold lg:text-xl">{server.name}</h3>

        <hr className="mt-4 bg-zinc-700" />

        <div className="mt-4">
          <div>
            <p className="uppercase font-semibold text-zinc-700 text-sm dark:text-zinc-200">
              URL
            </p>
            <p className="font-medium mt-0">
              <a
                href={server.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:underline-offset-2"
              >
                {server.url}
              </a>
            </p>
          </div>

          <div className="mt-4">
            <p className="uppercase font-semibold text-zinc-700 text-sm dark:text-zinc-200">
              Last Check
            </p>
            <p className="font-medium mt-0">
              <time dateTime={lastDateCheck?.toISOString()}>
                {lastDateCheck?.toLocaleString()}
              </time>
            </p>
          </div>
        </div>
      </article>
    </li>
  );
}
