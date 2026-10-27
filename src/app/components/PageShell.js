"use client";

import FixedTopbar from "./FixedTopbar";
import SiteNav from "./SiteNav";
import Footer from "./Footer";
import { PAGE_CONTAINER } from "@/app/lib/ui";

export default function PageShell({ children, stickyNavOffset = 100 }) {
    return (
        <div className="w-full flex flex-col items-center justify-start">
            <FixedTopbar triggerOffset={stickyNavOffset} />
            <div className={`${PAGE_CONTAINER} flex flex-col justify-center`}>
                <SiteNav ariaLabel="Primary" className="w-full justify-end pt-2" />
                <main id="main-content">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
