// components/admin/FormActions.jsx
import Link from "next/link"

export default function FormActions({
  loading = false,
  loadingText = "Salvando...",
  submitText = "Salvar",
  onCancel,
  cancelText = "Cancelar",
  cancelHref
}) {
  return (
    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-base-300">
      {onCancel ? (
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="btn btn-outline rounded-btn"
          style={{ borderRadius: 'var(--radius-field, 1rem)' }}
        >
          {cancelText}
        </button>
      ) : cancelHref ? (
        <Link
          href={cancelHref}
          className="btn btn-outline rounded-btn"
          style={{ borderRadius: 'var(--radius-field, 1rem)' }}
        >
          {cancelText}
        </Link>
      ) : null}
      
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary rounded-btn"
        style={{ borderRadius: 'var(--radius-field, 1rem)' }}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            {loadingText}
          </>
        ) : (
          submitText
        )}
      </button>
    </div>
  )
}