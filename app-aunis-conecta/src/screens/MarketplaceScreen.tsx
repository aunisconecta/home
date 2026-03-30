import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, Star } from 'lucide-react';

const CATEGORIES = ["Consultoria", "Marketing", "Tecnologia", "Finanças", "RH"];

const SERVICES = [
    {
        id: 1,
        title: "Mentoria de Networking",
        description: "Transforme sua rede de contatos em uma máquina de vendas.",
        price: "R$ 1.500",
        provider: "Janne Abreu",
        rating: 4.9,
        category: "Consultoria"
    },
    {
        id: 2,
        title: "Trafego Pago para Negócios",
        description: "Crie anúncios irresistíveis para o público corporativo.",
        price: "R$ 2.400",
        provider: "Mayara Fogaça",
        rating: 5.0,
        category: "Marketing"
    }
];

const MarketplaceScreen = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 tracking-tighter">Marketplace</h1>
            <p className="text-dim text-sm mb-6">Soluções estratégicas para sua empresa crescer.</p>

            <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scroll-hide">
                <button className="flex items-center gap-2 bg-red/10 border border-red text-red px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap">
                    <Filter size={14} /> Todos
                </button>
                {CATEGORIES.map(cat => (
                    <button key={cat} className="bg-surface-raised border border-glass text-dim px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap hover:text-white transition-colors">
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid gap-6">
                {SERVICES.map(service => (
                    <motion.div 
                        whileTap={{ scale: 0.98 }}
                        key={service.id} 
                        className="card-premium overflow-hidden border-2 border-transparent hover:border-gold/20 transition-all cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] uppercase tracking-widest text-gold font-bold px-3 py-1 bg-gold/10 rounded-full">{service.category}</span>
                            <div className="flex items-center gap-1 text-gold">
                                <Star size={12} fill="var(--color-gold)" />
                                <span className="text-xs font-bold">{service.rating}</span>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                        <p className="text-xs text-dim mb-6 leading-relaxed">{service.description}</p>
                        
                        <div className="flex justify-between items-center bg-black/40 p-4 -mx-5 -mb-5 mt-4">
                            <div className="text-white font-bold">
                                <span className="text-[10px] text-dim block font-normal">A partir de</span>
                                {service.price}
                            </div>
                            <button className="text-red flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:translate-x-1 transition-transform">
                                Ver Detalhes <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MarketplaceScreen;
