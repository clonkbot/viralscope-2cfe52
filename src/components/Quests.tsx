import { motion } from 'framer-motion';
import type { Quest } from '../App';

interface QuestsProps {
  quests: Quest[];
  onClaim: (questId: string) => void;
}

function Quests({ quests, onClaim }: QuestsProps) {
  return (
    <div className="quests-container">
      <div className="quests-header">
        <h2 className="quests-title">Daily Quests</h2>
        <span className="quests-subtitle">Complete tasks to earn bonus points</span>
      </div>

      {quests.map((quest, index) => (
        <motion.div
          key={quest.id}
          className={`quest-card ${quest.completed ? 'completed' : ''}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="quest-icon">{quest.icon}</div>

          <div className="quest-info">
            <h3 className="quest-title">{quest.title}</h3>
            <p className="quest-description">{quest.description}</p>
            <div className="quest-progress-bar">
              <motion.div
                className="quest-progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${(quest.progress / quest.total) * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                style={{
                  background: quest.completed ? 'var(--neon-green)' : 'var(--neon-cyan)',
                }}
              />
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
              {quest.progress} / {quest.total}
            </span>
          </div>

          <div className="quest-reward">
            {quest.reward > 0 && (
              <span className="reward-amount">{quest.reward}</span>
            )}
            <motion.button
              className="claim-btn"
              onClick={() => onClaim(quest.id)}
              disabled={!quest.completed || quest.reward === 0}
              whileHover={{ scale: quest.completed && quest.reward > 0 ? 1.05 : 1 }}
              whileTap={{ scale: quest.completed && quest.reward > 0 ? 0.95 : 1 }}
            >
              {quest.reward === 0 ? 'Claimed' : quest.completed ? 'Claim' : 'Locked'}
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default Quests;