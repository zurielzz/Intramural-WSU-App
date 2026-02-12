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

    // Dynamic styles based on team
    const containerClasses = isHome
        ? 'bg-white/90 border-[#981e32]' // Home: White with Crimson border
        : 'bg-white/90 border-gray-300'; // Guest: White with Gray border

    return (
        <div className={`rounded-[2rem] border-[4px] shadow-lg p-6 flex flex-col h-full backdrop-blur-sm ${containerClasses}`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-black uppercase tracking-tight ${isHome ? 'text-[#981e32]' : 'text-[#5e6a71]'}`}>
                    {isHome ? 'Home Roster' : 'Away Roster'}
                </h3>
                <span className="text-xs font-mono bg-white px-3 py-1 rounded-full border border-gray-200 opacity-60 text-gray-600">
                    {players.length} Players
                </span>
            </div>

            {/* Add Player Form */}
            <form onSubmit={handleAddPlayer} className="flex gap-3 mb-6">
                <input
                    type="text"
                    value={newJersey}
                    onChange={(e) => setNewJersey(e.target.value)}
                    placeholder="#"
                    className="w-20 p-3 rounded-xl border border-gray-200 bg-white text-center font-mono font-bold text-lg text-black focus:ring-2 focus:ring-offset-2 focus:ring-[#981e32] outline-none transition-all placeholder:text-gray-300"
                    maxLength={3}
                />
                <button
                    type="submit"
                    disabled={!newJersey}
                    className={`flex-1 rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-sm shadow-lg hover:shadow-xl active:scale-95 text-white ${isHome ? 'bg-[#981e32]' : 'bg-[#5e6a71]'}`}
                >
                    <UserPlus size={18} className="mr-2" /> Add Player
                </button>
            </form>

            {/* Player List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide max-h-[400px]">
                {players.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                        <span className="text-gray-400 text-sm font-medium">No players added yet</span>
                    </div>
                )}
                {players.map(player => (
                    <div key={player.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:shadow-md ${player.fouls >= 5 ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-black font-mono text-xl shadow-inner ${isHome ? 'bg-red-100 text-[#981e32]' : 'bg-gray-100 text-[#5e6a71]'}`}>
                                {player.jerseyNumber}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fouls</span>
                                    {player.fouls >= 5 && <AlertCircle size={14} className="text-[#981e32]" />}
                                </div>
                                <div className={`text-2xl font-mono font-bold leading-none ${player.fouls >= 5 ? 'text-[#981e32]' : 'text-gray-900'}`}>
                                    {player.fouls}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onAddFoul(team, player.id)}
                                className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors border border-orange-100"
                                title="Add Foul"
                            >
                                <Plus size={20} strokeWidth={3} />
                            </button>
                            <button
                                onClick={() => onRemovePlayer(team, player.id)}
                                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                title="Remove Player"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
