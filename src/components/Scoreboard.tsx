import React from 'react';
import { GameState } from '@/hooks/useGameState';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ScoreboardProps {
    gameState: GameState;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ gameState }) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-white/95 text-black p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl w-full mx-auto border-4 md:border-[6px] border-[#981e32] relative overflow-hidden backdrop-blur-sm h-full flex flex-col justify-center min-h-0 md:min-h-[450px]">

            {/* Mobile Layout: stacked | Desktop: 3-column */}
            <div className="flex flex-col md:grid md:grid-cols-[1fr_1.2fr_1fr] gap-3 md:gap-4 text-center items-center relative z-10 w-full">

                {/* Mobile: Score Row (Home - Timer - Away) */}
                <div className="flex md:hidden items-center justify-between w-full gap-2">
                    {/* Home Score */}
                    <div className="flex-1 flex flex-col items-center">
                        <h2 className="text-lg font-black text-[#981e32] uppercase tracking-tighter">Home</h2>
                        <div className="bg-white rounded-xl p-3 w-full border-2 border-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] relative flex items-center justify-center">
                            {gameState.possession === 'HOME' && (
                                <div className="absolute top-1 right-1 w-2 h-2 bg-[#981e32] rounded-full animate-pulse"></div>
                            )}
                            <span className="text-5xl font-mono text-[#981e32] font-bold leading-none tracking-tighter">
                                {gameState.homeScore}
                            </span>
                        </div>
                        <div className="mt-1 w-full">
                            <span className="text-[#5e6a71] text-[10px] uppercase tracking-widest font-bold">Fouls</span>
                            <div className="bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                                <span className="font-mono text-[#5e6a71] font-bold text-lg">{gameState.homeFouls}</span>
                            </div>
                        </div>
                    </div>

                    {/* Center: Timer + Half + Poss */}
                    <div className="flex-1 flex flex-col items-center gap-1">
                        <div className={`bg-gray-100 px-3 py-3 rounded-xl border-2 w-full shadow-inner flex justify-center items-center ${gameState.timeLeft < 60 ? 'border-[#981e32] bg-red-50' : 'border-gray-200'}`}>
                            <div className={`text-3xl font-mono font-bold tracking-wider leading-none ${gameState.timeLeft < 60 ? 'text-[#981e32] animate-pulse' : 'text-gray-800'}`}>
                                {formatTime(gameState.timeLeft)}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[#5e6a71] uppercase text-[10px] font-bold">Half</span>
                            <span className="text-2xl font-mono font-bold text-[#5e6a71]">{gameState.period}</span>
                            {gameState.period > 2 && <span className="text-[#981e32] font-bold text-[10px]">OT</span>}
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <ArrowLeft className={`w-6 h-6 ${gameState.possession === 'HOME' ? 'text-[#981e32]' : 'text-gray-200'}`} strokeWidth={4} />
                            <span className="text-[10px] text-[#5e6a71] font-mono font-bold">POSS</span>
                            <ArrowRight className={`w-6 h-6 ${gameState.possession === 'GUEST' ? 'text-[#981e32]' : 'text-gray-200'}`} strokeWidth={4} />
                        </div>
                    </div>

                    {/* Away Score */}
                    <div className="flex-1 flex flex-col items-center">
                        <h2 className="text-lg font-black text-[#5e6a71] uppercase tracking-tighter">Away</h2>
                        <div className="bg-white rounded-xl p-3 w-full border-2 border-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] relative flex items-center justify-center">
                            {gameState.possession === 'GUEST' && (
                                <div className="absolute top-1 right-1 w-2 h-2 bg-[#981e32] rounded-full animate-pulse"></div>
                            )}
                            <span className="text-5xl font-mono text-gray-800 font-bold leading-none tracking-tighter">
                                {gameState.guestScore}
                            </span>
                        </div>
                        <div className="mt-1 w-full">
                            <span className="text-[#5e6a71] text-[10px] uppercase tracking-widest font-bold">Fouls</span>
                            <div className="bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                                <span className="font-mono text-[#5e6a71] font-bold text-lg">{gameState.guestFouls}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop: Home Team */}
                <div className="hidden md:flex flex-col items-center">
                    <h2 className="text-3xl md:text-4xl font-black mb-3 text-[#981e32] uppercase tracking-tighter drop-shadow-sm">Home</h2>
                    <div className="bg-white rounded-xl p-4 w-full border-2 border-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] relative aspect-square flex items-center justify-center max-w-[200px]">
                        <div className="absolute top-2 right-2 flex space-x-1">
                            {gameState.possession === 'HOME' && (
                                <div className="w-3 h-3 bg-[#981e32] rounded-full animate-pulse shadow-lg"></div>
                            )}
                        </div>
                        <span className="text-6xl md:text-8xl font-mono text-[#981e32] font-bold leading-none tracking-tighter">
                            {gameState.homeScore}
                        </span>
                    </div>
                    <div className="mt-3 flex flex-col items-center w-full max-w-[200px]">
                        <span className="text-[#5e6a71] text-xs uppercase tracking-widest mb-1 font-bold">Fouls</span>
                        <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200 w-full">
                            <span className="font-mono text-[#5e6a71] font-bold text-2xl">{gameState.homeFouls}</span>
                        </div>
                    </div>
                </div>

                {/* Desktop: Center Timer & Period */}
                <div className="hidden md:flex flex-col items-center justify-start pt-2 space-y-6 w-full">
                    <div className={`bg-gray-100 px-4 py-6 rounded-2xl border-2 w-full shadow-inner flex justify-center items-center ${gameState.timeLeft < 60 ? 'border-[#981e32] bg-red-50' : 'border-gray-200'}`}>
                        <div className={`text-5xl md:text-7xl font-mono font-bold tracking-widest leading-none ${gameState.timeLeft < 60 ? 'text-[#981e32] animate-pulse' : 'text-gray-800'}`}>
                            {formatTime(gameState.timeLeft)}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-[#5e6a71] uppercase text-xs tracking-[0.2em] mb-1 font-bold">Half</div>
                        <div className="text-5xl font-mono font-bold text-[#5e6a71] drop-shadow-sm">
                            {gameState.period}
                        </div>
                        {gameState.period > 2 && <span className="text-[#981e32] font-bold text-xs mt-1">OT</span>}
                    </div>
                    <div className="flex items-center justify-center space-x-4 opacity-80 w-full">
                        <ArrowLeft className={`w-10 h-10 ${gameState.possession === 'HOME' ? 'text-[#981e32] drop-shadow-md' : 'text-gray-200'}`} strokeWidth={4} />
                        <span className="text-xs text-[#5e6a71] font-mono font-bold">POSS</span>
                        <ArrowRight className={`w-10 h-10 ${gameState.possession === 'GUEST' ? 'text-[#981e32] drop-shadow-md' : 'text-gray-200'}`} strokeWidth={4} />
                    </div>
                </div>

                {/* Desktop: Away Team */}
                <div className="hidden md:flex flex-col items-center">
                    <h2 className="text-3xl md:text-4xl font-black mb-3 text-[#5e6a71] uppercase tracking-tighter drop-shadow-sm">Away</h2>
                    <div className="bg-white rounded-xl p-4 w-full border-2 border-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] relative aspect-square flex items-center justify-center max-w-[200px]">
                        <div className="absolute top-2 right-2 flex space-x-1">
                            {gameState.possession === 'GUEST' && (
                                <div className="w-3 h-3 bg-[#981e32] rounded-full animate-pulse shadow-lg"></div>
                            )}
                        </div>
                        <span className="text-6xl md:text-8xl font-mono text-gray-800 font-bold leading-none tracking-tighter">
                            {gameState.guestScore}
                        </span>
                    </div>
                    <div className="mt-3 flex flex-col items-center w-full max-w-[200px]">
                        <span className="text-[#5e6a71] text-xs uppercase tracking-widest mb-1 font-bold">Fouls</span>
                        <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200 w-full">
                            <span className="font-mono text-[#5e6a71] font-bold text-2xl">{gameState.guestFouls}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
