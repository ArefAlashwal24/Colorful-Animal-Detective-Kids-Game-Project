import React from 'react';
import { CharacterProps } from '../types';

// Default white fill for uncolored parts
const DEFAULT_FILL = '#ffffff';
const OUTLINE = '#333333';
const STROKE_WIDTH = 8;

// Helper to get color or default
const getFill = (part: string, colors?: Record<string, string>) => (colors && colors[part]) || DEFAULT_FILL;

export const CatCharacter: React.FC<CharacterProps> = ({ className, colors, onPartClick, animate }) => (
  <svg viewBox="0 0 200 200" className={`${className} ${animate ? 'animate-bounce-happy' : ''}`} fill="none" stroke={OUTLINE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round">
    {/* Tail */}
    <path d="M160 150 Q 190 100 160 80" fill={getFill('tail', colors)} onClick={() => onPartClick?.('tail')} className="cursor-pointer transition-colors" />
    {/* Body */}
    <ellipse cx="100" cy="140" rx="50" ry="40" fill={getFill('body', colors)} onClick={() => onPartClick?.('body')} className="cursor-pointer transition-colors" />
    {/* Ears */}
    <path d="M70 70 L 60 30 L 90 60 Z" fill={getFill('earL', colors)} onClick={() => onPartClick?.('earL')} className="cursor-pointer transition-colors" />
    <path d="M130 70 L 140 30 L 110 60 Z" fill={getFill('earR', colors)} onClick={() => onPartClick?.('earR')} className="cursor-pointer transition-colors" />
    {/* Head */}
    <circle cx="100" cy="90" r="35" fill={getFill('head', colors)} onClick={() => onPartClick?.('head')} className="cursor-pointer transition-colors" />
    {/* Face Details (no fill/click) */}
    <circle cx="90" cy="85" r="3" fill={OUTLINE} stroke="none" />
    <circle cx="110" cy="85" r="3" fill={OUTLINE} stroke="none" />
    <path d="M90 100 Q 100 110 110 100" strokeWidth="4" />
    <path d="M60 90 L 80 95" strokeWidth="3" />
    <path d="M140 90 L 120 95" strokeWidth="3" />
  </svg>
);

export const DogCharacter: React.FC<CharacterProps> = ({ className, colors, onPartClick, animate }) => (
  <svg viewBox="0 0 200 200" className={`${className} ${animate ? 'animate-bounce-happy' : ''}`} fill="none" stroke={OUTLINE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round">
    {/* Tail */}
    <path d="M140 140 Q 170 120 160 160" fill={getFill('tail', colors)} onClick={() => onPartClick?.('tail')} className="cursor-pointer transition-colors" />
    {/* Body */}
    <rect x="60" y="110" width="80" height="60" rx="20" fill={getFill('body', colors)} onClick={() => onPartClick?.('body')} className="cursor-pointer transition-colors" />
    {/* Ears (Floppy) */}
    <path d="M65 70 Q 40 80 45 110 L 65 90 Z" fill={getFill('earL', colors)} onClick={() => onPartClick?.('earL')} className="cursor-pointer transition-colors" />
    <path d="M135 70 Q 160 80 155 110 L 135 90 Z" fill={getFill('earR', colors)} onClick={() => onPartClick?.('earR')} className="cursor-pointer transition-colors" />
    {/* Head */}
    <circle cx="100" cy="80" r="35" fill={getFill('head', colors)} onClick={() => onPartClick?.('head')} className="cursor-pointer transition-colors" />
    {/* Face */}
    <circle cx="90" cy="75" r="3" fill={OUTLINE} stroke="none" />
    <circle cx="110" cy="75" r="3" fill={OUTLINE} stroke="none" />
    <circle cx="100" cy="85" r="5" fill={OUTLINE} stroke="none" />
  </svg>
);

export const RabbitCharacter: React.FC<CharacterProps> = ({ className, colors, onPartClick, animate }) => (
  <svg viewBox="0 0 200 200" className={`${className} ${animate ? 'animate-bounce-happy' : ''}`} fill="none" stroke={OUTLINE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round">
    {/* Feet */}
    <ellipse cx="80" cy="170" rx="15" ry="10" fill={getFill('footL', colors)} onClick={() => onPartClick?.('footL')} className="cursor-pointer transition-colors" />
    <ellipse cx="120" cy="170" rx="15" ry="10" fill={getFill('footR', colors)} onClick={() => onPartClick?.('footR')} className="cursor-pointer transition-colors" />
    {/* Body */}
    <ellipse cx="100" cy="130" rx="40" ry="45" fill={getFill('body', colors)} onClick={() => onPartClick?.('body')} className="cursor-pointer transition-colors" />
    {/* Ears */}
    <ellipse cx="85" cy="40" rx="10" ry="30" fill={getFill('earL', colors)} onClick={() => onPartClick?.('earL')} className="cursor-pointer transition-colors" />
    <ellipse cx="115" cy="40" rx="10" ry="30" fill={getFill('earR', colors)} onClick={() => onPartClick?.('earR')} className="cursor-pointer transition-colors" />
    {/* Head */}
    <circle cx="100" cy="80" r="30" fill={getFill('head', colors)} onClick={() => onPartClick?.('head')} className="cursor-pointer transition-colors" />
    {/* Face */}
    <circle cx="90" cy="75" r="3" fill={OUTLINE} stroke="none" />
    <circle cx="110" cy="75" r="3" fill={OUTLINE} stroke="none" />
    <path d="M95 85 L 105 85" strokeWidth="3" />
  </svg>
);

export const BirdCharacter: React.FC<CharacterProps> = ({ className, colors, onPartClick, animate }) => (
  <svg viewBox="0 0 200 200" className={`${className} ${animate ? 'animate-bounce-happy' : ''}`} fill="none" stroke={OUTLINE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round">
    {/* Legs */}
    <path d="M90 150 L 90 170" />
    <path d="M110 150 L 110 170" />
    {/* Body */}
    <circle cx="100" cy="110" r="45" fill={getFill('body', colors)} onClick={() => onPartClick?.('body')} className="cursor-pointer transition-colors" />
    {/* Wing */}
    <path d="M55 110 Q 30 140 70 140" fill={getFill('wing', colors)} onClick={() => onPartClick?.('wing')} className="cursor-pointer transition-colors" />
    {/* Beak */}
    <path d="M140 90 L 160 95 L 140 100 Z" fill={getFill('beak', colors)} onClick={() => onPartClick?.('beak')} className="cursor-pointer transition-colors" />
    {/* Eye */}
    <circle cx="120" cy="95" r="20" fill={getFill('eye', colors)} onClick={() => onPartClick?.('eye')} className="cursor-pointer transition-colors" />
    <circle cx="125" cy="95" r="4" fill={OUTLINE} stroke="none" />
  </svg>
);