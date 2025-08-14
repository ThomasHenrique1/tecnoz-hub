export default function FormInput({
  name,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  className = ''
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`input input-bordered w-full ${className}`}
    />
  )
}