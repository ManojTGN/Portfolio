import SidequestsClient from "./SidequestsClient";
import { hreflangAlternates } from "@/app/lib/seo";

export const metadata = {
    title: "Sidequests ▪ Manoj A ▪ Video, Design & Game Guides",
    description:
        "The work that is not engineering: YouTube content as Tamil Gamers Network, photoshop battles, and Steam game guides written by Manoj A.",
    alternates: hreflangAlternates("/sidequests"),
    openGraph: {
        title: "Sidequests | Manoj A",
        description: "YouTube content, photoshop battles, and Steam game guides.",
        url: "/sidequests",
    },
};

export default function SidequestsPage() {
    return <SidequestsClient />;
}
