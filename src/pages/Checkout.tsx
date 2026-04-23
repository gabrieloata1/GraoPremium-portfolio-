import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Lock, Check, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [processing, setProcessing] = useState(false);

  const [shipping, setShipping] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  const freteGratis = totalPrice >= 199;
  const frete = freteGratis ? 0 : 15.90;
  const total = totalPrice + frete;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <span className="text-6xl block mb-4">🔐</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Faça login para continuar</h2>
          <p className="text-gray-500 mb-6">Você precisa estar logado para finalizar a compra.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar à Loja
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <span className="text-6xl block mb-4">🛒</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Carrinho vazio</h2>
          <p className="text-gray-500 mb-6">Adicione produtos ao carrinho para continuar.</p>
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors"
          >
            Ver Produtos
          </Link>
        </div>
      </div>
    );
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate Stripe payment processing
    setTimeout(() => {
      setProcessing(false);
      setStep('success');
      clearCart();
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length > 2) return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    return cleaned;
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 sm:p-12 max-w-md mx-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Pedido Confirmado! 🎉</h2>
          <p className="text-gray-500 mb-2">Pagamento processado com sucesso via Stripe.</p>
          <p className="text-sm text-gray-400 mb-6">
            Pedido #GP{Math.random().toString(36).substring(2, 8).toUpperCase()}
          </p>
          <div className="bg-amber-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-amber-800">
              📧 Um e-mail de confirmação foi enviado para <strong>{user?.email}</strong>
            </p>
            <p className="text-sm text-amber-800 mt-1">
              🚚 Previsão de entrega: <strong>3-5 dias úteis</strong>
            </p>
          </div>
          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all text-center"
            >
              Voltar à Loja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/produtos" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm">
              <ArrowLeft className="w-4 h-4" /> Continuar comprando
            </Link>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-500">Checkout seguro com Stripe</span>
            </div>
          </div>

          {/* Steps */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[
              { key: 'shipping', label: '1. Endereço', icon: '📍' },
              { key: 'payment', label: '2. Pagamento', icon: '💳' },
              { key: 'success', label: '3. Confirmação', icon: '✅' },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                  step === s.key
                    ? 'bg-amber-600 text-white'
                    : i < (step === 'shipping' ? 0 : step === 'payment' ? 1 : 2)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <span>{s.icon}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < 2 && <div className="w-6 sm:w-12 h-px bg-gray-300" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'shipping' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Endereço de Entrega</h2>
                <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                      <input
                        type="text"
                        value={shipping.name}
                        onChange={e => setShipping({ ...shipping, name: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                      <input
                        type="email"
                        value={shipping.email}
                        onChange={e => setShipping({ ...shipping, email: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <input
                      type="tel"
                      value={shipping.phone}
                      onChange={e => setShipping({ ...shipping, phone: e.target.value })}
                      placeholder="(11) 99999-9999"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                    <input
                      type="text"
                      value={shipping.cep}
                      onChange={e => setShipping({ ...shipping, cep: e.target.value })}
                      placeholder="00000-000"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rua / Avenida</label>
                    <input
                      type="text"
                      value={shipping.street}
                      onChange={e => setShipping({ ...shipping, street: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                      <input
                        type="text"
                        value={shipping.number}
                        onChange={e => setShipping({ ...shipping, number: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                      <input
                        type="text"
                        value={shipping.complement}
                        onChange={e => setShipping({ ...shipping, complement: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                      <input
                        type="text"
                        value={shipping.neighborhood}
                        onChange={e => setShipping({ ...shipping, neighborhood: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                      <input
                        type="text"
                        value={shipping.city}
                        onChange={e => setShipping({ ...shipping, city: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                      <select
                        value={shipping.state}
                        onChange={e => setShipping({ ...shipping, state: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      >
                        <option value="">Selecione</option>
                        {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold text-base hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg mt-2"
                  >
                    Continuar para Pagamento
                  </button>
                </form>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Pagamento</h2>
                  <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 rounded-lg">
                    <CreditCard className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-700">Stripe</span>
                  </div>
                </div>

                {/* Stripe-like Card Form */}
                <form onSubmit={handlePayment} className="space-y-4">
                  {/* Card Visual */}
                  <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-amber-400 rounded-full opacity-80" />
                        <div className="w-8 h-8 bg-red-500 rounded-full opacity-60 -ml-3" />
                      </div>
                      <span className="text-xs text-white/50 font-mono">STRIPE</span>
                    </div>
                    <div className="font-mono text-lg sm:text-xl tracking-widest mb-4">
                      {card.number || '•••• •••• •••• ••••'}
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-[10px] text-white/50 uppercase">Titular</div>
                        <div className="text-sm font-medium">{card.name || 'SEU NOME'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-white/50 uppercase">Validade</div>
                        <div className="text-sm font-medium">{card.expiry || 'MM/AA'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número do cartão</label>
                    <input
                      type="text"
                      value={card.number}
                      onChange={e => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                      placeholder="0000 0000 0000 0000"
                      required
                      maxLength={19}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome no cartão</label>
                    <input
                      type="text"
                      value={card.name}
                      onChange={e => setCard({ ...card, name: e.target.value.toUpperCase() })}
                      placeholder="COMO ESTÁ NO CARTÃO"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Validade</label>
                      <input
                        type="text"
                        value={card.expiry}
                        onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                        placeholder="MM/AA"
                        required
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <input
                        type="text"
                        value={card.cvc}
                        onChange={e => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                        placeholder="123"
                        required
                        maxLength={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl text-xs text-green-700">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Seus dados de pagamento são criptografados e processados com segurança pelo Stripe.</span>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      disabled={processing}
                      className="flex-1 py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold text-base hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {processing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          Pagar R$ {total.toFixed(2).replace('.', ',')}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 sticky top-28">
              <h3 className="font-bold text-gray-900 mb-4">Resumo do Pedido</h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.product.gradient} rounded-lg flex items-center justify-center shrink-0`}>
                      <span className="text-lg">{item.product.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qtd: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Frete</span>
                  <span className={freteGratis ? 'text-green-600' : ''}>
                    {freteGratis ? 'Grátis' : `R$ ${frete.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-2 text-xs text-purple-700">
                  <CreditCard className="w-4 h-4" />
                  <span className="font-medium">Pagamento seguro via Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
