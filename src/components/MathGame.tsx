import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GradeNumber } from '../types';
import { Play, RotateCcw, Award, CheckCircle2, AlertCircle, Timer, Flame } from 'lucide-react';

interface MathGameProps {
  grade: GradeNumber;
  addScore: (score: number) => void;
  addStars: (stars: number) => void;
  incrementGamesPlayed: () => void;
}

interface Question {
  expression: string;
  answer: number | string;
  options: (number | string)[];
}

export default function MathGame({
  grade,
  addScore,
  addStars,
  incrementGamesPlayed,
}: MathGameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate question appropriate for selected grade level
  const generateQuestion = (currentGrade: GradeNumber): Question => {
    let expression = '';
    let answer: number | string = 0;
    const options: (number | string)[] = [];

    if (currentGrade <= 2) {
      // 1-2 Grade: Basics
      const a = Math.floor(Math.random() * 9) + 1;
      const b = Math.floor(Math.random() * 9) + 1;
      const operation = Math.random() > 0.5 ? '+' : '-';
      
      if (operation === '+') {
        expression = `${a} + ${b}`;
        answer = a + b;
      } else {
        const max = Math.max(a, b);
        const min = Math.min(a, b);
        expression = `${max} - ${min}`;
        answer = max - min;
      }
    } else if (currentGrade <= 4) {
      // 3-4 Grade: Multiplication, Division & multi-digits
      const isMult = Math.random() > 0.4;
      if (isMult) {
        const a = Math.floor(Math.random() * 9) + 2;
        const b = Math.floor(Math.random() * 8) + 2;
        expression = `${a} * ${b}`;
        answer = a * b;
      } else {
        const factors = [2, 3, 4, 5, 6, 7, 8, 9];
        const b = factors[Math.floor(Math.random() * factors.length)];
        const multVal = Math.floor(Math.random() * 8) + 2;
        const a = b * multVal;
        expression = `${a} : ${b}`;
        answer = multVal;
      }
    } else if (currentGrade <= 7) {
      // 5-7 Grade: Negative numbers & algebra simple equations
      const isAlgebra = Math.random() > 0.5;
      if (isAlgebra) {
        const coeff = Math.floor(Math.random() * 4) + 2;
        const xAnswer = Math.floor(Math.random() * 8) + 1;
        const constVal = Math.floor(Math.random() * 10) + 1;
        const rightSide = coeff * xAnswer + constVal;
        expression = `${coeff}x + ${constVal} = ${rightSide} \n (x = ? )`;
        answer = xAnswer;
      } else {
        const a = Math.floor(Math.random() * 15) - 7; // Negative possible
        const b = Math.floor(Math.random() * 15) - 7;
        expression = `(${a}) * (${b})`;
        answer = a * b;
      }
    } else {
      // 8-11 Grade: Trigonometry values, square roots, high school logarithm & power
      const types = ['sqrt', 'trig', 'log_power', 'derivative'];
      const type = types[Math.floor(Math.random() * types.length)];

      if (type === 'sqrt') {
        const base = Math.floor(Math.random() * 9) + 2;
        expression = `√${base * base}`;
        answer = base;
      } else if (type === 'trig') {
        const value = Math.random() > 0.5 ? 'sin' : 'cos';
        if (value === 'sin') {
          const degs = ['0°', '30°', '90°'];
          const picked = degs[Math.floor(Math.random() * degs.length)];
          expression = `sin(${picked})`;
          answer = picked === '0°' ? '0' : picked === '30°' ? '1/2' : '1';
        } else {
          const degs = ['0°', '60°', '90°'];
          const picked = degs[Math.floor(Math.random() * degs.length)];
          expression = `cos(${picked})`;
          answer = picked === '0°' ? '1' : picked === '60°' ? '1/2' : '0';
        }
      } else if (type === 'log_power') {
        const bases = [2, 3, 5];
        const base = bases[Math.floor(Math.random() * bases.length)];
        const powerIdx = Math.floor(Math.random() * 3) + 1; // 1 to 3
        const val = Math.pow(base, powerIdx);
        expression = `log_${base} (${val})`;
        answer = powerIdx;
      } else {
        // Derivative simplicity
        const power = Math.floor(Math.random() * 3) + 2; // x^2 to x^4
        const constFactor = Math.floor(Math.random() * 3) + 2;
        expression = `(${constFactor}x^${power})' hosilasini toping`;
        answer = `${constFactor * power}x^${power - 1}`;
      }
    }

    // Populate random options
    options.push(answer);
    while (options.length < 4) {
      let wrongOpt: number | string = '';
      if (typeof answer === 'number') {
        const variance = Math.floor(Math.random() * 6) + 1;
        wrongOpt = Math.random() > 0.5 ? answer + variance : answer - variance;
        if (wrongOpt === answer || wrongOpt < 0 && grade <= 4) continue;
      } else {
        // Trigs/derivs wrong values
        const altAnswers = ['0', '1/2', '1', '2x', '3x^2', '4x^3', '6x', '8x', '10x^2'];
        wrongOpt = altAnswers[Math.floor(Math.random() * altAnswers.length)];
        if (wrongOpt === answer) continue;
      }
      
      if (!options.includes(wrongOpt)) {
        options.push(wrongOpt);
      }
    }

    // Shuffle options
    const shuffledOptions = options.sort(() => Math.random() - 0.5);

    return {
      expression,
      answer,
      options: shuffledOptions,
    };
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setStreak(0);
    setTimeLeft(30);
    setIsGameOver(false);
    setSelectedOption(null);
    setFeedback(null);
    setCurrentQuestion(generateQuestion(grade));
    incrementGamesPlayed();
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, timeLeft]);

  const handleAnswer = (option: number | string) => {
    if (selectedOption !== null || isGameOver) return;
    
    setSelectedOption(option);
    const isCorrect = option === currentQuestion?.answer;

    if (isCorrect) {
      setFeedback('correct');
      setScore((prev) => prev + 10 + Math.floor(streak / 3) * 2); // incremental streaks reward
      setStreak((prev) => prev + 1);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }

    // Next question delay
    setTimeout(() => {
      setSelectedOption(null);
      setFeedback(null);
      setCurrentQuestion(generateQuestion(grade));
    }, 1200);
  };

  const endGame = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    addScore(score);
    // Stars reward proportionate to grade
    const starsReward = Math.min(10, Math.floor(score / 30));
    if (starsReward > 0) {
      addStars(starsReward);
    }
  };

  return (
    <div id="math-game-root" className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
      {/* Decorative stars / geometric objects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/5 rounded-full filter blur-2xl pointer-events-none" />

      {/* Intro Dashboard */}
      {!isPlaying && !isGameOver ? (
        <div className="text-center py-10 relative z-10">
          <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
            <Timer className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Qiziqarli Tezkor Matematika</h2>
          <p className="text-indigo-200 text-sm mt-2 max-w-md mx-auto">
            Siz tanlagan {grade}-sinfga mos qiziqarli matematik masalalar va tenglamalar! 30 soniya ichida to'g'ri va tezkor javob bering.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              id="start-math-game-btn"
              onClick={startGame}
              className="bg-emerald-500 hover:bg-emerald-400 font-bold px-8 py-3.5 rounded-xl transition-all shadow-md shadow-emerald-500/20 text-emerald-950 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              O'yinni Boshlash!
            </button>
          </div>
        </div>
      ) : isPlaying ? (
        // Active Game Screen
        <div className="relative z-10">
          <div className="flex items-center justify-between pb-4 border-b border-indigo-800/60 mb-6">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-xs text-indigo-300 block">Joriy ochko</span>
                <span className="text-xl font-extrabold text-white">{score} XP</span>
              </div>
              
              {streak >= 3 && (
                <div className="flex items-center gap-1.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2.5 py-1 rounded-xl">
                  <Flame className="w-4 h-4 fill-orange-500" />
                  <span className="text-xs font-bold">{streak} combo!</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 bg-indigo-900/40 px-3 py-1.5 rounded-xl border border-indigo-500/20">
              <Timer className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="font-mono text-sm font-bold tracking-wider">{timeLeft} soniya</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {currentQuestion && (
              <motion.div
                key={currentQuestion.expression}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="text-center py-6"
              >
                <div className="bg-indigo-900/30 border border-indigo-500/20 rounded-2xl py-8 px-6 mb-8">
                  <span className="text-xs text-indigo-300 tracking-widest uppercase font-semibold">Tenglamani hisoblang</span>
                  <div className="text-3xl sm:text-4xl font-black mt-3 whitespace-pre-line tracking-tight leading-relaxed">
                    {currentQuestion.expression}
                  </div>
                </div>

                {/* Sub Options */}
                <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = selectedOption === opt;
                    const isCorrectOption = opt === currentQuestion.answer;
                    
                    let btnBg = "bg-indigo-950/50 hover:bg-indigo-900/40 border-indigo-800/50 text-indigo-100";
                    if (feedback !== null) {
                      if (isSelected) {
                        btnBg = feedback === 'correct' ? 'bg-emerald-505 bg-emerald-600/50 border-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-rose-600/50 border-rose-500 text-white';
                      } else if (isCorrectOption && feedback === 'incorrect') {
                        btnBg = 'bg-emerald-600/40 border-emerald-500 text-white';
                      } else {
                        btnBg = 'opacity-30 border-transparent text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        id={`math-option-${String(opt).replace(/[^a-zA-Z0-9]/g, '')}`}
                        disabled={selectedOption !== null}
                        onClick={() => handleAnswer(opt)}
                        className={`py-4 rounded-xl border text-center font-bold text-base sm:text-lg transition-all cursor-pointer ${btnBg}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // Game Over Panel
        <div className="text-center py-8 relative z-10" id="math-game-over">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30"
          >
            <Award className="w-9 h-9" />
          </motion.div>
          <h2 className="text-2xl font-black">Vaqt tugadi!</h2>
          <p className="text-indigo-200 text-sm mt-1">Siz barcha to'g'ri harakatlaringiz uchun ajoyib ishtirok etdingiz!</p>
          
          <div className="flex items-center justify-center gap-6 my-6 bg-indigo-950/60 p-4 rounded-xl max-w-sm mx-auto border border-indigo-900/50">
            <div>
              <span className="text-xs text-indigo-300 font-medium block">To'plangan Ochko</span>
              <span className="text-xl font-extrabold text-emerald-400">+{score} XP</span>
            </div>
            <div className="w-px h-8 bg-indigo-900" />
            <div>
              <span className="text-xs text-indigo-300 font-medium block">Yulduzlar koeffitsiyenti</span>
              <span className="text-xl font-extrabold text-amber-400">+{Math.min(10, Math.floor(score / 30))} Yulduz</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              id="math-game-retry-btn"
              onClick={startGame}
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Qayta o'ynash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
