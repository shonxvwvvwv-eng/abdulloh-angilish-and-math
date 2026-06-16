import { motion } from 'motion/react';
import { UserStats, Badge } from '../types';
import { Award, Flame, Star, Trophy, Target, BookOpen } from 'lucide-react';

interface LeaderboardProps {
  stats: UserStats;
}

export default function Leaderboard({ stats }: LeaderboardProps) {
  // Static list of possible badges to demonstrate unlock progress
  const AVAILABLE_BADGES: { id: string; title: string; description: string; icon: string; threshold: string }[] = [
    { id: 'first_step', title: 'Qadam kashfi', description: 'Birinchi darsni o\'zlashtiring', icon: '🐣', threshold: '1+ dars' },
    { id: 'math_hero', title: 'Matematika Qahramoni', description: 'Matematika o\'yinida 100+ XP to\'plang', icon: '📐', threshold: '100+ Math XP' },
    { id: 'english_pro', title: 'Ingliz tili Explori', description: 'Ingliz tili o\'yinida 100+ XP to\'plang', icon: '🦁', threshold: '100+ English XP' },
    { id: 'streak_king', title: 'Intizom Qiroli', description: 'Yulduzlar miqdorini 20 taga yetkazing', icon: '👑', threshold: '20+ Yulduzlar' },
  ];

  return (
    <div id="leaderboard-root" className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Big Card Statistics */}
      <div className="md:col-span-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500 fill-amber-100" />
            Sizning Yutuqlaringiz
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Har bir dars va o'yin bilan tajribangizni oshiring</p>
        </div>

        <div className="my-6 space-y-4">
          <div className="flex items-center justify-between bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🏆</span>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Jami Tajriba</span>
                <span className="text-lg font-black text-slate-800">{stats.score} XP</span>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">Level {Math.floor(stats.score / 150) + 1}</span>
          </div>

          <div className="flex items-center justify-between bg-amber-50/50 p-4 rounded-xl border border-amber-100/50">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">⭐</span>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Sinflararo yulduzlar</span>
                <span className="text-lg font-black text-slate-800">{stats.stars} Yulduz</span>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-700">Yulduzvoy</span>
          </div>

          <div className="flex items-center justify-between bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🔥</span>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Kunlik g'ayrat (Streak)</span>
                <span className="text-lg font-black text-slate-800">{stats.streak} kun</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700">Faol</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 text-center">
          <span className="text-xs text-slate-400">
            Premium talaba profili
          </span>
        </div>
      </div>

      {/* Badges Progress Section */}
      <div className="md:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-500" />
            Mukofot ko'krak nishonlari (Badges)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Darslar va mashqlarni yakunlab yangi nishonlarni oching</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {AVAILABLE_BADGES.map((b) => {
            // Logic to check unlocked state
            let isUnlocked = false;
            if (b.id === 'first_step' && stats.completedLessons.length >= 1) isUnlocked = true;
            if (b.id === 'math_hero' && stats.score >= 100) isUnlocked = true;
            if (b.id === 'english_pro' && stats.score >= 100) isUnlocked = true;
            if (b.id === 'streak_king' && stats.stars >= 20) isUnlocked = true;

            return (
              <div
                key={b.id}
                id={`badge-${b.id}`}
                className={`flex gap-3.5 p-4 rounded-xl border transition-all ${
                  isUnlocked
                    ? 'bg-slate-50 border-indigo-100'
                    : 'bg-slate-50/40 border-slate-150 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                  isUnlocked ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'bg-slate-100 filter grayscale'
                }`}>
                  {b.icon}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-sm text-slate-800">{b.title}</h4>
                    {isUnlocked ? (
                      <span className="text-[9px] bg-indigo-50 text-indigo-500 font-bold px-1.5 py-0.5 rounded-md">Unlocked</span>
                    ) : (
                      <span className="text-[9px] bg-slate-100 text-slate-400 font-medium px-1.5 py-0.5 rounded-md">{b.threshold}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{b.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
