import { NextPage } from 'next'
import { block } from 'bem-cn';
import { withRedux } from '../lib/redux'
import Articles from './articles/[slug]';

// export const config = { amp: true };

const b = block('home-page');

const HomePage = (props) => {
  return (
    <div className={b()}>
      <Articles />
    </div>
  )
}

HomePage.getInitialProps = ({ reduxStore }) => {
  console.log(reduxStore.getState());
  return { isServer: false }
}

export default withRedux(HomePage);
