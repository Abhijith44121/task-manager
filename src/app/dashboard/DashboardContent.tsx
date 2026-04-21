"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskCard from "@/components/tasks/TaskCard"
import TaskFilters from "@/components/tasks/TaskFilters"
import TaskStats from "@/components/tasks/TaskStats"

import { useTaskStore } from "@/store/useTaskStore"

export default function DashboardContent() {
  const { tasks } = useTaskStore()

  const searchParams = useSearchParams()
  const sidebarFilter = searchParams.get("filter") || "all"

  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [sort, setSort] = useState("asc")

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) => {
      if (sidebarFilter !== "all") {
        return task.status === sidebarFilter
      }
      return status === "all" ? true : task.status === status
    })
    .sort((a, b) => {
      if (!a.dueDate || !b.dueDate) return 0

      return sort === "asc"
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
        </div>

        <AddTaskModal />
      </div>

      <TaskStats />

      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <TaskFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          sort={sort}
          setSort={setSort}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">No tasks found</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  )
}