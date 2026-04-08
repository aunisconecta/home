import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Info, Play, X, Share2, Ticket } from 'lucide-react';

const MOCK_EVENTS = [
    {
        id: 'hero-1',
        title: "Rodada de Negócios AUNIS - 2ª Ed.",
        category: "Rodada de Negócios",
        date: "16 de Abril",
        time: "18:00 - 22:00",
        location: "Évora Gastronomia, Goiânia",
        description: "Networking estratégico de alto nível com rodada de negócios exclusiva. A mesa preparada para fechar grandes negócios e formar parcerias com C-Levels e Founders validados.",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200",
        checkoutUrl: "https://aunisconecta.github.io/home/"
    },
    {
        id: 'dinner-1',
        title: "Rodada de Negócios 1ª Ed.",
        category: "Rodada de Negócios",
        date: "Março 2026",
        time: "Encerrado",
        location: "Goiânia, GO",
        description: "Nossa primeira edição que validou o modelo e gerou mais de R$ 5 milhões em negócios.",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
        isPast: true
    },
    {
        id: 'dinner-2',
        title: "Rodada AUNIS - Especial Agro",
        category: "Rodada de Negócios",
        date: "Em Breve",
        time: "A definir",
        location: "Goiânia, GO",
        description: "Edição temática voltada exclusivamenta para fundadores do ecossistema de Agronegócio e fundos de investimento.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
        isPast: false
    },
    {
        id: 'master-1',
        title: "Imersão Networking Power",
        category: "Masterminds & Imersões",
        date: "25 de Maio",
        time: "14:00 - 20:00",
        location: "Auditório Órion, Goiânia",
        description: "Aprenda as táticas exatas de conexão, negociação e deal-making que aceleram resultados corporativos. Um intensivo guiado pela liderança AUNIS.",
        image: "https://images.unsplash.com/photo-1540575861501-7ad058bc382d?auto=format&fit=crop&q=80&w=800",
        checkoutUrl: "#"
    },
    {
        id: 'master-2',
        title: "Aceleração Venture Capital",
        category: "Masterminds & Imersões",
        date: "Agosto 2026",
        time: "09:00 - 18:00",
        location: "São Paulo, SP",
        description: "Mastermind fechado sobre como estruturar a tese da sua empresa para levantar capital de fundos institucionais.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=800"
    },
];

