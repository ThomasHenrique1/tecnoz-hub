// components/admin/UserTableRow.jsx
'use client'

import { useState } from 'react'

export default function UserTableRow({ 
  usuario, 
  onUpdateUserType, 
  onDeleteUser,
  isDeleting 
}) {
  const [localType, setLocalType] = useState(usuario.tipo_usuario)

  const handleTypeChange = async (e) => {
    const newType = e.target.value
    setLocalType(newType)
    await onUpdateUserType(usuario.auth_id, newType)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <tr className="hover:bg-base-200 transition-colors">
      <td className="py-4 px-4">
        <div className="font-medium">{usuario.nome}</div>
        <div className="text-sm text-base-content/70">
          ID: {usuario.auth_id.substring(0, 8)}...
        </div>
      </td>
      <td className="py-4 px-4">{usuario.email}</td>
      <td className="py-4 px-4">
        <select
          value={localType}
          onChange={handleTypeChange}
          className="select select-bordered select-sm w-full max-w-xs"
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        {formatDate(usuario.created_at)}
      </td>
      <td className="py-4 px-4">
        <button
          onClick={() => onDeleteUser(usuario.auth_id, usuario.nome)}
          className={`btn btn-sm ${
            usuario.tipo_usuario === 'admin' ? 'btn-disabled' : 'btn-error'
          }`}
          disabled={usuario.tipo_usuario === 'admin' || isDeleting}
        >
          {isDeleting && usuario.auth_id === deletingId ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            'Remover'
          )}
        </button>
      </td>
    </tr>
  )
}