import Head from "next/head";
import MainLayout from "../layouts/index";
import styles from "../styles/Home.module.scss";
import Article from "../components/article";
import Nav from "../components/nav";

export default function Home(props) {
  return (
    <MainLayout>
      <Head>
        <title>News World</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main}>
          <Article title="headlines" articles={props.topArticles} />
        </div>
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
