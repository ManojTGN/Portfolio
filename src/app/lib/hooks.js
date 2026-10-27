import { useSyncExternalStore } from "react";
import { readSetting, subscribeToSettings } from "@/app/lib/accessibility";

const subscribeToNothing = () => () => {};
const alwaysHydrated = () => true;
const neverHydratedOnServer = () => false;

// False on the server and through hydration, true after, so markup always matches.
export function useHydrated() {
    return useSyncExternalStore(subscribeToNothing, alwaysHydrated, neverHydratedOnServer);
}

export function usePersistedSetting(key, fallback, isValid) {
    return useSyncExternalStore(
        subscribeToSettings,
        () => readSetting(key, fallback, isValid),
        () => fallback,
    );
}
