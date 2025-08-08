import Link from "next/link"

export default function NavLogo() {
  return (
    <div className="flex-1 min-w-[100px]">
      <Link href="/" className="btn btn-ghost normal-case text-xl text-primary px-2">
        TecnozHub
      </Link>
    </div>
  )
}