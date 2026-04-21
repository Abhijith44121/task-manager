"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function Sidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [open, setOpen] = useState(false)

  const currentFilter = searchParams.get("filter") || "all"

  const navigate = (filter: string) => {
    router.push(`/dashboard?filter=${filter}`)
    setOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    document.cookie =
      "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00"
    router.push("/")
  }

  const linkStyle = (filter: string) =>
    `cursor-pointer px-3 py-2 rounded-md ${
      currentFilter === filter
        ? "bg-black text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`

  return (
    <>
      {/* 🔹 Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
        <h1 className="font-semibold text-gray-800">Task Manager</h1>

        <button
          onClick={() => setOpen(!open)}
          className="text-xl font-bold"
        >
          ☰
        </button>
      </div>

      {/* 🔹 Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white border-r flex flex-col z-50 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition duration-300`}
      >
        {/* 🔹 TOP (flex-1 pushes bottom down) */}
        <div className="flex-1 p-5 space-y-6 overflow-y-auto">
          <h1 className="text-xl font-bold text-gray-800 hidden md:block">
            Task Manager
          </h1>

          <nav className="space-y-2">
            <p onClick={() => navigate("all")} className={linkStyle("all")}>
              Dashboard
            </p>

            <p onClick={() => navigate("todo")} className={linkStyle("todo")}>
              Todo
            </p>

            <p
              onClick={() => navigate("in-progress")}
              className={linkStyle("in-progress")}
            >
              In Progress
            </p>

            <p
              onClick={() => navigate("completed")}
              className={linkStyle("completed")}
            >
              Completed
            </p>
          </nav>
        </div>

        {/* 🔹 BOTTOM (always stays at bottom) */}
        <div className="p-5 border-t">
          <button
            onClick={handleLogout}
            className="w-full bg-black text-white py-2 cursor-pointer rounded-md hover:bg-neutral-800"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔹 Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}