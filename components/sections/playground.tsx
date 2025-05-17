"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { FiPlay, FiRefreshCw, FiAward, FiClock, FiTarget, FiTrendingUp } from "react-icons/fi";

export const Playground = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targets, setTargets] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [highScore, setHighScore] = useState(0);
  const [allTimeHighScore, setAllTimeHighScore] = useState(0);
  const [recentScores, setRecentScores] = useState<number[]>([]);
  const [gameDimensions, setGameDimensions] = useState({ width: 0, height: 0 });

  // Colors for targets
  const colors = [
    "rgb(var(--color-primary))",
    "rgba(59, 130, 246, 0.8)",
    "rgba(139, 92, 246, 0.8)",
    "rgba(236, 72, 153, 0.8)",
  ];

  // Load high score from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('playgroundHighScore');
    const savedRecentScores = localStorage.getItem('playgroundRecentScores');
    
    if (savedHighScore) {
      const parsedHighScore = parseInt(savedHighScore, 10);
      setHighScore(parsedHighScore);
      setAllTimeHighScore(parsedHighScore);
    }
    
    if (savedRecentScores) {
      try {
        const parsedRecentScores = JSON.parse(savedRecentScores);
        if (Array.isArray(parsedRecentScores)) {
          setRecentScores(parsedRecentScores);
        }
      } catch (e) {
        console.error("Failed to parse recent scores:", e);
      }
    }
  }, []);

  // Set initial game area dimensions
  useEffect(() => {
    if (gameAreaRef.current) {
      const { width, height } = gameAreaRef.current.getBoundingClientRect();
      setGameDimensions({ width, height });
    }
    
    const handleResize = () => {
      if (gameAreaRef.current) {
        const { width, height } = gameAreaRef.current.getBoundingClientRect();
        setGameDimensions({ width, height });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Start the game
  const startGame = () => {
    if (gameAreaRef.current) {
      const { width, height } = gameAreaRef.current.getBoundingClientRect();
      setGameDimensions({ width, height });
    }
    
    setGameStarted(true);
    setScore(0);
    setTimeLeft(30);
    setTargets([]);
    
    // Clear any existing interval
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
    }
    
    // Add initial targets
    setTimeout(() => {
      generateTarget();
      generateTarget();
    }, 100);
    
    // Set up the game timer
    gameIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(gameIntervalRef.current!);
          setGameStarted(false);
          
          // Update high score if needed
          const newHighScore = Math.max(highScore, score);
          setHighScore(newHighScore);
          
          // Update all-time high score and save to localStorage
          if (score > allTimeHighScore) {
            setAllTimeHighScore(score);
            localStorage.setItem('playgroundHighScore', score.toString());
          }
          
          // Update recent scores
          const updatedRecentScores = [score, ...recentScores.slice(0, 4)];
          setRecentScores(updatedRecentScores);
          localStorage.setItem('playgroundRecentScores', JSON.stringify(updatedRecentScores));
          
          return 0;
        }
        return prev - 1;
      });
      
      // Add a new target every few seconds
      if (Math.random() > 0.7) {
        generateTarget();
      }
    }, 1000);
  };
  
  // Generate a random target
  const generateTarget = () => {
    if (!gameAreaRef.current || gameDimensions.width === 0) return;
    
    const { width, height } = gameDimensions;
    const size = 20 + Math.random() * 40; // Random size between 20-60px
    const x = Math.random() * (width - size);
    const y = Math.random() * (height - size);
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    setTargets((prev) => [
      ...prev, 
      { 
        id: Date.now() + Math.random(), // Ensure unique IDs
        x, 
        y, 
        size, 
        color 
      }
    ]);
  };
  
  // Handle clicking on a target
  const handleTargetClick = (id: number, size: number) => {
    // Calculate points inversely proportional to size (smaller = more points)
    const points = Math.round(100 / (size / 20));
    
    setScore((prev) => prev + points);
    setTargets((prev) => prev.filter((target) => target.id !== id));
    
    // Add a new target
    setTimeout(() => {
      generateTarget();
      
      // Occasionally add a second target
      if (Math.random() > 0.7) {
        setTimeout(generateTarget, 200);
      }
    }, 100);
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
      }
    };
  }, []);
  
  return (
    <section id="playground" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge 
            variant="flat" 
            color="primary" 
            className="mb-4 glass-premium border border-primary/20"
          >
            <span className="px-2 py-0.5 text-primary">Fun Zone</span>
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">Interactive Playground</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Take a break and test your reflexes with this simple target-clicking game.
            How many points can you score in 30 seconds?
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="glass-premium border border-border overflow-hidden">
            <CardBody className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="flex gap-4 md:gap-6 mb-4 md:mb-0">
                  <div className="text-center">
                    <p className="text-sm text-foreground/70 mb-1">Score</p>
                    <p className="text-2xl font-bold text-primary">{score}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-foreground/70 mb-1">Time Left</p>
                    <p className="text-2xl font-bold text-foreground">{timeLeft}s</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-foreground/70 mb-1">This Session</p>
                    <p className="text-2xl font-bold text-accent">{highScore}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-foreground/70 mb-1">All Time Best</p>
                    <p className="text-2xl font-bold text-warning">{allTimeHighScore}</p>
                  </div>
                </div>
                
                <Button
                  color="primary"
                  variant="flat"
                  radius="full"
                  startContent={gameStarted ? <FiRefreshCw /> : <FiPlay />}
                  onClick={startGame}
                >
                  {gameStarted ? "Restart Game" : "Start Game"}
                </Button>
              </div>
              
              <div 
                ref={gameAreaRef}
                className="w-full h-[400px] bg-background/40 rounded-xl border border-border relative overflow-hidden"
                style={{ cursor: gameStarted ? "crosshair" : "default" }}
              >
                {!gameStarted && timeLeft === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold mb-2">Game Over!</p>
                    <p className="text-lg mb-4">Your score: <span className="text-primary font-bold">{score}</span></p>
                    
                    {score >= allTimeHighScore && score > 0 && (
                      <div className="mb-6 p-3 bg-warning/10 text-warning rounded-lg font-medium animate-pulse">
                        <FiAward className="inline-block mr-2" />
                        New High Score!
                      </div>
                    )}
                    
                    <Button
                      color="primary"
                      variant="flat"
                      radius="full"
                      startContent={<FiPlay />}
                      onClick={startGame}
                    >
                      Play Again
                    </Button>
                  </div>
                )}
                
                {!gameStarted && timeLeft === 30 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-xl mb-4">Click on the targets as fast as you can!</p>
                    <p className="text-lg mb-6">Smaller targets are worth more points</p>
                    <Button
                      color="primary"
                      variant="flat"
                      radius="full"
                      size="lg"
                      startContent={<FiPlay />}
                      onClick={startGame}
                    >
                      Start Game
                    </Button>
                  </div>
                )}
                
                <AnimatePresence>
                  {targets.map((target) => (
                    <motion.div
                      key={target.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute rounded-full cursor-pointer"
                      style={{
                        left: target.x,
                        top: target.y,
                        width: target.size,
                        height: target.size,
                        backgroundColor: target.color,
                      }}
                      onClick={() => gameStarted && handleTargetClick(target.id, target.size)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </CardBody>
          </Card>
        </motion.div>
        
        {/* Recent scores and stats */}
        {recentScores.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <Card className="glass-premium border border-border">
              <CardBody className="p-4">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Scores</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {recentScores.map((recentScore, index) => (
                    <div key={index} className="bg-background/50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-primary">{recentScore}</div>
                      <div className="text-xs text-muted">Game {index + 1}</div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}
        
        <div className="text-center text-muted text-sm">
          <p>Hint: Smaller targets give more points! Try to click them as fast as you can.</p>
        </div>
      </div>
    </section>
  );
}; 