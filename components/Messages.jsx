"use client";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import MessageCard from "./MessageCard";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages`);

        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
          console.log("d", data);
        }
      } catch (error) {
        toast.error("something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {messages.lenth === 0 ? (
          <p>No messages Found</p>
        ) : (
          <section className="bg-blue-50">
            <div className="container m-auto py-24 max-w-6xl">
              <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
                {messages.map((message) => {
                  return <MessageCard key={message._id} message={message} />;
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default Messages;
