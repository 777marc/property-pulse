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

  return <MessageCard message={{ sender: "123" }} />;
};

export default Messages;
