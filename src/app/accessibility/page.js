import AccessibilityClient from "./AccessibilityClient";

export const metadata = {
    title: "Accessibility ▪ Manoj A",
    description: "Customize font size, theme, language, cursor, motion, and keyboard preferences for your visit.",
    alternates: { canonical: "/accessibility" },
    openGraph: {
        title: "Accessibility | Manoj A",
        description: "Customize font size, theme, language, cursor, and motion preferences.",
        url: "/accessibility",
    },
};

export default function AccessibilityPage() {
    return <AccessibilityClient />;
}
