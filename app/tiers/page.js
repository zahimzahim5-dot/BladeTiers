import Leaderboard from "@/components/Leaderboard";

export const metadata = {
  title: "Tiers | Blade Tiers",
  description: "The full Blade Tiers player tier list.",
};

export default function TiersPage() {
  return (
    <main className="pb-24 pt-28">
      <Leaderboard />
    </main>
  );
}