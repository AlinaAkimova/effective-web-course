import React, { FC, ReactElement, ReactNode, useContext } from 'react';

// Context
import DarkMode from 'darkMode/DarkMode';

// Components
import Header from 'components/Header';
import Footer from 'components/Footer';

// Styles
import classes from './DetailedPageLayout.module.scss';

interface IProps {
  children: ReactNode;
}

const DetailedPageLayout: FC<IProps> = ({ children }): ReactElement => {
  const { mode } = useContext(DarkMode);

  return (
    <div
      className={`${classes.maxHeight} ${
        mode === 'light' ? classes.light : classes.dark
      } `}
    >
      <Header />
      <div
        className={`${classes.children} ${
          mode === 'light' ? classes.light : classes.dark
        } `}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default DetailedPageLayout;
