"use client"

import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Props {
    search: string
    setSearch: (value: string) => void

    status: string
    setStatus: (value: string) => void

    sort: string
    setSort: (value: string) => void
}

export default function TaskFilters({
    search,
    setSearch,
    status,
    setStatus,
    sort,
    setSort,
}: Props) {
    return (
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
          
            <div className="w-full sm:flex-1">
                <Input
                    className="w-full bg-white text-black border-gray-300 placeholder:text-gray-500"
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="w-full sm:w-48">
                <Select onValueChange={setStatus} value={status}>
                    <SelectTrigger className="w-full bg-white text-black cursor-pointer border-gray-300">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>

                    <SelectContent className="bg-white text-black">
                        <SelectItem value="all" className="cursor-pointer">All</SelectItem>
                        <SelectItem value="todo" className="cursor-pointer">Todo</SelectItem>
                        <SelectItem value="in-progress" className="cursor-pointer">In Progress</SelectItem>
                        <SelectItem value="completed" className="cursor-pointer">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="w-full sm:w-48">
                <Select onValueChange={setSort} value={sort}>
                    <SelectTrigger className="w-full bg-white text-black cursor-pointer border-gray-300">
                        <SelectValue placeholder="Sort by date" />
                    </SelectTrigger>

                    <SelectContent className="bg-white text-black">
                        <SelectItem value="asc" className="cursor-pointer">Due Date ↑</SelectItem>
                        <SelectItem value="desc "className="cursor-pointer">Due Date ↓</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}