"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Tabs, Tab } from "@heroui/tabs";
import { Chip } from "@heroui/chip";
import {
  FiPlay,
  FiRefreshCw,
  FiAward,
  FiLayers,
  FiCode,
  FiMousePointer,
} from "react-icons/fi";

// Game type definition
type GameType = "target-game" | "typing-test";

export const Playground = () => {
  // Game selection state
  const [selectedGame, setSelectedGame] = useState<GameType>("target-game");

  // Target Game states
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targets, setTargets] = useState<
    { id: number; x: number; y: number; size: number; color: string }[]
  >([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [highScore, setHighScore] = useState(0);
  const [allTimeHighScore, setAllTimeHighScore] = useState(0);
  const [recentScores, setRecentScores] = useState<number[]>([]);
  const [gameDimensions, setGameDimensions] = useState({ width: 0, height: 0 });

  // Typing Test states
  const [typingStarted, setTypingStarted] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [typingInput, setTypingInput] = useState("");
  const [typingTimeLeft, setTypingTimeLeft] = useState(60);
  const [typingWPM, setTypingWPM] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(100);
  const [typingHighScore, setTypingHighScore] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const codingSnippets = [
    'const Button = ({ onClick, children }) => {\n  return (\n    <button onClick={onClick} className="btn">\n      {children}\n    </button>\n  );\n};',
    "function calculateTotal(items) {\n  return items.reduce((total, item) => {\n    return total + item.price * item.quantity;\n  }, 0);\n}",
    "const fetchUserData = async (userId) => {\n  try {\n    const response = await fetch(`/api/users/${userId}`);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error fetching user data:', error);\n  }\n};",
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
    React: "#61DAFB",
    "Node.js": "#68A063",
    MongoDB: "#4DB33D",
    Express: "#000000",
    "Next.js": "#000000",
    TypeScript: "#007ACC",
    "Tailwind CSS": "#38B2AC",
    PostgreSQL: "#336791",
  };

  // Syntax highlighting colors
  const syntaxColors = {
    keyword: "text-blue-500", // const, function, return
    string: "text-green-500", // "strings"
    function: "text-yellow-500", // function names
    variable: "text-purple-400", // variable names
    property: "text-cyan-300", // object properties
    operator: "text-pink-500", // + - = => etc
    punctuation: "text-gray-400", // {} [] () , ;
    comment: "text-gray-500", // comments
    parameter: "text-orange-300", // function parameters
    builtin: "text-red-400", // console, document
  };

  // Code syntax highlighting function
  const highlightCode = (code: string): JSX.Element[] => {
    // Basic syntax highlighting patterns
    const patterns = [
      {
        regex:
          /(const|let|var|function|return|await|async|try|catch|if|else|for|of|in)\b/g,
        className: syntaxColors.keyword,
      },
      {
        regex: /"([^"]*)"|'([^']*)'|`([^`]*)`/g,
        className: syntaxColors.string,
      },
      {
        regex: /\b(function|=>)\s*([A-Za-z0-9_]+)(?=\s*\()/g,
        className: syntaxColors.function,
      },
      { regex: /\b([A-Za-z0-9_]+)(?=\s*=)/g, className: syntaxColors.variable },
      { regex: /\.([A-Za-z0-9_]+)\b/g, className: syntaxColors.property },
      {
        regex: /\+|\-|\*|\/|%|=|==|===|!|!=|!==|>|<|>=|<=|&&|\|\||\?|\:/g,
        className: syntaxColors.operator,
      },
      { regex: /[\{\}\[\]\(\),;]/g, className: syntaxColors.punctuation },
      { regex: /\/\/.*$/gm, className: syntaxColors.comment },
      {
        regex:
          /\bconsole\b|\bdocument\b|\bwindow\b|\bArray\b|\bObject\b|\bString\b|\bNumber\b|\bBoolean\b|\bError\b/g,
        className: syntaxColors.builtin,
      },
    ];

    // Split code by line for better handling of multiline code
    return code.split("\n").map((line, lineIndex) => {
      let segments: { text: string; className?: string }[] = [{ text: line }];

      // Apply each regex pattern
      patterns.forEach((pattern) => {
        const newSegments: { text: string; className?: string }[] = [];

        segments.forEach((segment) => {
          if (segment.className) {
            // Already highlighted, keep as is
            newSegments.push(segment);

            return;
          }

          let lastIndex = 0;
          let match;
          const text = segment.text;

          pattern.regex.lastIndex = 0; // Reset regex state

          while ((match = pattern.regex.exec(text)) !== null) {
            // Add unstyled text before the match
            if (match.index > lastIndex) {
              newSegments.push({
                text: text.substring(lastIndex, match.index),
              });
            }

            // Add the styled match
            newSegments.push({ text: match[0], className: pattern.className });

            lastIndex = pattern.regex.lastIndex;
          }

          // Add the remaining text
          if (lastIndex < text.length) {
            newSegments.push({ text: text.substring(lastIndex) });
          }
        });

        segments = newSegments;
      });

      // Render the line with highlighted segments
      return (
        <div key={lineIndex} className="line">
          {segments.map((segment, i) => (
            <span key={i} className={segment.className}>
              {segment.text}
            </span>
          ))}
        </div>
      );
    });
  };

  // Load high scores from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem("playgroundHighScore");
    const savedRecentScores = localStorage.getItem("playgroundRecentScores");
    const savedTypingHighScore = localStorage.getItem("typingTestHighScore");

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

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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
            localStorage.setItem("playgroundHighScore", score.toString());
          }

          // Update recent scores
          const updatedRecentScores = [score, ...recentScores.slice(0, 4)];

          setRecentScores(updatedRecentScores);
          localStorage.setItem(
            "playgroundRecentScores",
            JSON.stringify(updatedRecentScores),
          );

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
        color,
      },
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

  // TYPING TEST FUNCTIONS

  // Start the typing test
  const startTypingTest = () => {
    // Select a random coding snippet
    const randomSnippet =
      codingSnippets[Math.floor(Math.random() * codingSnippets.length)];

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
      setTypingTimeLeft((prev) => {
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
  const handleTypingInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;

    // Check if the new typing is correct (validate each character)
    if (input.length > typingInput.length) {
      // Only validate the new character being added
      const newCharIndex = input.length - 1;

      if (
        newCharIndex >= typingText.length ||
        input[newCharIndex] !== typingText[newCharIndex]
      ) {
        // Invalid input - optionally play error sound or vibration here
        return; // Don't update the state with invalid input
      }
    }

    setTypingInput(input);

    // Calculate accuracy
    let correctChars = 0;

    for (let i = 0; i < input.length; i++) {
      if (i < typingText.length && input[i] === typingText[i]) {
        correctChars++;
      }
    }

    const accuracy = Math.round(
      (correctChars / Math.max(input.length, 1)) * 100,
    );

    setTypingAccuracy(accuracy);

    // Calculate WPM: (characters typed / 5) / time in minutes
    const timeElapsed = (60 - typingTimeLeft) / 60;

    if (timeElapsed > 0) {
      const wpm = Math.round(input.length / 5 / timeElapsed);

      setTypingWPM(wpm);
    }
  };

  // Handle key down for special keys like Enter and Tab
  const handleTypingKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // Check if Enter is the expected character at this position
      if (
        typingInput.length < typingText.length &&
        typingText[typingInput.length] === "\n"
      ) {
        // Add a newline character to the input
        setTypingInput((prev) => prev + "\n");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();

      // Check if the next characters are spaces that represent a tab
      let expectedSpaces = "";

      for (let i = 0; i < 2; i++) {
        if (
          typingInput.length + i < typingText.length &&
          typingText[typingInput.length + i] === " "
        ) {
          expectedSpaces += " ";
        } else {
          break;
        }
      }

      // If we have spaces representing a tab, add them
      if (expectedSpaces.length > 0) {
        setTypingInput((prev) => prev + expectedSpaces);
      }
    } else if (e.key === "Backspace") {
      // Let backspace work normally
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
      localStorage.setItem("typingTestHighScore", finalWPM.toString());
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
    <section className="py-24 px-6" id="playground">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Badge
            className="mb-4 glass-premium border border-primary/20"
            color="primary"
            variant="flat"
          >
            <span className="px-2 py-0.5 text-primary">Fun Zone</span>
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Interactive Playground
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Take a break and test your skills with these fun interactive games.
            Choose a game below and see how high you can score!
          </p>
        </motion.div>

        {/* Game Selection Tabs */}
        <div className="mb-8 max-w-lg mx-auto">
          <Tabs
            aria-label="Game Options"
            classNames={{
              tabList:
                "border-divider gap-4 w-full relative bg-transparent rounded-none flex",
              cursor: "bg-primary w-full",
              tab: "max-w-fit px-2 py-2 h-10 text-sm flex gap-2 flex-nowrap data-[selected=true]:text-primary data-[selected=true]:font-medium",
              tabContent: "flex items-center gap-2",
            }}
            color="primary"
            selectedKey={selectedGame}
            variant="underlined"
            onSelectionChange={(key) => {
              setSelectedGame(key as GameType);
              if (gameIntervalRef.current) {
                clearInterval(gameIntervalRef.current);
              }
              setGameStarted(false);
              setTypingStarted(false);
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
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
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
                        <p className="text-2xl font-bold text-primary">
                          {score}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-foreground/70 mb-1">
                          Time Left
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {timeLeft}s
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-foreground/70 mb-1">
                          This Session
                        </p>
                        <p className="text-2xl font-bold text-accent">
                          {highScore}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-foreground/70 mb-1">
                          All Time Best
                        </p>
                        <p className="text-2xl font-bold text-warning">
                          {allTimeHighScore}
                        </p>
                      </div>
                    </div>

                    <Button
                      color="primary"
                      radius="full"
                      startContent={gameStarted ? <FiRefreshCw /> : <FiPlay />}
                      variant="flat"
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
                        <p className="text-lg mb-4">
                          Your score:{" "}
                          <span className="text-primary font-bold">
                            {score}
                          </span>
                        </p>

                        {score >= allTimeHighScore && score > 0 && (
                          <div className="mb-6 p-3 bg-warning/10 text-warning rounded-lg font-medium animate-pulse">
                            <FiAward className="inline-block mr-2" />
                            New High Score!
                          </div>
                        )}

                        <Button
                          color="primary"
                          radius="full"
                          startContent={<FiPlay />}
                          variant="flat"
                          onClick={startTargetGame}
                        >
                          Play Again
                        </Button>
                      </div>
                    )}

                    {!gameStarted && timeLeft === 30 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-xl mb-4">
                          Click on the targets as fast as you can!
                        </p>
                        <p className="text-lg mb-6">
                          Smaller targets are worth more points
                        </p>
                        <Button
                          color="primary"
                          radius="full"
                          size="lg"
                          startContent={<FiPlay />}
                          variant="flat"
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
                          animate={{ scale: 1 }}
                          className="absolute rounded-full cursor-pointer"
                          exit={{ scale: 0, opacity: 0 }}
                          initial={{ scale: 0 }}
                          style={{
                            left: target.x,
                            top: target.y,
                            width: target.size,
                            height: target.size,
                            backgroundColor: target.color,
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            gameStarted &&
                            handleTargetClick(target.id, target.size)
                          }
                        />
                      ))}
                    </AnimatePresence>
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
                        <p className="text-2xl font-bold text-primary">
                          {typingWPM}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-foreground/70 mb-1">
                          Accuracy
                        </p>
                        <p className="text-2xl font-bold text-accent">
                          {typingAccuracy}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-foreground/70 mb-1">Time</p>
                        <p className="text-2xl font-bold text-foreground">
                          {typingTimeLeft}s
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-foreground/70 mb-1">
                          Best WPM
                        </p>
                        <p className="text-2xl font-bold text-warning">
                          {typingHighScore}
                        </p>
                      </div>
                    </div>

                    <Button
                      color="primary"
                      disabled={typingStarted && typingTimeLeft > 0}
                      radius="full"
                      startContent={
                        typingStarted ? <FiRefreshCw /> : <FiPlay />
                      }
                      variant="flat"
                      onClick={typingStarted ? endTypingTest : startTypingTest}
                    >
                      {typingStarted ? "End Test" : "Start Test"}
                    </Button>
                  </div>

                  <div className="w-full min-h-[400px] bg-background/40 rounded-xl border border-border relative overflow-hidden p-6">
                    {!typingStarted && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h3 className="text-2xl font-bold mb-4">
                          Code Typing Test
                        </h3>
                        <p className="text-lg mb-6 max-w-xl">
                          Test your coding speed and accuracy by typing code
                          snippets as fast as you can!
                        </p>
                        <Button
                          color="primary"
                          radius="full"
                          size="lg"
                          startContent={<FiPlay />}
                          variant="flat"
                          onClick={startTypingTest}
                        >
                          Start Test
                        </Button>
                      </div>
                    )}

                    {typingStarted && (
                      <>
                        <div className="mb-6 p-4 bg-background/50 border border-border rounded-lg overflow-auto font-mono text-sm">
                          <div className="code-editor bg-gray-900 p-4 rounded-lg">
                            {typingText.split("\n").map((line, lineIndex) => (
                              <div key={lineIndex} className="line relative">
                                {line.split("").map((char, charIndex) => {
                                  const absoluteIndex =
                                    typingText
                                      .split("\n")
                                      .slice(0, lineIndex)
                                      .join("\n").length +
                                    (lineIndex > 0 ? 1 : 0) +
                                    charIndex;
                                  let className = "";

                                  if (absoluteIndex < typingInput.length) {
                                    const inputChar =
                                      typingInput[absoluteIndex];

                                    className =
                                      inputChar === char
                                        ? "text-green-400"
                                        : "text-red-400 bg-red-900/30";
                                  }

                                  return (
                                    <span key={charIndex} className={className}>
                                      {char === " " ? "\u00A0" : char}
                                    </span>
                                  );
                                })}
                                {lineIndex <
                                  typingText.split("\n").length - 1 && <br />}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <textarea
                            ref={inputRef}
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off"
                            className="w-full p-3 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
                            disabled={typingTimeLeft <= 0}
                            rows={5}
                            spellCheck="false"
                            style={{ resize: "none" }}
                            value={typingInput}
                            onChange={handleTypingInput}
                            onKeyDown={handleTypingKeyDown}
                          />
                        </div>

                        <p className="text-sm text-foreground/70 text-center">
                          Type the code above as accurately as possible. Press
                          Enter for newlines.
                        </p>
                      </>
                    )}

                    {typingStarted && typingTimeLeft <= 0 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold mb-4">
                          Time&apos;s Up!
                        </h3>
                        <div className="mb-6">
                          <p className="text-lg mb-2">Your Results:</p>
                          <div className="flex gap-6">
                            <div className="text-center">
                              <p className="text-sm text-foreground/70">WPM</p>
                              <p className="text-3xl font-bold text-primary">
                                {typingWPM}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-foreground/70">
                                Accuracy
                              </p>
                              <p className="text-3xl font-bold text-accent">
                                {typingAccuracy}%
                              </p>
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
                          radius="full"
                          size="lg"
                          startContent={<FiPlay />}
                          variant="flat"
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
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-premium border border-border">
              <CardBody className="p-4">
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  Recent Scores
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {recentScores.map((recentScore, index) => (
                    <div
                      key={index}
                      className="bg-background/50 p-3 rounded-lg text-center"
                    >
                      <div className="text-xl font-bold text-primary">
                        {recentScore}
                      </div>
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
            <p>
              Hint: Smaller targets give more points! Try to click them as fast
              as you can.
            </p>
          )}
          {selectedGame === "typing-test" && (
            <p>
              Hint: Focus on accuracy first, then speed. Each error will reduce
              your score.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
