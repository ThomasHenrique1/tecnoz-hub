// components/admin/Produtos/FormField/FormField.jsx
export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  rows = 3,
  maxLength,
  ...props
}) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">
          {label} {required && <span className="text-error">*</span>}
        </span>
        {maxLength && (
          <span className="label-text-alt">
            {value.length}/{maxLength}
          </span>
        )}
      </label>
      
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          maxLength={maxLength}
          className="textarea textarea-bordered w-full rounded-field"
          style={{ borderRadius: 'var(--radius-field, 1rem)' }}
          {...props}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className="input input-bordered w-full rounded-field"
          style={{ borderRadius: 'var(--radius-field, 1rem)' }}
          {...props}
        />
      )}
    </div>
  );
}