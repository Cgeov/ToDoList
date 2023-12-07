import style from "./home.module.css"
import FooterSite from "../../components/footer/footer"
import Header from "../../components/header/header"

export default function Home({children}){
    return(
        <div className={style.bodyHome}>
            <Header></Header>
            <main>
                {children}
            </main>
            <FooterSite></FooterSite>
        </div>
    )
}