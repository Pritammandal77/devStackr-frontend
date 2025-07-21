import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createOrFetchChat } from '../../utils/ChatAPI';

function ChatMessages() {

  const { id } = useParams()
  console.log(id, "userId")

  const handleCreateChat = async(id) => {
    const response = await createOrFetchChat(id)
    console.log(response)
  }

  useEffect(() => {
    handleCreateChat(id)
  }, []);

  return (
    <>
      <div className='py-13 flex flex-col  xl:w-[80vw] xl:absolute right-0 xl:justify-center xl:items-center'>
        <p>chat messages page</p>
        {
          id && id
        }
      </div>

    </>
  );
}

export default ChatMessages;
