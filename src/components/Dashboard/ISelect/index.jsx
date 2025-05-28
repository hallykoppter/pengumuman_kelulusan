"use client"

import { useState } from "react"

const ISelect = ({ option, label, id, defvalue }) => {
  const [value, setValue] = useState(undefined)
  const [opsi, setOpsi] = useState(undefined)

  function checkVariable() {
    function check() {
      if (defvalue != undefined) {
        const op = option?.map((opsi, index) => {
          return (
            <option
              className="text-black bg-transparent"
              value={opsi.value}
              key={index}
            >
              {opsi.label}
            </option>
          )
        })
        setValue(defvalue)
        setOpsi(op)
      }
    }

    const a = setTimeout(check, 0)
    if (value) clearTimeout(a)
  }

  checkVariable()

  return (
    <div className="flex flex-col p-1">
      <span className="text-md">{label}</span>
      <select
        id={id}
        name={id}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="border-1 w-80 p-1 px-3 rounded-sm bg-transparent"
        required
      >
        {opsi}
      </select>
    </div>
  )
}

export default ISelect
