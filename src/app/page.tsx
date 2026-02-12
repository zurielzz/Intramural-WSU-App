'use client';

import { useGameState } from '@/hooks/useGameState';
import { Scoreboard } from '@/components/Scoreboard';
import { ControlPanel } from '@/components/ControlPanel';
import { PlayerFouls } from '@/components/PlayerFouls';

export default function Home() {
  const {
    gameState,
    toggleTimer,
    resetTimer,
    addScore,
    addTeamFoul,
    resetTeamFouls,
    togglePossession,
    addPlayer,
    removePlayer,
    addPlayerFoul,
    nextPeriod,
    resetScore,
    resetGame,
    undo,
    canUndo
  } = useGameState();

  return (
    <main className="min-h-screen bg-gray-50 p-2 md:p-6 font-sans relative overflow-hidden">
      {/* Background Logo Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] opacity-[0.03] pointer-events-none z-0">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Washington_State_Cougars_logo.svg/1200px-Washington_State_Cougars_logo.svg.png"
          alt="WSU Cougar Logo"
          className="w-full h-full object-contain grayscale"
        />
      </div>

      <div className="max-w-[1800px] mx-auto space-y-3 md:space-y-6 relative z-10">

        {/* Header */}
        <header className="text-center mb-2 md:mb-6">
          <h1 className="text-xl md:text-5xl font-black uppercase tracking-tighter text-[#5e6a71] mb-0.5 md:mb-2 drop-shadow-sm">
            WSU Intramural <span className="text-[#981e32]">Basketball</span>
          </h1>
          <p className="text-gray-400 font-mono text-[10px] md:text-sm tracking-widest uppercase">Official Scoreboard Control</p>
        </header>

        {/* Top Section: Scoreboard & Controls - Side by Side 50/50 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Main Scoreboard Area */}
          <section className="w-full flex flex-col">
            <Scoreboard gameState={gameState} />
          </section>

          {/* Control Panel */}
          <section className="w-full flex flex-col">
            <ControlPanel
              gameState={gameState}
              onAddScore={addScore}
              onToggleTimer={toggleTimer}
              onResetTimer={resetTimer}
              onTogglePossession={togglePossession}
              onAddTeamFoul={addTeamFoul}
              onResetTeamFouls={resetTeamFouls}
              onResetScore={resetScore}
              onResetGame={resetGame}
              onNextPeriod={nextPeriod}
              onUndo={undo}
              canUndo={canUndo}
            />
          </section>
        </div>

        {/* Bottom Section: Player Rosters & Fouls */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 pb-4 md:pb-10">
          <PlayerFouls
            team="HOME"
            players={gameState.homePlayers}
            onAddPlayer={addPlayer}
            onRemovePlayer={removePlayer}
            onAddFoul={addPlayerFoul}
          />
          <PlayerFouls
            team="GUEST"
            players={gameState.guestPlayers}
            onAddPlayer={addPlayer}
            onRemovePlayer={removePlayer}
            onAddFoul={addPlayerFoul}
          />
        </section>

      </div>
    </main>
  );
}
