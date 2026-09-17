import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/sanity/queries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight, ShoppingBag, ExternalLink, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Official Merchandise",
  description:
    "Official Grains of Time apparel, merchandise, and collegiate gear supporting NC State's premier all-male a cappella group.",
};

export const revalidate = 60;

export default async function MerchPage() {
  const settings = await getSiteSettings();
  const merchUrl =
    settings?.socialLinks?.merch ||
    "https://ladiesinredncsu.myshopify.com/collections/all";

  return (
    <div className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-14">
        <SectionHeading
          eyebrow="Wolfpack Gear"
          title="Official Merchandise"
          subtitle="Support Grains of Time by wearing official apparel, tour tees, and accessories."
        />
      </div>

      {/* Featured Merch Store Card */}
      <div className="p-8 sm:p-12 bg-grains-surface border border-grains-border rounded-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-grains-border">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-grains-red" />
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Official NC State Partner Store
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-grains-paper">
              Ladies in Red & Grains of Time Collection
            </h3>
            <p className="text-sm text-zinc-400 font-sans max-w-xl leading-relaxed">
              Our merchandise is hosted on the official Ladies in Red Shopify store. Proceeds directly fund student travel, recording production, sheet music arrangements, and showcase staging.
            </p>
          </div>

          <a
            href={merchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-grains-red hover:bg-grains-red-bright text-white font-mono text-xs uppercase tracking-widest rounded-sm transition-colors shadow-sm whitespace-nowrap self-start sm:self-auto"
          >
            <span>Visit Online Store</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Security / Safe External Link Notice */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-zinc-400 font-sans">
          <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-sm space-y-2">
            <div className="flex items-center gap-2 text-zinc-300 font-mono uppercase tracking-wider text-[11px]">
              <ExternalLink className="w-3.5 h-3.5 text-grains-red" />
              <span>External Store Notice</span>
            </div>
            <p className="leading-relaxed">
              Clicking &ldquo;Visit Online Store&rdquo; opens Shopify in a new tab. Orders and payments are handled securely through Shopify&apos;s encrypted checkout.
            </p>
          </div>

          <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-sm space-y-2">
            <div className="flex items-center gap-2 text-zinc-300 font-mono uppercase tracking-wider text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Ensemble Support</span>
            </div>
            <p className="leading-relaxed">
              Every purchase directly benefits active undergraduate vocalists at NC State, making regional tours and album recording possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
