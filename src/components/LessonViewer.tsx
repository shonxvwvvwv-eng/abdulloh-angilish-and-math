import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lesson, Subject, QuizQuestion } from '../types';
import { BookOpen, Award, CheckCircle2, AlertCircle, ChevronRight, HelpCircle } from 'lucide-react';

interface LessonViewerProps {
  lessons: Lesson[];
  subject: Subject;
  onLessonComplete: (lessonId: string) => void;
  completedLessons: string[];
  addStars: (stars: number) => void;
  addScore: (score: number) => void;
}

export default function LessonViewer({
  lessons,
  subject,
  onLessonComplete,
  completedLessons,
  addStars,
  addScore,
}: LessonViewerProps) {
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [scoreEarnedInQuiz, setScoreEarnedInQuiz] = useState(0);

  const activeLesson = lessons[activeLessonIndex] || lessons[0];

  useEffect(() => {
    // Reset quiz state when lesson changes
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setQuizFinished(false);
    setScoreEarnedInQuiz(0);
  }, [lessons, activeLessonIndex]);

  if (!activeLesson) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm">
        <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-700">Hech qanday dars topilmadi</h3>
        <p className="text-slate-500 text-sm">Ushbu sinf va fan uchun darslar tez kunda yuklanadi.</p>
      </div>
    );
  }

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    const correct = option === activeLesson.quiz[currentQuizIndex].correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setScoreEarnedInQuiz((prev) => prev + 10);
      addScore(10);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex + 1 < activeLesson.quiz.length) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setQuizFinished(true);
      if (!completedLessons.includes(activeLesson.id)) {
        onLessonComplete(activeLesson.id);
        addStars(5); // 5 star badge
      }
    }
  };

  const formatContent = (text: string) => {
    // Basic rich markdown-like parsing to keep things clean & styled
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('# ')) {
        return <h2 key={idx} className="text-2xl font-extrabold text-slate-900 mt-6 mb-4">{line.replace('# ', '')}</h2>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="text-xl font-bold text-indigo-900 mt-5 mb-3">{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="text-lg font-bold text-slate-800 mt-4 mb-2">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('- ')) {
        const itemText = line.replace('- ', '');
        // Highlight bold in lists
        if (itemText.includes('**')) {
          const parts = itemText.split('**');
          return (
            <li key={idx} className="ml-5 list-disc text-slate-600 mb-1">
              {parts.map((p, pIdx) => (pIdx % 2 === 1 ? <strong key={pIdx} className="text-slate-900 font-bold">{p}</strong> : p))}
            </li>
          );
        }
        return <li key={idx} className="ml-5 list-disc text-slate-700 mb-1">{itemText}</li>;
      }
      if (line.startsWith('`')) {
        return (
          <div key={idx} className="bg-slate-50 font-mono text-sm border-l-4 border-indigo-500 p-3 my-2.5 rounded-r-lg text-slate-700">
            {line.replace(/`/g, '')}
          </div>
        );
      }
      if (line.length === 0) return <div key={idx} className="h-2" />;
      
      // Inline formatting (bold)
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={idx} className="text-slate-600 leading-relaxed mb-3">
            {parts.map((p, pIdx) => (pIdx % 2 === 1 ? <strong key={pIdx} className="text-slate-900 font-bold">{p}</strong> : p))}
          </p>
        );
      }
      return <p key={idx} className="text-slate-600 leading-relaxed mb-3">{line}</p>;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="lesson-viewer-grid">
      {/* Sidelist of Lessons for chosen subject */}
      <div className="lg:col-span-4 space-y-3" id="lesson-list">
        <h3 className="text-sm font-semibold uppercase text-slate-400 tracking-wider">Mavzular</h3>
        <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-3">
          {lessons.map((lesson, idx) => {
            const isSelected = activeLessonIndex === idx;
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <button
                key={lesson.id}
                id={`lesson-tab-${lesson.id}`}
                onClick={() => setActiveLessonIndex(idx)}
                className={`flex-shrink-0 text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 w-72 lg:w-full ${
                  isSelected
                    ? 'bg-indigo-50/80 border-indigo-200 shadow-sm text-indigo-950'
                    : 'bg-white hover:bg-slate-50 border-slate-150 text-slate-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm truncate">{lesson.title}</span>
                    {isCompleted && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{lesson.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Study Deck and Interactive Practice Section */}
      <div className="lg:col-span-8 space-y-6" id="lesson-content-deck">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
              subject === 'math' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
            }`}>
              {subject === 'math' ? 'Matematika' : 'Ingliz tili'}
            </span>
            {completedLessons.includes(activeLesson.id) && (
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> O'zlashtirilgan
              </span>
            )}
          </div>

          {/* Structured Lesson Content */}
          <div className="prose max-w-none">
            {formatContent(activeLesson.content)}
          </div>

          {/* Dynamic Examples */}
          {activeLesson.examples?.length > 0 && (
            <div className="mt-8 bg-slate-50 border border-slate-100/80 rounded-2xl p-6">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                Misollar va Namunalar:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeLesson.examples.map((ex, exIdx) => (
                  <div key={exIdx} className="bg-white p-4 rounded-xl border border-slate-150 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                      {exIdx + 1}
                    </span>
                    <span className="text-slate-700 font-medium text-sm">{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Interactive Quiz Part */}
        {activeLesson.quiz?.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 overflow-hidden" id="lesson-quiz-arena">
            {!quizFinished ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-500" />
                    Bilimingizni sinab ko'ring
                  </h3>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                    Savol {currentQuizIndex + 1} / {activeLesson.quiz.length}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuizIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <p className="text-slate-800 font-semibold text-base sm:text-lg mb-4">
                      {activeLesson.quiz[currentQuizIndex].question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeLesson.quiz[currentQuizIndex].options.map((option) => {
                        const isSelected = selectedOption === option;
                        const isCorrectOption = option === activeLesson.quiz[currentQuizIndex].correctAnswer;
                        
                        let btnStyle = "border-slate-200 bg-white text-slate-700 hover:bg-slate-50";
                        if (isAnswered) {
                          if (isSelected) {
                            btnStyle = isCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-rose-500 bg-rose-50 text-rose-800";
                          } else if (isCorrectOption) {
                            btnStyle = "border-emerald-300 bg-emerald-50/50 text-emerald-800";
                          } else {
                            btnStyle = "border-slate-150 bg-slate-50/40 text-slate-400";
                          }
                        }

                        return (
                          <button
                            key={option}
                            id={`option-btn-${option.replace(/[^a-zA-Z0-9]/g, '')}`}
                            disabled={isAnswered}
                            onClick={() => handleOptionClick(option)}
                            className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all transition-colors cursor-pointer flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{option}</span>
                            {isAnswered && isSelected && (
                              isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-rose-500" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl border mt-4 ${
                          isCorrect ? 'bg-emerald-50/50 border-emerald-100 text-emerald-950' : 'bg-rose-50/50 border-rose-100 text-rose-950'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span className="font-bold block text-sm">
                              {isCorrect ? 'Barakalla! To\'g\'ri javob!' : 'Afsus, noto\'g\'ri! Qayta urinib ko\'ring!'}
                            </span>
                            {activeLesson.quiz[currentQuizIndex].explanation && (
                              <p className="text-xs text-slate-500 font-medium mt-1">
                                {activeLesson.quiz[currentQuizIndex].explanation}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <button
                            id="next-quiz-btn"
                            onClick={handleNextQuiz}
                            className="bg-slate-900 text-white rounded-xl py-2 px-4 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span>{currentQuizIndex + 1 === activeLesson.quiz.length ? "Tugatish" : "Keyingi savol"}</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-100"
                >
                  <Award className="w-9 h-9" />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900">Mavzu testini muvaffaqiyatli topshirdingiz!</h3>
                <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
                  Siz bugunki bilimingizni tasdiqladingiz va yangi yutuqlarga sazovor bo'ldingiz!
                </p>
                
                <div className="flex items-center justify-center gap-6 my-6 bg-slate-50 p-4 rounded-xl max-w-xs mx-auto">
                  <div className="text-center">
                    <span className="text-xs text-slate-400 font-medium block">Olingan ochkolar</span>
                    <span className="text-lg font-extrabold text-indigo-600">+{scoreEarnedInQuiz} XP</span>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div className="text-center">
                    <span className="text-xs text-slate-400 font-medium block">Yulduzlar</span>
                    <span className="text-lg font-extrabold text-amber-500">+5 Yulduz</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    id="finish-lesson-and-next"
                    onClick={() => {
                      if (activeLessonIndex + 1 < lessons.length) {
                        setActiveLessonIndex((prev) => prev + 1);
                      } else {
                        // Rollback to first or notify
                        setActiveLessonIndex(0);
                      }
                    }}
                    className="bg-indigo-600 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-indigo-500 active:scale-95 transition-all text-center cursor-pointer"
                  >
                    Keyingi darsga o'tish
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
