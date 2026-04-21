"use client"

import { Task, useTaskStore } from "@/store/useTaskStore"
import { Button } from "@/components/ui/button"
import EditTaskModal from "./EditTaskModal"

interface Props {
    task: Task
}

export default function TaskCard({ task }: Props) {
    const { deleteTask, updateTask } = useTaskStore()

    const handleDelete = () => {
        deleteTask(task.id)
    }

    const handleStatusChange = () => {
        const nextStatus =
            task.status === "todo"
                ? "in-progress"
                : task.status === "in-progress"
                    ? "completed"
                    : "todo"

        updateTask({ ...task, status: nextStatus })
    }

    const statusColor =
        task.status === "completed"
            ? "bg-green-100 text-green-700"
            : task.status === "in-progress"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-200 text-gray-700"

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 space-y-3 border">
            {/* Title */}
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                {task.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-600 wrap-break-word">
                {task.description || "No description"}
            </p>

            {/* Status + Date */}
            <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className={`px-3 py-1 rounded-full ${statusColor}`}>
                    {task.status}
                </span>

                <span className="text-gray-500 text-xs sm:text-sm">
                    📅 {task.dueDate || "No date"}
                </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <EditTaskModal task={task} />

                <Button
                    variant="outline"
                    onClick={handleStatusChange}
                    className="w-full cursor-pointer sm:w-auto hover:bg-neutral-700"
                >
                    Status
                </Button>

                <Button
                    variant="destructive"
                    onClick={handleDelete}
                    className="w-full sm:w-auto cursor-pointer text-black hover:text-gray-500"
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}