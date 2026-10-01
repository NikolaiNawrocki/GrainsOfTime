import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/sanity/queries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowUpRight, ShoppingBag, ExternalLink, ShieldCheck, HeartHandshake } from "lucide-react";

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
    <div className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-grains-white">
      <ScrollReveal direction="up" distance={16} duration={600}>
        <div className="mb-14">
          <SectionHeading
            eyebrow="Wolfpack Gear"
            title="Official Merchandise"
            subtitle="Support Grains of Time by wearing official apparel, tour tees, and accessories."
          />
        </div>
      </ScrollReveal>

      {/* Featured Merch Store Card */}
      <ScrollReveal direction="up" distance={20} duration={650} delay={100}>
        <div className="p-8 sm:p-12 bg-white border border-grains-border rounded-sm space-y-8 shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-grains-border">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-grains-red" />
                <span className="text-xs font-mono uppercase tracking-widest text-grains-muted">
                  Official NC State Partner Store
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-grains-black">
                Ladies in Red & Grains of Time Collection
              </h3>
              <p className="text-sm text-grains-text/80 font-sans max-w-xl leading-relaxed">
                Our merchandise is hosted on the official Ladies in Red Shopify store. Proceeds directly fund student travel, recording production, sheet music arrangements, and showcase staging.
              </p>
            </div>

            <a
              href={merchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-grains-red hover:bg-grains-red-bright text-white font-mono text-xs uppercase tracking-widest rounded-sm transition-colors shadow-subtle whitespace-nowrap self-start sm:self-auto font-medium"
            >
              <span>Visit Online Store</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Security / Safe External Link Notice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-grains-text/80 font-sans">
            <div className="p-5 bg-grains-cream border border-grains-border rounded-sm space-y-2 shadow-subtle">
              <div className="flex items-center gap-2 text-grains-black font-mono uppercase tracking-wider text-[11px] font-semibold">
                <ExternalLink className="w-3.5 h-3.5 text-grains-red" />
                <span>External Store Notice</span>
              </div>
              <p className="leading-relaxed">
                Clicking &ldquo;Visit Online Store&rdquo; opens Shopify in a new tab. Orders and payments are handled securely through Shopify&apos;s encrypted checkout.
              </p>
            </div>

            <div className="p-5 bg-grains-cream border border-grains-border rounded-sm space-y-2 shadow-subtle">
              <div className="flex items-center gap-2 text-grains-black font-mono uppercase tracking-wider text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Direct Ensemble Support</span>
              </div>
              <p className="leading-relaxed">
                Every purchase directly benefits active undergraduate vocalists at NC State, making regional tours and album recording possible.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Direct GoFundMe Campaign Card */}
      <ScrollReveal direction="up" distance={20} duration={650} delay={200}>
        <div className="mt-8 p-8 sm:p-12 bg-white border border-grains-border rounded-sm space-y-6 shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-grains-red" />
                <span className="text-xs font-mono uppercase tracking-widest text-grains-muted">
                  Support & Donations
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-grains-black">
                Official GoFundMe Campaign
              </h3>
              <p className="text-sm text-grains-text/80 font-sans max-w-xl leading-relaxed">
                Support Grains of Time directly! Your contributions fund collegiate competition travel, professional recording production, masterclasses, and vocal arrangements for our student ensemble.
              </p>
            </div>

            <a
              href="https://www.gofundme.com/f/grainsoftime"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#02A95C] hover:bg-[#028b4c] text-white font-mono text-xs uppercase tracking-widest rounded-sm transition-colors shadow-subtle whitespace-nowrap self-start sm:self-auto font-medium"
            >
              <span>Donate on GoFundMe</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
