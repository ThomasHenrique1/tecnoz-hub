// components/ui/BackButton.jsx
'use client'

import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

export default function BackButton({ href = '/admin' }) {
  return (
    <Link 
      href={href}
      className="btn btn-ghost btn-sm hover:bg-base-300 transition-colors"
    >
      <FiArrowLeft className="mr-1" />
      Voltar
    </Link>
  )
}