import { NextPage } from 'next'
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { connect } from 'react-redux'

interface Props {
  slug?: string | string[];
  response?: any;
}

export const config = { amp: true };

const Articles: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>{`${props.slug}`}</title>
      </Head>
      <div>
        {`${props.slug}: ${props.response}`}
      </div>
    </>
    
  )
}

Articles.getInitialProps = async (context) => {
  const response = await fetch(`https://new-api.80.lv/articles/${context.query.slug}`).then(data => data.json());
  return { slug: context.query.slug, response };
}

export default Articles
