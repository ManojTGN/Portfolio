'use client'

import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
    const { t, i18n } = useTranslation();
    const { resolvedTheme } = useTheme();

    const goToContact = () => {
        window.dispatchEvent(new CustomEvent('page-transition', { detail: '/contact' }));
    };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [time, setTime] = useState('');
    const [inputDisable, setInputDisable] = useState(false);
    const [buttonText, setButtonText] = useState(null);
    const [recaptchaFailed, setRecaptchaFailed] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);

    const copyEmail = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(t('portfolio.about.me.email'));
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 2000);
        } catch {}
    };

    const pathName = usePathname();
    const recaptchaRef = useRef(null);
    const messageWordCount = message.trim() ? message.trim().split(/\s+/).length : 0;
    const isFormValid = name.trim().length >= 3 && email.trim().length > 0 && messageWordCount >= 3 && token.length > 0;
    const sendDisable = !isFormValid || inputDisable;

    function onReCAPTCHAChange(value) {
        setToken(value);
    }

    function onReCAPTCHAExpired() {
        setToken('');
    }

    function onReCAPTCHAErrored() {
        setRecaptchaFailed(true);
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
                <div className="w-full flex">
                    <div className="w-full flex items-center gap-4 text-portfolio-500 text-2xl mt-2" role="list" aria-label={t('portfolio.contact.socials.aria')}>
                        <a href="mailto:manojanguraja@gmail.com" className="peer dark:hover:text-white flex items-center gap-2" aria-label="Email" role="listitem">
                            <i className="fa-solid fa-at" aria-hidden="true"></i>
                            <span className="text-lg font-medium underline">manojAngurajA@gmail.com</span>
                        </a>
                        <button onClick={copyEmail} className={`text-base dark:hover:text-white transition-opacity ${emailCopied ? 'opacity-100' : 'opacity-0 peer-hover:opacity-100 hover:opacity-100 focus-visible:opacity-100'}`} aria-label={t(emailCopied ? 'portfolio.contact.email.copied' : 'portfolio.contact.email.copy')}>
                            <i className={`fa-solid ${emailCopied ? 'fa-check' : 'fa-copy'}`} aria-hidden="true"></i>
                        </button>
                    </div>
                    <button onClick={goToContact} className="group h-14 w-10/12 items-center justify-center disabled:cursor-not-allowed dark:disabled:hover:border-portfolio-950 dark:disabled:hover:text-portfolio-950 disabled:bg-portfolio-100 dark:disabled:bg-portfolio-700 flex font-medium text-start text-portfolio-950 dark:text-portfolio-950 dark:border-portfolio-950 dark:bg-portfolio-400 dark:hover:border-white dark:hover:text-white border-2 p-2">
                        <span className="w-full">{t('portfolio.contact.mail.send.message')}</span>
                        <span className="group-disabled:w-0 text-end w-full opacity-100 group-disabled:opacity-0" aria-hidden="true">
                            <i className="fa-solid fa-dove"></i>
                        </span>
                        <span className="group-disabled:w-full text-end w-0 opacity-0 group-disabled:opacity-100" aria-hidden="true">
                            <i className="fa-solid fa-lock"></i>
                        </span>
                    </button>
                </div>
                <div className="w-full flex items-center gap-4 text-portfolio-500 text-2xl mt-2" role="list" aria-label={t('portfolio.contact.socials.aria')}>
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
                    <a href="https://stackoverflow.com/users/9558827/manoj-a" target="_blank" rel="noopener noreferrer" className="dark:hover:text-white" aria-label="PayPal" role="listitem">
                        <i className="fa-brands fa-stack-overflow" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.youtube.com/@TamilGamersNetworks/videos" target="_blank" rel="noopener noreferrer" className="dark:hover:text-white" aria-label="PayPal" role="listitem">
                        <i className="fa-brands fa-youtube" aria-hidden="true"></i>
                    </a>
                </div>
                <p className="mt-5 text-portfolio-950 dark:text-portfolio-50 font-medium text-2xl">{t('portfolio.contact.lets.work.together')}</p>
                <p className="text-portfolio-500 font-medium text-lg">{t('portfolio.contact.fit.tagline')} {t('portfolio.dont.be.shy')} {t('portfolio.just.say.hello')}</p>
            </div>
        </div>  
        );
    }

    return (
        <>
        <div className="mt-5 border-l pl-5 border-portfolio-500 flex flex-col lg:flex-row gap-8 lg:gap-0">
            <div className="w-full h-full">
                <div className="flex items-center gap-2">
                    <p className="text-portfolio-950 dark:text-portfolio-50 text-xl font-medium">{t('portfolio.contact.time')}:</p>
                    <p className="text-portfolio-500 text-xl font-medium" aria-label={t('portfolio.contact.time.aria', { time })}>{time}</p>
                </div>
                <p className="text-portfolio-950 dark:text-portfolio-50 text-xl font-medium mt-5">{t('portfolio.contact.email')}:</p>
                <div className="mt-2 flex items-center gap-2">
                    <a href="mailto:manojanguraja@gmail.com" className="peer text-portfolio-500 font-medium hover:underline">{t('portfolio.about.me.email')}</a>
                    <button onClick={copyEmail} className={`text-portfolio-500 text-sm dark:hover:text-white hover:text-portfolio-950 transition-opacity ${emailCopied ? 'opacity-100' : 'opacity-0 peer-hover:opacity-100 hover:opacity-100 focus-visible:opacity-100'}`} aria-label={t(emailCopied ? 'portfolio.contact.email.copied' : 'portfolio.contact.email.copy')}>
                        <i className={`fa-solid ${emailCopied ? 'fa-check' : 'fa-copy'}`} aria-hidden="true"></i>
                    </button>
                </div>

                <p className="text-portfolio-950 dark:text-portfolio-50 text-xl font-medium mt-5">{t('portfolio.contact.socials')}:</p>
                <div className="w-full flex items-center gap-4 text-portfolio-500 text-2xl mt-2" role="list" aria-label={t('portfolio.contact.socials.aria')}>
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
            <form onSubmit={sendMail} className="w-full flex flex-col gap-5 text-portfolio-500" aria-label={t('portfolio.contact.form.aria')}>
                <div>
                    <label htmlFor="contact-name" className="sr-only">{t('portfolio.contact.name.placeholder')}</label>
                    <input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={30} minLength={3} type="text" className="w-full disabled:cursor-not-allowed border-2 dark:border-portfolio-700 dark:bg-portfolio-950 h-12 p-2 invalid:!border-red-500 invalid:text-red-500" placeholder={t('portfolio.contact.name.placeholder') + ' *'} disabled={inputDisable} autoComplete="name" pattern="^[a-zA-Z]{3,}([ \-'][a-zA-Z]+)*$" required={true} />
                </div>
                <div>
                    <label htmlFor="contact-email" className="sr-only">{t('portfolio.contact.email.placeholder')}</label>
                    <input id="contact-email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={40} type="email" className="w-full disabled:cursor-not-allowed border-2 dark:border-portfolio-700 dark:bg-portfolio-950 h-12 p-2 invalid:!border-red-500 invalid:text-red-500" placeholder={t('portfolio.contact.email.placeholder') + ' *'} disabled={inputDisable} autoComplete="email" pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$" required={true} />
                </div>
                <div>
                    <label htmlFor="contact-message" className="sr-only">{t('portfolio.contact.message.placeholder')}</label>
                    <textarea id="contact-message" value={message} onChange={(e) => {
                        const val = e.target.value;
                        setMessage(val);
                        const words = val.trim() ? val.trim().split(/\s+/).length : 0;
                        e.target.setCustomValidity(words >= 3 ? '' : 'Please enter at least 3 words.');
                    }} maxLength={500} className="w-full disabled:cursor-not-allowed h-56 min-h-32 max-h-56 border-2 dark:border-portfolio-700 dark:bg-portfolio-950 p-2 invalid:!border-red-500 invalid:text-red-500" placeholder={t('portfolio.contact.message.placeholder') + ' *'} disabled={inputDisable} required={true}></textarea>
                </div>

                <div className={"captcha-wrapper w-full border-2 dark:border-portfolio-700 border-portfolio-300 dark:bg-portfolio-950 bg-white p-3 " + (!token ? ' !border-red-500' : '')}>
                    <div className="flex items-center justify-center">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            onChange={onReCAPTCHAChange}
                            onExpired={onReCAPTCHAExpired}
                            onErrored={onReCAPTCHAErrored}
                            hl={i18n.language}
                            theme={resolvedTheme}
                        />
                    </div>

                    {recaptchaFailed ? <span className="w-full" data-name="recaptcha-failed-status">
                        <i className="fa-solid fa-xmark text-red-900" aria-hidden="true"></i>
                        <span className="px-1 text-red-950">{t('portfolio.contact.captcha.failed')}</span>
                        <span className="float-end">Google reCAPTCHA</span>
                    </span> : null}
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
