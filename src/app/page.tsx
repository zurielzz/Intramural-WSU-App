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
    canUndo,
    setTeamName
  } = useGameState();

  return (
    <main className="min-h-screen bg-transparent p-3.5 md:p-7 lg:p-8 safe-area font-sans relative overflow-x-hidden">
      {/* Background Logo Watermark */}
      <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[820px] h-[400px] md:h-[820px] opacity-[0.07] pointer-events-none z-0 blur-[0.3px]">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Washington_State_Cougars_logo.svg/1200px-Washington_State_Cougars_logo.svg.png"
          alt="WSU Cougar Logo"
          className="w-full h-full object-contain grayscale contrast-125 brightness-110"
        />
      </div>

      <div className="max-w-[1350px] mx-auto space-y-3 md:space-y-4 relative z-10">

        {/* Header */}
        <header className="text-center mb-2 md:mb-4">
          <h1 className="ios-headline text-xl md:text-5xl font-black uppercase tracking-tighter text-[#3f4a51] mb-0.5 md:mb-2">
            WSU Intramural <span className="text-[#981e32]">Basketball</span>
          </h1>
          <p className="text-[#5e6a71]/80 font-mono text-[10px] md:text-sm tracking-widest uppercase">Official Scoreboard Control</p>
        </header>

        {/* Top Section: Scoreboard & Controls - Side by Side 50/50 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-stretch">
          {/* Main Scoreboard Area */}
          <section className="w-full h-full">
            <Scoreboard gameState={gameState} />
          </section>

          {/* Control Panel */}
          <section className="w-full h-full">
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
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pb-4 md:pb-6">
          <PlayerFouls
            team="HOME"
            teamName={gameState.homeTeamName}
            players={gameState.homePlayers}
            onAddPlayer={addPlayer}
            onRemovePlayer={removePlayer}
            onAddFoul={addPlayerFoul}
            onSetTeamName={setTeamName}
          />
          <PlayerFouls
            team="GUEST"
            teamName={gameState.guestTeamName}
            players={gameState.guestPlayers}
            onAddPlayer={addPlayer}
            onRemovePlayer={removePlayer}
            onAddFoul={addPlayerFoul}
            onSetTeamName={setTeamName}
          />
        </section>

      </div>
    </main>
  );
}
