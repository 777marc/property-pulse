"use client";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  useEffect(() => {
    setIsRead(message.read);
  }, []);

  const handleRead = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const data = await res.json();
        const { read } = data;
        toast.success(`Message marked as ${read ? "read" : "unread"}.`);
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
      }
    } catch (error) {
      toast.error("something went wrong.");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        toast.success(`Message deleted.`);
        setIsDeleted(true);
        setUnreadCount((prevCount) => prevCount - 1);
      }
    } catch (error) {
      toast.error("something went wrong.");
    }
  };

  if (!isDeleted)
    return (
      <>
        <div className="space-y-4">
          <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
            {!isRead && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
                New
              </div>
            )}
            <h2 className="text-xl mb-4">
              <span className="font-bold">Property Inquiry:</span>{" "}
              {message.property.name}
            </h2>
            <p className="text-gray-700">{message.body}</p>

            <ul className="mt-4">
              <li>
                <strong>Name:</strong> {message.sender.username}
              </li>

              <li>
                <strong>Reply Email:</strong>
                <a href={`mailto:${message.email}`} className="text-blue-500">
                  {" "}
                  {message.email}
                </a>
              </li>
              <li>
                <strong>Reply Phone:</strong>
                <a href={`tel:${message.phone}`} className="text-blue-500">
                  {" "}
                  {message.phone}
                </a>
              </li>
              <li>
                <strong>Received:</strong>{" "}
                {new Date(message.createdAt).toLocaleString()}
              </li>
            </ul>
            <button
              onClick={handleRead}
              className={`mt-4 mr-3 ${
                isRead ? "bg-gray-500" : "bg-blue-500 text-white"
              } py-1 px-3 rounded-md`}
            >
              {`Mark As ${isRead ? "Unread" : "Read"}`}
            </button>
            <button
              onClick={handleDelete}
              className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </>
    );
};

export default MessageCard;
