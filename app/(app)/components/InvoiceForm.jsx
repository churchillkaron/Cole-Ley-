"use client"

import { useState } from "react"

export default function InvoiceForm() {
  const [client, setClient] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")

  return (
    <div className="glass p-8 max-w-xl">

      <h2 className="text-2xl mb-6 font-light">
        Create Invoice
      </h2>

      <input
        placeholder="Client Name"
        className="input mb-4"
        value={client}
        onChange={(e) => setClient(e.target.value)}
      />

      <input
        placeholder="Description"
        className="input mb-4"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <input
        placeholder="Price (THB)"
        className="input mb-6"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button className="btn w-full">
        Generate Invoice
      </button>

    </div>
  )
}