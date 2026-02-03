import { motion } from 'framer-motion';
import type { Post } from '../App';

interface PostCardProps {
  post: Post;
  onVote: (postId: string, vote: 'viral' | 'flop') => void;
  index: number;
}

function PostCard({ post, onVote, index }: PostCardProps) {
  const getViralColor = (score: number) => {
    if (score >= 70) return 'var(--neon-green)';
    if (score >= 40) return 'var(--neon-yellow)';
    return 'var(--neon-pink)';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <motion.div
      className="post-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="post-header">
        <div className="post-author-info">
          <span className="post-author">{post.author}</span>
          <span className="post-handle">{post.handle}</span>
        </div>
        <span className="post-timestamp">{post.timestamp}</span>
      </div>

      <p className="post-content">{post.content}</p>

      <div className="post-metrics">
        <div className="metric">
          <span className="metric-icon">❤️</span>
          <span>{formatNumber(post.currentLikes)}</span>
        </div>
        <div className="metric">
          <span className="metric-icon">🔄</span>
          <span>{formatNumber(post.currentRetweets)}</span>
        </div>
      </div>

      <div className="viral-score-container">
        <div className="viral-score-header">
          <span className="viral-score-label">Viral Detection Score</span>
          <motion.span
            className="viral-score-value"
            style={{ color: getViralColor(post.viralScore) }}
            key={Math.round(post.viralScore)}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {Math.round(post.viralScore)}%
          </motion.span>
        </div>
        <div className="viral-score-bar">
          <motion.div
            className="viral-score-fill"
            style={{ background: getViralColor(post.viralScore) }}
            initial={{ width: 0 }}
            animate={{ width: `${post.viralScore}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="vote-buttons">
        <motion.button
          className={`vote-btn viral ${post.userVote === 'viral' ? 'selected' : ''}`}
          onClick={() => onVote(post.id, 'viral')}
          disabled={post.userVote !== null}
          whileHover={{ scale: post.userVote === null ? 1.02 : 1 }}
          whileTap={{ scale: post.userVote === null ? 0.98 : 1 }}
        >
          <span>🚀</span>
          <span>Goes Viral</span>
        </motion.button>
        <motion.button
          className={`vote-btn flop ${post.userVote === 'flop' ? 'selected' : ''}`}
          onClick={() => onVote(post.id, 'flop')}
          disabled={post.userVote !== null}
          whileHover={{ scale: post.userVote === null ? 1.02 : 1 }}
          whileTap={{ scale: post.userVote === null ? 0.98 : 1 }}
        >
          <span>📉</span>
          <span>Flops</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default PostCard;