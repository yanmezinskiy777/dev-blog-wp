import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/structure/Layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
  <Layout>
    <div className={styles.container}>
      
      <main>
          <h1>Dev Blog</h1>
      </main>

      <footer>
      
      </footer>
    </div>
  </Layout>
  )
}

export default Home
