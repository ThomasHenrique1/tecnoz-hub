'use client'

export function FormField({ label, type, name, value, onChange, placeholder, required, disabled }) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-medium">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      />
    </div>
  )
}