"use client"

import Image from "next/image"
import { useState } from "react"

export default function TentorQuiz() {
  const [searchValue, setSearchValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [editId, setEditId] = useState(null)

  const [form, setForm] = useState({
    name: "",
    teacher: "",
  })

  const [subjects, setSubjects] = useState([
    { id: 1, name: "Mathematics", teacher: "Rudi Wicaksono", color: "bg-[#A9C3E8]" },
    { id: 2, name: "Mathematics", teacher: "Rudi Wicaksono", color: "bg-[#AEE1E1]" },
    { id: 3, name: "Mathematics", teacher: "Rudi Wicaksono", color: "bg-[#B7E4C7]" },
    { id: 4, name: "Mathematics", teacher: "Rudi Wicaksono", color: "bg-[#F3D5A5]" }
  ])

  const colors = ["bg-[#A9C3E8]", "bg-[#AEE1E1]", "bg-[#B7E4C7]", "bg-[#F3D5A5]"]

  const handleOpenAdd = () => {
    setEditId(null)
    setForm({ name: "", teacher: "" })
    setIsOpen(true)
  }

  const handleEdit = (subject) => {
    setEditId(subject.id)
    setForm({ name: subject.name, teacher: subject.teacher })
    setIsOpen(true)
  }

  const handleSubmit = () => {
    if (!form.name || !form.teacher) return

    if (editId) {
      setSubjects((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, ...form } : item
        )
      )
    } else {
      const newSubject = {
        id: Date.now(),
        name: form.name,
        teacher: form.teacher,
        color: colors[Math.floor(Math.random() * colors.length)]
      }
      setSubjects((prev) => [...prev, newSubject])
    }

    setIsOpen(false)
  }

  return (
    <div className="p-8 bg-[#f5f7fb] min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Time for LOCKED IN, Misca!
          </h1>
          <p className="text-gray-500 text-sm">
            28 February 2026
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white border rounded-lg px-4 py-2 shadow-sm">
          <Image
            src="/images/Icon_Dashboard.png"
            alt="profile"
            width={36}
            height={36}
            className="rounded-full"
          />

          <div className="leading-tight">
            <p className="text-sm font-semibold text-gray-800">Misca</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium"
          >
            + Add
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-4 mb-8">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="What your mood said to study?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleOpenAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
        >
          + Add
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className={`${subject.color} rounded-xl p-6 text-gray-800 shadow-md`}
          >
            <h3 className="text-lg font-semibold mb-1">
              {subject.name}
            </h3>
            <p className="text-sm mb-4">
              {subject.teacher}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => handleEdit(subject)}
                className="bg-blue-900 text-white hover:bg-blue-800 px-4 py-2 rounded-md text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">

            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Subject" : "Create New Subject"}
            </h2>

            <input
              type="text"
              placeholder="Subject Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full mb-3 px-4 py-2 border rounded-lg"
            />

            <input
              type="text"
              placeholder="Teacher Name"
              value={form.teacher}
              onChange={(e) =>
                setForm({ ...form, teacher: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}