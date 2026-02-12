import React from 'react';
import { GameState } from '@/hooks/useGameState';
import { Play, Pause, RotateCcw, ArrowLeftRight, Clock, ShieldAlert, Undo2 } from 'lucide-react';

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
        <div className="bg-white/90 backdrop-blur p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-xl w-full mx-auto border-4 md:border-[6px] border-[#981e32] relative overflow-hidden h-full flex flex-col justify-center">

            {/* Header / Global Controls */}
            <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-gray-100 pb-3 md:pb-4">
                <div>
                    <h3 className="text-gray-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mb-1">Control Panel</h3>
                    <div className="flex space-x-2">
                        <button
                            onClick={onResetGame}
                            className="bg-red-50 text-red-600 px-3 py-1 rounded-md text-xs font-bold hover:bg-red-100 transition-colors border border-red-100"
                        >
                            NEW GAME
                        </button>
                    </div>
                </div>
                <button
                    onClick={onUndo}
                    disabled={!canUndo}
                    className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-colors ${canUndo ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-50 text-gray-300 cursor-not-allowed'}`}
                >
                    <Undo2 size={14} />
                    <span>Undo</span>
                </button>
            </div>

            {/* Mobile: Timer controls first, then Home/Away side by side */}
            <div className="flex flex-col md:hidden gap-4">
                {/* Timer Controls */}
                <div className="flex flex-col gap-2">
                    <button
                        onClick={onToggleTimer}
                        className={`w-full p-4 rounded-xl font-bold text-white transition-all transform active:scale-95 shadow-lg border-b-4 flex items-center justify-center ${gameState.isRunning ? 'bg-[#981e32] hover:bg-[#b0223a] border-[#7a1828]' : 'bg-[#5e6a71] hover:bg-[#4d575c] border-[#3f474b]'}`}
                    >
                        {gameState.isRunning ? <Pause className="mr-2 fill-current w-6 h-6" /> : <Play className="mr-2 fill-current w-6 h-6" />}
                        <span className="text-xl">{gameState.isRunning ? 'STOP' : 'START'}</span>
                    </button>
                    <div className="grid grid-cols-3 gap-2">
                        <button onClick={onResetTimer} className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 text-xs font-bold flex items-center justify-center gap-1">
                            <RotateCcw size={14} /> Reset
                        </button>
                        <button onClick={onTogglePossession} className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold flex items-center justify-center gap-1">
                            <ArrowLeftRight size={14} /> Poss
                        </button>
                        <button onClick={onNextPeriod} className="p-2 rounded-lg bg-violet-50 text-violet-700 border border-violet-100 text-xs font-bold flex items-center justify-center gap-1">
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
                        <button onClick={() => onResetScore('HOME')} className="w-full py-2 rounded-full bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 text-[10px] font-bold uppercase tracking-wider border border-gray-200">Clear Score</button>
                        <button onClick={() => onAddTeamFoul('HOME')} className="p-3 rounded-lg bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 font-bold text-sm w-full">+ Foul</button>
                        <button onClick={() => onResetTeamFouls('HOME')} className="w-full py-2 rounded-full bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 text-[10px] font-bold uppercase tracking-wider border border-gray-200">Clear Fouls</button>
                    </div>
                    {/* Away */}
                    <div className="flex flex-col gap-2">
                        <div className="text-center text-[#5e6a71] uppercase font-black tracking-tighter text-lg">AWAY</div>
                        <div className="grid grid-cols-3 gap-1">
                            <button onClick={() => onAddScore('GUEST', 1)} className="bg-[#5e6a71] text-white shadow-md border-b-3 border-[#3f474b] active:border-b-0 active:translate-y-0.5 transition-all rounded-lg py-3 text-lg font-black">+1</button>
                            <button onClick={() => onAddScore('GUEST', 2)} className="bg-[#5e6a71] text-white shadow-md border-b-3 border-[#3f474b] active:border-b-0 active:translate-y-0.5 transition-all rounded-lg py-3 text-lg font-black">+2</button>
                            <button onClick={() => onAddScore('GUEST', 3)} className="bg-[#5e6a71] text-white shadow-md border-b-3 border-[#3f474b] active:border-b-0 active:translate-y-0.5 transition-all rounded-lg py-3 text-lg font-black">+3</button>
                        </div>
                        <button onClick={() => onResetScore('GUEST')} className="w-full py-2 rounded-full bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 text-[10px] font-bold uppercase tracking-wider border border-gray-200">Clear Score</button>
                        <button onClick={() => onAddTeamFoul('GUEST')} className="p-3 rounded-lg bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 font-bold text-sm w-full">+ Foul</button>
                        <button onClick={() => onResetTeamFouls('GUEST')} className="w-full py-2 rounded-full bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 text-[10px] font-bold uppercase tracking-wider border border-gray-200">Clear Fouls</button>
                    </div>
                </div>
            </div>

            {/* Desktop: Original 3-column layout */}
            <div className="hidden md:grid grid-cols-3 gap-8 relative h-full items-center">

                {/* Home Controls */}
                <div className="flex flex-col space-y-4 h-full justify-center">
                    <div className="flex items-center justify-center space-x-2 text-[#981e32] uppercase font-black tracking-tighter">
                        <span className="text-3xl">HOME</span>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="grid grid-cols-3 gap-2">
                            <button onClick={() => onAddScore('HOME', 1)} className="bg-[#981e32] text-white hover:bg-[#b0223a] shadow-md border-b-4 border-[#7a1828] active:border-b-0 active:translate-y-1 transition-all rounded-xl py-4 text-xl font-black">+1</button>
                            <button onClick={() => onAddScore('HOME', 2)} className="bg-[#981e32] text-white hover:bg-[#b0223a] shadow-md border-b-4 border-[#7a1828] active:border-b-0 active:translate-y-1 transition-all rounded-xl py-4 text-xl font-black">+2</button>
                            <button onClick={() => onAddScore('HOME', 3)} className="bg-[#981e32] text-white hover:bg-[#b0223a] shadow-md border-b-4 border-[#7a1828] active:border-b-0 active:translate-y-1 transition-all rounded-xl py-4 text-xl font-black">+3</button>
                        </div>
                        <button onClick={() => onResetScore('HOME')} className="mt-2 w-full py-3 rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 text-xs font-bold uppercase tracking-wider transition-all shadow-sm border border-gray-200 hover:border-red-200">Clear Score</button>
                    </div>
                    <div className="w-full">
                        <button
                            onClick={() => onAddTeamFoul('HOME')}
                            className="flex items-center justify-center p-4 rounded-xl bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-lg w-full mb-1"
                        >
                            + Foul
                        </button>
                        <button onClick={() => onResetTeamFouls('HOME')} className="mt-2 w-full py-3 rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 text-xs font-bold uppercase tracking-wider transition-all shadow-sm border border-gray-200 hover:border-red-200">Clear Fouls</button>
                    </div>
                </div>

                {/* Center Controls (Timer & Game) */}
                <div className="flex flex-col space-y-6 px-4 border-l border-r border-gray-100 justify-center h-full">
                    <div className="flex flex-col space-y-3 w-full">
                        <button
                            onClick={onToggleTimer}
                            className={`w-full p-6 rounded-2xl font-bold text-white transition-all transform active:scale-95 shadow-lg border-b-4 flex items-center justify-center ${gameState.isRunning ? 'bg-[#981e32] hover:bg-[#b0223a] border-[#7a1828]' : 'bg-[#5e6a71] hover:bg-[#4d575c] border-[#3f474b]'}`}
                        >
                            {gameState.isRunning ? <Pause className="mr-3 fill-current w-8 h-8" /> : <Play className="mr-3 fill-current w-8 h-8" />}
                            <span className="text-2xl">{gameState.isRunning ? 'STOP' : 'START'}</span>
                        </button>
                        <button
                            onClick={onResetTimer}
                            className="w-full p-3 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors border-2 border-transparent hover:border-gray-300 flex items-center justify-center"
                        >
                            <RotateCcw size={20} className="mr-2" /> <span className="text-sm font-bold">Reset Clock</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full">
                        <button
                            onClick={onTogglePossession}
                            className="p-3 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 flex flex-col items-center justify-center font-bold text-sm h-20"
                        >
                            <ArrowLeftRight className="mb-1 h-6 w-6" /> Poss
                        </button>
                        <button
                            onClick={onNextPeriod}
                            className="p-3 rounded-xl bg-violet-50 text-violet-700 border border-violet-100 hover:bg-violet-100 flex flex-col items-center justify-center font-bold text-sm h-20"
                        >
                            <Clock className="mb-1 h-6 w-6" /> Half
                        </button>
                    </div>
                </div>

                {/* Guest Controls */}
                <div className="flex flex-col space-y-4 h-full justify-center">
                    <div className="flex items-center justify-center space-x-2 text-[#5e6a71] uppercase font-black tracking-tighter">
                        <span className="text-3xl">AWAY</span>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="grid grid-cols-3 gap-2">
                            <button onClick={() => onAddScore('GUEST', 1)} className="bg-[#5e6a71] text-white hover:bg-[#4d575c] shadow-md border-b-4 border-[#3f474b] active:border-b-0 active:translate-y-1 transition-all rounded-xl py-4 text-xl font-black">+1</button>
                            <button onClick={() => onAddScore('GUEST', 2)} className="bg-[#5e6a71] text-white hover:bg-[#4d575c] shadow-md border-b-4 border-[#3f474b] active:border-b-0 active:translate-y-1 transition-all rounded-xl py-4 text-xl font-black">+2</button>
                            <button onClick={() => onAddScore('GUEST', 3)} className="bg-[#5e6a71] text-white hover:bg-[#4d575c] shadow-md border-b-4 border-[#3f474b] active:border-b-0 active:translate-y-1 transition-all rounded-xl py-4 text-xl font-black">+3</button>
                        </div>
                        <button onClick={() => onResetScore('GUEST')} className="mt-2 w-full py-3 rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 text-xs font-bold uppercase tracking-wider transition-all shadow-sm border border-gray-200 hover:border-red-200">Clear Score</button>
                    </div>
                    <div className="w-full">
                        <button
                            onClick={() => onAddTeamFoul('GUEST')}
                            className="flex items-center justify-center p-4 rounded-xl bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-lg w-full mb-1"
                        >
                            + Foul
                        </button>
                        <button onClick={() => onResetTeamFouls('GUEST')} className="mt-2 w-full py-3 rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 text-xs font-bold uppercase tracking-wider transition-all shadow-sm border border-gray-200 hover:border-red-200">Clear Fouls</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
