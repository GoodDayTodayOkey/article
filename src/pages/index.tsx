import { block } from 'bem-cn';
import Articles from './articles/[slug]';

export const config = { amp: true };

const b = block('home-page');

const HomePage = (props) => {
  return (
    <div className={b()}>
      <Articles />
    </div>
  )
}

HomePage.getInitialProps = () => {
  return { isServer: false }
}

export default HomePage;
