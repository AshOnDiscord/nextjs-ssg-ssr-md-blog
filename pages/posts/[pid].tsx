import { remark } from 'remark';
import html from 'remark-html';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export default function Post(props) {
  if (props.exists === false) {
    return (
      <h1>Hello, World!</h1>
    )
  }

  //console.log(props)

  return (
    <div dangerouslySetInnerHTML={{ __html: props.html }} />
  )
}

export async function getStaticPaths() {
  // ...
  return {
    paths: [
      {
        // You can add a cache of posts by getting a list of ids every build
        params: { pid: "SkhGTaNm8rjwTqeHFdJO" },
      },
    ],
    // In case a new post is created after the build or we don't implement the cache which we should do since it greatly decreases load speeds
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {

  const serviceAccount = require("../../firebaseToken.json");

  const app = initializeApp({
    credential: cert(serviceAccount)
  });

  const db = getFirestore();

  const doc = await db.collection("posts").doc(params.pid).get();
  // console.log(doc) 
  app.delete()

  if (!doc.exists) {
    return {
      props: {
        exists: false,
      }
    }
  }

  const processed = await remark().use(html).process(doc.data().md);
  const mdHtml = processed.toString();

  return {
    props: {
      html: mdHtml,
    },
  };
}

