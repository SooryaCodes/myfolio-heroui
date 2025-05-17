"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Tabs, Tab } from "@heroui/tabs";
import { Chip } from "@heroui/chip";
import { FiPlay, FiRefreshCw, FiAward, FiClock, FiTarget, FiTrendingUp, FiLayers, FiCode, FiMousePointer } from "react-icons/fi";

// Game type definition
type GameType = "target-game" | "stack-game" | "typing-test";

export const Playground = () => {
  // Game selection state
  const [selectedGame, setSelectedGame] = useState<GameType>("target-game");

  // Target Game states
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

  // Stack Game states
  const [stackGameStarted, setStackGameStarted] = useState(false);
  const [stackScore, setStackScore] = useState(0);
  const [stackHighScore, setStackHighScore] = useState(0);
  const [currentBlock, setCurrentBlock] = useState<string | null>(null);
  const [stackedBlocks, setStackedBlocks] = useState<string[]>([]);
  const [techStacks, setTechStacks] = useState<{ name: string; techs: string[] }[]>([
    { name: "MERN Stack", techs: ["MongoDB", "Express", "React", "Node.js"] },
    { name: "Modern Frontend", techs: ["React", "TypeScript", "Tailwind CSS", "Next.js"] },
    { name: "Fullstack JS", techs: ["Node.js", "Express", "PostgreSQL", "React"] }
  ]);
  const [currentStackIdx, setCurrentStackIdx] = useState(0);
  const [fallingSpeed, setFallingSpeed] = useState(3000);
  
  // Typing Test states
  const [typingStarted, setTypingStarted] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [typingInput, setTypingInput] = useState("");
  const [typingTimeLeft, setTypingTimeLeft] = useState(60);
  const [typingWPM, setTypingWPM] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(100);
  const [typingHighScore, setTypingHighScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const codingSnippets = [
    "const Button = ({ onClick, children }) => {\n  return (\n    <button onClick={onClick} className=\"btn\">\n      {children}\n    </button>\n  );\n};",
    "function calculateTotal(items) {\n  return items.reduce((total, item) => {\n    return total + item.price * item.quantity;\n  }, 0);\n}",
    "const fetchUserData = async (userId) => {\n  try {\n    const response = await fetch(`/api/users/${userId}`);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error fetching user data:', error);\n  }\n};"
  ];

  // Colors for targets
  const colors = [
    "rgb(var(--color-primary))",
    "rgba(59, 130, 246, 0.8)",
    "rgba(139, 92, 246, 0.8)",
    "rgba(236, 72, 153, 0.8)",
  ];

  // Tech icon colors
  const techColors = {
    "React": "#61DAFB",
    "Node.js": "#68A063",
    "MongoDB": "#4DB33D",
    "Express": "#000000",
    "Next.js": "#000000",
    "TypeScript": "#007ACC",
    "Tailwind CSS": "#38B2AC",
    "PostgreSQL": "#336791"
  };

  // Load high scores from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('playgroundHighScore');
    const savedRecentScores = localStorage.getItem('playgroundRecentScores');
    const savedStackHighScore = localStorage.getItem('stackGameHighScore');
    const savedTypingHighScore = localStorage.getItem('typingTestHighScore');
    
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

    if (savedStackHighScore) {
      setStackHighScore(parseInt(savedStackHighScore, 10));
    }

    if (savedTypingHighScore) {
      setTypingHighScore(parseInt(savedTypingHighScore, 10));
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

  // TARGET GAME FUNCTIONS
  
  // Start the target game
  const startTargetGame = () => {
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

  // STACK GAME FUNCTIONS
  
  // Start the stack game
  const startStackGame = () => {
    setStackGameStarted(true);
    setStackScore(0);
    setCurrentStackIdx(Math.floor(Math.random() * techStacks.length));
    setStackedBlocks([]);
    setFallingSpeed(3000);
    
    // Start dropping blocks
    dropNextBlock();
  };
  
  // Drop the next tech block
  const dropNextBlock = () => {
    if (!stackGameStarted) return;
    
    const currentStack = techStacks[currentStackIdx];
    
    // If all blocks are stacked, move to the next tech stack
    if (stackedBlocks.length === currentStack.techs.length) {
      setStackScore(prev => prev + 100); // Bonus for completing a stack
      setStackedBlocks([]);
      setCurrentStackIdx(prevIdx => (prevIdx + 1) % techStacks.length);
      setFallingSpeed(prev => Math.max(prev * 0.9, 1000)); // Increase speed
      
      // Schedule next block
      setTimeout(dropNextBlock, 1000);
      return;
    }
    
    const nextBlock = currentStack.techs[stackedBlocks.length];
    setCurrentBlock(nextBlock);
    
    // Set a timeout to end the game if block is not stacked
    const timeout = setTimeout(() => {
      if (stackGameStarted && currentBlock === nextBlock) {
        endStackGame();
      }
    }, fallingSpeed);
    
    return () => clearTimeout(timeout);
  };
  
  // Handle stacking a block
  const handleStackBlock = () => {
    if (!currentBlock) return;
    
    const currentStack = techStacks[currentStackIdx];
    const correctBlock = currentStack.techs[stackedBlocks.length];
    
    // Check if the stacked block is correct for this position
    if (currentBlock === correctBlock) {
      setStackedBlocks(prev => [...prev, currentBlock]);
      setStackScore(prev => prev + 10);
      setCurrentBlock(null);
      
      // Schedule the next block
      setTimeout(dropNextBlock, 500);
    } else {
      endStackGame();
    }
  };
  
  // End the stack game
  const endStackGame = () => {
    setStackGameStarted(false);
    setCurrentBlock(null);
    
    // Update high score if needed
    if (stackScore > stackHighScore) {
      setStackHighScore(stackScore);
      localStorage.setItem('stackGameHighScore', stackScore.toString());
    }
  };

  // TYPING TEST FUNCTIONS
  
  // Start the typing test
  const startTypingTest = () => {
    // Select a random coding snippet
    const randomSnippet = codingSnippets[Math.floor(Math.random() * codingSnippets.length)];
    setTypingText(randomSnippet);
    setTypingInput("");
    setTypingTimeLeft(60);
    setTypingWPM(0);
    setTypingAccuracy(100);
    setTypingStarted(true);
    
    // Focus the input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
    
    // Set up the timer
    const interval = setInterval(() => {
      setTypingTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          endTypingTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  };
  
  // Handle typing input
  const handleTypingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTypingInput(input);
    
    // Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (i < typingText.length && input[i] === typingText[i]) {
        correctChars++;
      }
    }
    
    const accuracy = Math.round((correctChars / Math.max(input.length, 1)) * 100);
    setTypingAccuracy(accuracy);
    
    // Calculate WPM: (characters typed / 5) / time in minutes
    const timeElapsed = (60 - typingTimeLeft) / 60;
    if (timeElapsed > 0) {
      const wpm = Math.round((input.length / 5) / timeElapsed);
      setTypingWPM(wpm);
    }
  };
  
  // End the typing test
  const endTypingTest = () => {
    setTypingStarted(false);
    
    // Calculate final WPM
    const finalWPM = typingWPM;
    
    // Update high score if needed
    if (finalWPM > typingHighScore) {
      setTypingHighScore(finalWPM);
      localStorage.setItem('typingTestHighScore', finalWPM.toString());
    }
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
            Take a break and test your skills with these fun interactive games.
            Choose a game below and see how high you can score!
          </p>
        </motion.div>

        {/* Game Selection Tabs */}
        <div className="mb-8 max-w-lg mx-auto">
          <Tabs
            aria-label="Game Options"
            variant="underlined"
            color="primary"
            selectedKey={selectedGame}
            onSelectionChange={(key) => {
              setSelectedGame(key as GameType);
              if (gameIntervalRef.current) {
                clearInterval(gameIntervalRef.current);
              }
              setGameStarted(false);
              setStackGameStarted(false);
              setTypingStarted(false);
            }}
            classNames={{
              tabList: "border-divider gap-4 w-full relative bg-transparent rounded-none flex",
              cursor: "bg-primary w-full",
              tab: "max-w-fit px-2 py-2 h-10 text-sm flex gap-2 flex-nowrap data-[selected=true]:text-primary data-[selected=true]:font-medium",
              tabContent: "flex items-center gap-2",
            }}
          >
            <Tab 
              key="target-game" 
              title={
                <div className="flex items-center gap-2">
                  <FiMousePointer className="text-lg" />
                  <span>Target Game</span>
                </div>
              }
            />
            <Tab 
              key="stack-game" 
              title={
                <div className="flex items-center gap-2">
                  <FiLayers className="text-lg" />
                  <span>Stack the Stack</span>
                </div>
              }
            />
            <Tab 
              key="typing-test" 
              title={
                <div className="flex items-center gap-2">
                  <FiCode className="text-lg" />
                  <span>Typing Test</span>
                </div>
              }
            />
          </Tabs>
        </div>
        
        {/* Game Section */}
        <motion.div
          key={selectedGame}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Card className="glass-premium border border-border overflow-hidden">
            <CardBody className="p-6">
              {/* TARGET GAME */}
              {selectedGame === "target-game" && (
                <>
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
                      onClick={startTargetGame}
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
                          onClick={startTargetGame}
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
                          onClick={startTargetGame}
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
                </>
              )}
              
              {/* STACK THE STACK GAME */}
              {selectedGame === "stack-game" && (
                <>
                  <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <div className="flex gap-4 md:gap-6 mb-4 md:mb-0">
                      <div className="text-center">
                        <p className="text-sm text-foreground/70 mb-1">Score</p>
                        <p className="text-2xl font-bold text-primary">{stackScore}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-foreground/70 mb-1">Current Stack</p>
                        <p className="text-2xl font-bold text-foreground">
                          {stackGameStarted ? techStacks[currentStackIdx].name : "—"}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-foreground/70 mb-1">High Score</p>
                        <p className="text-2xl font-bold text-warning">{stackHighScore}</p>
                      </div>
                    </div>
                    
                    <Button
                      color="primary"
                      variant="flat"
                      radius="full"
                      startContent={stackGameStarted ? <FiRefreshCw /> : <FiPlay />}
                      onClick={stackGameStarted ? endStackGame : startStackGame}
                    >
                      {stackGameStarted ? "End Game" : "Start Game"}
                    </Button>
                  </div>
                  
                  <div className="w-full h-[400px] bg-background/40 rounded-xl border border-border relative overflow-hidden">
                    {!stackGameStarted && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h3 className="text-2xl font-bold mb-4">Stack the Stack</h3>
                        <p className="text-lg mb-6 max-w-xl">
                          Build tech stacks by clicking falling blocks in the right order to complete the project!
                        </p>
                        <Button
                          color="primary"
                          variant="flat"
                          radius="full"
                          size="lg"
                          startContent={<FiPlay />}
                          onClick={startStackGame}
                        >
                          Start Game
                        </Button>
                      </div>
                    )}
                    
                    {stackGameStarted && (
                      <>
                        {/* Target Stack Display */}
                        <div className="absolute top-4 left-0 right-0 flex justify-center">
                          <div className="glass-premium border border-border p-2 rounded-lg">
                            <h4 className="text-sm font-medium mb-1 text-center">Complete the {techStacks[currentStackIdx].name}</h4>
                            <div className="flex gap-2 justify-center">
                              {techStacks[currentStackIdx].techs.map((tech, idx) => (
                                <Chip
                                  key={idx}
                                  className={idx < stackedBlocks.length ? "opacity-30" : ""}
                                  variant="flat"
                                  color="primary"
                                  size="sm"
                                >
                                  {tech}
                                </Chip>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Stacked Blocks */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                          <div className="flex flex-col-reverse items-center mb-4">
                            {stackedBlocks.map((block, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ y: -40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="mb-1 glass-premium p-3 w-48 text-center rounded-lg border border-border"
                              >
                                {block}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Falling Block */}
                        {currentBlock && (
                          <motion.div
                            initial={{ y: -100 }}
                            animate={{ y: 300 }}
                            transition={{ duration: fallingSpeed / 1000, ease: "linear" }}
                            className="absolute left-1/2 transform -translate-x-1/2 glass-premium p-3 w-48 text-center rounded-lg border border-border"
                          >
                            {currentBlock}
                          </motion.div>
                        )}
                        
                        {/* Stack Button */}
                        <Button
                          color="primary"
                          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                          variant="solid"
                          radius="full"
                          size="lg"
                          disabled={!currentBlock}
                          onClick={handleStackBlock}
                        >
                          Stack It!
                        </Button>
                      </>
                    )}
                  </div>
                </>
              )}
              
              {/* TYPING TEST GAME */}
              {selectedGame === "typing-test" && (
                <>
                  <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <div className="flex gap-4 md:gap-6 mb-4 md:mb-0">
                      <div className="text-center">
                        <p className="text-sm text-foreground/70 mb-1">WPM</p>
                        <p className="text-2xl font-bold text-primary">{typingWPM}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-foreground/70 mb-1">Accuracy</p>
                        <p className="text-2xl font-bold text-accent">{typingAccuracy}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-foreground/70 mb-1">Time</p>
                        <p className="text-2xl font-bold text-foreground">{typingTimeLeft}s</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-foreground/70 mb-1">Best WPM</p>
                        <p className="text-2xl font-bold text-warning">{typingHighScore}</p>
                      </div>
                    </div>
                    
                    <Button
                      color="primary"
                      variant="flat"
                      radius="full"
                      startContent={typingStarted ? <FiRefreshCw /> : <FiPlay />}
                      onClick={typingStarted ? endTypingTest : startTypingTest}
                      disabled={typingStarted && typingTimeLeft > 0}
                    >
                      {typingStarted ? "End Test" : "Start Test"}
                    </Button>
                  </div>
                  
                  <div className="w-full min-h-[400px] bg-background/40 rounded-xl border border-border relative overflow-hidden p-6">
                    {!typingStarted && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h3 className="text-2xl font-bold mb-4">Code Typing Test</h3>
                        <p className="text-lg mb-6 max-w-xl">
                          Test your coding speed and accuracy by typing code snippets as fast as you can!
                        </p>
                        <Button
                          color="primary"
                          variant="flat"
                          radius="full"
                          size="lg"
                          startContent={<FiPlay />}
                          onClick={startTypingTest}
                        >
                          Start Test
                        </Button>
                      </div>
                    )}
                    
                    {typingStarted && (
                      <>
                        <div className="mb-6 p-4 bg-background/50 border border-border rounded-lg overflow-auto">
                          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                            {typingText.split('').map((char, idx) => {
                              const inputChar = typingInput[idx];
                              let color = 'text-foreground/50';
                              
                              if (inputChar !== undefined) {
                                color = inputChar === char ? 'text-primary' : 'text-error';
                              }
                              
                              return (
                                <span key={idx} className={color}>
                                  {char}
                                </span>
                              );
                            })}
                          </pre>
                        </div>
                        
                        <div className="mb-4">
                          <input
                            ref={inputRef}
                            type="text"
                            className="w-full p-3 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={typingInput}
                            onChange={handleTypingInput}
                            disabled={typingTimeLeft <= 0}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                          />
                        </div>
                        
                        <p className="text-sm text-foreground/70 text-center">
                          Type the code above as accurately as possible.
                        </p>
                      </>
                    )}
                    
                    {typingStarted && typingTimeLeft <= 0 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold mb-4">Time's Up!</h3>
                        <div className="mb-6">
                          <p className="text-lg mb-2">Your Results:</p>
                          <div className="flex gap-6">
                            <div className="text-center">
                              <p className="text-sm text-foreground/70">WPM</p>
                              <p className="text-3xl font-bold text-primary">{typingWPM}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-foreground/70">Accuracy</p>
                              <p className="text-3xl font-bold text-accent">{typingAccuracy}%</p>
                            </div>
                          </div>
                        </div>
                        
                        {typingWPM > typingHighScore && (
                          <div className="mb-6 p-3 bg-warning/10 text-warning rounded-lg font-medium animate-pulse">
                            <FiAward className="inline-block mr-2" />
                            New High Score!
                          </div>
                        )}
                        
                        <Button
                          color="primary"
                          variant="flat"
                          radius="full"
                          size="lg"
                          startContent={<FiPlay />}
                          onClick={startTypingTest}
                        >
                          Try Again
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </motion.div>
        
        {/* Recent scores and stats */}
        {selectedGame === "target-game" && recentScores.length > 0 && (
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
          {selectedGame === "target-game" && (
            <p>Hint: Smaller targets give more points! Try to click them as fast as you can.</p>
          )}
          {selectedGame === "stack-game" && (
            <p>Hint: Pay attention to the correct order of technologies in each stack!</p>
          )}
          {selectedGame === "typing-test" && (
            <p>Hint: Focus on accuracy first, then speed. Each error will reduce your score.</p>
          )}
        </div>
      </div>
    </section>
  );
}; 