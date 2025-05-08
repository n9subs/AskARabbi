import React from 'react';

// Regex to find URLs (http, https, or www)
const urlRegex = /(\b(?:https?:\/\/|www\.)[-\w+&@#/%?=~|!:,.;]*[-\w+&@#/%=~|])/g;

interface LinkifyProps {
  text: string | null | undefined;
}

/**
 * Takes a string and returns a ReactNode with URLs converted to clickable links.
 */
const Linkify: React.FC<LinkifyProps> = ({ text }) => {
  // Add a check for text being a string
  if (typeof text !== 'string' || !text) {
    return null; // Or return <>{text}</> if you prefer to render non-string, non-empty values
  }

  const parts = text.split(urlRegex);

  return (
    <React.Fragment>
      {parts.map((part, index) => {
        if (index % 2 === 1) { // URLs will be at odd indices due to the capturing group in split
          let urlToDisplay = part;
          let href = part;
          let trailingPunctuation = '';

          // Prepend http:// if the URL starts with www. and doesn't have a protocol
          if (href.startsWith('www.')) {
            href = `http://${href}`;
          }
          
          // Simple check for common trailing punctuation
          const punctuationMatch = urlToDisplay.match(/[.,!?;:]+$/);
          if (punctuationMatch) {
              trailingPunctuation = punctuationMatch[0];
              urlToDisplay = urlToDisplay.slice(0, -trailingPunctuation.length);
              // Also adjust href if punctuation was part of it before protocol prepending
              if (!href.startsWith('http://') && !href.startsWith('https://')) {
                href = href.slice(0, -trailingPunctuation.length);
              } else if (href.startsWith(`http://${urlToDisplay}${trailingPunctuation}`) || href.startsWith(`https://${urlToDisplay}${trailingPunctuation}`)) {
                 //This condition handles if href was already formed, like http://www.example.com. -> http://www.example.com
                 href = href.slice(0, -trailingPunctuation.length);
              }
          }

          return (
            <React.Fragment key={index}>
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[var(--primary)] hover:text-[var(--secondary)] underline underline-offset-2 break-words"
                onClick={(e) => e.stopPropagation()} // Prevent triggering collapse/expand if link is inside clickable header
              >
                {urlToDisplay} {/* Display the original matched part or the one without trailing punctuation */}
              </a>
              {trailingPunctuation} { /* Append any stripped punctuation */}
            </React.Fragment>
          );
        }
        return part;
      })}
    </React.Fragment>
  );
};

export default Linkify; 