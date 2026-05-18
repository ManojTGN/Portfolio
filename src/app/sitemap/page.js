import SitemapClient from "./SitemapClient";
import { hreflangAlternates } from "@/app/lib/seo";

export const metadata = {
    title: "Sitemap ▪ Manoj A",
    description: "All pages on this portfolio: home, work, projects, contact, accessibility.",
    alternates: hreflangAlternates("/sitemap"),
    openGraph: {
        title: "Sitemap | Manoj A",
        description: "All pages on this portfolio.",
        url: "/sitemap",
    },
};

export default function SitemapPage() {
    return <SitemapClient />;
}
