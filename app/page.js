import TopFivePodium from "@/components/TopFivePodium";
import { siteConfig } from "@/data/siteConfig";

export default function Home() {
  return (
    <main className="pb-24 pt-32">
      <div className="mx-auto mb-12 max-w-5xl px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="mt-3 text-white/60">{siteConfig.tagline}</p>
      </div>

      <TopFivePodium />
    </main>
  );
}