import React, { FC, ReactElement, ReactNode } from 'react';

// Components
import Header from 'components/Header';
import Footer from 'components/Footer';

// Styles
import classes from './PageLayout.module.scss';

interface IProps {
  children: ReactNode;
}

const PageLayout: FC<IProps> = ({ children }): ReactElement => {
  return (
    <div className={classes.maxHeight}>
      <Header />
      <div className={classes.children}>{children}</div>
      <Footer />
    </div>
  );
};

export default PageLayout;
