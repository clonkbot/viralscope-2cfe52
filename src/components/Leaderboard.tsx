import { motion } from 'framer-motion';
import type { LeaderboardEntry } from '../App';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUser: string;
  currentRank: number;
}

function Leaderboard({ entries, currentUser, currentRank }: LeaderboardProps) {
  const getRankClass = (rank: number) => {
    if (rank === 1) return 'gold';
    if (rank === 2) return 'silver';
    if (rank === 3) return 'bronze';
    return '';
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2 className="leaderboard-title">Global Rankings</h2>
        <p className="leaderboard-subtitle">Top predictors this season</p>
      </div>

      <div className="leaderboard-table">
        <div className="leaderboard-row header">
          <span>Rank</span>
          <span>User</span>
          <span>Points</span>
          <span className="accuracy-col">Accuracy</span>
          <span className="streak-col">Streak</span>
        </div>

        {entries.map((entry, index) => (
          <motion.div
            key={entry.username}
            className="leaderboard-row"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <span className={`rank ${getRankClass(entry.rank)}`}>
              {entry.rank === 1 ? '👑' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
            </span>
            <span className="username">{entry.username}</span>
            <span className="points-col">{entry.points.toLocaleString()}</span>
            <span className="accuracy-col">{entry.accuracy}%</span>
            <span className="streak-col">{entry.streak}</span>
          </motion.div>
        ))}

        {/* Current User Row */}
        <motion.div
          className="leaderboard-row current-user"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <span className="rank">#{currentRank}</span>
          <span className="username">{currentUser} (You)</span>
          <span className="points-col">2,450</span>
          <span className="accuracy-col">73%</span>
          <span className="streak-col">5</span>
        </motion.div>
      </div>
    </div>
  );
}

export default Leaderboard;