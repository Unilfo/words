import Head from 'next/head'
import {useState, useEffect} from 'react'

export default function Home({data: serverData}) {

  const [word, setWord] = useState(serverData)
  const [translate, setTranslate] = useState(null)
  const [nextWord, setNextWord] = useState(false)

  useEffect(() => {
    async function load() {
      const res = await fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', {
        'method': 'GET',
        'headers': {
          'x-rapidapi-key': 'c496f53ae9msh1eff2547b2c0d10p1fceb5jsn5cee8e3ac299',
          'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
        },
      })
      const data = await res.json()
      setWord(data)
    }

    if(!serverData || nextWord){
      load()
      setNextWord(false)
    }
  }, [nextWord])

  // useEffect(()=>{
  //
  // },[setNextWord])

  if(!word){
    return (<div>Loading...</div>)
  }


return (
  <div className="container">
    <Head>
      <title>Английский</title>
      <link rel="icon" href="/favicon.ico"/>
    </Head>

    <main>
      <div>
        <div>
          {<p>Слово: {word.word}</p>}
        </div>
        <div>
          {<p>Описание: {word.results? word.results[0].definition: 'Отсутствует'}</p>}
        </div>
        <div>
          {translate && <p>Перевод: {translate}</p>}
        </div>
        <div>
          <button>Перевести</button>
          <button onClick={()=> setNextWord(true)}>Следующее</button>
        </div>
      </div>
    </main>

    <footer>

    </footer>


  </div>
)
}

export async function getServerSideProps(context) {
  const res = await fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', {
    'method': 'GET',
    'headers': {
      'x-rapidapi-key': 'c496f53ae9msh1eff2547b2c0d10p1fceb5jsn5cee8e3ac299',
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
    },
  })
    .catch(err => {
      console.error('ERROR', err)
    })

  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {data},
  }
}
