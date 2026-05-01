"use client"

import { useState } from "react"

export default function UploadMedia() {
  const [file, setFile] = useState(null)

  const handleUpload = () => {
    if (!file) return

    const url = URL.createObjectURL(file)

    const existing = JSON.parse(localStorage.getItem("media") || "[]")
    existing.push(url)

    localStorage.setItem("media", JSON.stringify(existing))

    alert("Uploaded!")
  }

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="ml-4 bg-white text-black px-4 py-2">
        Upload
      </button>
    </div>
  )
}