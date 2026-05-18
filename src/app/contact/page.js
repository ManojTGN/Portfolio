import ContactClient from "./ContactClient";
import { hreflangAlternates } from "@/app/lib/seo";

export const metadata = {
    title: "Contact ▪ Manoj A",
    description: "Send me a message. Verified email, 24–48h reply, no marketing list.",
    alternates: hreflangAlternates("/contact"),
    openGraph: {
        title: "Contact | Manoj A",
        description: "Send me a message. Verified email, 24–48h reply, no marketing list.",
        url: "/contact",
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
