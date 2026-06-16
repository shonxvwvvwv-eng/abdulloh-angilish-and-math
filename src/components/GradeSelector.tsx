import { motion } from 'motion/react';
import { GradeNumber } from '../types';
import { ALL_GRADES } from '../data/lessons';
import { BookOpen, Award, CheckCircle } from 'lucide-react';

interface GradeSelectorProps {
  selectedGrade: GradeNumber;
  onSelectGrade: (grade: GradeNumber) => void;
  completedLessons: string[];
  totalLessons: number;
}

export default function GradeSelector({
  selectedGrade,
  onSelectGrade,
  completedLessons,
  totalLessons,
}: GradeSelectorProps) {
  return (
    <div id="grade-selector-container" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            Sinfingizni tanlang
          </h2>
          <p className="text-sm text-slate-500">1-dan 11-sinfgacha barcha darsliklar va o'yinlar mavjud</p>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl text-xs font-semibold">
          <Award className="w-4 h-4 text-amber-500" />
          <span>Barcha sinflar ochiq!</span>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-3">
        {ALL_GRADES.map((grade) => {
          const isSelected = selectedGrade === grade;
          // Simple completion estimate for visual flair
          const isCompleted = false; // logic or UI marker if needed
          
          return (
            <motion.button
              key={grade}
              id={`grade-btn-${grade}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectGrade(grade)}
              className={`relative flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200/60 text-slate-700 hover:border-slate-300'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider opacity-75">Sinf</span>
              <span className="text-2xl font-extrabold mt-0.5">{grade}</span>
              
              {isSelected && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-indigo-300 rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
