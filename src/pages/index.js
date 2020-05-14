import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import useInterval from "../hooks/useInterval"

import add from "date-fns/add"
import format from "date-fns/format"

// Ref: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const Counter = () => {
  const [count, setCount] = useState(0)

  useInterval(() => {
    setCount(count + 1)
  }, 1000)

  return <h1>{count}</h1>
}

const IndexPage = () => {
  const dateFormat = "dd/MM/yy hh:mm:ss aa"
  const now = format(new Date(), dateFormat)
  const [dut, setDut] = useState()
  const [localTime, setLocalTime] = useState(now)

  useEffect(() => {
    async function getTimezone() {
      try {
        const res = await fetch(
          `http://worldtimeapi.org/api/timezone/Europe/Paris`
        )
        const data = await res.json()
        const utcOffset = data["utc_offset"]

        // CONTINUE HERE
        console.log(utcOffset)
        let dut = add(new Date(), utcOffset.slice(1, 3))
        console.log(dut)
        dut = format(new Date(dut), dateFormat)

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
      <p>Dofus Universal Time (DUT): {dut}</p>
      <p>Your local time: {localTime}</p>
    </Layout>
  )
}

export default IndexPage
