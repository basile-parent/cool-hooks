import React from "react"
import Link from "@docusaurus/Link"
import Layout from "@theme/Layout"
import styles from "./sitemap.module.css"
import useStorageState from "../../../src/hooks/useStorageState";

const Sitemap = () => {
    return (
        <>
            <h1>Sitemap</h1>
            <ul>
                <li><Link to="/">Home page</Link></li>
                <li><Link to="/docs/introduction">Introduction</Link></li>
                <li>
                    <Link to="/docs/category/hooks">All available hooks</Link>

                    <ul>
                        <li><Link to="/docs/hooks/useWhyDidYouUpdate">useWhyDidYouUpdate</Link></li>
                        <li><Link to="/docs/hooks/useDidUpdateEffect">useDidUpdateEffect</Link></li>
                        <li><Link to="/docs/hooks/useStorageState">useStorageState</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/docs/category/hoc">All available HOCs</Link>

                    <ul>
                        <li><Link to="/docs/hoc/withWhyDidYouUpdate">withWhyDidYouUpdate</Link></li>
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
