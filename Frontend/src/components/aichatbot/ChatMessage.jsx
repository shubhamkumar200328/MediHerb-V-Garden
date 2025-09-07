import PropTypes from 'prop-types';

const ChatMessage = ({ sender, text }) => {
  const isUser = sender === 'user';

  return (
    <div className={`mb-2 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-2 rounded-lg max-w-xs ${
          isUser ? 'bg-green-300 text-right' : 'bg-gray-200'
        }`}
      >
        {text}
      </div>
    </div>
  );
};
ChatMessage.propTypes = {
  sender: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ChatMessage;
