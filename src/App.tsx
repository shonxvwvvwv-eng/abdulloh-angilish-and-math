import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GradeNumber, Subject, UserStats } from './types';
import { GRADE_LESSONS } from './data/lessons';
import GradeSelector from './components/GradeSelector';
import LessonViewer from './components/LessonViewer';
import MathGame from './components/MathGame';
import EnglishGame from './components/EnglishGame';
import AITutor from './components/AITutor';
import Leaderboard from './components/Leaderboard';
import { BookOpen, Gamepad2, Sparkles, Award, Star, Flame, GraduationCap, CheckCircle } from 'lucide-react';

export default function App() {
  const [selectedGrade, setSelectedGrade] = useState<GradeNumber>(1);
  const [selectedSubject, setSelectedSubject] = useState<Subject>('math');
  const [activeTab, setActiveTab] = useState<'study' | 'game' | 'ai' | 'badges'>('study');
  
  // Persistent stats in localStorage
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('edu_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use default if parse failed
      }
    }
    return {
      score: 50, // Starting bonus
      completedLessons: [],
      mathGamesPlayed: 0,
      englishGamesPlayed: 0,
      streak: 1,
      lastActiveDate: new Date().toDateString(),
      stars: 3,
      unlockedBadges: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('edu_stats', JSON.stringify(stats));
  }, [stats]);

  // Keep track of streaks
  useEffect(() => {
    const today = new Date().toDateString();
    if (stats.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const isStreakMaintained = stats.lastActiveDate === yesterday;
      
      setStats(prev => ({
        ...prev,
        lastActiveDate: today,
        streak: isStreakMaintained ? prev.streak + 1 : 1,
      }));
    }
  }, []);

  const handleLessonComplete = (lessonId: string) => {
    if (!stats.completedLessons.includes(lessonId)) {
      setStats(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      }));
    }
  };

  const addScore = (amount: number) => {
    setStats(prev => ({
      ...prev,
      score: prev.score + amount,
    }));
  };

  const addStars = (amount: number) => {
    setStats(prev => ({
      ...prev,
      stars: prev.stars + amount,
    }));
  };

  const incrementMathGames = () => {
    setStats(prev => ({
      ...prev,
      mathGamesPlayed: prev.mathGamesPlayed + 1,
    }));
  };

  const incrementEnglishGames = () => {
    setStats(prev => ({
      ...prev,
      englishGamesPlayed: prev.englishGamesPlayed + 1,
    }));
  };

  const activeLessons = GRADE_LESSONS[selectedGrade][selectedSubject];

  return (
    <div id="app-root" className="min-h-screen bg-slate-50 text-slate-900 pb-12 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Premium School Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm transition-all" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                Bilim Maktabi
                <span className="text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-100 px-1.5 py-0.5 rounded font-bold uppercase">Online</span>
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <p className="text-[11px] text-slate-400 font-medium">1-11 Sinflar uchun Multitalant Platforma</p>
                <div className="flex items-center gap-1 text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-150/70 font-bold w-fit">
                  <span className="relative flex h-1 w-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500"></span>
                  </span>
                  Litsenziya: 1 yillik faol
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats board */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100/50 transition-colors border border-indigo-100/30 px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-700 shadow-sm">
              <span className="text-sm">🏆</span>
              <span>{stats.score} XP</span>
            </div>

            <div className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100/50 transition-colors border border-amber-100/30 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-700 shadow-sm">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{stats.stars} ⭐</span>
            </div>

            <div className="flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100/50 transition-colors border border-orange-100/30 px-3 py-1.5 rounded-xl text-xs font-bold text-orange-700 shadow-sm">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-400" />
              <span>{stats.streak} kun</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6" id="dashboard-main">
        
        {/* Subheader Banner */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-slate-800/20">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                Ajoyib Ta'lim
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                🛡️ Ultra-tezkor &amp; 1 yillik Premium Litsenziya
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">Kashfiyotlar va Bilimlar dunyosiga Hush Kelibsiz!</h2>
            <p className="text-indigo-200/90 text-sm max-w-lg font-light leading-relaxed">
              Matematika sirlari va Ingliz tili mukammalligini bizning interaktiv o'yinlarimiz, qiziqarli darsliklarimiz hamda zamonaviy sun'iy intellekt o'qituvchimiz yordamida tezkor quvnoq o'zlashtiring!
            </p>
          </div>
        </div>

        {/* 1. Grade Selector Panel */}
        <GradeSelector
          selectedGrade={selectedGrade}
          onSelectGrade={setSelectedGrade}
          completedLessons={stats.completedLessons}
          totalLessons={activeLessons.length}
        />

        {/* Subject & Sub-section Switcher tab selectors */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm" id="tab-nav">
          {/* Math vs English Subject selector */}
          <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            <button
              id="math-subject-btn"
              onClick={() => setSelectedSubject('math')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                selectedSubject === 'math'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              📐 Matematika
            </button>
            <button
              id="english-subject-btn"
              onClick={() => setSelectedSubject('english')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                selectedSubject === 'english'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              🇬🇧 Ingliz Tili
            </button>
          </div>

          {/* Section view controllers */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center">
            <button
              id="tab-study-btn"
              onClick={() => setActiveTab('study')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'study' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Dars o'rganish
            </button>
            <button
              id="tab-game-btn"
              onClick={() => setActiveTab('game')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'game' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              Bilim Geymi
            </button>
            <button
              id="tab-ai-btn"
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'ai' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              AI O'qituvchi
            </button>
            <button
              id="tab-badges-btn"
              onClick={() => setActiveTab('badges')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'badges' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4" />
              Yutuqlarim
            </button>
          </div>
        </div>

        {/* Active Content view transition arena */}
        <div id="dashboard-content-arena" className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'study' && (
              <motion.div
                key="study-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <LessonViewer
                  lessons={activeLessons}
                  subject={selectedSubject}
                  onLessonComplete={handleLessonComplete}
                  completedLessons={stats.completedLessons}
                  addStars={addStars}
                  addScore={addScore}
                />
              </motion.div>
            )}

            {activeTab === 'game' && (
              <motion.div
                key="game-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {selectedSubject === 'math' ? (
                  <MathGame
                    grade={selectedGrade}
                    addScore={addScore}
                    addStars={addStars}
                    incrementGamesPlayed={incrementMathGames}
                  />
                ) : (
                  <EnglishGame
                    grade={selectedGrade}
                    addScore={addScore}
                    addStars={addStars}
                    incrementGamesPlayed={incrementEnglishGames}
                  />
                )}
              </motion.div>
            )}

            {activeTab === 'ai' && (
              <motion.div
                key="ai-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AITutor grade={selectedGrade} />
              </motion.div>
            )}

            {activeTab === 'badges' && (
              <motion.div
                key="badges-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Leaderboard stats={stats} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
