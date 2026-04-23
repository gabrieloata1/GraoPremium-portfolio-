import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const { isAuthenticated, setIsLoginModalOpen } = useAuth();

  if (!isCartOpen) return null;

  const freteGratis = totalPrice >= 199;
  const frete = freteGratis ? 0 : 15.90;
  const total = totalPrice + frete;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg font-bold text-gray-900">Carrinho</h2>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <span className="text-6xl mb-4">🛒</span>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Carrinho vazio</h3>
            <p className="text-sm text-gray-500 mb-6">Adicione alguns cafés deliciosos!</p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="px-6 py-2.5 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors"
            >
              Ver Produtos
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.product.gradient} rounded-lg flex items-center justify-center shrink-0`}>
                    <span className="text-2xl">{item.product.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{item.product.name}</h4>
                    <p className="text-xs text-gray-500">{item.product.weight}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">
                          R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-4 sm:p-5 space-y-3">
              {/* Free shipping bar */}
              <div>
                {!freteGratis ? (
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Faltam R$ {(199 - totalPrice).toFixed(2).replace('.', ',')} para frete grátis</span>
                      <span>🚚</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-amber-500 rounded-full h-1.5 transition-all duration-500"
                        style={{ width: `${Math.min((totalPrice / 199) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 text-xs font-medium">
                    ✅ Parabéns! Você ganhou frete grátis!
                  </div>
                )}
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Frete</span>
                  <span className={freteGratis ? 'text-green-600 line-through' : ''}>
                    {freteGratis ? 'R$ 15,90' : `R$ ${frete.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                {freteGratis && (
                  <div className="flex justify-between text-green-600 text-xs">
                    <span>Desconto frete</span>
                    <span>- R$ 15,90</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-900 text-base pt-1.5 border-t border-gray-100">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <p className="text-[10px] text-gray-400">
                  ou 3x de R$ {(total / 3).toFixed(2).replace('.', ',')} sem juros
                </p>
              </div>

              <div className="space-y-2 pt-1">
                {isAuthenticated ? (
                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-center rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg"
                  >
                    Finalizar Compra
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsLoginModalOpen(true);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg"
                  >
                    Finalizar Compra
                  </button>
                )}
                <button
                  onClick={clearCart}
                  className="w-full py-2.5 text-gray-500 text-sm hover:text-red-500 transition-colors"
                >
                  Limpar Carrinho
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
