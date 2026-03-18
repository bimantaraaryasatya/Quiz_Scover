"use client"

import Image from "next/image"
import { useState } from "react"

export default function StudentProfile() {

  const [showUserModal, setShowUserModal] = useState(false)
  const [showParentModal, setShowParentModal] = useState(false)

  return (
    <div className="p-8 bg-[#f5f7fb] min-h-screen">

      {/* PROFILE CARD */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        {/* GRADIENT */}
        <div className="h-[120px] bg-gradient-to-r from-blue-500 via-purple-600 to-blue-400" />

        <div className="px-8 pb-10">

          {/* TOP SECTION */}
          <div className="flex items-end justify-between -mt-14 mb-8">

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow">
                <Image
                  src="/images/Icon_Dashboard.png"
                  alt="profile"
                  width={80}
                  height={80}
                />
              </div>

              <div>
                <h2 className="font-semibold text-gray-800 text-lg">
                  Alice Smith
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  alice.smith@student.com
                </p>
              </div>
            </div>

            {/* ONLY EDIT BUTTON */}
            <button
              onClick={() => setShowUserModal(true)}
              className="bg-[#1f4f6e] hover:bg-[#183e55] text-white px-5 py-2 rounded-md text-sm"
            >
              Edit
            </button>

          </div>

          {/* DIVIDER */}
          <div className="border-t pt-6">

            <h3 className="font-semibold text-gray-800 mb-6">
              Personal Information
            </h3>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <Field label="Username" />
              <Field label="Fullname" />
              <Field label="Current Password" />
              <Field label="Phone Number" />
              <Field label="Parents Name" />
              <Field label="Parents Phone Number" />

            </div>

          </div>

        </div>
      </div>

      {/* ================= MODAL STEP 1 ================= */}
      {showUserModal && (
        <div className="fixed inset-0 bg-[#1e3a5f]/40 backdrop-blur-sm flex items-center justify-center z-50">
          
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl px-8 py-7">

            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                Update User Information
              </h2>
              <p className="text-xs text-blue-500 text-right mt-1">
                Step 1 of 2
              </p>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
              <div className="w-1/3 h-2 bg-[#1f4f6e] rounded-full" />
            </div>

            <div className="space-y-4">
              <InputModal label="Username" placeholder="Input Username" />
              <InputModal label="Fullname" placeholder="Input Fullname" />
              <InputModal label="New Password" placeholder="Min. 8 Characters" />
              <InputModal label="Confirm Password" placeholder="Confirm Your New Password" error />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-5 py-2 border border-[#1f4f6e] text-[#1f4f6e] rounded-md text-sm"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowUserModal(false)
                  setShowParentModal(true)
                }}
                className="px-6 py-2 bg-[#1f4f6e] text-white rounded-md text-sm"
              >
                Next
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= MODAL STEP 2 ================= */}
      {showParentModal && (
        <div className="fixed inset-0 bg-[#1e3a5f]/40 backdrop-blur-sm flex items-center justify-center z-50">
          
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl px-8 py-7">

            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                Update User Parent Information
              </h2>
              <p className="text-xs text-blue-500 text-right mt-1">
                Step 2 of 2
              </p>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
              <div className="w-2/3 h-2 bg-[#1f4f6e] rounded-full" />
            </div>

            <div className="space-y-4">
              <InputModal label="Email" placeholder="Input Email" />
              <InputModal label="Phone Number" placeholder="8023456789" />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  setShowParentModal(false)
                  setShowUserModal(true)
                }}
                className="px-5 py-2 border border-[#1f4f6e] text-[#1f4f6e] rounded-md text-sm"
              >
                Back
              </button>

              <button
                onClick={() => setShowParentModal(false)}
                className="px-6 py-2 bg-[#1f4f6e] text-white rounded-md text-sm"
              >
                Update
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

/* FIELD (NO EDIT BUTTON ANYMORE) */
function Field({ label }: any) {
  return (
    <div>
      <label className="text-sm text-gray-600 mb-2 block font-medium">
        {label}
      </label>
      <input
        disabled
        placeholder="Your First Name"
        className="w-full px-4 py-3 rounded-lg text-sm border bg-gray-100 border-gray-200 text-gray-500"
      />
    </div>
  )
}

/* MODAL INPUT */
function InputModal({ label, placeholder, error }: any) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">
        {label}
      </label>

      <input
        placeholder={placeholder}
        className={`
          w-full px-4 py-2.5 rounded-md text-sm border
          ${error
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-300 focus:ring-[#1f4f6e]"}
          focus:outline-none focus:ring-2
        `}
      />
    </div>
  )
}