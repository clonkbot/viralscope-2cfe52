import { motion } from 'framer-motion';

interface UserStatsProps {
  points: number;
  accuracy: number;
  streak: number;
  rank: number;
}

function UserStats({ points, accuracy, streak, rank }: UserStatsProps) {
  return (
    <motion.div
      className="user-stats"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="stat-item">
        <span className="stat-label">Points</span>
        <motion.span
          className="stat-value points"
          key={points}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {points.toLocaleString()}
        </motion.span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Accuracy</span>
        <span className="stat-value">{accuracy}%</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Streak</span>
        <span className="stat-value streak">{streak}🔥</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Rank</span>
        <span className="stat-value">#{rank}</span>
      </div>
    </motion.div>
  );
}

export default UserStats;