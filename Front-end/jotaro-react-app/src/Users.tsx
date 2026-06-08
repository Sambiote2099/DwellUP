import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

interface User {
  userId: number;
  name: string;
  email: string;
  phoneNo: string;
  doB: string;
  address: string;
  about: string;
  userType: 'Admin' | 'User' | 'Agent';
  avatar: string;
}

interface UserProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: any;
}

const dummyUsers: User[] = [
  {
    userId: 1,
    name: 'Sarah Ahmed',
    email: 'sarah.ahmed@example.com',
    phoneNo: '+880 1711-234567',
    doB: '1990-04-15',
    address: '12 Dhanmondi Road, Dhaka',
    about: 'Experienced real estate agent with 8 years in the Dhaka market.',
    userType: 'Agent',
    avatar: 'https://i.pravatar.cc/300?img=47',
  },
  {
    userId: 2,
    name: 'Rafi Hasan',
    email: 'rafi.hasan@example.com',
    phoneNo: '+880 1812-345678',
    doB: '1985-09-22',
    address: '45 Gulshan Avenue, Dhaka',
    about: 'Specialist in commercial and industrial properties across Bangladesh.',
    userType: 'Agent',
    avatar: 'https://i.pravatar.cc/300?img=12',
  },
  {
    userId: 3,
    name: 'Nadia Islam',
    email: 'nadia.islam@example.com',
    phoneNo: '+880 1955-456789',
    doB: '1993-02-08',
    address: '7 Banani Road, Dhaka',
    about: 'Focused on residential rentals and helping families find their perfect home.',
    userType: 'Agent',
    avatar: 'https://i.pravatar.cc/300?img=44',
  },
  {
    userId: 5,
    name: 'Priya Chowdhury',
    email: 'priya.chowdhury@example.com',
    phoneNo: '+880 1733-678901',
    doB: '1995-06-17',
    address: '19 Sylhet Sadar, Sylhet',
    about: 'Young and driven agent specializing in luxury homes and apartments in Sylhet.',
    userType: 'Agent',
    avatar: 'https://i.pravatar.cc/300?img=56',
  },
  {
    userId: 6,
    name: 'Tariq Mahmud',
    email: 'tariq.mahmud@example.com',
    phoneNo: '+880 1544-789012',
    doB: '1980-03-25',
    address: '88 Zindabazar, Sylhet',
    about: 'Senior agent with 15 years of experience in the national property market.',
    userType: 'Agent',
    avatar: 'https://i.pravatar.cc/300?img=68',
  },
  {
    userId: 7,
    name: 'Lamia Khatun',
    email: 'lamia.khatun@example.com',
    phoneNo: '+880 1877-890123',
    doB: '1992-08-04',
    address: '5 Uttara Sector 7, Dhaka',
    about: 'Helping buyers and renters navigate Dhaka\'s fast-moving property market.',
    userType: 'User',
    avatar: 'https://i.pravatar.cc/300?img=49',
  },
  {
    userId: 8,
    name: 'Farhan Alam',
    email: 'farhan.alam@example.com',
    phoneNo: '+880 1966-901234',
    doB: '1987-12-19',
    address: '22 Mirpur 10, Dhaka',
    about: 'Property investor looking for high-yield rental opportunities.',
    userType: 'User',
    avatar: 'https://i.pravatar.cc/300?img=33',
  },
  {
    userId: 9,
    name: 'Admin Siddiqui',
    email: 'admin@propbd.com',
    phoneNo: '+880 1700-000001',
    doB: '1978-01-01',
    address: 'HQ, Motijheel, Dhaka',
    about: 'Platform administrator overseeing all listings and agent operations.',
    userType: 'Admin',
    avatar: 'https://i.pravatar.cc/300?img=60',
  },
];

const Users: React.FC<UserProps> = ({ darkMode, toggleDarkMode, user }) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchName, setSearchName] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Determine visible users based on role
  const visibleUsers = dummyUsers.filter(u => {
    if (u.userId === user?.userId) return false;
    if (user?.userType === 'User' || user?.userType === 'Agent') {
      return u.userType === 'Agent';
    }
    return true; // Admin sees all
  });

  useEffect(() => {
    let filtered = [...visibleUsers];
    if (searchName.trim()) {
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (userTypeFilter) {
      filtered = filtered.filter(u => u.userType === userTypeFilter);
    }
    setFilteredUsers(filtered);
  }, [searchName, userTypeFilter]);

  // Initialize on mount
  useEffect(() => {
    setFilteredUsers(visibleUsers);
  }, []);

  const isAdmin = user?.userType === 'Admin';

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="font-sans text-gray-900 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} />

        <div className="p-6 z-10 relative">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {isAdmin ? 'Users' : 'Agents'}
          </h1>

          <div className="flex space-x-4 mb-6">
            <input
              type="text"
              placeholder="Search by name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="p-2 rounded w-4/5 dark:bg-gray-50 dark:text-black bg-gray-700 text-white dark:border border"
            />
            {isAdmin && (
              <select
                value={userTypeFilter}
                onChange={(e) => setUserTypeFilter(e.target.value)}
                className="p-2 rounded w-1/3 dark:bg-gray-50 dark:text-black bg-gray-700 text-white dark:border border"
              >
                <option value="">All Types</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Agent">Agent</option>
              </select>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredUsers.map(u => (
              <div
                key={u.userId}
                onClick={() => setSelectedUser(u)}
                className="relative cursor-pointer transition hover:opacity-75 bg-gray-50 text-gray-900 dark:bg-gray-800 dark:text-white rounded p-4 shadow duration-300 hover:shadow-lg"
              >
                <img
                  src={u.avatar}
                  alt={`${u.name}'s profile`}
                  className="w-full h-64 object-cover rounded mb-2"
                  loading="lazy"
                  onError={e => (e.currentTarget.src = '/default-avatar.jpg')}
                />
                <h2 className="text-3xl font-medium mb-2">
                  <strong>{u.name}</strong>
                </h2>
                <p><strong>Email:</strong> {u.email}</p>
                <p className="mt-2">
                  <strong>Type:</strong> {u.userType}
                  {u.userType === 'Admin' && (
                    <> | <strong>ID:</strong> {u.userId}</>
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Detail Modal */}
          {selectedUser && (
            <div className="fixed mt-20 inset-0 bg-black/40 backdrop-blur-sm z-50 flex p-4 sm:p-6 overflow-y-auto">
              <div className="relative w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="absolute top-3 right-4 text-black dark:text-white text-3xl hover:text-red-500 transition-all duration-200"
                >
                  &times;
                </button>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-32 h-32 object-cover rounded-full border-4 border-cyan-500 shrink-0"
                    onError={e => (e.currentTarget.src = '/default-avatar.jpg')}
                  />
                  <div className="flex flex-col gap-1 text-gray-900 dark:text-white">
                    <h2 className="text-2xl font-bold mb-1">{selectedUser.name}</h2>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Phone:</strong> {selectedUser.phoneNo}</p>
                    <p><strong>Date of Birth:</strong> {selectedUser.doB}</p>
                    <p><strong>Address:</strong> {selectedUser.address}</p>
                    <p><strong>Type:</strong> {selectedUser.userType}</p>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 italic">"{selectedUser.about}"</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
