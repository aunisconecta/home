import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, User, Briefcase, Tag, MapPin, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col p-8 h-screen bg-black overflow-y-auto">
            <button onClick={() => navigate(-1)} className="mb-8 p-2 text-gold -ml-2"><ChevronLeft size={24} /></button>
            <h1 className="text-3xl font-bold mb-2 tracking-tighter">Criar Conta</h1>
            <p className="text-dim mb-8 text-sm">Entre no ecossistema de networking mais exclusivo.</p>
            
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Nome Completo</label>
                    <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" />
                        <input type="text" placeholder="Seu Nome" className="w-full bg-surface-raised border border-glass p-4 pl-12 rounded-xl text-white outline-none focus:border-red transition-all" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Empresa</label>
                    <div className="relative">
                        <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" />
                        <input type="text" placeholder="Nome da sua Empresa" className="w-full bg-surface-raised border border-glass p-4 pl-12 rounded-xl text-white outline-none focus:border-red transition-all" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Segmento</label>
                    <div className="relative">
                        <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" />
                        <input type="text" placeholder="Ex: Tecnologia, Marketing..." className="w-full bg-surface-raised border border-glass p-4 pl-12 rounded-xl text-white outline-none focus:border-red transition-all" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Cidade / Estado</label>
                    <div className="relative">
                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" />
                        <input type="text" placeholder="Sua localização" className="w-full bg-surface-raised border border-glass p-4 pl-12 rounded-xl text-white outline-none focus:border-red transition-all" />
                    </div>
                </div>

                <div className="flex items-center gap-4 py-4">
                    <div className="w-6 h-6 border-2 border-gold rounded-lg flex items-center justify-center cursor-pointer">
                        <Check size={16} className="text-gold" />
                    </div>
                    <p className="text-[10px] text-dim uppercase tracking-widest font-bold">Aceito os termos de uso e privacidade.</p>
                </div>

                <button onClick={() => navigate('/home')} className="btn-premium btn-primary w-full mt-4">FINALIZAR CADASTRO</button>
                <div className="text-center py-6">
                    <p className="text-xs text-dim">Já tem uma conta? <button onClick={() => navigate('/login')} className="text-gold font-bold">Fazer Login</button></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;
