import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
}

/**
 * MainContent component
 * A simple wrapper that holds the primary content for each page.
 * It uses props.children to render whatever is passed into it.
 */
const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main>
      {children}
    </main>
  );
};

export default MainContent;
