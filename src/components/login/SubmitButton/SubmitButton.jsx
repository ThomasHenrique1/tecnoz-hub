'use client'

export function SubmitButton({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`btn btn-primary w-full mt-6 ${loading ? 'opacity-75' : ''}`}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          {children}
        </>
      ) : children}
    </button>
  )
}