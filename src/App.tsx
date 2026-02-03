import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostCard from './components/PostCard';
import Leaderboard from './components/Leaderboard';
import Quests from './components/Quests';
import UserStats from './components/UserStats';
import Navigation from './components/Navigation';
import './styles.css';

export interface Post {
  id: string;
  author: string;
  handle: string;
  content: string;
  currentLikes: number;
  currentRetweets: number;
  timestamp: string;
  viralScore: number;
  userVote: 'viral' | 'flop' | null;
  resolved: boolean;
  wasViral?: boolean;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  completed: boolean;
  icon: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  accuracy: number;
  streak: number;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'Elon Musk',
    handle: '@elonmusk',
    content: 'The thing about AI is that it\'s like having a really smart friend who never sleeps and occasionally hallucinates',
    currentLikes: 45200,
    currentRetweets: 8340,
    timestamp: '2h ago',
    viralScore: 78,
    userVote: null,
    resolved: false,
  },
  {
    id: '2',
    author: 'Naval',
    handle: '@naval',
    content: 'Specific knowledge is found by pursuing your genuine curiosity and passion rather than whatever is hot right now.',
    currentLikes: 12400,
    currentRetweets: 2100,
    timestamp: '4h ago',
    viralScore: 45,
    userVote: null,
    resolved: false,
  },
  {
    id: '3',
    author: 'Sahil Bloom',
    handle: '@SahilBloom',
    content: 'The most successful people I know have one thing in common: They treat every conversation as an opportunity to learn.',
    currentLikes: 8900,
    currentRetweets: 1560,
    timestamp: '6h ago',
    viralScore: 62,
    userVote: null,
    resolved: false,
  },
  {
    id: '4',
    author: 'Pieter Levels',
    handle: '@levelsio',
    content: 'Just shipped a new feature at 3am. Sleep is for people who aren\'t building the future.',
    currentLikes: 3200,
    currentRetweets: 890,
    timestamp: '1h ago',
    viralScore: 34,
    userVote: null,
    resolved: false,
  },
];

const mockQuests: Quest[] = [
  { id: '1', title: 'First Blood', description: 'Cast your first vote', reward: 50, progress: 1, total: 1, completed: true, icon: '⚡' },
  { id: '2', title: 'Trend Spotter', description: 'Correctly predict 5 viral posts', reward: 200, progress: 3, total: 5, completed: false, icon: '🔥' },
  { id: '3', title: 'Streak Master', description: 'Get a 3-day voting streak', reward: 150, progress: 2, total: 3, completed: false, icon: '💫' },
  { id: '4', title: 'Social Butterfly', description: 'Share your prediction on X', reward: 100, progress: 0, total: 1, completed: false, icon: '🦋' },
  { id: '5', title: 'Oracle', description: 'Reach 80% accuracy (min 20 votes)', reward: 500, progress: 15, total: 20, completed: false, icon: '🔮' },
];

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: 'viralwhale.eth', points: 12450, accuracy: 87, streak: 12 },
  { rank: 2, username: 'cryptoprophet', points: 11200, accuracy: 82, streak: 8 },
  { rank: 3, username: 'trendhunter', points: 9800, accuracy: 79, streak: 15 },
  { rank: 4, username: 'basedbets', points: 8650, accuracy: 75, streak: 6 },
  { rank: 5, username: 'alphaseeker', points: 7200, accuracy: 71, streak: 4 },
  { rank: 6, username: 'degenking', points: 6100, accuracy: 68, streak: 9 },
  { rank: 7, username: 'socialsniper', points: 5400, accuracy: 65, streak: 3 },
  { rank: 8, username: 'memelord420', points: 4800, accuracy: 62, streak: 7 },
];

type Tab = 'vote' | 'quests' | 'leaderboard';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('vote');
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [quests, setQuests] = useState<Quest[]>(mockQuests);
  const [userPoints, setUserPoints] = useState(2450);
  const [userAccuracy] = useState(73);
  const [userStreak] = useState(5);
  const [userRank] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosts(prev => prev.map(post => ({
        ...post,
        viralScore: Math.min(100, Math.max(0, post.viralScore + (Math.random() - 0.5) * 8)),
        currentLikes: post.currentLikes + Math.floor(Math.random() * 100),
        currentRetweets: post.currentRetweets + Math.floor(Math.random() * 20),
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = (postId: string, vote: 'viral' | 'flop') => {
    setPosts(prev => prev.map(post =>
      post.id === postId ? { ...post, userVote: vote } : post
    ));

    // Update quest progress
    setQuests(prev => prev.map(quest => {
      if (quest.id === '2' && !quest.completed) {
        const newProgress = Math.min(quest.progress + 1, quest.total);
        return { ...quest, progress: newProgress, completed: newProgress >= quest.total };
      }
      return quest;
    }));

    setUserPoints(prev => prev + 10);
  };

  const handleClaimQuest = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (quest && quest.completed) {
      setUserPoints(prev => prev + quest.reward);
      setQuests(prev => prev.map(q =>
        q.id === questId ? { ...q, reward: 0 } : q
      ));
    }
  };

  return (
    <div className="app-container">
      <div className="scanline" />
      <div className="noise-overlay" />

      <header className="header">
        <motion.div
          className="logo-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="logo-glitch" data-text="VIRALSCOPE">VIRALSCOPE</div>
          <span className="logo-subtitle">// SOCIAL PREDICTION TERMINAL</span>
        </motion.div>

        <UserStats
          points={userPoints}
          accuracy={userAccuracy}
          streak={userStreak}
          rank={userRank}
        />
      </header>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="main-content">
        <AnimatePresence mode="wait">
          {activeTab === 'vote' && (
            <motion.div
              key="vote"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="posts-grid"
            >
              {posts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onVote={handleVote}
                  index={index}
                />
              ))}
            </motion.div>
          )}

          {activeTab === 'quests' && (
            <motion.div
              key="quests"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Quests quests={quests} onClaim={handleClaimQuest} />
            </motion.div>
          )}

          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Leaderboard entries={mockLeaderboard} currentUser="you.eth" currentRank={userRank} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="footer">
        <span>Requested by @itsberlo · Built by @clonkbot</span>
      </footer>
    </div>
  );
}

export default App;