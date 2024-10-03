import React from 'react'

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
        htmlFor={name}
        className="block text-sm font-medium text-[#4bc45b]">
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-transparent py-1 px-2 text-var(--main-color)"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className=" bg-transparent placeholder:text-zinc-400 placeholder:text-opacity-30 border-2 border-[#4bc45b] text-[#4bc45b] text-sm focus:ring-[#ebebed] focus:border-[#55f36a] outline-none block w-20rem h-100% p-3 text-1.3rem"
      />
    </div>
  )
}

export default FormField