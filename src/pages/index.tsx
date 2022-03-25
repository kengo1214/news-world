import Head from "next/head";
import MainLayout from "../layouts";
import styles from "../styles/Home.module.scss";
import Article from "../components/article";

export default function Home(props) {
  // console.log(props.topArticles);
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>

      <div className={styles.main}>
        <Article title="headlines" articles={props.topArticles} />
      </div>
    </MainLayout>
  );
}

//=====getStaticProps関連=====

export async function getStaticProps() {
  const pageSize = 10; //取得したいページ数
  const Topres = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=4be359565c11461ba6a14d0d547aca4a`
  );

  const topJson = await Topres.json();
  const topArticles = topJson?.articles;

  return {
    props: {
      topArticles,
    },
    revalidate: 60 * 10,
  };
}

//↓ 記事の書き方↓

// export const getStaticProps = async () => {
//   // NewsAPIのトップ記事の情報を取得

//   const pageSize = 10; //取得したいページ数
//   const topRes = await fetch(
//     `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=4be359565c11461ba6a14d0d547aca4a`
//   );

//   const topJson = await topRes.json();
//   const topArticles = topJson?.articles;

//   return {
//     props: {
//       topArticles,
//     },
//     revalidate: 60 * 10,
//   };
// };
