"use client"

import { useState } from "react"

const IDatetime = ({ id, label, defvalue }) => {
  const [date, setDate] = useState()

  function checkVariable() {
    if (defvalue != undefined) {
      const newDate = new Date(defvalue).toISOString().slice(0, 16)
      setDate(newDate)
    }
  }
  setTimeout(checkVariable, 0)

  return (
    <div className="flex flex-col p-1">
      <span className="text-md">{label}</span>
      <input
        className="border-1 p-1 px-4 rounded-sm"
        type={"datetime-local"}
        id={id}
        name={id}
        onChange={(e) => setDate(e.target.value)}
        defaultValue={date}
        required
      />
    </div>
  )
}

export default IDatetime
