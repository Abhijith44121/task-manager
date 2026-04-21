"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password")
      return
    }

    localStorage.setItem("isLoggedIn", "true")
    document.cookie = "isLoggedIn=true; path=/"

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-md border space-y-5">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 text-sm">
          Login to manage your tasks
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-3 cursor-pointer rounded-md hover:bg-gray-800 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  )
}