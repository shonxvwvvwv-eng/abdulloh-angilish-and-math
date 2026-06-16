import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GradeNumber } from '../types';
import { Play, RotateCcw, Award, CheckCircle2, AlertCircle, Sparkles, BookOpen } from 'lucide-react';

interface EnglishGameProps {
  grade: GradeNumber;
  addScore: (score: number) => void;
  addStars: (stars: number) => void;
  incrementGamesPlayed: () => void;
}

interface MatchPair {
  en: string;
  uz: string;
}

interface ScrambledSentence {
  tense: string;
  uzbekTranslation: string;
  correctWords: string[];
  correctSentence: string;
}

export default function EnglishGame({
  grade,
  addScore,
  addStars,
  incrementGamesPlayed,
}: EnglishGameProps) {
  const maxRounds = grade < 5 ? 3 : 15;
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [roundCompleted, setRoundCompleted] = useState(false);

  // Lower levels: Matching game state
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [selectedUz, setSelectedUz] = useState<string | null>(null);
  const [matchedEn, setMatchedEn] = useState<string[]>([]);
  const [matchedUz, setMatchedUz] = useState<string[]>([]);
  const [words, setWords] = useState<MatchPair[]>([]);

  // Higher levels: Scrambled sentence state
  const [scrambledSentence, setScrambledSentence] = useState<ScrambledSentence | null>(null);
  const [userWords, setUserWords] = useState<string[]>([]);
  const [shuffledPool, setShuffledPool] = useState<string[]>([]);
  const [sentenceCorrect, setSentenceCorrect] = useState<boolean | null>(null);

  // Generate Vocabulary Matching Pairs for Level 1-4
  const getMatchPairs = (): MatchPair[] => {
    const pool: MatchPair[] = [
      { en: 'Apple', uz: 'Olma' },
      { en: 'Cat', uz: 'Mushuk' },
      { en: 'Dog', uz: 'Kuchuk' },
      { en: 'Blue', uz: 'Ko\'k' },
      { en: 'Red', uz: 'Qizil' },
      { en: 'Green', uz: 'Yashil' },
      { en: 'Yellow', uz: 'Sariq' },
      { en: 'Father', uz: 'Dada' },
      { en: 'Mother', uz: 'Oyi' },
      { en: 'Brother', uz: 'Aka/Uka' },
      { en: 'Sister', uz: 'Opa/Singil' },
      { en: 'Kitchen', uz: 'Oshxona' },
      { en: 'Bedroom', uz: 'Yotoqxona' },
      { en: 'School', uz: 'Maktab' },
      { en: 'Book', uz: 'Kitob' },
      { en: 'Water', uz: 'Suv' },
    ];
    // Pick 5 random
    return pool.sort(() => Math.random() - 0.5).slice(0, 5);
  };

  // Generate Sentence Scrambles for Level 5-11 (15 questions covering all 12 English tenses + key grammar topics)
  const getSentenceScrambles = (): ScrambledSentence[] => {
    return [
      {
        tense: 'Present Simple',
        uzbekTranslation: 'U har kuni futbol o\'ynaydi.',
        correctWords: ['He', 'plays', 'football', 'every', 'day'],
        correctSentence: 'He plays football every day'
      },
      {
        tense: 'Present Continuous',
        uzbekTranslation: 'Hozir biz ingliz tilini o\'rganyapmiz.',
        correctWords: ['We', 'are', 'studying', 'English', 'now'],
        correctSentence: 'We are studying English now'
      },
      {
        tense: 'Present Perfect',
        uzbekTranslation: 'Men dars vazifamni tamomladim.',
        correctWords: ['I', 'have', 'finished', 'my', 'homework'],
        correctSentence: 'I have finished my homework'
      },
      {
        tense: 'Present Perfect Continuous',
        uzbekTranslation: 'Ular ertalabdan beri qo\'shiq kuylashmoqda.',
        correctWords: ['They', 'have', 'been', 'singing', 'since', 'morning'],
        correctSentence: 'They have been singing since morning'
      },
      {
        tense: 'Past Simple',
        uzbekTranslation: 'Ular kecha darsni topshirishdi.',
        correctWords: ['They', 'passed', 'the', 'quiz', 'yesterday'],
        correctSentence: 'They passed the quiz yesterday'
      },
      {
        tense: 'Past Continuous',
        uzbekTranslation: 'Siz kelganingizda men uxlayotgan edim.',
        correctWords: ['I', 'was', 'sleeping', 'when', 'you', 'arrived'],
        correctSentence: 'I was sleeping when you arrived'
      },
      {
        tense: 'Past Perfect',
        uzbekTranslation: 'Biz yetib kelgunimizcha poyezd ketib bo\'lgandi.',
        correctWords: ['The', 'train', 'had', 'left', 'before', 'we', 'arrived'],
        correctSentence: 'The train had left before we arrived'
      },
      {
        tense: 'Past Perfect Continuous',
        uzbekTranslation: 'U yomg\'ir boshlanguncha ikki soat yugurayotgan edi.',
        correctWords: ['He', 'had', 'been', 'running', 'for', 'two', 'hours'],
        correctSentence: 'He had been running for two hours'
      },
      {
        tense: 'Future Simple',
        uzbekTranslation: 'Ertaga bu yerda yomg\'ir yog\'adi.',
        correctWords: ['It', 'will', 'rain', 'here', 'tomorrow'],
        correctSentence: 'It will rain here tomorrow'
      },
      {
        tense: 'Future Continuous',
        uzbekTranslation: 'Ertaga soat beshda men dars qilayotgan bo\'laman.',
        correctWords: ['Tomorrow', 'at', 'five', 'I', 'will', 'be', 'studying'],
        correctSentence: 'Tomorrow at five I will be studying'
      },
      {
        tense: 'Future Perfect',
        uzbekTranslation: 'Biz kelasi haftagacha imtihonlarni topshirib bo\'lamiz.',
        correctWords: ['We', 'will', 'have', 'finished', 'by', 'next', 'week'],
        correctSentence: 'We will have finished by next week'
      },
      {
        tense: 'Future Perfect Continuous',
        uzbekTranslation: 'Kelasi oyda men besh yildan beri o\'qiyotgan bo\'laman.',
        correctWords: ['I', 'will', 'have', 'been', 'studying', 'for', 'five', 'years'],
        correctSentence: 'I will have been studying for five years'
      },
      {
        tense: 'Passive Voice (Past Simple)',
        uzbekTranslation: 'Bu interaktiv darslar biz tomonimizdan yaratilgan.',
        correctWords: ['These', 'lessons', 'were', 'made', 'by', 'us'],
        correctSentence: 'These lessons were made by us'
      },
      {
        tense: 'Zero Conditional',
        uzbekTranslation: 'Agar suvni muzlatsangiz, u muzga aylanadi.',
        correctWords: ['If', 'you', 'freeze', 'water', 'it', 'becomes', 'ice'],
        correctSentence: 'If you freeze water it becomes ice'
      },
      {
        tense: 'First Conditional',
        uzbekTranslation: 'Agar ko\'p o\'qisangiz, imtihondan o\'tasiz.',
        correctWords: ['If', 'you', 'study', 'hard', 'you', 'will', 'pass'],
        correctSentence: 'If you study hard you will pass'
      }
    ];
  };

  const startRound = () => {
    setSelectedEn(null);
    setSelectedUz(null);
    setMatchedEn([]);
    setMatchedUz([]);
    setUserWords([]);
    setSentenceCorrect(null);
    setRoundCompleted(false);

    if (grade < 5) {
      setWords(getMatchPairs());
    } else {
      const allScrambles = getSentenceScrambles();
      // Pick based on round so player does not see duplicates in a single game
      const chosen = allScrambles[(currentRound - 1) % allScrambles.length];
      setScrambledSentence(chosen);
      setShuffledPool([...chosen.correctWords].sort(() => Math.random() - 0.5));
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setCurrentRound(1);
    setIsGameOver(false);
    incrementGamesPlayed();
    // setTimeout is because states take a tiny update
    setTimeout(() => startRound(), 50);
  };

  // Manage Match Selection
  const handleEnSelect = (enVal: string) => {
    if (matchedEn.includes(enVal)) return;
    setSelectedEn(enVal);
    
    if (selectedUz) {
      // Compare
      const correctPair = words.find(w => w.en === enVal && w.uz === selectedUz);
      if (correctPair) {
        setMatchedEn(prev => [...prev, enVal]);
        setMatchedUz(prev => [...prev, selectedUz]);
        setScore(prev => prev + 15);
        addScore(15);
      }
      setSelectedEn(null);
      setSelectedUz(null);
    }
  };

  const handleUzSelect = (uzVal: string) => {
    if (matchedUz.includes(uzVal)) return;
    setSelectedUz(uzVal);

    if (selectedEn) {
      // Compare
      const correctPair = words.find(w => w.en === selectedEn && w.uz === uzVal);
      if (correctPair) {
        setMatchedEn(prev => [...prev, selectedEn]);
        setMatchedUz(prev => [...prev, uzVal]);
        setScore(prev => prev + 15);
        addScore(15);
      }
      setSelectedEn(null);
      setSelectedUz(null);
    }
  };

  // Check matching status
  useEffect(() => {
    if (grade < 5 && isPlaying && words.length > 0 && matchedEn.length === words.length) {
      setRoundCompleted(true);
      setTimeout(() => {
        if (currentRound < maxRounds) {
          setCurrentRound(prev => prev + 1);
          startRound();
        } else {
          endGame();
        }
      }, 1500);
    }
  }, [matchedEn, words]);

  // Higher levels: words selection builders
  const handleWordSelect = (word: string, index: number) => {
    if (sentenceCorrect !== null) return;
    // Remove from pool
    const newPool = [...shuffledPool];
    newPool.splice(index, 1);
    setShuffledPool(newPool);
    // Add to user choice
    setUserWords(prev => [...prev, word]);
  };

  const handleUserWordRemove = (word: string, index: number) => {
    if (sentenceCorrect !== null) return;
    const newChoices = [...userWords];
    newChoices.splice(index, 1);
    setUserWords(newChoices);
    // Add back to pool
    setShuffledPool(prev => [...prev, word]);
  };

  const checkSentence = () => {
    if (!scrambledSentence) return;
    const isCorrect = userWords.join(' ') === scrambledSentence.correctWords.join(' ');
    setSentenceCorrect(isCorrect);

    if (isCorrect) {
      setScore(prev => prev + 50);
      addScore(50);
      setRoundCompleted(true);
      setTimeout(() => {
        if (currentRound < maxRounds) {
          setCurrentRound(prev => prev + 1);
          startRound();
        } else {
          endGame();
        }
      }, 2000);
    } else {
      // Shake or let retry by resetting sentence
      setTimeout(() => {
        // Return words back
        setShuffledPool([...scrambledSentence.correctWords].sort(() => Math.random() - 0.5));
        setUserWords([]);
        setSentenceCorrect(null);
      }, 2000);
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    addStars(Math.min(10, Math.floor(score / 40)));
  };

  return (
    <div id="english-game-root" className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
      {/* Visual Decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-500/5 rounded-full filter blur-2xl pointer-events-none" />

      {!isPlaying && !isGameOver ? (
        <div className="text-center py-10 relative z-10">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {grade < 5 ? 'Ranglar va Lug\'at Moslash Geymi' : 'Zamonlar Konstruktor Geymi'}
          </h2>
          <p className="text-emerald-200 text-sm mt-2 max-w-md mx-auto">
            {grade < 5
              ? 'Inglizcha va o\'zbekcha so\'zlarni bir-biriga moslashtiring! Xotirani mustahkamlang.'
              : 'Qiziqarli grammatika va ingliz tili hamma zamonlari! So\'zlarni ketma-ket to\'g\'ri yig\'ib gap tuzing.'}
          </p>
          <div className="mt-8 flex justify-center">
            <button
              id="start-en-game-btn"
              onClick={startGame}
              className="bg-amber-400 hover:bg-amber-300 font-extrabold px-8 py-3.5 rounded-xl transition-all text-emerald-950 shadow-md shadow-amber-400/20 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              Geymni boshlash!
            </button>
          </div>
        </div>
      ) : isPlaying ? (
        <div className="relative z-10">
          {/* Top header stats */}
          <div className="flex items-center justify-between pb-4 border-b border-emerald-800/60 mb-6">
            <div>
              <span className="text-xs text-emerald-300 block">Round</span>
              <span className="text-lg font-bold text-white">{currentRound} / {maxRounds}</span>
            </div>
            <div>
              <span className="text-xs text-emerald-300 block">Joriy Ochko</span>
              <span className="text-lg font-extrabold text-amber-300">{score} XP</span>
            </div>
          </div>

          {/* LOWER GRADE MATCH GAME */}
          {grade < 5 ? (
            <div className="space-y-6">
              <span className="text-xs text-emerald-200 block text-center uppercase tracking-widest font-bold">Ingliz va O'zbek juftliklarini toping!</span>
              
              <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">
                {/* English Column */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-emerald-300 mb-2 uppercase tracking-wide">English</h4>
                  {words.map((item) => {
                    const isMatched = matchedEn.includes(item.en);
                    const isSelected = selectedEn === item.en;
                    return (
                      <button
                        key={item.en}
                        id={`en-word-${item.en}`}
                        disabled={isMatched}
                        onClick={() => handleEnSelect(item.en)}
                        className={`w-full py-3 px-4 rounded-xl border text-sm font-bold text-left transition-all tracking-wider ${
                          isMatched
                            ? 'bg-emerald-800/20 border-emerald-700/40 text-emerald-500/60 line-through'
                            : isSelected
                            ? 'bg-amber-400 text-emerald-950 border-amber-400 shadow'
                            : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-100 hover:bg-emerald-900/40 cursor-pointer'
                        }`}
                      >
                        {item.en}
                      </button>
                    );
                  })}
                </div>

                {/* Uzbek Column */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-emerald-300 mb-2 uppercase tracking-wide">O'zbekcha</h4>
                  {/* Shuffle slightly or keep same sorted */}
                  {[...words].sort((a,b) => a.uz.localeCompare(b.uz)).map((item) => {
                    const isMatched = matchedUz.includes(item.uz);
                    const isSelected = selectedUz === item.uz;
                    return (
                      <button
                        key={item.uz}
                        id={`uz-word-${item.uz.replace(/[^a-zA-Z0-9]/g, '')}`}
                        disabled={isMatched}
                        onClick={() => handleUzSelect(item.uz)}
                        className={`w-full py-3 px-4 rounded-xl border text-sm font-bold text-left transition-all ${
                          isMatched
                            ? 'bg-emerald-800/20 border-emerald-700/40 text-emerald-500/60 line-through'
                            : isSelected
                            ? 'bg-amber-400 text-emerald-950 border-amber-400 shadow'
                            : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-100 hover:bg-emerald-900/40 cursor-pointer'
                        }`}
                      >
                        {item.uz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {roundCompleted && (
                <div className="flex animate-bounce text-emerald-400 justify-center items-center gap-1.5 py-4 font-bold text-base">
                  <Sparkles className="w-5 h-5 fill-current" /> Keyingi raund ochilmoqda...
                </div>
              )}
            </div>
          ) : (
            /* HIGHER GRADE SCRAMBLE GAME */
            <div className="space-y-6">
              {scrambledSentence && (
                <div className="space-y-4 max-w-xxl mx-auto">
                  <div className="text-center bg-emerald-900/20 border border-emerald-800/50 rounded-2xl p-5">
                    <span className="text-xs bg-emerald-50/10 text-emerald-300 border border-emerald-700 px-2.5 py-1 rounded-full font-bold">
                      Zamon: {scrambledSentence.tense}
                    </span>
                    <p className="text-lg font-bold text-white mt-4 leading-relaxed">
                      "{scrambledSentence.uzbekTranslation}"
                    </p>
                    <p className="text-xs text-emerald-400 mt-1">gapining to'g'ri inglizcha tarjimasini yig'ing</p>
                  </div>

                  {/* Scramble Workspace */}
                  <div className="bg-emerald-950/50 border border-dashed border-emerald-800/60 rounded-2xl shadow-inner min-h-16 p-4 flex flex-wrap gap-2.5 items-center justify-center">
                    {userWords.length === 0 ? (
                      <span className="text-emerald-500/60 text-xs">Pastdagi so'zlarni bosing</span>
                    ) : (
                      userWords.map((word, index) => (
                        <motion.button
                          layout
                          key={`${word}-${index}`}
                          id={`user-word-${word}`}
                          onClick={() => handleUserWordRemove(word, index)}
                          className="bg-emerald-750 border border-emerald-600 font-semibold px-4 py-2 rounded-xl text-sm shadow hover:bg-emerald-700/70 transition-colors"
                        >
                          {word}
                        </motion.button>
                      ))
                    )}
                  </div>

                  {/* Pool of Words */}
                  <div className="flex flex-wrap gap-2.5 justify-center pt-2">
                    {shuffledPool.map((word, index) => (
                      <button
                        key={`${word}-${index}`}
                        id={`pool-word-${word}`}
                        onClick={() => handleWordSelect(word, index)}
                        className="bg-white hover:bg-amber-100 text-emerald-950 font-bold px-4 py-2.5 rounded-xl text-sm hover:scale-105 active:scale-95 transition-all shadow-md shadow-emerald-950/20"
                      >
                        {word}
                      </button>
                    ))}
                  </div>

                  {/* Command Buttons */}
                  <div className="flex justify-center pt-4">
                    <button
                      id="check-sentence-btn"
                      disabled={userWords.length === 0 || sentenceCorrect !== null}
                      onClick={checkSentence}
                      className="bg-amber-400 disabled:opacity-40 hover:bg-amber-300 text-emerald-950 font-black px-8 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Tekshirish
                    </button>
                  </div>

                  {/* Checker feedback response animation */}
                  <AnimatePresence>
                    {sentenceCorrect !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-4 rounded-xl border text-center ${
                          sentenceCorrect
                            ? 'bg-emerald-800/30 border-emerald-600 text-emerald-200'
                            : 'bg-rose-900/30 border-rose-800 text-rose-200'
                        }`}
                      >
                        {sentenceCorrect ? (
                          <div className="flex items-center justify-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-300" />
                            <span className="font-bold">Ajoyib! To'g'ri: "{scrambledSentence.correctSentence}"</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <AlertCircle className="w-5 h-5 text-rose-400" />
                            <span className="font-bold">Xatolik bor! Siz to'g'irlaguningizgacha qayta yuklandi.</span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        // Score Summary Game Over Board
        <div className="text-center py-8 relative z-10" id="english-game-over">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-amber-400/20 text-amber-300 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-400/30"
          >
            <Sparkles className="w-9 h-9 fill-current" />
          </motion.div>
          <h2 className="text-2xl font-black">Mashg'ulot yakunlandi!</h2>
          <p className="text-emerald-200 text-sm mt-1">Siz o'z tilingizni mukammallashtirib bormoqdasiz.</p>
          
          <div className="flex items-center justify-center gap-6 my-6 bg-emerald-950/60 p-4 rounded-xl max-w-sm mx-auto border border-emerald-900/50">
            <div>
              <span className="text-xs text-emerald-300 font-medium block">To'plangan Ochko</span>
              <span className="text-xl font-extrabold text-amber-300">+{score} XP</span>
            </div>
            <div className="w-px h-8 bg-emerald-900" />
            <div>
              <span className="text-xs text-emerald-300 font-medium block">Yulduzlar koeffitsiyenti</span>
              <span className="text-xl font-extrabold text-amber-300">+{Math.min(10, Math.floor(score / 40))} Yulduz</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              id="en-game-retry-btn"
              onClick={startGame}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
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
