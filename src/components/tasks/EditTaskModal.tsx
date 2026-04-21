"use client"

import { useState, useEffect } from "react"
import { Task, useTaskStore } from "@/store/useTaskStore"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Props {
  task: Task
}

export default function EditTaskModal({ task }: Props) {
  const { updateTask } = useTaskStore()

  const [open, setOpen] = useState(false)

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [dueDate, setDueDate] = useState(task.dueDate)

  // ✅ Sync latest task data when modal opens
  useEffect(() => {
    if (open) {
      setTitle(task.title)
      setDescription(task.description)
      setDueDate(task.dueDate)
    }
  }, [open, task])

  const handleUpdate = () => {
    if (!title) {
      alert("Title is required")
      return
    }

    updateTask({
      ...task,
      title,
      description,
      dueDate,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-neutral-700 w-full sm:w-auto cursor-pointer "
        >
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95%] sm:max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-5 sm:p-6 [&>button]:text-gray-500 [&>button]:hover:text-black">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Edit Task
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 bg-white text-black p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            className="w-full border border-gray-300 bg-white text-black p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Date */}
          <input
            type="date"
            className="w-full border border-gray-300 bg-white text-black p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          {/* Button */}
          <Button
            onClick={handleUpdate}
            className="w-full bg-black text-white cursor-pointer hover:bg-gray-800 transition"
          >
            Update Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}