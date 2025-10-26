'use client'

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Contact(){
    const {t, i18n, ready } = useTranslation();
    const [time, setTime] = useState("");
    const [token, setToken] = useState("");

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
        validateInput();
        const interval = setInterval(updateTime, 1000 * 60);

        window.reCaptchaOnloadCallback = () => {
            document.getElementById('recaptcha').classList.remove('hidden');
            grecaptcha.enterprise.render('recaptcha', {
                'sitekey' : process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
                'theme' : 'dark',
                'callback':setReCaptcha,
                'expired-callback':removeReCaptcha
            });
        };

        return () => clearInterval(interval);
    }, []);
        
    function setReCaptcha(token){
        setToken(token);
        validateInput();
    }

    function removeReCaptcha(){
        setToken('');
        validateInput();
    }


    function validateInput(){
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        if(name.trim().length != 0 && email.trim().length != 0 && message.trim().length != 0 && token.length != 0){
            document.getElementById("sendMailButton").removeAttribute('disabled');
            return true;
        }else{
            document.getElementById("sendMailButton").setAttribute('disabled',true);
        }

        return false;
    }

    const sendMail = async() => {
        if(!validateInput()){
            return false;
        }

        let nameInput = document.getElementById("name");
        let emailInput = document.getElementById("email");
        let messageInput = document.getElementById("message");
        let sendMailBtn = document.getElementById("sendMailButton");
        let reCaptchaDiv = document.getElementById("recaptcha");

        let name = nameInput.value.trim();
        let email = emailInput.value.trim();
        let message = messageInput.value.trim();

        nameInput.setAttribute('disabled',true);
        emailInput.setAttribute('disabled',true);
        messageInput.setAttribute('disabled',true);
        sendMailBtn.setAttribute('disabled',true);

        const payload = {
            name,
            email,
            message,
            token:token
        };

        try {
            const res = await fetch("/api/sendMail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                nameInput.value = emailInput.value = messageInput.value = '';
                reCaptchaDiv.classList.add('hidden');
                sendMailBtn.querySelector('p').innerHTML = t('portfolio.contact.mail.sent.thank.you');
            } else {
                console.error("Error:", data);
                nameInput.removeAttribute('disabled');
                emailInput.removeAttribute('disabled');
                messageInput.removeAttribute('disabled');
                sendMailBtn.querySelector('p').innerHTML = t('portfolio.contact.mail.not.sent');
                setTimeout(()=>{
                    sendMailBtn.querySelector('p').innerHTML = t('portfolio.contact.mail.send.message');
                    sendMailBtn.removeAttribute('disabled');
                },2000);
            }
        } catch (err) {
            console.error("Network Error:", err);

            nameInput.removeAttribute('disabled');
            emailInput.removeAttribute('disabled');
            messageInput.removeAttribute('disabled');
            sendMailBtn.querySelector('p').innerHTML = t('portfolio.contact.mail.not.sent');
            setTimeout(()=>{
                sendMailBtn.querySelector('p').innerHTML = t('portfolio.contact.mail.send.message');
                sendMailBtn.removeAttribute('disabled');
            },2000)
        }
    }
    return <>
            <div className="mt-5 border-l pl-5 border-portfolio-500 flex">
                <div className="w-full h-full">
                    <div className="flex items-center gap-2">
                        <p className="text-portfolio-50 text-xl font-medium">{t('portfolio.contact.time')}:</p>
                        <p className="text-portfolio-500 text-xl font-medium">{time}</p>
                    </div>
                    <p className="text-portfolio-50 text-xl font-medium mt-5">{t('portfolio.contact.email')}:</p>
                    <a href="mailto:manojanguraja@gmail.com" className="mt-2 text-portfolio-500 font-medium hover:underline">{t('portfolio.about.me.email')}</a>

                    <p className="text-portfolio-50 text-xl font-medium mt-5">{t('portfolio.contact.socials')}:</p>
                    <div className="w-full flex items-center gap-4 text-portfolio-500 text-2xl mt-2">
                        <a href="https://www.linkedin.com/in/manojbit/" target="_blank" className="hover:text-white">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/ManojTGN" target="_blank" className="hover:text-white">
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a href="https://steamcommunity.com/id/ManojTGN/" target="_blank" className="hover:text-white">
                            <i className="fa-brands fa-steam"></i>
                        </a>
                        <a href="https://open.spotify.com/user/31coacig75i7cwnvsalo5yhlmhne" target="_blank" className="hover:text-white">
                            <i className="fa-brands fa-spotify"></i>
                        </a>
                        <a href="https://www.instagram.com/_m4n0j_/" target="_blank" className="hover:text-white">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://www.paypal.com/paypalme/manojtgn" target="_blank" className="hover:text-white">
                            <i className="fa-brands fa-paypal"></i>
                        </a>
                        <a href="mailto:manojanguraja@gmail.com" className="hover:text-white">
                            <i className="fa-solid fa-at"></i>
                        </a>
                    </div>

                    <p className="mt-5 text-portfolio-50 font-medium text-xl">{t('portfolio.dont.be.shy')}</p>
                    <p className="text-portfolio-500 font-medium text-lg">{t('portfolio.just.say.hello')}</p>
                </div>
                <div className="w-full flex flex-col gap-5 text-portfolio-500">
                    <input onInput={validateInput} maxLength={30} type="text" className="disabled:cursor-not-allowed border-2 border-portfolio-700 bg-portfolio-950 h-12 p-2" placeholder={t('portfolio.contact.name.placeholder')} id="name"/>
                    <input onInput={validateInput} maxLength={40} type="email" className="disabled:cursor-not-allowed border-2 border-portfolio-700 bg-portfolio-950 h-12 p-2" placeholder={t('portfolio.contact.email.placeholder')} id="email"/>
                    <textarea onInput={validateInput} maxLength={500} className="disabled:cursor-not-allowed h-56 min-h-32 max-h-56 border-2 border-portfolio-700 bg-portfolio-950 p-2" placeholder={t('portfolio.contact.message.placeholder')} id="message"></textarea>
                    <div id="recaptcha" className="w-full hidden"></div>
                    <button onClick={sendMail} id="sendMailButton" className="group disabled:cursor-not-allowed disabled:hover:border-portfolio-950 disabled:hover:text-portfolio-950 disabled:bg-portfolio-700 w-full flex font-medium text-start text-portfolio-950 border-portfolio-950 bg-portfolio-400 hover:border-white hover:text-white border-2 p-2 ">
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