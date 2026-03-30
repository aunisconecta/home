import React from 'react';
import { motion } from 'framer-motion';
import { Users, Filter, ArrowRight, MessageSquare, Plus } from 'lucide-react';

const TOPICS = [
    {
        id: 1,
        title: "Prospecção B2B de Alto Nível",
        author: "Carlos Machado",
        replies: 15,
        category: "Estratégia"
    },
    {
        id: 2,
        title: "Captação de Investimentos para Startups",
        author: "Fernanda Costa",
        replies: 28,
        category: "Investimentos"
    },
    {
        id: 3,
        title: "Gestão de Equipes Remotas em 2026",
        author: "Ricardo Lima",
        replies: 7,
        category: "Gestão"
    }
];

const CommunityScreen = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 tracking-tighter">Comunidade</h1>
            <p className="text-dim text-sm mb-10 leading-relaxed">Troque experiências e insights com outros líderes do ecossistema AUNIS.</p>

            <div className="space-y-4">
                {TOPICS.map(topic => (
                    <motion.div 
                        whileTap={{ scale: 0.98 }}
                        key={topic.id} 
                        className="p-5 bg-surface-raised border border-glass rounded-2xl flex justify-between items-center group cursor-pointer"
                    >
                        <div>
                            <div className="flex gap-3 items-center mb-3">
                                <span className="text-[10px] uppercase tracking-widest text-gold font-bold px-3 py-1 bg-gold/10 rounded-full">{topic.category}</span>
                                <span className="text-dim text-[10px]">Por: {topic.author}</span>
                            </div>
                            <h3 className="text-md font-bold mb-1 group-hover:text-red transition-all">{topic.title}</h3>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-black/40 min-w-[70px]">
                            <span className="text-lg font-bold text-white">{topic.replies}</span>
                            <span className="text-[8px] uppercase tracking-widest text-dim font-bold">Respostas</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-10 w-full flex items-center justify-center gap-3 p-5 bg-red/10 border border-red text-red rounded-2xl font-bold uppercase tracking-widest text-sm"
            >
                <Plus size={20} /> CRIAR NOVO TÓPICO
            </motion.button>
        </div>
    );
};

export default CommunityScreen;
