import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import Loader2 from '../components/Loaders/Loader2';
import UserCard from '../components/UserCard';
import { useSearchParams } from 'react-router-dom';

function Search() {

    const mode = useSelector((state) => state.mode.mode);

    const [input, setInput] = useState("");
    const [searchedUsers, setSearchedUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams();

    const searchUser = async (input) => {
        setIsLoading(true)
        try {
            setSearchParams({ query: input }); // put in URL
            const res = await axiosInstance.get("/api/v1/users/searchuser", {
                params: {
                    userToSearch: input.trim()
                }
            });
            setSearchedUsers(res.data.data);
        } catch (error) {
            console.log("error occurred while searching a user", error);
        } finally {
            setIsLoading(false)
            setInput("")
        }
    };

    // On mount, check URL query param
    useEffect(() => {
        const query = searchParams.get("query");
        if (query) {
            setInput(query);
            searchUser(query);
        }
    }, [searchParams]);


    return (
        <div className='py-13 flex flex-col xl:w-[80vw] xl:absolute right-0'>
            <div className='flex items-center justify-center gap-2 h-20 md:hidden'>
                <div className='flex items-center justify-center gap-2 border-1 rounded-full'>
                    <input
                        type="text"
                        className='w-[77vw] border-0 focus:outline-none px-2 lg:w-[50vw]'
                        placeholder='enter name or username'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <i
                        className={`fa-solid fa-magnifying-glass text-xl cursor-pointer p-2 rounded-full ${mode == 'light' ? 'bg-[#f9ded1]' : 'bg-[#242424] text-[#d3d3d3]'}`}
                        onClick={() => searchUser(input)}
                    ></i>
                </div>
            </div>

            <div className='flex flex-col w-full items-center gap-3 md:mt-5'>
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
                {
                    searchedUsers?.length == 0 &&
                    <div className='h-[70vh] flex items-center justify-center'>
                        <h1 className='text-[18px]'>No users found with this name or username !!</h1>
                    </div>
                }
                {
                    isLoading && <Loader2 />
                }
            </div>
        </div>
    );
}

export default Search;