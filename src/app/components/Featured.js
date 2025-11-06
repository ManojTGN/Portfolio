import Carousel from "./Carousel";

export default function Featured(){
    return <>
        <div className="mt-5">
            <div className="flex border-l-2 pl-4 border-portfolio-500 dark:border-portfolio-500">
                <div className="w-full p-2">
                    <Carousel images={["/images/cube.gif","/images/snake.gif","/images/image.png"]} />
                </div>
                <div className="w-full h-96 p-2 flex flex-col justify-end">
                    <p className="text-6xl font-medium">{t('portfolio.featured.cgrafix')}</p>
                    <p className="text-portfolio-500 pt-10">{t('portfolio.featured.cgrafix.desc')}</p>

                    <div className="flex gap-5">
                        <div className="w-full border-l-2 pl-4 border-portfolio-500 dark:border-portfolio-500 mt-5 font-medium">Pure C</div>
                        <div className="w-full border-l-2 pl-4 border-portfolio-500 dark:border-portfolio-500 mt-5 font-medium">MakeFile</div>
                        <div className="w-full flex justify-center items-center mt-5">
                            <a className="text-blue-500 underline" href="/work/cGrafix">{t('portfolio.featured.readmore')}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex border-l-2 pl-4 border-portfolio-500 dark:border-portfolio-500 mt-16">
                <div className="w-full h-96 p-2 flex flex-col justify-end">
                    <p className="text-6xl font-medium">{t('portfolio.featured.grievanceforum')}</p>
                    <p className="text-portfolio-500 pt-10">{t('portfolio.featured.grievanceforum.desc')}</p>

                    <div className="flex gap-5">
                        <div className="w-full border-l-2 pl-4 border-portfolio-500 dark:border-portfolio-500 mt-5 font-medium">Node JS</div>
                        <div className="w-full border-l-2 pl-4 border-portfolio-500 dark:border-portfolio-500 mt-5 font-medium">MySQL</div>
                        <div className="w-full flex justify-center items-center mt-5">
                            <a className="text-blue-500 underline" href="/work/grievanceForum">{t('portfolio.featured.readmore')}</a>
                        </div>
                    </div>            
                </div>
                <div className="w-full p-2">
                    <Carousel images={["/images/AppPortfolio_1.jpg"]} />
                </div>
            </div>
        </div>

        <p className="mt-12 text-lg text-portfolio-500">
            {t('portfolio.featured.view.all.my.works')}
            <a href="/work" className="group px-2 text-blue-500">
                <i className="fa-solid fa-folder group-hover:hidden"></i><i className="fa-solid fa-folder-open w-0 invisible group-hover:visible group-hover:w-auto"></i>{t('portfolio.featured.work')}
            </a>{t('portfolio.featured.page')}
        </p>
    </>
}