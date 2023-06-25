import React from "react"
import Link from "@docusaurus/Link"
import Layout from "@theme/Layout"
import styles from "./sitemap.module.css"

const Sitemap = () => {
    return (
        <>
            <h1>Sitemap</h1>
            <ul>
                <li><Link to="/">Home page</Link></li>
                <li><Link to="/docs/introduction">Introduction</Link></li>
                <li>
                    <Link to="/category/hooks/category/hooks">All available hooks</Link>

                    <ul>
                        <li><Link to="/docs/hooks/useWhyDidYouUpdate">useWhyDidYouUpdate</Link></li>
                        <li><Link to="/docs/hooks/useDidUpdateEffect">useDidUpdateEffect</Link></li>
                    </ul>
                </li>
            </ul>
        </>
    )
}

export default function SitemapPage(): JSX.Element {
    return (
        <Layout>
            <main className={styles.main}>
                <Sitemap/>
            </main>
        </Layout>
    )
}
