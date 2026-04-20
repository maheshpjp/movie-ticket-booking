import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiFilm } from 'react-icons/fi';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

/**
 * Navigation Bar Component
 */
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Check if on auth pages
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 card-elevated border-b border-surface-light"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="text-3xl font-bold gradient-text"
          >
            🎬 CineMax
          </motion.button>

          {/* Desktop Menu */}
          {!isAuthPage && (
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigate('/')}
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <FiHome size={18} />
                Home
              </button>

              {isAuthenticated && (
                <button
                  onClick={() => navigate('/bookings')}
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <FiFilm size={18} />
                  My Bookings
                </button>
              )}

              {/* Auth Buttons/User Menu */}
              {!isAuthenticated ? (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 card-elevated rounded-lg">
                    <FiUser size={18} className="text-primary" />
                    <span className="text-sm font-semibold">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-surface-light rounded-lg transition-colors"
                    title="Logout"
                  >
                    <FiLogOut size={20} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {!isAuthPage && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && !isAuthPage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 p-4 card-elevated rounded-lg space-y-3"
            >
              <button
                onClick={() => {
                  navigate('/');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-surface-light rounded transition-colors flex items-center gap-2"
              >
                <FiHome size={18} />
                Home
              </button>

              {isAuthenticated && (
                <button
                  onClick={() => {
                    navigate('/bookings');
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-surface-light rounded transition-colors flex items-center gap-2"
                >
                  <FiFilm size={18} />
                  My Bookings
                </button>
              )}

              {!isAuthenticated ? (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigate('/login');
                      setMenuOpen(false);
                    }}
                    className="flex-1"
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      navigate('/register');
                      setMenuOpen(false);
                    }}
                    className="flex-1"
                  >
                    Register
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 border-t border-surface-light pt-3">
                  <div className="flex items-center gap-2 px-4 py-2">
                    <FiUser size={18} className="text-primary" />
                    <span className="text-sm font-semibold">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-surface-light rounded transition-colors flex items-center gap-2 text-error"
                  >
                    <FiLogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
