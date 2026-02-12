import { useState, useEffect, useCallback } from 'react';

export type Team = 'HOME' | 'GUEST';

export interface Player {
    id: string;
    jerseyNumber: string;
    fouls: number;
}

export interface GameState {
    homeScore: number;
    guestScore: number;
    homeFouls: number;
    guestFouls: number;
    period: number;
    possession: Team;
    timeLeft: number; // in seconds
    isRunning: boolean;
    homePlayers: Player[];
    guestPlayers: Player[];
}

const INITIAL_TIME = 18 * 60; // 18 minutes

export function useGameState() {
    const [gameState, setGameState] = useState<GameState>({
        homeScore: 0,
        guestScore: 0,
        homeFouls: 0,
        guestFouls: 0,
        period: 1,
        possession: 'HOME',
        timeLeft: INITIAL_TIME,
        isRunning: false,
        homePlayers: [],
        guestPlayers: [],
    });

    const [history, setHistory] = useState<GameState[]>([]);

    // Snapshot the current state before a change
    const pushToHistory = useCallback((current: GameState) => {
        setHistory((prev) => {
            const newHistory = [...prev, current];
            if (newHistory.length > 50) newHistory.shift(); // Keep last 50
            return newHistory;
        });
    }, []);

    const undo = useCallback(() => {
        setHistory((prev) => {
            if (prev.length === 0) return prev;
            const lastState = prev[prev.length - 1];
            setGameState(lastState);
            return prev.slice(0, -1);
        });
    }, []);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameState.isRunning && gameState.timeLeft > 0) {
            interval = setInterval(() => {
                setGameState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
            }, 1000);
        } else if (gameState.timeLeft === 0) {
            setGameState((prev) => ({ ...prev, isRunning: false }));
        }
        return () => clearInterval(interval);
    }, [gameState.isRunning, gameState.timeLeft]);

    const toggleTimer = useCallback(() => {
        setGameState((prev) => ({ ...prev, isRunning: !prev.isRunning }));
    }, []);

    const resetTimer = useCallback(() => {
        // No history push for simple timer reset usually, but let's allow it if user wants to undo a reset
        setGameState(prev => {
            pushToHistory(prev);
            return { ...prev, timeLeft: INITIAL_TIME, isRunning: false };
        });
    }, [pushToHistory]);

    const addScore = useCallback((team: Team, points: number) => {
        setGameState((prev) => {
            pushToHistory(prev);
            return {
                ...prev,
                [team === 'HOME' ? 'homeScore' : 'guestScore']:
                    prev[team === 'HOME' ? 'homeScore' : 'guestScore'] + points,
            };
        });
    }, [pushToHistory]);

    const addTeamFoul = useCallback((team: Team) => {
        setGameState((prev) => {
            pushToHistory(prev);
            return {
                ...prev,
                [team === 'HOME' ? 'homeFouls' : 'guestFouls']:
                    prev[team === 'HOME' ? 'homeFouls' : 'guestFouls'] + 1,
            };
        });
    }, [pushToHistory]);

    const resetTeamFouls = useCallback((team?: Team) => {
        setGameState((prev) => {
            pushToHistory(prev);
            if (team) {
                return {
                    ...prev,
                    [team === 'HOME' ? 'homeFouls' : 'guestFouls']: 0
                };
            }
            return {
                ...prev,
                homeFouls: 0,
                guestFouls: 0,
            };
        });
    }, [pushToHistory]);

    const togglePossession = useCallback(() => {
        setGameState((prev) => {
            pushToHistory(prev);
            return {
                ...prev,
                possession: prev.possession === 'HOME' ? 'GUEST' : 'HOME',
            };
        });
    }, [pushToHistory]);

    const addPlayer = useCallback((team: Team, jerseyNumber: string) => {
        // History push not strictly necessary for roster changes but good for consistency
        const newPlayer: Player = {
            id: Math.random().toString(36).substr(2, 9),
            jerseyNumber,
            fouls: 0
        };
        setGameState(prev => {
            pushToHistory(prev);
            return {
                ...prev,
                [team === 'HOME' ? 'homePlayers' : 'guestPlayers']: [
                    ...prev[team === 'HOME' ? 'homePlayers' : 'guestPlayers'],
                    newPlayer
                ].sort((a, b) => parseInt(a.jerseyNumber) - parseInt(b.jerseyNumber))
            };
        });
    }, [pushToHistory]);

    const removePlayer = useCallback((team: Team, playerId: string) => {
        setGameState(prev => {
            pushToHistory(prev);
            return {
                ...prev,
                [team === 'HOME' ? 'homePlayers' : 'guestPlayers']: prev[team === 'HOME' ? 'homePlayers' : 'guestPlayers'].filter(p => p.id !== playerId)
            };
        });
    }, [pushToHistory]);

    const addPlayerFoul = useCallback((team: Team, playerId: string) => {
        setGameState((prev) => {
            pushToHistory(prev);
            // Find player and increment fouls
            const playersKey = team === 'HOME' ? 'homePlayers' : 'guestPlayers';
            const updatedPlayers = prev[playersKey].map(p =>
                p.id === playerId ? { ...p, fouls: p.fouls + 1 } : p
            );

            // Also increment team fouls
            const foulKey = team === 'HOME' ? 'homeFouls' : 'guestFouls';

            return {
                ...prev,
                [playersKey]: updatedPlayers,
                [foulKey]: prev[foulKey] + 1
            };
        });
    }, [pushToHistory]);

    const nextPeriod = useCallback(() => {
        setGameState(prev => {
            if (prev.period >= 2) return prev; // Limit to 2 halves for now
            pushToHistory(prev);
            return {
                ...prev,
                period: prev.period + 1,
                timeLeft: INITIAL_TIME,
                isRunning: false,
                homeFouls: 0,
                guestFouls: 0
            };
        });
    }, [pushToHistory]);

    const resetScore = useCallback((team?: Team) => {
        setGameState(prev => {
            pushToHistory(prev);
            if (team) {
                return {
                    ...prev,
                    [team === 'HOME' ? 'homeScore' : 'guestScore']: 0
                };
            }
            return {
                ...prev,
                homeScore: 0,
                guestScore: 0
            };
        });
    }, [pushToHistory]);

    const resetGame = useCallback(() => {
        setGameState(prev => {
            pushToHistory(prev); // Save state before wipe, just in case
            return {
                homeScore: 0,
                guestScore: 0,
                homeFouls: 0,
                guestFouls: 0,
                period: 1,
                possession: 'HOME',
                timeLeft: INITIAL_TIME,
                isRunning: false,
                homePlayers: prev.homePlayers.map(p => ({ ...p, fouls: 0 })), // Reset player fouls too? usually yes for new game
                guestPlayers: prev.guestPlayers.map(p => ({ ...p, fouls: 0 })),
            };
        });
    }, [pushToHistory]);


    return {
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
        canUndo: history.length > 0
    };
}
