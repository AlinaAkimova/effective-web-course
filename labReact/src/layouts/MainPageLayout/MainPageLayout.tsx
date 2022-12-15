import React, {
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useEffect
} from 'react';

// Context
import DarkMode from 'DarkMode/DarkMode';

// Components
import Header from 'components/Header';
import Footer from 'components/Footer';

// Styles
import classes from './MainPageLayout.module.scss';

interface IProps {
  children: ReactNode;
}

const MainPageLayout: FC<IProps> = ({ children }): ReactElement => {
  const { mode } = useContext(DarkMode);

  // useEffect(() => {
  //   if (mode === 'dark') {
  //     document.body.classList.remove(classes.light);
  //     document.body.classList.add(classes.dark);
  //   } else {
  //     document.body.classList.remove(classes.dark);
  //     document.body.classList.add(classes.light);
  //   }
  // }, [mode]);

  return (
    <div
      className={`${classes.maxHeight} ${
        mode === 'light' ? classes.light : classes.dark
      } `}
    >
      <Header />
      <div className={classes.children}>{children}</div>
      <Footer />
    </div>
  );
};

export default MainPageLayout;
