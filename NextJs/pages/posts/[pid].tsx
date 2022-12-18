import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import {
  initializeApp,
  cert,
  deleteApp,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as serviceAccount from "../../firebaseToken.json";

interface postProps {
  html: string;
}

export default function Post(props: postProps) {
  if (!props) {
    return <h1>404</h1>;
  }

  //console.log(props)

  return (
    <div
      className="md h-screen"
      dangerouslySetInnerHTML={{ __html: props.html }}
    />
  );
}

export async function getStaticPaths() {
  // ...
  return {
    paths: [
      {
        // You can add a cache of posts by getting a list of ids every build
        params: { pid: "markdown-blog" },
      },
    ],
    // In case a new post is created after the build or we don't implement the cache which we should do since it greatly decreases load speeds
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: { params: { pid: string } }) {
  const app = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });

  const db = getFirestore();

  const doc = await db.collection("posts").doc(params.pid).get();
  // console.log(doc)
  deleteApp(app);

  let mdHtml: string = "";

  if (doc.exists) {
    const md = doc?.data()?.md;
    const processed = await remark().use(remarkGfm).use(html).process(md);
    mdHtml = processed.toString();
  }

  return {
    props: {
      html: mdHtml,
    },
  };
}
