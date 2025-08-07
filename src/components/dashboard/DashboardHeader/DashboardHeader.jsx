export default function DashboardHeader({ nomeUsuario }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-primary">
        Bem-vindo, {nomeUsuario || "Usuário"}
      </h1>
      <p className="text-gray-500 mt-2">Gerencie seus pedidos e produtos</p>
    </header>
  )
}