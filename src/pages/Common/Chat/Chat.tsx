import React, { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiSmile, FiPaperclip } from 'react-icons/fi';
import { fetchThreads } from '../../../services/Chat';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
}

interface User {
  id: number;
  other_user: {
    full_name:string;
    id:Number;
    profile_image:string;
  };
  last_message: string;
  profile_image: string;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users,setUsers]=useState<User[]|null>(null)

  const { registered } = useSelector((state: any) => state.register);
  const { isAuthenticated } = useSelector((state: any) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (registered) {
      navigate("/register");
    }
    const authTokens = localStorage.getItem("authTokens");

    if (!isAuthenticated && !authTokens) {
      navigate(-5);
    }
  }, [isAuthenticated, registered, navigate]);

  const ThreadFetching = async()=>{
    try{
      const result = await fetchThreads()
      console.log(result,'this is the result');
      setUsers(result)
    }catch(error){
      console.error('something issue with the thread fetching..');
      
    }
  }

  useEffect(()=>{
    ThreadFetching()
  },[])
  // const users: User[] = [
  //   { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', avatar: 'https://i.pravatar.cc/40?img=1' },
  //   { id: 2, name: 'Jane Smith', lastMessage: 'See you tomorrow!', avatar: 'https://i.pravatar.cc/40?img=2' },
  //   { id: 3, name: 'Emily Davis', lastMessage: 'Let’s meet at 5 PM', avatar: 'https://i.pravatar.cc/40?img=3' },
  // ];

  const handleSendMessage = () => {
    if (inputText.trim() === '' || !selectedUser) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');

    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: `This is a response to: "${inputText}"`,
        sender: 'assistant',
      };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for User List */}
      <div className={`flex flex-col ${selectedUser ? 'max-md:hidden md:w-1/3 lg:w-1/4' : 'w-full md:w-1/3 lg:w-1/4'} bg-white border-r border-gray-300`}>
        <div className="p-4 border-b border-gray-300">
          <h3 className="text-xl font-semibold px-2">Chats</h3>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {users?.map(user => (
            <li
              key={user?.id}
              className={`flex items-center p-3 px-6 cursor-pointer hover:bg-gray-100 ${selectedUser?.id === user.id ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedUser(user)}
            >
              <img src={user?.other_user.profile_image ?? 'https://tse1.mm.bing.net/th?q=blank%20pfp%20icon'} alt={user?.other_user.full_name} className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1">
                <h4 className="text-sm font-medium">{user?.other_user.full_name}</h4>
                <p className="text-xs text-gray-500 truncate">{user?.last_message}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className={`flex flex-col ${selectedUser ? 'w-full md:w-2/3 lg:w-3/4' : 'max-md:hidden md:w-2/3 lg:w-3/4'} bg-gray-100`}>
        {selectedUser ? (
          <>
            <div className="flex items-center p-4 border-b border-gray-300 bg-white">
              {selectedUser && (
                <>
                  <img src={selectedUser?.other_user.profile_image ?? 'https://tse1.mm.bing.net/th?q=blank%20pfp%20icon'} alt={selectedUser?.other_user.full_name} className="w-10 h-10 rounded-full mr-3" />
                  <h4 className="text-lg font-semibold">{selectedUser?.other_user.full_name}</h4>
                </>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 ">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-2.5 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.sender === 'assistant' && (
                      <img src="https://pagedone.io/asset/uploads/1710412177.png" alt="Assistant Avatar" className="w-10 h-11" />
                    )}
                    <div className={`grid ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {/* <h5 className={`text-sm font-semibold leading-snug pb-1 ${message.sender === 'user' ? 'text-gray-900' : ''}`}> */}
                        {/* {message.sender === 'user' ? 'You' : selectedUser?.name} */}
                      {/* </h5> */}
                      <div className={`px-3 py-2 rounded  ${message.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                        <h2 className="text-sm font-normal  leading-snug max-sm:text-xs">{message.text}</h2>
                      </div>
                      <div className="justify-end items-center inline-flex">
                        <h6 className="text-[9px] font-normal leading-4 py-1 text-gray-500 ">05:14 PM</h6>
                      </div>
                    </div>
                    {message.sender === 'user' && (
                      <img src="https://pagedone.io/asset/uploads/1704091591.png" alt="User Avatar" className="w-10 h-11" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className='p-3'>
              <div className="w-full pl-3 pr-1 py-1 rounded-3xl border border-gray-200 items-center gap-2 inline-flex justify-between bg-white">
                <div className="flex items-center gap-2 w-full">
                  <FiSmile className="text-indigo-600" size={22} />
                  <input
                    type="text"
                    className="grow shrink basis-0 w-full text-black text-xs font-medium leading-4 focus:outline-none"
                    placeholder="Type here..."
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    disabled={!selectedUser}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <FiPaperclip className="text-gray-500" size={22} />
                  <button onClick={handleSendMessage} className="flex px-3 py-2 bg-indigo-600 rounded-full shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            Select a user to start a chat
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
