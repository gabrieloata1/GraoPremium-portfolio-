import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Award, Clock, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, testimonials } from '../data/products';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function Home() {
  const { addItem } = useCart();
  const featuredProducts = products.filter(p => p.badge).slice(0, 4);
  const bestSellers = products.filter(p => p.reviews > 200).slice(0, 4);

  const handleQuickAdd = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    const product = products.find(p => p.id === productId);
    if (product) {
      addItem(product);
      toast.success(`${product.name} adicionado ao carrinho!`, {
        icon: '☕',
        style: { borderRadius: '12px', background: '#1c1917', color: '#fff' },
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-950 via-amber-900 to-stone-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-9xl animate-float">☕</div>
          <div className="absolute top-40 right-20 text-7xl animate-float-delayed">🫘</div>
          <div className="absolute bottom-10 left-1/3 text-8xl animate-float">🌿</div>
          <div className="absolute bottom-20 right-10 text-6xl animate-float-delayed">✨</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-amber-200 text-xs sm:text-sm font-medium">Novos cafés disponíveis</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] mb-6">
                O melhor café do{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Brasil
                </span>
                {' '}na sua xícara
              </h1>

              <p className="text-base sm:text-lg text-amber-200/80 mb-8 max-w-lg leading-relaxed">
                Cafés especiais torrados artesanalmente, direto das melhores fazendas. 
                Do plantio à sua xícara, cada grão conta uma história.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/produtos"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-bold text-base sm:text-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
                >
                  Explorar Cafés <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/produtos?categoria=kits"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white rounded-xl font-semibold text-base sm:text-lg border border-white/20 hover:bg-white/20 transition-all backdrop-blur"
                >
                  🎁 Kits Presente
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-6 sm:gap-10 mt-10 sm:mt-12">
                {[
                  { value: '20k+', label: 'Clientes felizes' },
                  { value: '50+', label: 'Origens' },
                  { value: '4.9★', label: 'Avaliação' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="text-xl sm:text-2xl font-black text-white">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-amber-300/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-amber-600/30 to-amber-800/30 rounded-full blur-3xl absolute inset-0 m-auto" />
                <div className="relative w-72 h-72 xl:w-96 xl:h-96 bg-gradient-to-br from-amber-700 to-amber-950 rounded-3xl flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <span className="text-[120px] xl:text-[160px] animate-coffee-steam">☕</span>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 animate-bounce-slow">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🫘</span>
                    <div>
                      <div className="text-xs font-bold text-gray-900">Grão Selecionado</div>
                      <div className="text-[10px] text-gray-500">100% Arábica</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-3 animate-bounce-slow-delayed">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <div className="text-xs font-bold text-gray-900">Torrado Hoje</div>
                      <div className="text-[10px] text-gray-500">Envio em 24h</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 33.3C672 36.7 768 43.3 864 45C960 46.7 1056 43.3 1152 38.3C1248 33.3 1344 26.7 1392 23.3L1440 20V60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { icon: <Truck className="w-6 h-6" />, title: 'Frete Grátis', desc: 'Acima de R$ 199' },
              { icon: <Shield className="w-6 h-6" />, title: 'Pagamento Seguro', desc: 'Stripe + SSL' },
              { icon: <Award className="w-6 h-6" />, title: 'Qualidade Premium', desc: 'Nota 85+ SCA' },
              { icon: <Clock className="w-6 h-6" />, title: 'Envio Rápido', desc: 'Em até 24 horas' },
            ].map(item => (
              <div key={item.title} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-4 rounded-xl hover:bg-amber-50 transition-colors text-center sm:text-left">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8 sm:mb-12">
            <div>
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Seleção Especial</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-1">
                Produtos em Destaque
              </h2>
            </div>
            <Link to="/produtos" className="hidden sm:flex items-center gap-1 text-amber-700 font-semibold hover:text-amber-800 transition-colors">
              Ver todos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="sm:hidden mt-6 text-center">
            <Link to="/produtos" className="inline-flex items-center gap-1 text-amber-700 font-semibold">
              Ver todos os produtos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Banner */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Explore</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-1">
              Nossas Categorias
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.filter(c => c.slug !== 'todos').map(cat => (
              <Link
                key={cat.slug}
                to={`/produtos?categoria=${cat.slug}`}
                className="group p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl text-center hover:shadow-lg hover:shadow-amber-200/50 border border-amber-100 hover:border-amber-300 transition-all duration-300"
              >
                <span className="text-3xl sm:text-4xl block mb-2 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </span>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{cat.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {products.filter(p => p.categorySlug === cat.slug).length} produtos
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8 sm:mb-12">
            <div>
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Populares</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-1">
                Mais Vendidos
              </h2>
            </div>
            <Link to="/produtos" className="hidden sm:flex items-center gap-1 text-amber-700 font-semibold hover:text-amber-800">
              Ver todos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900 rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-600/20 rounded-full blur-3xl" />
            
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm font-semibold mb-4">
                  ☕ Oferta Especial
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                  Kit Degustação com <span className="text-amber-400">30% OFF</span>
                </h2>
                <p className="text-amber-200/70 text-base sm:text-lg mb-6 max-w-lg">
                  Experimente 3 origens distintas do Brasil em um kit exclusivo. Perfeito para presentes ou para descobrir seu café favorito.
                </p>
                <button
                  onClick={(e) => handleQuickAdd(e, 22)}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-amber-950 rounded-xl font-bold text-base sm:text-lg hover:from-amber-400 hover:to-amber-300 transition-all shadow-lg"
                >
                  Aproveitar Oferta <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="hidden lg:flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gradient-to-br from-amber-600/40 to-orange-700/40 rounded-3xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                    <span className="text-[100px]">🎁</span>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-black text-sm shadow-lg">
                    -30%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Depoimentos</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-1">
              O que dizem nossos clientes
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-5xl sm:text-6xl block mb-4">☕</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            Pronto para o melhor café da sua vida?
          </h2>
          <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-lg mx-auto">
            Junte-se a mais de 20.000 amantes de café que já descobriram o sabor incomparável dos nossos grãos especiais.
          </p>
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg shadow-amber-500/25"
          >
            Comprar Agora <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
