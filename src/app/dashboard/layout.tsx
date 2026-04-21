import Sidebar from "@/components/common/SideBar"
import { Suspense } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <Suspense fallback={<div className="w-64 bg-white" />}>
        <Sidebar />
      </Suspense>

      <main className="flex-1 p-4 md:p-6">
        {children}
      </main>
    </div>
  )
}