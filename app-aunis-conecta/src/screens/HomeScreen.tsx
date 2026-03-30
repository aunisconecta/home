import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Share2, Bookmark, Plus } from 'lucide-react';

const POSTS = [
    {
        id: 1,
        user: "Janne Abreu",
        company: "AUNIS Conecta",
        avatar: "https://i.ibb.co/MywfPQx7/Janne.jpg",
        content: "A mesa está pronta para o Jantar de Conecta - 2ª Edição em Goiânia no Évora Gastronomia. 🥂 Quem aqui já garantiu sua cadeira para a maior rodada de negócios do mês?",
        time: "2h",
        likes: 42,
        comments: 12
    },
    {
        id: 2,
        user: "Mayara Fogaça",
        company: "Sócia Pablo Marçal",
        avatar: "https://i.ibb.co/4nQjztWx/Mayara.webp",
        content: "Networking não é sobre quem você conhece, mas sobre quem conhece você e o valor que você gera. 🚀 Novo projeto corporativo saindo do forno!",
        time: "5h",
        likes: 128,
        comments: 45
    }
];

const HomeScreen = () => {
    return (
        <div className="p-6">
            <div className="flex items-baseline gap-2 mb-8">
                <h1 className="text-2xl font-bold tracking-tight">Oportunidades</h1>
                <span className="text-red font-bold text-sm">Feed Executivo</span>
            </div>

            <div className="space-y-6">
                {POSTS.map((post) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={post.id} 
                        className="bg-surface-raised border border-glass rounded-2xl p-5 mb-4 shadow-xl"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold/30">
                                    <img src={post.avatar} alt={post.user} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">{post.user}</h3>
                                    <p className="text-[10px] uppercase text-gold font-bold tracking-widest">{post.company}</p>
                                </div>
                            </div>
                            <span className="text-dim text-[10px]">{post.time}</span>
                        </div>

                        <p className="text-sm leading-relaxed mb-6 text-white/90">
                            {post.content}
                        </p>

                        <div className="flex justify-between items-center pt-4 border-t border-glass">
                            <div className="flex gap-6">
                                <button className="flex items-center gap-1.5 text-dim hover:text-red transition-colors">
                                    <Heart size={18} />
                                    <span className="text-xs">{post.likes}</span>
                                </button>
                                <button className="flex items-center gap-1.5 text-dim hover:text-white transition-colors">
                                    <MessageCircle size={18} />
                                    <span className="text-xs">{post.comments}</span>
                                </button>
                                <button className="text-dim hover:text-white transition-colors">
                                    <Share2 size={18} />
                                </button>
                            </div>
                            <button className="text-dim hover:text-gold transition-colors">
                                <Bookmark size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Float Action Button */}
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-24 right-8 w-14 h-14 bg-red text-white flex items-center justify-center rounded-2xl shadow-2xl z-50"
            >
                <Plus size={24} />
            </motion.button>
        </div>
    );
};

export default HomeScreen;
