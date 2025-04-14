'use client'

import { useState } from 'react'
import { parseJobDescription } from './lib/parser'

export default function TestParser() {
  const [input, setInput] = useState('')
  const [parsed, setParsed] = useState<any>(null)

  const handleParse = () => {
    const result = parseJobDescription(input)
    setParsed(result)
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <textarea
        className="w-full h-48 p-2 border rounded text-sm"
        placeholder="Paste job description here..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-black text-white rounded"
        onClick={handleParse}
      >
        Parse
      </button>
      {parsed && (
        <pre className="mt-4 text-xs bg-gray-900 text-green-400 p-4 rounded overflow-auto">
          {JSON.stringify(parsed, null, 2)}
        </pre>
      )}
    </div>
  )
}
