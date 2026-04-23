import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, Minus, Plus, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl block mb-4">😵</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Produto não encontrado</h2>
          <Link to="/produtos" className="text-amber-700 font-semibold hover:underline">
            Ver todos os produtos
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`, {
      icon: '☕',
      style: { borderRadius: '12px', background: '#1c1917', color: '#fff' },
      duration: 3000,
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-amber-700 transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/produtos" className="hover:text-amber-700 transition-colors">Produtos</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/produtos?categoria=${product.categorySlug}`} className="hover:text-amber-700 transition-colors">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className={`relative aspect-square bg-gradient-to-br ${product.gradient} rounded-3xl flex items-center justify-center overflow-hidden shadow-xl`}>
              <span className="text-[100px] sm:text-[140px] lg:text-[180px] animate-float">{product.emoji}</span>
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-amber-500 text-white text-sm font-bold rounded-full shadow-lg">
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-4 right-4 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full shadow-lg">
                  -{discount}%
                </span>
              )}
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`aspect-square bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center cursor-pointer border-2 ${
                    i === 0 ? 'border-amber-500' : 'border-transparent hover:border-amber-300'
                  } transition-colors`}
                >
                  <span className="text-2xl sm:text-3xl">{product.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider text-amber-600 font-semibold bg-amber-50 px-2 py-1 rounded">
                  {product.category}
                </span>
                {product.origin && (
                  <span className="text-xs text-gray-400">📍 {product.origin}</span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviews} avaliações)</span>
            </div>

            {/* Price */}
            <div className="bg-amber-50 rounded-2xl p-4 sm:p-5">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-gray-900">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                ou 3x de R$ {(product.price / 3).toFixed(2).replace('.', ',')} sem juros
              </p>
              <p className="text-xs text-green-600 mt-1 font-medium">
                💰 Economize R$ {((product.originalPrice || product.price) - product.price).toFixed(2).replace('.', ',')}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>

            {/* Intensity */}
            {product.intensity > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Intensidade</span>
                  <span className="text-sm text-gray-500">{product.intensity}/12</span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-2 rounded-full ${
                        i < product.intensity
                          ? 'bg-gradient-to-r from-amber-500 to-amber-700'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {product.features.map(feature => (
                <span
                  key={feature}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-lg font-medium"
                >
                  ✓ {feature}
                </span>
              ))}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold text-base sm:text-lg hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg shadow-amber-500/25"
              >
                <ShoppingCart className="w-5 h-5" />
                Adicionar ao Carrinho
              </button>
              <button className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border-2 border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-colors">
                <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
              </button>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
              {[
                { icon: <Truck className="w-4 h-4" />, label: 'Frete grátis acima de R$ 199' },
                { icon: <Shield className="w-4 h-4" />, label: 'Pagamento seguro' },
                { icon: <RotateCcw className="w-4 h-4" />, label: 'Troca em até 7 dias' },
              ].map(item => (
                <div key={item.label} className="flex flex-col items-center text-center gap-1">
                  <div className="text-amber-600">{item.icon}</div>
                  <span className="text-[10px] sm:text-xs text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
              Produtos Relacionados
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
