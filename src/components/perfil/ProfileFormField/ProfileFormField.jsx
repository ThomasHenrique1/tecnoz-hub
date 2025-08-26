'use client'

export function ProfileFormField({
  label,
  name,
  type,
  value,
  onChange,
  required = false
}) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="input input-bordered w-full"
        required={required}
      />
    </div>
  )
}