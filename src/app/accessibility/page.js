import AccessibilityClient from "./AccessibilityClient";
import { hreflangAlternates } from "@/app/lib/seo";

export const metadata = {
    title: "Accessibility ▪ Manoj A",
    description: "Customize font size, theme, language, cursor, motion, and keyboard preferences for your visit.",
    alternates: hreflangAlternates("/accessibility"),
    openGraph: {
        title: "Accessibility | Manoj A",
        description: "Customize font size, theme, language, cursor, and motion preferences.",
        url: "/accessibility",
    },
};

export default function AccessibilityPage() {
    return <AccessibilityClient />;
}
