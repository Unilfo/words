import Head from 'next/head'
import {useState, useEffect} from 'react'

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function Home({data: serverData}) {
  const [words, setWords] = useState(serverData)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [currentWord, setCurrentWord] = useState(null)
  const [next, setNext] = useState(0)

  useEffect(()=>{
    let res = getRandomIntInclusive(0, words.wordSentences.length -1 )
    if(res === currentIndex){
      res = getRandomIntInclusive(0, words.wordSentences.length -1 )
    }
    setCurrentIndex(res)
  },[next])

  useEffect(()=>{
    const foundWord = words.wordSentences[currentIndex]
    console.log('foundWord', foundWord)
    setCurrentWord(foundWord)
  },[currentIndex])

  return (
    <div className="container">
      <Head>
        <title>Учим английский по разговорным фразам</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <div>
          <div>
            {currentWord && <div>
              <p>{currentWord.sentences}</p>
              <p>{currentWord.translate}</p>
            </div>}
          </div>
          <div>
            <button>Перевести</button>
            <button onClick={()=> setNext(next + 1)}>Следующее</button>
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
