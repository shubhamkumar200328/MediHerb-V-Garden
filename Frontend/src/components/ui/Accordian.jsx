import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const Accordion = ({ children }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion-container">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isOpen: openIndex === index,
          onToggle: () => toggle(index),
        }),
      )}
    </div>
  );
};

Accordion.propTypes = {
  children: PropTypes.node,
};

AccordionItem.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export const AccordionItem = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="accordion-item">
      <div
        className="accordion-title"
        onClick={onToggle}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        {title}
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};
