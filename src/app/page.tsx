"use client";

import { useGetPokemonByNameQuery } from "@/lib/services/pokemon";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const { data, error, isLoading } = useGetPokemonByNameQuery("pikachu");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">🌙 Dark / ☀️ Light Theme</h1>
      <ThemeToggle />

      <div className="mt-6 p-4 dark:bg-red-500 bg-gray-100 rounded-lg w-96">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error fetching data</p>}
        {data && (
          <div>
            <h2 className="text-xl font-bold">{data.name}</h2>
            <img
              src={data.sprites.front_default}
              alt={data.name}
              className="mt-2"
            />
          </div>
        )}
      </div>
    </main>
  );
}
