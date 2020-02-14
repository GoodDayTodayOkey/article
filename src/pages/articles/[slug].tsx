import { NextPage } from 'next'
import Head from 'next/head';
import React from 'react';
import fetch from 'isomorphic-unfetch';
import { block } from 'bem-cn';

interface Props {
  slug?: string | string[];
  response?: any;
}

const b = block('article');
export const config = { amp: true };

const Articles: NextPage<Props> = (props) => {
  const createMarkup = (html) => ({ __html: html })
  const renderContent = ({ type, content }) => {
    const types = {
      'editor': (content) => (
        < amp-fit-text width="300" height="200" layout="responsive" >
          <div dangerouslySetInnerHTML={createMarkup(content.text)} />
        </ amp-fit-text >
      ),
      'images': (content) => (
        <amp-carousel width="400"
          height="300"
          layout="responsive"
          type="slides">
          {content.images.map((image, i) => (
            <amp-img key={i} src={image.url.original}
              width="400"
              height="300"
              layout="responsive"
              alt="a sample image">
            </amp-img>)
          )}
        </amp-carousel>
      ),
      'image-widget': (content) => (
        <amp-img
          on="tap:lightbox1"
          role="button"
          tabindex="0"
          src={content.image.url.original}
          alt="Picture of a dog"
          title="Picture of a dog, view in lightbox"
          layout="responsive"
          width="600"
          height="400"></amp-img>
      ),
      'video': (content) =>
        (
          <amp-youtube width="480"
            height="270"
            layout="responsive"
            data-param-modestbranding="1"
            data-param-rel="1"
            data-videoid={content.url.replace("https://www.youtube.com/embed/", "").match(/^[\w-]+/)[0]}>
          </amp-youtube>

        ),
    }
    return types[type](content)
  }
  const texts = props.response.content.filter(child => child.type === "editor")
  return (
    <>
      <Head>
        <title>{`${props.slug}`}</title>
        <script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script>
        <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
        <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
      </Head>
      <div className={b()} >
        < amp-fit-text width="300" height="200" layout="responsive" >
          <div dangerouslySetInnerHTML={createMarkup(props.response.title)} />
        </ amp-fit-text >
        < amp-fit-text width="300" height="200" layout="responsive" >
          <div dangerouslySetInnerHTML={createMarkup(props.response.description)} />
        </ amp-fit-text >
        {props.response.content.map(child => {
          const { type, content } = child;
          return renderContent({ type, content })
        }
        )}
      </ div >
    </>

  )
}

Articles.getInitialProps = async (context) => {
  const response = await fetch(`https://new-api.80.lv/articles/${context.query.slug}`).then(data => data.json());
  return { slug: context.query.slug, response };
}

export default Articles
