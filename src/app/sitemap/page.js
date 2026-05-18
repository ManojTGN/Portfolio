import SitemapClient from "./SitemapClient";
import { hreflangAlternates } from "@/app/lib/seo";

export const metadata = {
    title: "Sitemap ▪ Manoj A ▪ Every Page on This Portfolio",
    description: "Human-readable index of every page on Manoj A's portfolio: home, work, individual project detail pages, contact, accessibility settings, and machine files.",
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
