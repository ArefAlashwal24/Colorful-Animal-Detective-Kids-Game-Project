import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Check, ArrowRight, User, Star, Volume2 } from 'lucide-react';
import { GameScreen, CharacterType, PuzzleColor, CharacterColors } from './types';
import { CatCharacter, DogCharacter, RabbitCharacter, BirdCharacter } from './components/CharacterSvgs';
import { Button } from './components/Button';

// Configuration
const PUZZLE_SEQUENCE: PuzzleColor[] = ['RED', 'BLUE', 'YELLOW'];

const COLORS_PALETTE = [
  { id: 'red', hex: '#ef4444', label: 'Red' },
  { id: 'blue', hex: '#3b82f6', label: 'Blue' },
  { id: 'yellow', hex: '#eab308', label: 'Yellow' },
  { id: 'green', hex: '#22c55e', label: 'Green' },
  { id: 'orange', hex: '#f97316', label: 'Orange' },
  { id: 'purple', hex: '#a855f7', label: 'Purple' },
];

export default function App() {
  const [screen, setScreen] = useState<GameScreen>(GameScreen.HOME);
  const [character, setCharacter] = useState<CharacterType | null>(null);
  
  // Puzzle State
  const [puzzleSlots, setPuzzleSlots] = useState<PuzzleColor[]>([]);
  const [isPuzzleShake, setIsPuzzleShake] = useState(false);
  const [isPuzzleSuccess, setIsPuzzleSuccess] = useState(false);

  // Coloring State
  const [selectedColorHex, setSelectedColorHex] = useState<string>(COLORS_PALETTE[0].hex);
  const [characterColors, setCharacterColors] = useState<CharacterColors>({});

  // Helper to render the correct character component
  const renderCharacter = (type: CharacterType, className: string, colors?: CharacterColors, onPartClick?: (part: string) => void, animate: boolean = false) => {
    const props = { className, colors, onPartClick, animate };
    switch (type) {
      case CharacterType.CAT: return <CatCharacter {...props} />;
      case CharacterType.DOG: return <DogCharacter {...props} />;
      case CharacterType.RABBIT: return <RabbitCharacter {...props} />;
      case CharacterType.BIRD: return <BirdCharacter {...props} />;
      default: return null;
    }
  };

  // --- Actions ---

  const handleCharacterSelect = (char: CharacterType) => {
    setCharacter(char);
    // Reset states for new game
    setPuzzleSlots([]);
    setIsPuzzleSuccess(false);
    setCharacterColors({});
    setScreen(GameScreen.STORY);
  };

  const handlePuzzleColorClick = (color: PuzzleColor) => {
    if (isPuzzleSuccess) return;

    const newSlots = [...puzzleSlots, color];
    setPuzzleSlots(newSlots);

    // Check logic when 3 slots are full
    if (newSlots.length === 3) {
      const isCorrect = newSlots.every((slot, index) => slot === PUZZLE_SEQUENCE[index]);
      
      if (isCorrect) {
        setIsPuzzleSuccess(true);
      } else {
        setIsPuzzleShake(true);
        setTimeout(() => {
          setIsPuzzleShake(false);
          setPuzzleSlots([]); // Reset on failure
        }, 500);
      }
    }
  };

  const handleColoringPartClick = (partId: string) => {
    if (screen !== GameScreen.COLORING) return;
    setCharacterColors(prev => ({
      ...prev,
      [partId]: selectedColorHex
    }));
  };

  const handleResetColoring = () => {
    setCharacterColors({});
  };

  // --- Render Screens ---

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-sky-200 to-indigo-200 p-6 text-center space-y-12">
      <div className="animate-bounce-happy">
        <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-lg tracking-wider">
          PLAY
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-sky-600 mt-4">
          Time!
        </h2>
      </div>
      
      <Button 
        onClick={() => setScreen(GameScreen.CHARACTER_SELECT)} 
        className="w-full max-w-sm"
        icon={<Play fill="currentColor" />}
      >
        PLAY
      </Button>
    </div>
  );

  const renderCharacterSelect = () => (
    <div className="flex flex-col items-center h-full bg-orange-50 p-6 overflow-y-auto">
      <h2 className="text-4xl md:text-6xl font-bold text-orange-600 mb-8 mt-4 text-center">
        Choose Friend
      </h2>
      
      <div className="grid grid-cols-2 gap-6 w-full max-w-2xl flex-grow place-content-center">
        {[CharacterType.CAT, CharacterType.DOG, CharacterType.RABBIT, CharacterType.BIRD].map((char) => (
          <button
            key={char}
            onClick={() => handleCharacterSelect(char)}
            className="aspect-square bg-white rounded-3xl shadow-xl border-4 border-orange-200 hover:border-orange-400 transform active:scale-95 transition-all p-6 flex flex-col items-center justify-center group"
          >
            {renderCharacter(char, "w-full h-full group-hover:scale-110 transition-transform")}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStory = () => (
    <div className="flex flex-col items-center justify-between h-full bg-slate-900 p-6">
      <h2 className="text-white text-3xl font-bold mt-4">Watch Story</h2>
      
      <div className="w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 my-6 relative">
         <iframe 
            className="w-full h-full pointer-events-none" 
            src="https://www.youtube.com/embed/-FoKj7d7kn0?controls=0&mute=1&autoplay=1&loop=1&playlist=-FoKj7d7kn0" 
            title="Story Video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <div className="absolute inset-0 bg-transparent" /> {/* Overlay to prevent clicks on video */}
      </div>

      <Button 
        variant="success" 
        onClick={() => setScreen(GameScreen.PUZZLE)}
        className="w-full max-w-sm mb-8"
        icon={<Play />}
      >
        Start Game
      </Button>
    </div>
  );

  const renderPuzzle = () => (
    <div className="flex flex-col items-center h-full bg-violet-100 p-4">
      <div className="mt-4 mb-8 flex items-center gap-4">
         <Volume2 className="text-violet-400 w-12 h-12" />
         {/* Visual Hint for the answer if they get stuck? Keeping it hidden, simple trial and error is fun for 5yo */}
         <div className="flex gap-2 p-2 bg-white/50 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-red-500"></div>
            <div className="w-6 h-6 rounded-full bg-blue-500"></div>
            <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
         </div>
      </div>

      {/* Slots */}
      <div className={`flex gap-4 mb-12 ${isPuzzleShake ? 'animate-shake' : ''}`}>
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-dashed border-violet-300 bg-white flex items-center justify-center shadow-inner"
          >
            {puzzleSlots[i] && (
              <div 
                className={`w-full h-full rounded-full animate-bounce-happy`}
                style={{ 
                  backgroundColor: 
                    puzzleSlots[i] === 'RED' ? '#ef4444' : 
                    puzzleSlots[i] === 'BLUE' ? '#3b82f6' : 
                    puzzleSlots[i] === 'YELLOW' ? '#eab308' : '#22c55e' 
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Success Message or Controls */}
      {isPuzzleSuccess ? (
        <div className="flex flex-col items-center animate-bounce-happy">
          <Star size={80} className="text-yellow-400 fill-yellow-400 mb-4" />
          <Button 
            variant="success" 
            onClick={() => setScreen(GameScreen.COLORING)}
            className="w-full max-w-sm"
          >
            Color Time!
          </Button>
        </div>
      ) : (
        /* Color Buttons */
        <div className="grid grid-cols-2 gap-6 w-full max-w-md mt-auto mb-8">
          <button onClick={() => handlePuzzleColorClick('RED')} className="bg-red-500 rounded-3xl h-32 shadow-lg border-b-8 border-red-700 active:border-b-0 active:translate-y-2"></button>
          <button onClick={() => handlePuzzleColorClick('BLUE')} className="bg-blue-500 rounded-3xl h-32 shadow-lg border-b-8 border-blue-700 active:border-b-0 active:translate-y-2"></button>
          <button onClick={() => handlePuzzleColorClick('YELLOW')} className="bg-yellow-500 rounded-3xl h-32 shadow-lg border-b-8 border-yellow-700 active:border-b-0 active:translate-y-2"></button>
          <button onClick={() => handlePuzzleColorClick('GREEN')} className="bg-green-500 rounded-3xl h-32 shadow-lg border-b-8 border-green-700 active:border-b-0 active:translate-y-2"></button>
        </div>
      )}
    </div>
  );

  const renderColoring = () => (
    <div className="flex flex-col h-full bg-white relative">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b-2">
        <button onClick={handleResetColoring} className="p-5 bg-gray-200 rounded-full hover:bg-gray-300">
          <RotateCcw size={40} className="text-gray-600" />
        </button>
        <Button 
          variant="success" 
          onClick={() => setScreen(GameScreen.FINISH)}
          className="px-8 py-4 text-2xl"
          icon={<Check />}
        >
          DONE
        </Button>
      </div>

      {/* Canvas Area */}
      <div className="flex-grow flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md aspect-square bg-white rounded-3xl shadow-xl border-4 border-slate-100 p-4">
           {character && renderCharacter(character, "w-full h-full", characterColors, handleColoringPartClick)}
        </div>
      </div>

      {/* Color Palette */}
      <div className="bg-white p-4 border-t-2 border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between max-w-lg mx-auto gap-3 overflow-x-auto pb-2">
          {COLORS_PALETTE.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedColorHex(c.hex)}
              style={{ backgroundColor: c.hex }}
              className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-4 flex-shrink-0 transition-transform ${
                selectedColorHex === c.hex ? 'border-slate-800 scale-110 shadow-xl' : 'border-white scale-100'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderFinish = () => (
    <div className="flex flex-col items-center h-full bg-gradient-to-br from-yellow-100 to-orange-100 p-6 justify-between">
      <div className="mt-8 text-center animate-bounce-happy">
        <h2 className="text-5xl md:text-7xl font-black text-orange-500 drop-shadow-sm mb-2">Great Job!</h2>
        <div className="flex justify-center gap-2">
           <Star size={40} className="fill-yellow-400 text-yellow-500" />
           <Star size={50} className="fill-yellow-400 text-yellow-500 -mt-4" />
           <Star size={40} className="fill-yellow-400 text-yellow-500" />
        </div>
      </div>

      <div className="w-full max-w-md aspect-square bg-white rounded-full shadow-2xl border-8 border-white p-8 mb-4">
        {character && renderCharacter(character, "w-full h-full", characterColors, undefined, true)}
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm mb-8">
        <Button 
          variant="primary" 
          onClick={() => setScreen(GameScreen.HOME)}
          icon={<RotateCcw />}
        >
          Play Again
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => setScreen(GameScreen.CHARACTER_SELECT)}
          icon={<User />}
        >
          New Friend
        </Button>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full font-sans text-slate-800 bg-slate-50">
      {screen === GameScreen.HOME && renderHome()}
      {screen === GameScreen.CHARACTER_SELECT && renderCharacterSelect()}
      {screen === GameScreen.STORY && renderStory()}
      {screen === GameScreen.PUZZLE && renderPuzzle()}
      {screen === GameScreen.COLORING && renderColoring()}
      {screen === GameScreen.FINISH && renderFinish()}
    </div>
  );
}