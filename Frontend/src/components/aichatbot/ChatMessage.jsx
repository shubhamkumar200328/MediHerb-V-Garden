import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

const ChatMessage = ({ sender, text }) => {
  const isUser = sender === 'user';

  return (
    <div className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`p-4 rounded-2xl max-w-2xl shadow-md prose prose-sm
          ${
            isUser
              ? 'bg-green-300 text-right'
              : 'bg-white border border-gray-200 text-left'
          }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{text}</p>
        ) : (
          <ReactMarkdown
            components={{
              h1: (props) => (
                <h1 className="text-lg font-bold text-green-700" {...props} />
              ),
              h2: (props) => (
                <h2
                  className="text-base font-semibold text-green-600 mt-2"
                  {...props}
                />
              ),
              li: (props) => (
                <li className="ml-4 list-disc text-gray-700" {...props} />
              ),
              p: (props) => (
                <p className="leading-relaxed text-gray-800 mt-1" {...props} />
              ),
            }}
          >
            {text}
          </ReactMarkdown>
        )}
      </motion.div>
    </div>
  );
};

ChatMessage.propTypes = {
  sender: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ChatMessage;
