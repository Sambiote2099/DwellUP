import React, { useState } from "react";

import Navbar from "./Navbar";

import { motion, AnimatePresence } from "framer-motion";



interface UserData {
  userId: number;
  name: string;
  userType: string;
}

interface ConversationsPageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: UserData;
}

const ConversationsPage: React.FC<ConversationsPageProps> = ({
  darkMode,
  toggleDarkMode,
  user
}) => {

  const [activeChat, setActiveChat] = useState<number | null>(null);


  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="h-full bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} />
        <div className="flex h-[calc(100vh-64px)] relative overflow-hidden">

          {/* Sidebar (Conversations List) */}
          <motion.div
            layout
            className="mt-1 w-full sm:w-96 border-r dark:border-gray-700 overflow-y-auto bg-white dark:bg-gray-900 p-4"
          >
            <h2 className="text-xl font-bold mb-4">Conversations</h2>
           
             
          
          </motion.div>

          {/* Chat Panel */}
          <AnimatePresence mode="wait">
            {activeChat !== null ? (
              <motion.div
                key={activeChat}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute sm:static sm:flex-1 inset-0 bg-gray-50 dark:bg-gray-800 p-4 mt-1"
              >
                <div className="w-full border rounded-lg shadow bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <div className="flex justify-between items-center p-3 border-b dark:border-gray-600 bg-teal-600 text-white">
          

                    <div className="flex items-center gap-3">
                      {/* Mobile back button */}
                      <button
                        onClick={() => setActiveChat(null)}
                        className="text-2xl sm:hidden"
                        title="Back"
                      >
                        ←
                      </button>

                      {/* Desktop close button */}
                      <button
                        onClick={() => setActiveChat(null)}
                        className="hidden sm:block text-2xl hover:text-red-300 transition"
                        title="Close Chat"
                      >
                        &times;
                      </button>
                    </div>
                  </div>

                
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="no-chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-gray-500 content-center m-auto"
              >
                Select a conversation to start chatting.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ConversationsPage;