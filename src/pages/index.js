import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import useInterval from "../hooks/useInterval"

// Ref: https://stackoverflow.com/a/43048463/5046074
const DUT = () => {
  const now = new Date();
  const dut = new Date(+now - now.getTimezoneOffset() + 3600000).toISOString().split(".")[0];

  return <h1>{dut}</h1>;
}

// Ref: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function Counter() {
  let [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return <h1>{count}</h1>;
}


const IndexPage = () => {
  //Ref: https://www.gatsbyjs.org/docs/data-fetching/#fetching-data-at-client-side-runtime
  const [starsCount, setStarsCount] = useState(0)
  useEffect(() => {
    fetch(`http://worldtimeapi.org/api/timezone/Europe/Paris`)
      .then(response => response.json())
      .then(resultData => {
        setStarsCount(resultData["utc_offset"])
      })
  }, [])

  return (<Layout>
    <SEO title="Home" />
    <DUT />
    <Counter />
    <p>Dofus time: {starsCount}</p>
    <p>Your current time:</p>
  </Layout>)
}

export default IndexPage
