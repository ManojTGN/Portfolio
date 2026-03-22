'use client'

import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
    const { t, i18n } = useTranslation();
    const { theme } = useTheme();
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [time, setTime] = useState('');
    const [inputDisable, setInputDisable] = useState(false);
    const [buttonText, setButtonText] = useState(null);

    const pathName = usePathname();
    const recaptchaRef = useRef(null);
    const isFormValid = name.trim().length > 0 && email.trim().length > 0 && message.trim().length > 0 && token.length > 0;
    const sendDisable = !isFormValid || inputDisable;

    function onReCAPTCHAChange(value) {
        setToken(value);
    }

    function onReCAPTCHAExpired() {
        setToken('');
    }

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const chennaiTime = now.toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
            });
            setTime(chennaiTime);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const resetForm = useCallback(() => {
        setName('');
        setEmail('');
        setMessage('');
        setToken('');
        setInputDisable(false);
        setButtonText(null);
        recaptchaRef.current?.reset();
    }, []);

    const sendMail = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        setInputDisable(true);
        setButtonText(t('portfolio.contact.mail.sending'));

        try {
            const res = await fetch("/api/sendMail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    message: message.trim(),
                    token
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setButtonText(t('portfolio.contact.mail.sent.thank.you'));
                setTimeout(() => resetForm(), 3000);
            } else {
                console.error("Error:", data);
                setInputDisable(false);
                setButtonText(t('portfolio.contact.mail.not.sent'));
                setTimeout(() => setButtonText(null), 2000);
            }
        } catch (err) {
            console.error("Network Error:", err);
            setInputDisable(false);
            setButtonText(t('portfolio.contact.mail.not.sent'));
            setTimeout(() => setButtonText(null), 2000);
        }
    };


    if(pathName !== '/contact'){
        return (
          <div className="mt-5 border-l pl-5 border-portfolio-500 flex flex-col lg:flex-row gap-8 lg:gap-0">
            <div className="w-full h-full">
                <div className="flex items-center gap-2">
                    <p className="text-portfolio-950 dark:text-portfolio-50 text-xl font-medium">{t('portfolio.contact.time')}:</p>
                    <p className="text-portfolio-500 text-xl font-medium" aria-label={`Current time in Chennai: ${time}`}>{time}</p>
                </div>
                <p className="text-portfolio-950 dark:text-portfolio-50 text-xl font-medium mt-5">{t('portfolio.contact.email')}:</p>
                <a href="mailto:manojanguraja@gmail.com" className="mt-2 text-portfolio-500 font-medium hover:underline">{t('portfolio.about.me.email')}</a>

                <p className="text-portfolio-950 dark:text-portfolio-50 text-xl font-medium mt-5">{t('portfolio.contact.socials')}:</p>
                <div className="w-full flex items-center gap-4 text-portfolio-500 text-2xl mt-2" role="list" aria-label="Social media links">
                    <a href="https://www.linkedin.com/in/manojbit/" target="_blank" rel="noopener noreferrer" className="dark:hover:text-white" aria-label="LinkedIn" role="listitem">
                        <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
                    </a>
                    <a href="https://github.com/ManojTGN" target="_blank" rel="noopener noreferrer" className="dark:hover:text-white" aria-label="GitHub" role="listitem">
                        <i className="fa-brands fa-github" aria-hidden="true"></i>
                    </a>
                    <a href="https://steamcommunity.com/id/ManojTGN/" target="_blank" rel="noopener noreferrer" className="dark:hover:text-white" aria-label="Steam" role="listitem">
                        <i className="fa-brands fa-steam" aria-hidden="true"></i>
                    </a>
                    <a href="https://open.spotify.com/user/31coacig75i7cwnvsalo5yhlmhne" target="_blank" rel="noopener noreferrer" className="dark:hover:text-white" aria-label="Spotify" role="listitem">
                        <i className="fa-brands fa-spotify" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.instagram.com/_m4n0j_/" target="_blank" rel="noopener noreferrer" className="dark:hover:text-white" aria-label="Instagram" role="listitem">
                        <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.paypal.com/paypalme/manojtgn" target="_blank" rel="noopener noreferrer" className="dark:hover:text-white" aria-label="PayPal" role="listitem">
                        <i className="fa-brands fa-paypal" aria-hidden="true"></i>
                    </a>
                    <a href="mailto:manojanguraja@gmail.com" className="dark:hover:text-white" aria-label="Email" role="listitem">
                        <i className="fa-solid fa-at" aria-hidden="true"></i>
                    </a>
                </div>

                <p className="mt-5 text-portfolio-950 dark:text-portfolio-50 font-medium text-2xl">{t('portfolio.contact.lets.work.together')}</p>

                <p className="mt-14 text-portfolio-950 dark:text-portfolio-50 font-medium text-xl">{t('portfolio.dont.be.shy')}</p>
                <p className="text-portfolio-500 font-medium text-lg">{t('portfolio.just.say.hello')}</p>
            </div>
            <form className="w-full flex flex-col gap-5 text-portfolio-500" aria-label="Contact form">
                <div>
                    <label htmlFor="contact-name" className="sr-only">{t('portfolio.contact.name.placeholder')}</label>
                    <input onClick={()=>{router.push('/contact')}} id="contact-name" type="text" className="w-full disabled:cursor-not-allowed border-2 dark:border-portfolio-700 dark:bg-portfolio-950 h-12 p-2" placeholder={t('portfolio.contact.name.placeholder')} />
                </div>
                <div>
                    <label htmlFor="contact-email" className="sr-only">{t('portfolio.contact.email.placeholder')}</label>
                    <input onClick={()=>{router.push('/contact')}} id="contact-email" type="email" className="w-full disabled:cursor-not-allowed border-2 dark:border-portfolio-700 dark:bg-portfolio-950 h-12 p-2" placeholder={t('portfolio.contact.email.placeholder')} />
                </div>
                <div>
                    <label htmlFor="contact-message" className="sr-only">{t('portfolio.contact.message.placeholder')}</label>
                    <textarea onClick={()=>{router.push('/contact')}} id="contact-message" className="w-full disabled:cursor-not-allowed h-56 min-h-32 max-h-56 border-2 dark:border-portfolio-700 dark:bg-portfolio-950 p-2" placeholder={t('portfolio.contact.message.placeholder')}></textarea>
                </div>

                <div className="captcha-wrapper w-full border-2 dark:border-portfolio-700 border-portfolio-300 dark:bg-portfolio-950 bg-white p-3">
                    <div onClick={()=>{router.push('/contact')}} className="flex items-center gap-3 g-recaptcha" data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} data-action="FORM_SUBMIT" aria-hidden="true">
                        <div className={`w-6 h-6 border-2 rounded flex items-center justify-center shrink-0 transition-all duration-300 border-portfolio-400 dark:border-portfolio-500`}></div>
                        <span className={`text-sm font-medium select-none transition-colors text-portfolio-500 dark:text-portfolio-400`}> {t('portfolio.contact.captcha.label')} </span>
                        
                        <span className="ml-auto text-xs text-portfolio-400 dark:text-portfolio-600 select-none"><i className="fa-brands fa-google"></i> reCAPTCHA</span>
                    </div>
                </div>

                <button onClick={()=>{router.push('/contact')}} className="group disabled:cursor-not-allowed dark:disabled:hover:border-portfolio-950 dark:disabled:hover:text-portfolio-950 disabled:bg-portfolio-100 dark:disabled:bg-portfolio-700 w-full flex font-medium text-start text-portfolio-950 dark:text-portfolio-950 dark:border-portfolio-950 dark:bg-portfolio-400 dark:hover:border-white dark:hover:text-white border-2 p-2" disabled={true}>
                    <span className="w-full">{t('portfolio.contact.mail.send.message')}</span>
                    <span className="group-disabled:w-0 text-end w-full opacity-100 group-disabled:opacity-0" aria-hidden="true">
                        <i className="fa-solid fa-dove"></i>
                    </span>
                    <span className="group-disabled:w-full text-end w-0 opacity-0 group-disabled:opacity-100" aria-hidden="true">
                        <i className="fa-solid fa-lock"></i>
                    </span>
                </button>
            </form>
        </div>  
        );
    }

    return (
        <>
        <div className="mt-5 border-l pl-5 border-portfolio-500 flex flex-col lg:flex-row gap-8 lg:gap-0">
            <div className="w-full h-full">
                <div className="flex items-center gap-2">
                    <p className="text-portfolio-950 dark:text-portfolio-50 text-xl font-medium">{t('portfolio.contact.time')}:</p>
                    <p className="text-portfolio-500 text-xl font-medium" aria-label={`Current time in Chennai: ${time}`}>{time}</p>
                </div>
                <p className="text-portfolio-950 dark:text-portfolio-50 text-xl font-medium mt-5">{t('portfolio.contact.email')}:</p>
                <a href="mailto:manojanguraja@gmail.com" className="mt-2 text-portfolio-500 font-medium hover:underline">{t('portfolio.about.me.email')}</a>

                <p className="text-portfolio-950 dark:text-portfolio-50 text-xl font-medium mt-5">{t('portfolio.contact.socials')}:</p>
                <div className="w-full flex items-center gap-4 text-portfolio-500 text-2xl mt-2" role="list" aria-label="Social media links">
                    <a href="https://www.linkedin.com/in/manojbit/" target="_blank" rel="noopener noreferrer" className="dark:hover:text-white" aria-label="LinkedIn" role="listitem">
                        <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
                    </a>
                    <a href="https://github.com/ManojTGN" target="_blank" rel="noopener noreferrer" className="dark:hover:text-white" aria-label="GitHub" role="listitem">
                        <i className="fa-brands fa-github" aria-hidden="true"></i>
                    </a>
                    <a href="https://steamcommunity.com/id/ManojTGN/" target="_blank" rel="noopener noreferrer" className="dark:hover:text-white" aria-label="Steam" role="listitem">
                        <i className="fa-brands fa-steam" aria-hidden="true"></i>
                    </a>
                    <a href="https://open.spotify.com/user/31coacig75i7cwnvsalo5yhlmhne" target="_blank" rel="noopener noreferrer" className="dark:hover:text-white" aria-label="Spotify" role="listitem">
                        <i className="fa-brands fa-spotify" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.instagram.com/_m4n0j_/" target="_blank" rel="noopener noreferrer" className="dark:hover:text-white" aria-label="Instagram" role="listitem">
                        <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.paypal.com/paypalme/manojtgn" target="_blank" rel="noopener noreferrer" className="dark:hover:text-white" aria-label="PayPal" role="listitem">
                        <i className="fa-brands fa-paypal" aria-hidden="true"></i>
                    </a>
                    <a href="mailto:manojanguraja@gmail.com" className="dark:hover:text-white" aria-label="Email" role="listitem">
                        <i className="fa-solid fa-at" aria-hidden="true"></i>
                    </a>
                </div>

                <p className="mt-5 text-portfolio-950 dark:text-portfolio-50 font-medium text-2xl">{t('portfolio.contact.lets.work.together')}</p>

                <p className="mt-14 text-portfolio-950 dark:text-portfolio-50 font-medium text-xl">{t('portfolio.dont.be.shy')}</p>
                <p className="text-portfolio-500 font-medium text-lg">{t('portfolio.just.say.hello')}</p>
            </div>
            <form onSubmit={sendMail} className="w-full flex flex-col gap-5 text-portfolio-500" aria-label="Contact form">
                <div>
                    <label htmlFor="contact-name" className="sr-only">{t('portfolio.contact.name.placeholder')}</label>
                    <input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={30} type="text" className="w-full disabled:cursor-not-allowed border-2 dark:border-portfolio-700 dark:bg-portfolio-950 h-12 p-2 invalid:!border-red-500 invalid:text-red-500" placeholder={t('portfolio.contact.name.placeholder') + ' *'} disabled={inputDisable} autoComplete="name" pattern="^[a-zA-Z]+([ \-'][a-zA-Z]+)*$" required={true} />
                </div>
                <div>
                    <label htmlFor="contact-email" className="sr-only">{t('portfolio.contact.email.placeholder')}</label>
                    <input id="contact-email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={40} type="email" className="w-full disabled:cursor-not-allowed border-2 dark:border-portfolio-700 dark:bg-portfolio-950 h-12 p-2 invalid:!border-red-500 invalid:text-red-500" placeholder={t('portfolio.contact.email.placeholder') + ' *'} disabled={inputDisable} autoComplete="email" pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$" required={true} />
                </div>
                <div>
                    <label htmlFor="contact-message" className="sr-only">{t('portfolio.contact.message.placeholder')}</label>
                    <textarea id="contact-message" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={500} className="w-full disabled:cursor-not-allowed h-56 min-h-32 max-h-56 border-2 dark:border-portfolio-700 dark:bg-portfolio-950 p-2 invalid:!border-red-500 invalid:text-red-500" placeholder={t('portfolio.contact.message.placeholder') + ' *'} disabled={inputDisable} required={true}></textarea>
                </div>

                <div className={"captcha-wrapper w-full border-2 dark:border-portfolio-700 border-portfolio-300 dark:bg-portfolio-950 bg-white p-3 " + (!token ? ' !border-red-500' : '')}>
                    <div className="flex items-center justify-center">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            onChange={onReCAPTCHAChange}
                            onExpired={onReCAPTCHAExpired}
                            hl={i18n.language}
                            theme={theme === 'dark' ? 'dark' : 'light'}
                        />
                    </div>

                    {recaptchaRef.current === null?<span className="w-full" data-name="recaptcha-failed-status">
                        <i className="fa-solid fa-xmark text-red-900"></i>
                        <span className="px-1 text-red-950">{t('portfolio.contact.captcha.failed')}</span>
                        <span className="float-end">Google reCAPTCHA</span>
                    </span>:null}
                </div>

                <button type="submit" className="group disabled:cursor-not-allowed dark:disabled:hover:border-portfolio-950 dark:disabled:hover:text-portfolio-950 disabled:bg-portfolio-100 dark:disabled:bg-portfolio-700 w-full flex font-medium text-start text-portfolio-950 dark:text-portfolio-950 dark:border-portfolio-950 dark:bg-portfolio-400 dark:hover:border-white dark:hover:text-white border-2 p-2" disabled={sendDisable}>
                    <span className="w-full">{buttonText || t('portfolio.contact.mail.send.message')}</span>
                    <span className="group-disabled:w-0 text-end w-full opacity-100 group-disabled:opacity-0" aria-hidden="true">
                        <i className="fa-solid fa-dove"></i>
                    </span>
                    <span className="group-disabled:w-full text-end w-0 opacity-0 group-disabled:opacity-100" aria-hidden="true">
                        <i className="fa-solid fa-lock"></i>
                    </span>
                </button>
                <span className="-mt-5 text-sm text-portfolio-950 dark:text-portfolio-50">{'*'+t('portfolio.contact.reply.time')}</span>
            </form>
        </div>
        </>
    );
}
