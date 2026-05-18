import AccessibilityClient from "./AccessibilityClient";
import { hreflangAlternates } from "@/app/lib/seo";

export const metadata = {
    title: "Accessibility Settings ▪ Manoj A ▪ Customize Your Visit",
    description: "Personalize this site with font size, theme, language (5 supported), cursor size, motion preferences, and keyboard shortcuts. Built with a11y in mind.",
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
