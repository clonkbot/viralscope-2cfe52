import { motion } from 'framer-motion';

type Tab = 'vote' | 'quests' | 'leaderboard';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'vote', label: 'Vote', icon: '⚡' },
    { id: 'quests', label: 'Quests', icon: '🎯' },
    { id: 'leaderboard', label: 'Rankings', icon: '🏆' },
  ];

  return (
    <motion.nav
      className="navigation"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{tab.icon}</span> {tab.label}
        </motion.button>
      ))}
    </motion.nav>
  );
}

export default Navigation;