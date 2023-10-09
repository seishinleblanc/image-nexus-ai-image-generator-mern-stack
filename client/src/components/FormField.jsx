import React from 'react'

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
        htmlFor={name}
        className="block text-sm font-medium text-[#666e75]">
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-violet-400 py-1 px-2 rounded-[5px] text-black"
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
        className="bg-transparent placeholder:text-zinc-400 placeholder:text-opacity-30 border-2 border-violet-400 text-white text-sm rounded-lg focus:ring-[#4649ff] focus:border-violet-900 outline-none block w-full p-3"
      />
    </div>
  )
}

export default FormField