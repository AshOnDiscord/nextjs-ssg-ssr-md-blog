import {
  initializeApp,
  cert,
  deleteApp,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as serviceAccount from "../firebaseToken.json";

export default function Home(props: any) {
  const posts = props.posts ? JSON.parse(props.posts) : null;

  if (!posts) {
    return <h1>No posts</h1>;
  }

  console.log(posts);

  return (
    <ul>
      {posts.map((post: any) => {
        return (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>
              {post.data.md.split("\n")[0].slice(2)}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export async function getStaticProps() {
  const app = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });

  const db = getFirestore();

  const posts = await db.collection("posts").limit(25).get();

  deleteApp(app);

  console.log(posts);

  return {
    props: {
      posts: posts.empty
        ? null
        : JSON.stringify(
            posts.docs.map((doc) => {
              return {
                id: doc.id,
                data: doc.data(),
              };
            })
          ),
    },
  };
}
