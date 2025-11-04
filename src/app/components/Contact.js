'use client'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


export default function Contact(){
    const {t, i18n, ready } = useTranslation();
    
    const [sendDisable, setSendDisable] = useState(true);
    const [inputDisable, setInputDisable] = useState(false);

    const [time, setTime] = useState("");
    const [token, setToken] = useState("");
    const { theme, setTheme } = useTheme();

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
        const interval = setInterval(updateTime, 1000 * 60);

        window.reCaptchaOnloadCallback = () => {
            grecaptcha.enterprise.render('recaptcha', {
                'sitekey' : process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
                'theme' : theme === 'dark' ? 'dark' : 'light',
                'lang': i18n.language,
                'callback':(token)=>setToken(token),
                'expired-callback':()=>setToken('')
            });
            document.getElementById('recaptcha').classList.remove('hidden');
        };

        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {validateInput();}, [token]);

    function validateInput(){
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        if(name.trim().length != 0 && email.trim().length != 0 && message.trim().length != 0 && token.length != 0){
            setSendDisable(false);
            return true;
        }else{
            setSendDisable(true);
        }

        return false;
    }

    const sendMail = async() => {
        if(!validateInput()) return false;
        
        let nameInput = document.getElementById("name");
        let emailInput = document.getElementById("email");
        let messageInput = document.getElementById("message");

        let sendMailBtn = document.getElementById("sendMailButton");
        let reCaptchaDiv = document.getElementById("recaptcha");

        let name = nameInput.value.trim();
        let email = emailInput.value.trim();
        let message = messageInput.value.trim();

        setSendDisable(true);
        setInputDisable(true);

        try {
            const res = await fetch("/api/sendMail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                    token:token
                }),
            });

            const data = await res.json();
            if (res.ok) {
                reCaptchaDiv.classList.add('hidden');
                nameInput.value = emailInput.value = messageInput.value = '';
                sendMailBtn.querySelector('p').innerHTML = t('portfolio.contact.mail.sent.thank.you');
            } else {
                console.error("Error:", data);

                setInputDisable(false);
                sendMailBtn.querySelector('p').innerHTML = t('portfolio.contact.mail.not.sent');

                setTimeout(()=>{
                    setSendDisable(false);
                    sendMailBtn.querySelector('p').innerHTML = t('portfolio.contact.mail.send.message');
                },2000);
            }
        } catch (err) {
            console.error("Network Error:", err);

            setInputDisable(false);
            sendMailBtn.querySelector('p').innerHTML = t('portfolio.contact.mail.not.sent');

            setTimeout(()=>{
                setSendDisable(false);
                sendMailBtn.querySelector('p').innerHTML = t('portfolio.contact.mail.send.message');
            },2000)
        }
    }
    return <>
            <div className="mt-5 border-l pl-5 border-portfolio-500 dark:border-portfolio-500 flex">
                <div className="w-full h-full">
                    <div className="flex items-center gap-2">
                        <p className="text-portfolio-950 dark:text-portfolio-50 text-xl font-medium">{t('portfolio.contact.time')}:</p>
                        <p className="text-portfolio-500 dark:text-portfolio-500 text-xl font-medium">{time}</p>
                    </div>
                    <p className="text-portfolio-950 dark:text-portfolio-50 text-xl font-medium mt-5">{t('portfolio.contact.email')}:</p>
                    <a href="mailto:manojanguraja@gmail.com" className="mt-2 text-portfolio-500 dark:text-portfolio-500 font-medium hover:underline">{t('portfolio.about.me.email')}</a>

                    <p className="text-portfolio-950 dark:text-portfolio-50 text-xl font-medium mt-5">{t('portfolio.contact.socials')}:</p>
                    <div className="w-full flex items-center gap-4 text-portfolio-500 dark:text-portfolio-500 text-2xl mt-2">
                        <a href="https://www.linkedin.com/in/manojbit/" target="_blank" className="dark:hover:text-white">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/ManojTGN" target="_blank" className="dark:hover:text-white">
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a href="https://steamcommunity.com/id/ManojTGN/" target="_blank" className="dark:hover:text-white">
                            <i className="fa-brands fa-steam"></i>
                        </a>
                        <a href="https://open.spotify.com/user/31coacig75i7cwnvsalo5yhlmhne" target="_blank" className="dark:hover:text-white">
                            <i className="fa-brands fa-spotify"></i>
                        </a>
                        <a href="https://www.instagram.com/_m4n0j_/" target="_blank" className="dark:hover:text-white">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://www.paypal.com/paypalme/manojtgn" target="_blank" className="dark:hover:text-white">
                            <i className="fa-brands fa-paypal"></i>
                        </a>
                        <a href="mailto:manojanguraja@gmail.com" className="dark:hover:text-white">
                            <i className="fa-solid fa-at"></i>
                        </a>
                    </div>

                    <p className="mt-5 text-portfolio-950 dark:text-portfolio-50 font-medium text-2xl">{t('portfolio.contact.lets.work.together')}</p>

                    <p className="mt-14 text-portfolio-950 dark:text-portfolio-50 font-medium text-xl">{t('portfolio.dont.be.shy')}</p>
                    <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-lg">{t('portfolio.just.say.hello')}</p>
                </div>
                <div className="w-full flex flex-col gap-5 text-portfolio-500 dark:text-portfolio-500">
                    <input onInput={validateInput} maxLength={30} type="text" className="disabled:cursor-not-allowed border-2 dark:border-portfolio-700 dark:bg-portfolio-950 h-12 p-2" placeholder={t('portfolio.contact.name.placeholder')} id="name" disabled={inputDisable}/>
                    <input onInput={validateInput} maxLength={40} type="email" className="disabled:cursor-not-allowed border-2 dark:border-portfolio-700 dark:bg-portfolio-950 h-12 p-2" placeholder={t('portfolio.contact.email.placeholder')} id="email" disabled={inputDisable}/>
                    <textarea onInput={validateInput} maxLength={500} className="disabled:cursor-not-allowed h-56 min-h-32 max-h-56 border-2 dark:border-portfolio-700 dark:bg-portfolio-950 p-2" placeholder={t('portfolio.contact.message.placeholder')} id="message" disabled={inputDisable}></textarea>
                    
                    <div id="recaptcha" className="w-full appearance-none hidden"></div>

                    <button onClick={sendMail} id="sendMailButton" className="group disabled:cursor-not-allowed dark:disabled:hover:border-portfolio-950 dark:disabled:hover:text-portfolio-950 disabled:bg-portfolio-100 dark:disabled:bg-portfolio-700 w-full flex font-medium text-start text-portfolio-950 dark:text-portfolio-950 dark:border-portfolio-950 dark:bg-portfolio-400 dark:hover:border-white dark:hover:text-white border-2 p-2 " disabled={sendDisable}>
                        <p className="w-full"> {t('portfolio.contact.mail.send.message')} </p>
                        <span className="group-disabled:w-0 text-end w-full opacity-100 group-disabled:opacity-0">
                            <i className="fa-solid fa-dove"></i>
                        </span>
                        <span className="group-disabled:w-full text-end w-0 opacity-0 group-disabled:opacity-100">
                            <i className="fa-solid fa-lock"></i>
                        </span>
                    </button>
                </div>
            </div>
        </>
}