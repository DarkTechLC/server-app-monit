import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <h1 className="font-semibold text-lg text-zinc-800 md:text-xl dark:text-zinc-200">
      <Link to="/">Server App Monitor</Link>
    </h1>
  );
}
