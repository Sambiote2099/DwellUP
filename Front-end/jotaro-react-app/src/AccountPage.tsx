import React, { useState } from 'react';
import Navbar from './Navbar';

interface UserData {
  userId: number;
  name: string;
  email: string;
  userType: string;
  phoneNo: string;
  address: string;
  doB: string;
  nid: string;
  about: string;
}

interface AccountPageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: UserData;
  setUser: (user: UserData) => void;
}

const dummyUser: UserData = {
  userId: 101,
  name: 'Lamia Khatun',
  email: 'lamia.khatun@example.com',
  userType: 'User',
  phoneNo: '01877890123',
  address: '5 Uttara Sector 7, Dhaka',
  doB: '1992-08-04',
  nid: '1234567890',
  about: 'Looking for a comfortable apartment in Dhaka. Interested in long-term rentals near good schools and transport links.',
};

const dummyAvatar = 'https://i.pravatar.cc/300?img=47';

const AccountPage: React.FC<AccountPageProps> = ({ darkMode, toggleDarkMode }) => {
  const [user, setUser] = useState<UserData>(dummyUser);
  const [profileImage] = useState<string>(dummyAvatar);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<UserData>(dummyUser);

  const handleFieldChange = (field: keyof UserData, value: string) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  const updateCredentials = () => {
    if (!/^[0-9]{11}$/.test(editedUser.phoneNo)) {
      alert('Phone number must be exactly 11 digits.');
      return;
    }
    setUser(editedUser);
    setEditMode(false);
  };

  const cancelEdit = () => {
    setEditedUser(user);
    setEditMode(false);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} />

        <div className="container bg-white dark:bg-gray-900 opacity-90 z-10 relative mx-auto p-10 flex flex-col-reverse lg:flex-row justify-between items-start text-2xl space-y-10 lg:space-y-0 lg:space-x-10">

          {/* User Details */}
          <div className="flex-1 space-y-6">
            {editMode ? (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <input
                  type="date"
                  value={editedUser.doB}
                  onChange={e => handleFieldChange('doB', e.target.value)}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 px-8 py-4 rounded w-full sm:w-[600px]"
                />
                <input
                  value={editedUser.email}
                  onChange={e => handleFieldChange('email', e.target.value)}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 px-8 py-4 rounded w-full sm:w-[600px]"
                  placeholder="Enter your email"
                />
                <input
                  value={editedUser.phoneNo}
                  onChange={e => {
                    const numeric = e.target.value.replace(/\D/g, '');
                    if (numeric.length <= 11) handleFieldChange('phoneNo', numeric);
                  }}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 px-8 py-4 rounded w-full sm:w-[600px]"
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="Enter your phone number"
                />
                <input
                  value={editedUser.address}
                  onChange={e => handleFieldChange('address', e.target.value)}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 px-8 py-4 rounded w-full sm:w-[600px]"
                  placeholder="Enter your address"
                />
                <p><strong>Type:</strong> {user.userType} | <strong>ID:</strong> {user.userId}</p>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Type:</strong> {user.userType} | <strong>ID:</strong> {user.userId}</p>
                <p><strong>Date of birth:</strong> {user.doB}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone No:</strong> {user.phoneNo}</p>
                <p><strong>Address:</strong> {user.address}</p>
              </>
            )}

            <input
              type="text"
              value={`NID: ${user.nid}`}
              readOnly
              disabled
              className="font-bold bg-gray-800 text-gray-300 dark:bg-gray-300 dark:text-gray-800 px-8 py-4 rounded border border-white w-full sm:w-[600px]"
            />

            <div className="flex flex-wrap gap-6 mt-6">
              {!editMode ? (
                <button
                  className="bg-slate-800 hover:bg-emerald-500 text-white dark:bg-slate-200 dark:hover:bg-emerald-500 dark:text-black px-8 py-4 rounded text-2xl transition-all duration-700"
                  onClick={() => setEditMode(true)}
                >
                  <strong>Edit Credentials</strong>
                </button>
              ) : (
                <>
                  <button
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-2xl text-[20px]"
                    onClick={updateCredentials}
                  >
                    <strong>Update Profile</strong>
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-500 text-white px-8 py-2 rounded-2xl text-[20px]"
                    onClick={cancelEdit}
                  >
                    <strong>Cancel</strong>
                  </button>
                </>
              )}
            </div>

            <div className="mt-2">
              <div className="text-[35px] mb-3"><strong>About</strong> 📝</div>
              {editMode ? (
                <textarea
                  value={editedUser.about}
                  onChange={e => handleFieldChange('about', e.target.value)}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 px-6 py-4 rounded w-full sm:w-[600px] h-[200px] resize-none overflow-y-auto"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <div className="text-gray-800 dark:text-gray-300 text-[20px] py-2 rounded w-full sm:w-[600px] max-h-[200px] overflow-y-auto whitespace-pre-wrap">
                  {user.about || 'No information provided.'}
                </div>
              )}
            </div>
          </div>

          {/* Profile Image */}
          <div className="mt-10 lg:mt-0 text-center lg:ml-0 xl:ml-14">
            <div className="w-[400px] h-[480px] border-4 border-transparent rounded overflow-hidden mx-auto md:mx-0">
              <img
                src={profileImage}
                alt="Profile"
                className="object-cover w-full h-full"
                onError={e => (e.currentTarget.src = '/default-avatar.jpg')}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AccountPage;