const EventModal = ({ event, onClose }: { event: any, onClose: () => void }) => {
    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/95 backdrop-blur-md"
                onClick={onClose}
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.95, y: 20, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-brand-dark w-full max-w-lg rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[90vh]"
                >
                    {/* Header Image with Gradient */}
                    <div className="relative h-56 md:h-64 shrink-0">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
                        
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-brand-black/50 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="absolute bottom-4 left-6 right-6">
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{event.title}</h2>
                            <div className="flex gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-coral px-3 py-1 rounded-full text-white">{event.category}</span>
                                {event.isPast && <span className="text-[10px] font-bold uppercase tracking-widest bg-zinc-800 px-3 py-1 rounded-full text-zinc-400">Encerrado</span>}
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="p-6 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="flex items-center gap-3 text-zinc-300">
                                <div className="p-2 bg-white/5 rounded-lg text-brand-coral"><Calendar size={20} /></div>
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase font-semibold">Data</p>
                                    <p className="text-sm font-medium">{event.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-300">
                                <div className="p-2 bg-white/5 rounded-lg text-brand-coral"><Clock size={20} /></div>
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase font-semibold">Horário</p>
                                    <p className="text-sm font-medium">{event.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-300">
                                <div className="p-2 bg-white/5 rounded-lg text-brand-coral"><MapPin size={20} /></div>
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase font-semibold">Local</p>
                                    <p className="text-sm font-medium">{event.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-white mb-2">Sobre o Evento</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">{event.description}</p>
                        </div>

                        <div className="flex gap-3">
                            <a 
                                href={event.checkoutUrl || "#"} 
                                target={event.checkoutUrl ? "_blank" : "_self"}
                                className={`flex-1 py-4 flex justify-center items-center rounded-xl font-bold transition-colors ${event.isPast ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-brand-coral hover:bg-brand-coralhover text-white shadow-[0_4px_20px_rgba(229,75,75,0.4)] hover:shadow-[0_4px_30px_rgba(229,75,75,0.6)]'}`}
                                onClick={(e) => event.isPast && e.preventDefault()}
                            >
                                {event.isPast ? 'EVENTO ENCERRADO' : 'GARANTIR VAGA (R$ 298)'}
                            </a>
                            {!event.isPast && (
                                <button className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl text-white transition-colors">
                                    <Share2 size={24} />
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

const HorizontalRow = ({ title, events, onSelect }: { title: string, events: any[], onSelect: (e: any) => void }) => {
    return (
        <div className="mb-10">
            <h3 className="text-lg font-bold text-white mb-4 px-6 tracking-tight">{title}</h3>
            {/* Scroll Container */}
            <div 
                className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
                {/* Embedded style to force hide scrollbars on webkit safely */}
                <style dangerouslySetInnerHTML={{__html: `div::-webkit-scrollbar { display: none; }`}} />

                {events.map((event, index) => (
                    <motion.div 
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={event.id}
                        onClick={() => onSelect(event)}
                        className="relative shrink-0 w-[260px] h-[150px] md:w-[320px] md:h-[180px] rounded-xl overflow-hidden cursor-pointer snap-center group border border-transparent hover:border-white/20 transition-colors"
                    >
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent" />
                        
                        <div className="absolute bottom-3 left-4 right-4">
                            <h4 className="text-white font-bold text-sm md:text-base leading-tight drop-shadow-md">{event.title}</h4>
                            <p className="text-zinc-400 text-[10px] md:text-xs mt-1 drop-shadow-md font-medium">{event.date}</p>
                        </div>

                        {event.isPast && (
                            <div className="absolute top-2 right-2 bg-brand-black/80 backdrop-blur-md border border-white/5 px-2 py-1 rounded text-[9px] font-bold text-zinc-400 uppercase">
                                Encerrado
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

const EventsScreen = () => {
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const heroEvent = MOCK_EVENTS[0];
    const jantares = MOCK_EVENTS.filter(e => e.category === "Rodada de Negócios");
    const imersoes = MOCK_EVENTS.filter(e => e.category === "Masterminds & Imersões");

    return (
        <div className="min-h-screen bg-brand-dark pb-32 font-sans" style={{ scrollbarWidth: 'none' }}>
            {/* Hero Section (Featured Event) */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full h-[65vh] md:h-[75vh] mb-8"
            >
                <img 
                    src={heroEvent.image} 
                    alt={heroEvent.title} 
                    className="w-full h-full object-cover"
                />
                {/* Netflix-style heavy bottom gradient for smooth transition */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-0 w-full p-6 pb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-brand-coral border border-brand-coral/50 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm flex items-center gap-1 shadow-[0_0_10px_rgba(229,75,75,0.5)]">
                            <Play size={10} fill="currentColor" /> Lançamento Oficial
                        </span>
                    </div>
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-black text-white leading-none mb-3 drop-shadow-2xl"
                    >
                        2ª EDIÇÃO <br/> AUNIS CONECTA
                    </motion.h1>
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-300 text-xs md:text-sm max-w-sm mb-6 drop-shadow-xl line-clamp-2 md:line-clamp-3 font-medium"
                    >
                        {heroEvent.description}
                    </motion.p>
                    
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-3"
                    >
                        <a 
                            href={heroEvent.checkoutUrl} 
                            target="_blank" 
                            className="bg-white text-brand-black px-6 py-3 rounded font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg"
                        >
                            <Ticket size={20} /> Comprar Ingressos
                        </a>
                        <button 
                            onClick={() => setSelectedEvent(heroEvent)}
                            className="bg-zinc-500/40 hover:bg-zinc-500/60 backdrop-blur-md text-white px-6 py-3 rounded font-bold flex justify-center items-center gap-2 transition-colors border border-white/10"
                        >
                            <Info size={20} /> Detalhes
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Content Rails */}
            <div className="relative z-10 -mt-16 md:-mt-20">
                <HorizontalRow 
                    title="Rodada de Negócios" 
                    events={jantares} 
                    onSelect={setSelectedEvent} 
                />
                <HorizontalRow 
                    title="Masterminds & Imersões" 
                    events={imersoes} 
                    onSelect={setSelectedEvent} 
                />
            </div>

            {/* Modal Overlay */}
            {selectedEvent && (
                <EventModal 
                    event={selectedEvent} 
                    onClose={() => setSelectedEvent(null)} 
                />
            )}
        </div>
    );
};

export default EventsScreen;
