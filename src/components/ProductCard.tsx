import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} adicionado ao carrinho!`, {
      icon: '☕',
      style: {
        borderRadius: '12px',
        background: '#1c1917',
        color: '#fff',
      },
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      to={`/produto/${product.id}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-amber-200 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image Area */}
      <div className={`relative h-48 sm:h-56 bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}>
        <span className="text-6xl sm:text-7xl group-hover:scale-125 transition-transform duration-500 drop-shadow-lg">
          {product.emoji}
        </span>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="px-2.5 py-1 bg-amber-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 hover:text-red-500 shadow-md"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Quick Add */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-500 hover:text-white shadow-lg"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-[10px] uppercase tracking-wider text-amber-600 font-semibold">
            {product.category}
          </span>
          {product.weight && (
            <>
              <span className="text-gray-300">·</span>
              <span className="text-[10px] text-gray-400">{product.weight}</span>
            </>
          )}
        </div>

        <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight mb-1 group-hover:text-amber-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
        </div>

        {/* Installments */}
        <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
          ou 3x de R$ {(product.price / 3).toFixed(2).replace('.', ',')} sem juros
        </p>
      </div>
    </Link>
  );
}
