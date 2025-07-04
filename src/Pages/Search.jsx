import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import Loader2 from '../components/Loaders/Loader2';
import UserCard from '../components/UserCard';
import { useSearchParams } from 'react-router-dom';

function Search() {

    const mode = useSelector((state) => state.mode.mode);
    const [input, setInput] = useState("");
    const [searchedUsers, setSearchedUsers] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const searchUser = async (searchTerm) => {
        try {
            setSearchParams({ query: searchTerm }); // ✅ put in URL
            const res = await axiosInstance.get("/api/v1/users/searchuser", {
                params: {
                    userToSearch: searchTerm
                }
            });
            setSearchedUsers(res.data.data);
        } catch (error) {
            console.log("error occurred while searching a user", error);
        }
    };

    // 🔁 On mount, check URL query param
    React.useEffect(() => {
        const query = searchParams.get("query");
        if (query) {
            setInput(query);
            searchUser(query);
        }
    }, []);

    return (
        <div className='py-13 flex flex-col xl:w-[80vw] xl:absolute right-0'>
            <div className='flex items-center justify-center gap-2 h-20'>
                <div className='flex items-center justify-center gap-2 border-1 rounded-full'>
                    <input
                        type="text"
                        className='w-[77vw] border-0 focus:outline-none px-2'
                        placeholder='enter name or username'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <i
                        className="fa-solid fa-magnifying-glass text-2xl bg-gray-400 p-2 rounded-full"
                        onClick={() => searchUser(input)}
                    ></i>
                </div>
            </div>

            <div className='flex flex-col w-full items-center gap-3'>
                {searchedUsers?.length > 0 &&
                    searchedUsers.map((data, index) => (
                        <UserCard
                            key={index}
                            id={data._id}
                            profilePicture={data.profilePicture}
                            name={data.name}
                            userName={data.userName}
                            bio={data.bio}
                            isFollowBtnVisible={false}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Search;