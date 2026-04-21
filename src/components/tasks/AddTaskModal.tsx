"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { useTaskStore } from "@/store/useTaskStore"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function AddTaskModal() {
    const { addTask } = useTaskStore()

    const [open, setOpen] = useState(false) 

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")

    const handleSubmit = () => {
        if (!title) {
            alert("Title is required")
            return
        }

        addTask({
            id: uuidv4(),
            title,
            description,
            status: "todo",
            dueDate,
        })

        // reset form
        setTitle("")
        setDescription("")
        setDueDate("")

        setOpen(false) 
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-white text-black border cursor-pointer border-gray-800 hover:bg-black hover:text-white w-full sm:w-auto">
                    Add Task <span className="ml-1 font-semibold">+</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[95%] sm:max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-5 sm:p-6 [&>button]:text-gray-500 [&>button]:hover:text-black">
                <DialogHeader>
                    <DialogTitle className="text-gray-900 text-lg font-semibold">
                        Add New Task
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full border border-gray-300 bg-white text-black p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    
                    <textarea
                        placeholder="Description"
                        className="w-full border border-gray-300 bg-white text-black p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                
                    <input
                        type="date"
                        className="w-full border border-gray-300 bg-white text-black p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />

            
                    <Button
                        onClick={handleSubmit}
                        className="w-full bg-black text-white hover:bg-gray-800 transition cursor-pointer"
                    >
                        Save Task
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}