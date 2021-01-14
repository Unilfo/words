import Head from 'next/head'
import {useState, useEffect} from 'react'

export default function WordsAdd({data: serverData}) {
  const [data, setData] = useState(serverData)

  return (
    <div className="container">
      <Head>
        <title>Учим английский по разговорным фразам</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <div>
          <div>
            <input type="text"/>
            <div>
              {data && data.wordSentences.map((el) => (
                <p key={el.id}>id: {el.id} Текст: {el.sentences} Перевод: {el.translate} </p>))}
            </div>
          </div>
          <div>

          </div>
          <div>
            <button>Отмена</button>
            <button>Сохранить</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const data = require('../db/data.JSON')

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {data},
  }
}
