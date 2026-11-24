import ServerList from "@/components/ServerList";

export const metadata = {
  title: "Server | Blade Tiers",
  description: "Verified Minecraft PvP servers for tier testing.",
};

export default function ServerPage() {
  return (
    <main className="pb-24 pt-32">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Servers</h1>
        <p className="mt-3 text-white/60">
          Verified servers. Click the copy icon to grab an IP.
        </p>
      </div>

      <ServerList />
    </main>
  );
}