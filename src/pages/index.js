import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Gallery from "../components/gallery"

import getDayOfYear from "date-fns/getDayOfYear"

import useInterval from "../hooks/useInterval"

// Ref: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const Counter = () => {
  const [count, setCount] = useState(0)

  useInterval(() => {
    setCount(count + 1)
  }, 1000)

  return <h1>{count}</h1>
}

const IndexPage = () => {
  const lang = "en-us"
  const [dut, setDut] = useState("Loading...")
  const [localTime, setLocalTime] = useState(new Date().toLocaleString())

  useEffect(() => {
    async function getTimezone() {
      try {
        const res = await fetch(
          `http://worldtimeapi.org/api/timezone/Europe/Paris`
        )

        const data = await res.json()
        const paris = new Date(data["datetime"].split(".")[0])
        const dut = paris.toLocaleString()

        setDut(dut)
      } catch (err) {
        console.log("🚫 Error:\n\n", err)
      }
    }

    getTimezone()
  }, [])

  return (
    <Layout>
      <SEO title="Dofus Almanax UI" />
      <Counter />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, max-content)",
          columnGap: "6px",
        }}
      >
        <label for="dofus-universal-time">Dofus Universal Time:</label>
        <span id="dofus-universal-time">{dut}</span>
        <label for="user-current-time">Your local time:</label>
        <span id="user-current-time">{localTime}</span>
      </div>
      <Gallery startIndex={getDayOfYear(new Date())} lang={lang} />
    </Layout>
  )
}

export default IndexPage
