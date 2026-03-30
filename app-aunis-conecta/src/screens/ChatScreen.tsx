import React from 'react';
import { motion } from 'framer-motion';
import { Search, Send, Plus, ChevronRight, User } from 'lucide-react';

const CHATS = [
    {
        id: 1,
        user: "Mayara Fogaça",
        lastMessage: "Combinado então, nos vemos dia 16 no jantar!",
        time: "14:20",
        unread: 2,
        avatar: "https://i.ibb.co/4nQjztWx/Mayara.webp"
    },
    {
        id: 2,
        user: "Carlos Machado",
        lastMessage: "O orçamento foi enviado por e-mail.",
        time: "Ontem",
        unread: 0,
        avatar: ""
    }
];

const ChatScreen = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 tracking-tighter">Mensagens</h1>
            <p className="text-dim text-sm mb-8 leading-relaxed">Sua linha direta com parceiros e mentores estratégicos.</p>

            <div className="relative mb-8">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" />
                <input type="text" placeholder="Buscar conversas..." className="w-full bg-surface-raised border border-glass p-4 pl-12 rounded-2xl text-white outline-none focus:border-red transition-all" />
            </div>

            <div className="space-y-4">
                {CHATS.map(chat => (
                    <motion.div 
                        whileTap={{ scale: 0.98 }}
                        key={chat.id} 
                        className="p-5 bg-surface-raised border border-glass rounded-2xl flex items-center justify-between group cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold/20 flex items-center justify-center bg-black">
                                {chat.avatar ? (
                                    <img src={chat.avatar} alt={chat.user} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={24} className="text-dim" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-sm mb-1 group-hover:text-red transition-all">{chat.user}</h3>
                                <p className="text-xs text-dim truncate max-w-[180px]">{chat.lastMessage}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span className="text-[10px] text-dim">{chat.time}</span>
                            {chat.unread > 0 && (
                                <span className="bg-red text-white text-[10px] font-bold px-2 py-1 rounded-full">{chat.unread}</span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-24 right-8 w-14 h-14 bg-white text-black flex items-center justify-center rounded-2xl shadow-2xl z-50 transition-all hover:bg-gold"
            >
                <Plus size={24} />
            </motion.button>
        </div>
    );
};

export default ChatScreen;
