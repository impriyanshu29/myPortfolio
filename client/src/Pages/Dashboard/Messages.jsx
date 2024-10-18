import React, { useEffect, useState } from 'react';

function Messages() {
    const [messages, setMessages] = useState([]);
    const [error ,setError] = useState(" ");
    const [successMessage,setSuccessMessage] = useState(" ")
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/message/getMessage`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message);
                }
                setMessages(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMessages();
    }, []);

    console.log(messages);

    const handleDelete = async(_id) =>{
        try {

            const res = await fetch(`${apiUrl}/api/message/deleteMessage?_id=${_id}`,{
                method : "DELETE"

            })
            const data = await res.json
            if(!res.ok){
                throw new Error(data.message)
            }

            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex w-full flex-col items-center space-y-4">
            {messages?.map((mess, index) => (
                <div key={index} className="w-full mx-auto justify-center max-w-2xl p-4 border rounded-md">
                    <h1 className="text-lg font-semibold">
                        {mess?.first_name} {mess.last_name}
                    </h1>
                    <p className="mt-3 text-sm text-gray-600">
                      {mess?.message}
                    </p>
                    
                    <div className="mt-3 flex items-center space-x-2">
                    <button
                    onClick = {() => handleDelete(mess?._id)}
                    className=" bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-yellow-600 hover:text-white font-bold py-2 px-4 rounded-3xl transition duration-300 ease-in-out">
                        <div className="flex gap-3 items-center">Delete</div>
                      </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Messages;
