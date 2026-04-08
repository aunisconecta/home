import React from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageCircle, Calendar, Zap, ChevronRight, UserPlus } from 'lucide-react';

const NOTIFICATIONS = [
    {
        id: 1,
        type: "MESSAGE",
        title: "Nova Mensagem",
        content: "Mayara Fogaça enviou uma mensagem para você.",
        time: "5m",
        icon: MessageCircle,
        color: "var(--color-red)"
    },
    {
        id: 2,
        type: "EVENT",
        title: "Confirmado!",
        content: "Sua vaga na Rodada de Negócios AUNIS foi confirmada.",
        time: "1h",
        icon: Calendar,
        color: "var(--color-gold)"
    },
    {
        id: 3,
        type: "CONNECTION",
        title: "Nova Conexão",
        content: "Carlos Machado aceitou seu convite.",
        time: "3h",
        icon: UserPlus,
        color: "var(--color-white)"
    },
    {
        id: 4,
        type: "OPPORTUNITY",
        title: "Nova Oportunidade",
        content: "Um novo serviço na categoria 'Marketing' foi anunciado.",
        time: "8h",
        icon: Zap,
        color: "var(--color-red)"
    }
];

const NotificationsScreen = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 tracking-tighter">Central de Notificações</h1>
            <p className="text-dim text-sm mb-10 leading-relaxed">Fique por dentro de cada movimento importante na sua rede.</p>

            <div className="space-y-4">
                {NOTIFICATIONS.map(note => {
                    const Icon = note.icon;
                    return (
                        <motion.div 
                            whileTap={{ scale: 0.98 }}
                            key={note.id} 
                            className="p-5 bg-surface-raised border border-glass rounded-2xl flex items-start gap-4 group cursor-pointer"
                        >
                            <div className="p-3 bg-black rounded-xl border border-glass" style={{ color: note.color }}>
                                <Icon size={20} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-bold text-sm group-hover:text-gold transition-all">{note.title}</h3>
                                    <span className="text-[10px] text-dim">{note.time}</span>
                                </div>
                                <p className="text-xs text-dim leading-relaxed">{note.content}</p>
                            </div>
                            <ChevronRight size={18} className="text-dim/30 group-hover:text-white" />
                        </motion.div>
                    );
                })}
            </div>

            <button className="mt-10 w-full text-center text-dim text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                Limpar Notificações
            </button>
        </div>
    );
};

export default NotificationsScreen;
