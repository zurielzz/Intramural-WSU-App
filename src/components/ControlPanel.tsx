import React from 'react';
import { GameState } from '@/hooks/useGameState';
import { Play, Pause, RotateCcw, ArrowLeftRight, Clock, Undo2 } from 'lucide-react';

interface ControlPanelProps {
    gameState: GameState;
    onAddScore: (team: 'HOME' | 'GUEST', amount: number) => void;
    onToggleTimer: () => void;
    onResetTimer: () => void;
    onTogglePossession: () => void;
    onAddTeamFoul: (team: 'HOME' | 'GUEST') => void;
    onResetTeamFouls: (team?: 'HOME' | 'GUEST') => void;
    onResetScore: (team: 'HOME' | 'GUEST') => void;
    onResetGame: () => void;
    onNextPeriod: () => void;
    onUndo: () => void;
    canUndo: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
    gameState,
    onAddScore,
    onToggleTimer,
    onResetTimer,
    onTogglePossession,
    onAddTeamFoul,
    onResetTeamFouls,
    onResetScore,
    onResetGame,
    onNextPeriod,
    onUndo,
    canUndo,
}) => {
    return (
        <div className="glass-panel glass-deep glass-sheen panel-pad rounded-[1.5rem] md:rounded-[2rem] w-full h-full mx-auto border border-wsu-crimson relative overflow-hidden flex flex-col justify-center">
            <div className="glass-sheen-bg absolute -top-10 right-0 h-28 w-28 rounded-full bg-[#981e32]/16 blur-3xl pointer-events-none z-0" />
            <div className="glass-sheen-bg absolute -bottom-8 left-0 h-28 w-28 rounded-full bg-[#5e6a71]/18 blur-3xl pointer-events-none z-0" />

            {/* Header / Global Controls */}
            <div className="flex justify-between items-center mb-1.5 md:mb-2 border-b border-white/60 pb-1.5 md:pb-2 relative z-10">
                <div>
                    <h3 className="text-gray-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mb-0.5">Control Panel</h3>
                    <div className="flex space-x-2">
                        <button
                            onClick={onResetGame}
                            className="glass-button text-red-700 px-3 py-1 rounded-md text-xs font-bold border border-white/70"
                        >
                            NEW GAME
                        </button>
                    </div>
                </div>
                <button
                    onClick={onUndo}
                    disabled={!canUndo}
                    className={`glass-button flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold ${canUndo ? 'text-gray-700' : 'text-gray-300 cursor-not-allowed opacity-70'}`}
                >
                    <Undo2 size={14} />
                    <span>Undo</span>
                </button>
            </div>

            {/* Mobile: Timer controls first, then Home/Away side by side */}
            <div className="flex flex-col md:hidden gap-4 relative z-10">
                {/* Timer Controls */}
                <div className="flex flex-col gap-2">
                    <button
                        onClick={onToggleTimer}
                        className={`w-full p-4 rounded-xl font-bold text-white transition-all transform active:scale-95 shadow-lg flex items-center justify-center ${gameState.isRunning ? 'bg-[#981e32] hover:bg-[#b0223a]' : 'bg-[#5e6a71] hover:bg-[#4d575c]'}`}
                    >
                        {gameState.isRunning ? <Pause className="mr-2 fill-current w-6 h-6" /> : <Play className="mr-2 fill-current w-6 h-6" />}
                        <span className="text-xl">{gameState.isRunning ? 'STOP' : 'START'}</span>
                    </button>
                    <div className="grid grid-cols-3 gap-2">
                        <button onClick={onResetTimer} className="glass-button p-2 rounded-lg text-gray-600 text-xs font-bold flex items-center justify-center gap-1">
                            <RotateCcw size={14} /> Reset
                        </button>
                        <button onClick={onTogglePossession} className="glass-button p-2 rounded-lg text-indigo-700 border border-white/70 text-xs font-bold flex items-center justify-center gap-1">
                            <ArrowLeftRight size={14} /> Poss
                        </button>
                        <button onClick={onNextPeriod} className="glass-button p-2 rounded-lg text-violet-700 border border-white/70 text-xs font-bold flex items-center justify-center gap-1">
                            <Clock size={14} /> Half
                        </button>
                    </div>
                </div>

                {/* Home & Away Side by Side */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Home */}
                    <div className="flex flex-col gap-2">
                        <div className="text-center text-[#981e32] uppercase font-black tracking-tighter text-lg">HOME</div>
                        <div className="grid grid-cols-3 gap-1">
                            <button onClick={() => onAddScore('HOME', 1)} className="bg-[#981e32] text-white shadow-md border-b-3 border-[#7a1828] active:border-b-0 active:translate-y-0.5 transition-all rounded-lg py-3 text-lg font-black">+1</button>
                            <button onClick={() => onAddScore('HOME', 2)} className="bg-[#981e32] text-white shadow-md border-b-3 border-[#7a1828] active:border-b-0 active:translate-y-0.5 transition-all rounded-lg py-3 text-lg font-black">+2</button>
                            <button onClick={() => onAddScore('HOME', 3)} className="bg-[#981e32] text-white shadow-md border-b-3 border-[#7a1828] active:border-b-0 active:translate-y-0.5 transition-all rounded-lg py-3 text-lg font-black">+3</button>
                        </div>
                        <button onClick={() => onResetScore('HOME')} className="glass-button glass-chip-home w-full py-2 rounded-full text-gray-600 hover:text-red-700 text-[10px] font-bold uppercase tracking-wider border border-white/70">Clear Score</button>
                        <button onClick={() => onAddTeamFoul('HOME')} className="glass-button glass-chip-home p-3 rounded-lg text-gray-700 border border-white/70 font-bold text-sm w-full">+ Foul</button>
                        <button onClick={() => onResetTeamFouls('HOME')} className="glass-button glass-chip-home w-full py-2 rounded-full text-gray-600 hover:text-red-700 text-[10px] font-bold uppercase tracking-wider border border-white/70">Clear Fouls</button>
                    </div>
                    {/* Away */}
                    <div className="flex flex-col gap-2">
                        <div className="text-center text-[#5e6a71] uppercase font-black tracking-tighter text-lg">AWAY</div>
                        <div className="grid grid-cols-3 gap-1">
                            <button onClick={() => onAddScore('GUEST', 1)} className="bg-[#5e6a71] text-white shadow-md active:translate-y-0.5 transition-all rounded-lg py-3 text-lg font-black">+1</button>
                            <button onClick={() => onAddScore('GUEST', 2)} className="bg-[#5e6a71] text-white shadow-md active:translate-y-0.5 transition-all rounded-lg py-3 text-lg font-black">+2</button>
                            <button onClick={() => onAddScore('GUEST', 3)} className="bg-[#5e6a71] text-white shadow-md active:translate-y-0.5 transition-all rounded-lg py-3 text-lg font-black">+3</button>
                        </div>
                        <button onClick={() => onResetScore('GUEST')} className="glass-button glass-chip-away w-full py-2 rounded-full text-gray-600 hover:text-red-700 text-[10px] font-bold uppercase tracking-wider border border-white/70">Clear Score</button>
                        <button onClick={() => onAddTeamFoul('GUEST')} className="glass-button glass-chip-away p-3 rounded-lg text-gray-700 border border-white/70 font-bold text-sm w-full">+ Foul</button>
                        <button onClick={() => onResetTeamFouls('GUEST')} className="glass-button glass-chip-away w-full py-2 rounded-full text-gray-600 hover:text-red-700 text-[10px] font-bold uppercase tracking-wider border border-white/70">Clear Fouls</button>
                    </div>
                </div>
            </div>

            {/* Desktop: Original 3-column layout */}
                <div className="hidden md:grid grid-cols-3 gap-2.5 lg:gap-3 relative items-center z-10">

                {/* Home Controls */}
                <div className="flex flex-col space-y-2 justify-center glass-tile glass-tint-home rounded-2xl px-2.5 py-2 border border-white/70">
                    <div className="flex items-center justify-center space-x-2 text-[#981e32] uppercase font-black tracking-tighter">
                        <span className="text-2xl">HOME</span>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="grid grid-cols-3 gap-2">
                            <button onClick={() => onAddScore('HOME', 1)} className="bg-[#981e32] text-white hover:bg-[#b0223a] shadow-md border-b-4 border-[#7a1828] active:border-b-0 active:translate-y-1 transition-all rounded-xl py-2.5 text-lg font-black">+1</button>
                            <button onClick={() => onAddScore('HOME', 2)} className="bg-[#981e32] text-white hover:bg-[#b0223a] shadow-md border-b-4 border-[#7a1828] active:border-b-0 active:translate-y-1 transition-all rounded-xl py-2.5 text-lg font-black">+2</button>
                            <button onClick={() => onAddScore('HOME', 3)} className="bg-[#981e32] text-white hover:bg-[#b0223a] shadow-md border-b-4 border-[#7a1828] active:border-b-0 active:translate-y-1 transition-all rounded-xl py-2.5 text-lg font-black">+3</button>
                        </div>
                        <button onClick={() => onResetScore('HOME')} className="mt-1 w-full py-2.5 rounded-full glass-button glass-chip-home text-gray-600 hover:text-red-700 text-xs font-bold uppercase tracking-wider border border-white/70">Clear Score</button>
                    </div>
                    <div className="w-full">
                        <button
                            onClick={() => onAddTeamFoul('HOME')}
                            className="glass-button glass-chip-home flex items-center justify-center p-2.5 rounded-xl text-gray-700 border border-white/70 font-bold text-base w-full mb-1"
                        >
                            + Foul
                        </button>
                        <button onClick={() => onResetTeamFouls('HOME')} className="mt-1 w-full py-2.5 rounded-full glass-button glass-chip-home text-gray-600 hover:text-red-700 text-xs font-bold uppercase tracking-wider border border-white/70">Clear Fouls</button>
                    </div>
                </div>

                {/* Center Controls (Timer & Game) */}
                <div className="flex flex-col space-y-2.5 px-2.5 border-l border-r border-white/60 justify-center">
                    <div className="flex flex-col space-y-3 w-full">
                        <button
                            onClick={onToggleTimer}
                            className={`w-full p-3.5 lg:p-4 rounded-2xl font-bold text-white transition-all transform active:scale-95 shadow-lg flex items-center justify-center ${gameState.isRunning ? 'bg-[#981e32] hover:bg-[#b0223a]' : 'bg-[#5e6a71] hover:bg-[#4d575c]'}`}
                        >
                            {gameState.isRunning ? <Pause className="mr-2.5 fill-current w-7 h-7" /> : <Play className="mr-2.5 fill-current w-7 h-7" />}
                            <span className="text-xl">{gameState.isRunning ? 'STOP' : 'START'}</span>
                        </button>
                        <button
                            onClick={onResetTimer}
                            className="glass-button w-full p-3 rounded-xl text-gray-600 border border-white/70 flex items-center justify-center"
                        >
                            <RotateCcw size={20} className="mr-2" /> <span className="text-sm font-bold">Reset Clock</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 w-full">
                        <button
                            onClick={onTogglePossession}
                            className="glass-button p-2.5 rounded-xl text-indigo-700 border border-white/70 flex flex-col items-center justify-center font-bold text-sm h-16"
                        >
                            <ArrowLeftRight className="mb-1 h-6 w-6" /> Poss
                        </button>
                        <button
                            onClick={onNextPeriod}
                            className="glass-button p-2.5 rounded-xl text-violet-700 border border-white/70 flex flex-col items-center justify-center font-bold text-sm h-16"
                        >
                            <Clock className="mb-1 h-6 w-6" /> Half
                        </button>
                    </div>
                </div>

                {/* Guest Controls */}
                <div className="flex flex-col space-y-2 justify-center glass-tile glass-tint-away rounded-2xl px-2.5 py-2 border border-white/70">
                    <div className="flex items-center justify-center space-x-2 text-[#5e6a71] uppercase font-black tracking-tighter">
                        <span className="text-2xl">AWAY</span>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="grid grid-cols-3 gap-2">
                            <button onClick={() => onAddScore('GUEST', 1)} className="bg-[#5e6a71] text-white hover:bg-[#4d575c] shadow-md active:translate-y-1 transition-all rounded-xl py-2.5 text-lg font-black">+1</button>
                            <button onClick={() => onAddScore('GUEST', 2)} className="bg-[#5e6a71] text-white hover:bg-[#4d575c] shadow-md active:translate-y-1 transition-all rounded-xl py-2.5 text-lg font-black">+2</button>
                            <button onClick={() => onAddScore('GUEST', 3)} className="bg-[#5e6a71] text-white hover:bg-[#4d575c] shadow-md active:translate-y-1 transition-all rounded-xl py-2.5 text-lg font-black">+3</button>
                        </div>
                        <button onClick={() => onResetScore('GUEST')} className="mt-1 w-full py-2.5 rounded-full glass-button glass-chip-away text-gray-600 hover:text-red-700 text-xs font-bold uppercase tracking-wider border border-white/70">Clear Score</button>
                    </div>
                    <div className="w-full">
                        <button
                            onClick={() => onAddTeamFoul('GUEST')}
                            className="glass-button glass-chip-away flex items-center justify-center p-2.5 rounded-xl text-gray-700 border border-white/70 font-bold text-base w-full mb-1"
                        >
                            + Foul
                        </button>
                        <button onClick={() => onResetTeamFouls('GUEST')} className="mt-1 w-full py-2.5 rounded-full glass-button glass-chip-away text-gray-600 hover:text-red-700 text-xs font-bold uppercase tracking-wider border border-white/70">Clear Fouls</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
