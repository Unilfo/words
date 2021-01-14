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

  useEffect(() => {
    let res = getRandomIntInclusive(0, words.wordSentences.length - 1)
    if (res === currentIndex) {
      res = getRandomIntInclusive(0, words.wordSentences.length - 1)
    }
    setCurrentIndex(res)
  }, [next])

  useEffect(() => {
    const foundWord = words.wordSentences[currentIndex]
    console.log('foundWord', foundWord)
    setCurrentWord(foundWord)
  }, [currentIndex])

  return (
    <div className="container">
      <Head>
        <title>Учим английский по разговорным фразам</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <div className='area'>
          <div className='wrapper'>
            {currentWord &&
            <div>
              <div className='text'><p>{currentWord.sentences}</p></div>
              <div className='translate'><p>{currentWord.translate}</p></div>
            </div>}
          </div>
          <div>
            <button className='btn_translate'><p>Перевести</p></button>
            <button className='btn_next' onClick={() => setNext(next + 1)}><p>Следующее</p></button>
          </div>
        </div>
      </main>
      <style jsx>{`
        .area {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .wrapper {
          position: absolute;
          width: 900px;
          height: 300px;
          left: calc(50% - 900px / 2 - 20px);
          top: calc(50% - 300px / 2 - 257px);

          background: rgba(34, 51, 49, 0.88);
          border: 1px solid #000000;
          box-sizing: border-box;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 30px;
        }

        .btn_translate {
          position: absolute;
          width: 200px;
          height: 50px;
          left: 490px;
          top: 290px;

          background: #F7FFC9;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .btn_next {
          position: absolute;
          width: 200px;
          height: 50px;
          left: 1095px;
          top: 290px;

          background: #F7FFC9;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .translate {
          position: absolute;
          width: 800px;
          height: 80px;
          left: 50px;
          top: 130px;
          background: #FFFFFF;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        p {
          font-family: Roboto;
          font-style: normal;
          font-weight: normal;
          font-size: 28px;
          line-height: 28px;
          display: flex;
          align-items: center;
          text-align: center;

          color: #000000;
        }

        .text {
          position: absolute;
          width: 800px;
          height: 80px;
          left: 50px;
          top: 30px;
          background: #FFFFFF;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
      <style global jsx>{`
        body {

        }
      `}</style>
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
