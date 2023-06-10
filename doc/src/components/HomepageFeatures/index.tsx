import React, {HTMLAttributes, JSXElementConstructor} from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
    title: string;
    Svg?: React.ComponentType<React.ComponentProps<"svg">>;
    Img?: JSXElementConstructor<HTMLAttributes<HTMLImageElement>>
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: "Easy to Use",
        Img: (props: HTMLAttributes<HTMLImageElement>) => <img src="/cool-hooks/img/cool-hooks.png"
                                                               alt="" {...props} />,
        description: (
            <>
                This library is a bunch of pretty straight forward hooks.
                They do what we ask them to, nothing more.
            </>
        ),
    },
    {
        title: "Light weighted",
        Svg: require("@site/static/img/light-weight.svg").default,
        description: (
            <>
                We package only few very useful hooks so you don't have to rent a truck to deploy your app.
            </>
        ),
    },
];

function Feature({title, Svg, Img, description}: FeatureItem) {
    return (
        <div className={clsx("col col--4")}>
            <div className="text--center">
                {Svg && <Svg className={styles.featureSvg} role="img"/>}
                {Img && <Img className={styles.featureSvg}/>}
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row" style={{ justifyContent: "center" }}>
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
