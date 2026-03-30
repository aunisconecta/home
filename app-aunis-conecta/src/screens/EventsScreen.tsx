import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket, Clock, Share2 } from 'lucide-react';

const EVENTS = [
    {
        id: 1,
        title: "Jantar AUNIS Conecta - 2ª Edição",
        date: "16 de Abril",
        time: "18:00 - 22:00",
        location: "Évora Gastronomia, Goiânia",
        description: "Networking estratégico de alto nível com rodada de negócios exclusiva.",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Imersão Networking Power",
        date: "25 de Maio",
        time: "14:00 - 20:00",
        location: "Auditório Órion, Goiânia",
        description: "Aprenda as táticas de conexão que aceleram resultados corporativos.",
        image: "https://images.unsplash.com/photo-1540575861501-7ad058bc382d?auto=format&fit=crop&q=80&w=800"
    }
];

const EventsScreen = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 tracking-tighter">Eventos</h1>
            <p className="text-dim text-sm mb-10 leading-relaxed">Participe dos encontros exclusivos da maior rede de networking do Centro-Oeste.</p>

            <div className="space-y-8">
                {EVENTS.map(event => (
                    <motion.div 
                        whileTap={{ scale: 0.98 }}
                        key={event.id} 
                        className="bg-surface-raised rounded-3xl overflow-hidden border border-glass shadow-2xl transition-all hover:border-gold/30"
                    >
                        <div className="relative h-48">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-70" />
                            <div className="absolute top-4 left-4 bg-red px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-2">
                                <Ticket size={14} /> Presencial
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-4">{event.title}</h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-dim text-sm">
                                    <Calendar size={18} className="text-gold" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-3 text-dim text-sm">
                                    <Clock size={18} className="text-gold" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-3 text-dim text-sm">
                                    <MapPin size={18} className="text-gold" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                            <p className="text-dim text-xs mb-8 leading-relaxed">{event.description}</p>
                            
                            <div className="flex gap-4">
                                <button className="flex-1 btn-premium btn-primary py-3">GARANTIR VAGA</button>
                                <button className="p-4 bg-glass rounded-xl text-white"><Share2 size={20} /></button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default EventsScreen;
