"use client"

import { useTaskStore } from "@/store/useTaskStore"

export default function TaskStats() {
  const { tasks } = useTaskStore()

  const total = tasks.length
  const completed = tasks.filter((t) => t.status === "completed").length
  const inProgress = tasks.filter((t) => t.status === "in-progress").length
  const todo = tasks.filter((t) => t.status === "todo").length

  const today = new Date().toISOString().split("T")[0]
  const dueToday = tasks.filter((t) => t.dueDate === today).length

  const cardStyle =
    "bg-white p-4 sm:p-5 rounded-xl shadow-sm border flex flex-col justify-center items-center sm:items-start gap-1 min-h-[90px]"

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {/* Total */}
      <div className={cardStyle}>
        <p className="text-xs sm:text-sm text-gray-500">Total Tasks</p>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {total}
        </h2>
      </div>

      {/* Todo */}
      <div className={cardStyle}>
        <p className="text-xs sm:text-sm text-gray-500">Todo</p>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
          {todo}
        </h2>
      </div>

      {/* In Progress */}
      <div className={cardStyle}>
        <p className="text-xs sm:text-sm text-gray-500">In Progress</p>
        <h2 className="text-xl sm:text-2xl font-bold text-yellow-600">
          {inProgress}
        </h2>
      </div>

      {/* Completed */}
      <div className={cardStyle}>
        <p className="text-xs sm:text-sm text-gray-500">Completed</p>
        <h2 className="text-xl sm:text-2xl font-bold text-green-600">
          {completed}
        </h2>
      </div>

      {/* Due Today */}
      <div className={cardStyle}>
        <p className="text-xs sm:text-sm text-gray-500">Due Today</p>
        <h2 className="text-xl sm:text-2xl font-bold text-red-600">
          {dueToday}
        </h2>
      </div>
    </div>
  )
}