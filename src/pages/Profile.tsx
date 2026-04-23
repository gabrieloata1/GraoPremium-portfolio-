import { Link } from 'react-router-dom';
import { User, Mail, MapPin, Package, Heart, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <span className="text-6xl block mb-4">🔐</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Faça login para continuar</h2>
          <p className="text-gray-500 mb-6">Você precisa estar logado para ver seu perfil.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors"
          >
            Voltar à Loja
          </Link>
        </div>
      </div>
    );
  }

  const orders = [
    { id: 'GP7F2A1', date: '15/01/2025', status: 'Entregue', total: 'R$ 129,80', items: 3, emoji: '✅' },
    { id: 'GP3D9B2', date: '02/01/2025', status: 'Em trânsito', total: 'R$ 74,90', items: 1, emoji: '🚚' },
    { id: 'GP8E1C3', date: '20/12/2024', status: 'Entregue', total: 'R$ 489,90', items: 1, emoji: '✅' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-stone-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-xl">
              {user?.avatar?.length === 1 ? user.avatar : '👤'}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black">{user?.name}</h1>
              <p className="text-amber-200/70 text-sm sm:text-base">{user?.email}</p>
              <p className="text-amber-400 text-xs mt-1">☕ Cliente desde Janeiro 2024 · 3 pedidos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900">3</div>
                <div className="text-xs text-gray-500">Pedidos</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900">7</div>
                <div className="text-xs text-gray-500">Favoritos</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-lg">⭐</span>
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900">150</div>
                <div className="text-xs text-gray-500">Pontos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Pedidos Recentes</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {orders.map(order => (
              <div key={order.id} className="p-4 sm:p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xl sm:text-2xl">{order.emoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-900">#{order.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          order.status === 'Entregue' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {order.date} · {order.items} {order.items === 1 ? 'item' : 'itens'} · {order.total}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Info */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Informações Pessoais</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400">Nome</div>
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400">E-mail</div>
                  <div className="text-sm font-medium text-gray-900">{user?.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400">Endereço</div>
                  <div className="text-sm font-medium text-gray-400">Nenhum endereço cadastrado</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Ações</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <span className="text-lg">📋</span>
                <span className="text-sm font-medium text-gray-700">Editar Perfil</span>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <span className="text-lg">🔔</span>
                <span className="text-sm font-medium text-gray-700">Notificações</span>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <span className="text-lg">🔒</span>
                <span className="text-sm font-medium text-gray-700">Alterar Senha</span>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-left text-red-600"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sair da Conta</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
