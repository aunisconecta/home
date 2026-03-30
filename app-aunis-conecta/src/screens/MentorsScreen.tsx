import React from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronRight, Award, Zap } from 'lucide-react';

const MENTORS = [
    {
        id: 1,
        name: "Janne Abreu",
        specialty: "Networking & Ecossistemas",
        description: "Especialista em orquestrar parcerias de alto impacto e conexões estratégicas.",
        avatar: "https://i.ibb.co/MywfPQx7/Janne.jpg",
        rating: 5.0
    },
    {
        id: 2,
        name: "Mayara Fogaça",
        specialty: "Gestão & Estratégia B2B",
        description: "Focada em tração de negócios e mentalidade executiva para o crescimento exponencial.",
        avatar: "https://i.ibb.co/4nQjztWx/Mayara.webp",
        rating: 5.0
    }
];

const MentorsScreen = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 tracking-tighter">Escola de Mentores</h1>
            <p className="text-dim text-sm mb-10 leading-relaxed">Aprenda diretamente com quem domina as regras do jogo no mercado real.</p>

            <div className="space-y-6">
                {MENTORS.map(mentor => (
                    <motion.div 
                        whileTap={{ scale: 0.98 }}
                        key={mentor.id} 
                        className="p-6 bg-surface-raised border border-glass rounded-3xl relative overflow-hidden group cursor-pointer"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-all">
                            <Award size={80} className="text-gold" />
                        </div>

                        <div className="flex gap-5 items-start mb-6">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gold/40 shadow-xl">
                                <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold group-hover:text-gold transition-all">{mentor.name}</h3>
                                <p className="text-[10px] uppercase tracking-widest text-gold font-bold">{mentor.specialty}</p>
                            </div>
                        </div>

                        <p className="text-dim text-xs leading-relaxed mb-6">{mentor.description}</p>
                        
                        <div className="flex justify-between items-center bg-black/40 p-4 -mx-6 -mb-6 mt-4">
                            <div className="flex items-center gap-1 text-gold">
                                <Star size={14} fill="var(--color-gold)" />
                                <span className="text-sm font-bold">{mentor.rating}</span>
                                <span className="text-[10px] text-dim ml-1">(Referência)</span>
                            </div>
                            <button className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                Ver Mentor <ChevronRight size={16} className="text-red" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-12 p-6 bg-red/10 border border-red/20 rounded-3xl flex items-center gap-6">
                <div className="p-4 bg-red rounded-2xl text-white">
                    <Zap size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-sm">Torne-se um Mentor</h4>
                    <p className="text-[10px] text-dim">Compartilhe sua expertise e lidere.</p>
                </div>
            </div>
        </div>
    );
};

export default MentorsScreen;
