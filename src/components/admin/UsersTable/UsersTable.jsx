// components/admin/UsersTable.jsx
'use client'

import UserTableRow from "../UserTableRow/UserTableRow"



export default function UsersTable({ 
  usuarios, 
  onUpdateUserType, 
  onDeleteUser,
  deletingId,
  busca 
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-base-300 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-base-300">
          <thead className="bg-base-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider">
                Nome
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider">
                Cadastrado em
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-base-100 divide-y divide-base-300">
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <UserTableRow
                  key={usuario.auth_id}
                  usuario={usuario}
                  onUpdateUserType={onUpdateUserType}
                  onDeleteUser={onDeleteUser}
                  isDeleting={deletingId === usuario.auth_id}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-base-content/70">
                  {busca ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}