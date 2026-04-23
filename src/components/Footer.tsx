import { Link } from 'react-router-dom';
import { Coffee, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-amber-950 to-stone-950 text-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Grão Premium</h3>
                <p className="text-[10px] text-amber-400 tracking-wider uppercase">Cafés Especiais</p>
              </div>
            </div>
            <p className="text-amber-300/70 text-sm leading-relaxed mb-4">
              Desde 2020 levando os melhores cafés especiais do Brasil até a sua xícara. 
              Direto do produtor, com torrefação artesanal.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-amber-900/50 rounded-lg flex items-center justify-center hover:bg-amber-800 transition-colors text-lg">
                📸
              </a>
              <a href="#" className="w-9 h-9 bg-amber-900/50 rounded-lg flex items-center justify-center hover:bg-amber-800 transition-colors text-lg">
                👍
              </a>
              <a href="#" className="w-9 h-9 bg-amber-900/50 rounded-lg flex items-center justify-center hover:bg-amber-800 transition-colors text-lg">
                🎬
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navegação</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Início' },
                { to: '/produtos', label: 'Todos os Produtos' },
                { to: '/produtos?categoria=graos', label: 'Cafés em Grãos' },
                { to: '/produtos?categoria=capsulas', label: 'Cápsulas' },
                { to: '/produtos?categoria=acessorios', label: 'Acessórios' },
                { to: '/produtos?categoria=kits', label: 'Kits Presente' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-amber-300/70 hover:text-amber-200 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="font-semibold text-white mb-4">Suporte</h4>
            <ul className="space-y-2">
              {['Central de Ajuda', 'Política de Troca', 'Rastrear Pedido', 'Termos de Uso', 'Política de Privacidade', 'FAQ'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-amber-300/70 hover:text-amber-200 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
                <span className="text-sm text-amber-300/70">contato@graopremium.com.br</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
                <span className="text-sm text-amber-300/70">(11) 9999-8888</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
                <span className="text-sm text-amber-300/70">Rua dos Cafés, 123<br/>Vila Madalena - SP</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-semibold text-white text-sm mb-2">Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-3 py-2 bg-amber-900/50 border border-amber-800/50 rounded-lg text-sm placeholder-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button className="px-3 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-medium transition-colors">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-amber-900/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-amber-500/60">
              © 2025 Grão Premium. Todos os direitos reservados. CNPJ: 12.345.678/0001-90
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-amber-500/60">Pagamento seguro:</span>
              <div className="flex gap-2">
                {['💳 Visa', '💳 Master', '💳 Elo', '🏦 PIX'].map(method => (
                  <span key={method} className="text-xs bg-amber-900/50 px-2 py-1 rounded">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
