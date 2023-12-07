import { Children } from "react"
import style from "./home.module.css"
import FooterSite from "../../components/footer/footer"

export default function Home({children}){
    return(
        <div className={style.bodyHome}>
            <header>
                <h1>TO DO LIST</h1>
                <div>
                    <div><a href="/task">Task</a></div>
                    <div><a href="/task">Profile</a></div>
                </div>
            </header>
            <main>
                {children}
            </main>
            <FooterSite></FooterSite>
        </div>
    )
}