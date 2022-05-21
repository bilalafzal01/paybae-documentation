import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: <>Paybae was designed from the ground up to be easily installed and used to get your crypto payments integration up and running quickly.</>,
  },
  {
    title: 'Accept Crypto Payments',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Start accepting <code>crypto</code> payments on your ecommerce site within minutes. It's that easy!
      </>
    ),
  },
  {
    title: 'Powered by Serverless',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Paybae is powered by <a href='https://serverless.com/'>Serverless</a> and <a href='https://aws.amazon.com/lambda/'>AWS Lambda</a> to handle all the heavy lifting. So you don't need to worry about scaling!
      </>
    ),
  },
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <Svg className={styles.featureSvg} role='img' />
      </div>
      <div className='text--center padding-horiz--md'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
