import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Share2, MapPin, Briefcase, Plus, ChevronRight, Settings, ExternalLink } from 'lucide-react';

const ProfileScreen = () => {
    return (
        <div className="pb-10">
            {/* Header / Cover */}
            <div className="h-48 bg-gradient-to-b from-red/20 to-black relative">
                <div className="absolute top-6 right-6 flex gap-4">
                    <button className="p-3 bg-black/40 rounded-full backdrop-blur-md text-white border border-glass"><Settings size={20} /></button>
                    <button className="p-3 bg-black/40 rounded-full backdrop-blur-md text-white border border-glass"><Share2 size={20} /></button>
                </div>
            </div>

            <div className="px-6 -mt-16 relative z-10">
                <div className="w-32 h-32 rounded-3xl border-4 border-black bg-surface-raised overflow-hidden shadow-2xl mb-6">
                    <img src="https://i.ibb.co/MywfPQx7/Janne.jpg" alt="User Profile" className="w-full h-full object-cover" />
                </div>

                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tighter">Janne Abreu</h1>
                        <p className="text-gold font-bold text-sm tracking-widest uppercase">Estrategista de Networking</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-xl font-bold text-sm">
                        <Edit2 size={16} /> Editar
                    </button>
                </div>

                <div className="flex gap-6 mb-10 overflow-x-auto pb-2">
                    <div className="flex items-center gap-2 text-dim text-xs whitespace-nowrap">
                        <Briefcase size={16} className="text-gold" /> AUNIS Conecta
                    </div>
                    <div className="flex items-center gap-2 text-dim text-xs whitespace-nowrap">
                        <MapPin size={16} className="text-gold" /> Goiânia - GO
                    </div>
                </div>

                <div className="space-y-10">
                    <section>
                        <h3 className="text-sm uppercase tracking-widest text-dim font-bold mb-4">Sobre o Negócio</h3>
                        <p className="text-white/80 text-sm leading-relaxed">Desenvolvo ecossistemas de negócios focados em conexões de alto nível. Minha missão é transformar oportunidades em resultados reais através do networking estratégico.</p>
                    </section>

                    <section>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm uppercase tracking-widest text-dim font-bold">Serviços Oferecidos</h3>
                            <button className="text-red text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">Adicionar <Plus size={14} /></button>
                        </div>
                        <div className="space-y-4">
                            <motion.div whileTap={{ scale: 0.98 }} className="p-5 bg-surface-raised border border-glass rounded-2xl flex justify-between items-center group cursor-pointer">
                                <div>
                                    <h4 className="font-bold text-sm mb-1 group-hover:text-gold transition-all">Mentoria de Networing</h4>
                                    <p className="text-xs text-dim">Consultoria Individual</p>
                                </div>
                                <ChevronRight size={18} className="text-dim group-hover:text-white" />
                            </motion.div>
                            <motion.div whileTap={{ scale: 0.98 }} className="p-5 bg-surface-raised border border-glass rounded-2xl flex justify-between items-center group cursor-pointer">
                                <div>
                                    <h4 className="font-bold text-sm mb-1 group-hover:text-gold transition-all">Orquestração de Ecossistemas</h4>
                                    <p className="text-xs text-dim">Projetos Customizados</p>
                                </div>
                                <ChevronRight size={18} className="text-dim group-hover:text-white" />
                            </motion.div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
