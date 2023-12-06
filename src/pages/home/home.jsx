import { Children } from "react"
import style from "./home.module.css"
import FooterSite from "../../components/footer/footer"

export default function Home({children}){
    return(
        <div>
            <header className={style.header}>
                <h1>TO DO LIST</h1>
                <div>
                    <div><a href="/task">Task</a></div>
                    <div>Profile</div>

                </div>
            </header>
            <main>
                {children}
            </main>
            <FooterSite></FooterSite>
        </div>
    )
}