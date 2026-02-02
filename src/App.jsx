import { useEffect, useState } from 'react'
import './App.css'
import Card from './Card';

const JIKAN_API_EP = 'https://api.jikan.moe/v4/characters/'
const narutoCharactersMAL = {
  'Kaguya Otsutsuki': 108297,
  'Hagoromo Otsutsuki (Sage of Six Paths)': 57883,
  'Madara Uchiha': 53901,
  'Obito Uchiha': 2910,
  'Hashirama Senju': 12464,
  'Naruto Uzumaki': 17,
  'Sasuke Uchiha': 13,
  'Minato Namikaze': 2535,
  'Tobirama Senju': 12465,
  'Jiraiya': 2423,
  'Tsunade': 2767,
  'Orochimaru': 2455,
  'Hiruzen Sarutobi': 7571,
  'Pain (Nagato)': 3180,
  'Itachi Uchiha': 14,
  'Kisame Hoshigaki': 2672,
  'Shikamaru Nara': 2007,
  'Kakashi Hatake': 85
};

async function fetchData (setData) {
  const newArr = []
  for (const character in narutoCharactersMAL) {
    const resp = await fetch(`${JIKAN_API_EP}${narutoCharactersMAL[character]}`);
    const data = await resp.json();
    console.log(data)
    const src = data.data.images.jpg.image_url;
    const kanji = data.data.name_kanji;
    const obj = {src: src, name: character, kanji: kanji}
    newArr.push(obj)
  }
  setData(newArr);
}
function shuffleArr (arr, setArr) {
  const array = [...arr]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
    }
  setArr(array);
}
function App() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [arr, setArr] = useState([{null: true}])
  const setData = () => {
    if (arr[0].null) {
      fetchData(setArr)
    .then( () => {
      const newArr = [...arr]
      newArr.forEach(element => {
      element.clicked = false
    })});}
    else {
      const newArr = [...arr]
      newArr.forEach(element => {
        element.clicked = false
      })
    }
  }
  const handleClick = (clicked) => {
    if (clicked) {
      score > bestScore && setBestScore(score)
      setScore(0)
      setData()
    } else {
      setScore(score + 1)
    }
  }
  useEffect (() => {
    setData()
  }, [])
  return (
    <>
    <h1>Naruto Memory Card</h1>
    <div>
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
    </div>
    <div className='cards-container'>
      {arr.map((char, index) => (
        <Card 
          name={char.name} 
          key={`${char.name}-${index}`} 
          kanji={char.kanji} 
          src={char.src} 
          handleClick={handleClick} 
          clicked={char.clicked} 
          index={index} 
          arr={arr} 
          setArr={setArr}
          shuffleArr={shuffleArr}
        ></Card>
      ))}
    </div>
    </>
  )
}

export default App
