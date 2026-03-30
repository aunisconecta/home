import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const LoginScreen = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col p-8 h-screen bg-black overflow-y-auto">
            <button onClick={() => navigate(-1)} className="mb-8 p-2 text-gold -ml-2"><ChevronLeft size={24} /></button>
            <h1 className="text-4xl font-bold mb-2 tracking-tighter">Entrar</h1>
            <p className="text-dim mb-10 text-sm">Bem-vindo de volta à mesa de decisões.</p>
            
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gold font-bold">E-mail</label>
                    <input type="email" placeholder="seu@email.com" className="w-full bg-surface-raised border border-glass p-4 rounded-xl text-white outline-none focus:border-red transition-all" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Senha</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-surface-raised border border-glass p-4 rounded-xl text-white outline-none focus:border-red transition-all" />
                </div>
                <button onClick={() => navigate('/home')} className="btn-premium btn-primary w-full mt-4 shadow-2xl">ACESSAR PLATAFORMA</button>
                <button className="w-full text-dim text-xs font-bold uppercase tracking-widest">Esqueci minha senha</button>
            </div>

            <div className="mt-auto pt-10 pb-10">
                <p className="text-center text-dim mb-6 text-[10px] uppercase tracking-widest font-bold">Ou continue com</p>
                <div className="flex justify-around gap-4">
                    <button className="flex-1 bg-surface-raised p-4 rounded-xl border border-glass flex justify-center hover:bg-white/5 transition-colors"><img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="Google" /></button>
                    <button className="flex-1 bg-surface-raised p-4 rounded-xl border border-glass flex justify-center hover:bg-white/5 transition-colors"><img src="https://www.svgrepo.com/show/330030/apple.svg" className="w-6 h-6 filter invert" alt="Apple" /></button>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
