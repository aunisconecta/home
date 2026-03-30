import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, MessageCircle, DollarSign, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceDetailScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen bg-black overflow-y-auto">
            {/* Header Overlay */}
            <div className="sticky top-0 z-50 p-6 flex justify-between items-center bg-black/60 backdrop-blur-lg border-b border-glass">
                <button onClick={() => navigate(-1)} className="p-2 text-gold -ml-2"><ChevronLeft size={24} /></button>
                <span className="text-[10px] font-bold uppercase tracking-widest text-dim italic">Detalhes do Serviço</span>
                <div className="w-10"></div>
            </div>

            <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className="text-[10px] uppercase font-bold text-red tracking-widest mb-2 block">Consultoria Premium</span>
                        <h1 className="text-3xl font-bold tracking-tighter mb-4">Mentoria de Networking Individual</h1>
                    </div>
                    <div className="p-4 bg-gold rounded-2xl text-black">
                        <Star size={24} fill="currentColor" />
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-8 p-4 bg-surface-raised rounded-2xl border border-glass">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/30">
                        <img src="https://i.ibb.co/MywfPQx7/Janne.jpg" alt="Provider" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-[10px] text-dim uppercase tracking-widest font-bold">Oferecido por</p>
                        <h4 className="font-bold text-sm">Janne Abreu</h4>
                    </div>
                    <button className="ml-auto text-gold"><ArrowUpRight size={18} /></button>
                </div>

                <section className="space-y-6 mb-12">
                    <h3 className="text-sm uppercase tracking-widest text-gold font-bold">Descrição Completa</h3>
                    <p className="text-dim text-sm leading-relaxed">
                        Acesso exclusivo a uma jornada de 4 sessões individuais focadas em orquestração de parcerias estratégicas. 
                        Aprenda a mapear seu ecossistema, identificar tomadores de decisão e construir pontes de valor que geram 
                        resultados de alto impacto para sua empresa.
                    </p>
                </section>

                <div className="grid grid-cols-2 gap-4 mb-12">
                    <div className="p-4 bg-surface-raised border border-glass rounded-2xl">
                        <DollarSign size={20} className="text-gold mb-3" />
                        <h4 className="font-bold text-sm">R$ 1.500</h4>
                        <p className="text-[10px] text-dim">Investimento base</p>
                    </div>
                    <div className="p-4 bg-surface-raised border border-glass rounded-2xl">
                        <ShieldCheck size={20} className="text-gold mb-3" />
                        <h4 className="font-bold text-sm">Garantia</h4>
                        <p className="text-[10px] text-dim">Qualidade AUNIS</p>
                    </div>
                </div>

                <div className="space-y-4 mt-auto">
                    <button onClick={() => navigate('/chat')} className="btn-premium btn-primary w-full shadow-2xl">SOLICITAR ORÇAMENTO</button>
                    <button onClick={() => navigate('/chat')} className="btn-premium btn-gold w-full text-white">ENVIAR MENSAGEM</button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailScreen;
