
import { useTranslation } from "react-i18next";

export default function Paint() {
    const {t, i18n } = useTranslation();

    return <>
        <div className="absolute w-full h-full">
            <canvas className="w-full h-full"></canvas>
        </div>
    </>
}