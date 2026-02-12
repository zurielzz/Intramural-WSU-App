import React, { useState } from 'react';
import { Player, Team } from '@/hooks/useGameState';
import { Plus, Trash2, UserPlus, AlertCircle } from 'lucide-react';

interface PlayerFoulsProps {
    team: Team;
    players: Player[];
    onAddPlayer: (team: Team, jerseyNumber: string) => void;
    onRemovePlayer: (team: Team, playerId: string) => void;
    onAddFoul: (team: Team, playerId: string) => void;
}

export const PlayerFouls: React.FC<PlayerFoulsProps> = ({
    team,
    players,
    onAddPlayer,
    onRemovePlayer,
    onAddFoul,
}) => {
    const [newJersey, setNewJersey] = useState('');

    const handleAddPlayer = (e: React.FormEvent) => {
        e.preventDefault();
        if (newJersey.trim()) {
            onAddPlayer(team, newJersey.trim());
            setNewJersey('');
        }
    };

    const isHome = team === 'HOME';

    const containerClasses = isHome
        ? 'bg-white/90 border-[#981e32]'
        : 'bg-white/90 border-gray-300';

    return (
        <div className={`rounded-[1.5rem] md:rounded-[2rem] border-[3px] md:border-[4px] shadow-lg p-3 md:p-6 flex flex-col h-full backdrop-blur-sm ${containerClasses}`}>
            <div className="flex items-center justify-between mb-3 md:mb-6">
                <h3 className={`text-base md:text-xl font-black uppercase tracking-tight ${isHome ? 'text-[#981e32]' : 'text-[#5e6a71]'}`}>
                    {isHome ? 'Home Roster' : 'Away Roster'}
                </h3>
                <span className="text-[10px] md:text-xs font-mono bg-white px-2 md:px-3 py-0.5 md:py-1 rounded-full border border-gray-200 opacity-60 text-gray-600">
                    {players.length} Players
                </span>
            </div>

            {/* Add Player Form */}
            <form onSubmit={handleAddPlayer} className="flex gap-2 md:gap-3 mb-3 md:mb-6">
                <input
                    type="text"
                    value={newJersey}
                    onChange={(e) => setNewJersey(e.target.value)}
                    placeholder="#"
                    className="w-14 md:w-20 p-2 md:p-3 rounded-lg md:rounded-xl border border-gray-200 bg-white text-center font-mono font-bold text-base md:text-lg text-black focus:ring-2 focus:ring-offset-1 focus:ring-[#981e32] outline-none transition-all placeholder:text-gray-300"
                    maxLength={3}
                />
                <button
                    type="submit"
                    disabled={!newJersey}
                    className={`flex-1 py-2 md:py-3 rounded-lg md:rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xs md:text-sm shadow-lg active:scale-95 text-white ${isHome ? 'bg-[#981e32]' : 'bg-[#5e6a71]'}`}
                >
                    <UserPlus size={16} className="mr-1 md:mr-2" /> Add Player
                </button>
            </form>

            {/* Player List */}
            <div className="flex-1 overflow-y-auto space-y-2 md:space-y-3 pr-1 md:pr-2 scrollbar-hide max-h-[250px] md:max-h-[400px]">
                {players.length === 0 && (
                    <div className="text-center py-6 md:py-12 border-2 border-dashed border-gray-200 rounded-xl">
                        <span className="text-gray-400 text-xs md:text-sm font-medium">No players added yet</span>
                    </div>
                )}
                {players.map(player => (
                    <div key={player.id} className={`flex items-center justify-between p-2 md:p-3 rounded-lg md:rounded-xl border transition-all ${player.fouls >= 5 ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
                        <div className="flex items-center gap-2 md:gap-4">
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-black font-mono text-base md:text-xl shadow-inner ${isHome ? 'bg-red-100 text-[#981e32]' : 'bg-gray-100 text-[#5e6a71]'}`}>
                                {player.jerseyNumber}
                            </div>
                            <div>
                                <div className="flex items-center gap-1 md:gap-2">
                                    <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Fouls</span>
                                    {player.fouls >= 5 && <AlertCircle size={12} className="text-[#981e32]" />}
                                </div>
                                <div className={`text-xl md:text-2xl font-mono font-bold leading-none ${player.fouls >= 5 ? 'text-[#981e32]' : 'text-gray-900'}`}>
                                    {player.fouls}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 md:gap-2">
                            <button
                                onClick={() => onAddFoul(team, player.id)}
                                className="p-1.5 md:p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors border border-gray-200"
                                title="Add Foul"
                            >
                                <Plus size={18} strokeWidth={3} />
                            </button>
                            <button
                                onClick={() => onRemovePlayer(team, player.id)}
                                className="p-1.5 md:p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                title="Remove Player"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
