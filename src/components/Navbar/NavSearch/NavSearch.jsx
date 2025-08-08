export default function NavSearch() {
  return (
    <div className="hidden lg:block">
      <input
        type="text"
        placeholder="Buscar..."
        className="input input-bordered input-sm w-40 focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  )
}