import { useEffect } from "react";

export default function Messages({ messages, setMessage }) {
  useEffect(() => {
    if (messages.length > 0) {
      const timeouts = messages.map((message) => {
        return setTimeout(() => {
          setMessage((prevMessages) =>
            prevMessages.filter((m) => m.id !== message.id)
          );
        }, 3000);
      });

      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
  }, [messages, setMessage]);

  return (
    <div className="messageContainer">
      {messages.map((message, i) => (
        <div key={i} className={`alert ${message.type}`} role="alert">
          {message.message}
        </div>
      ))}
    </div>
  );
}
