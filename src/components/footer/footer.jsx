import style from "./footer.module.css"

export default function FooterSite() {
    return (
        <footer>
            <div className={style.footerSite}>
                Todos los Derechos Reservados {":)"} - Christian Tobar
            </div>
        </footer>

    )
}