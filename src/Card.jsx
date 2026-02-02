function Card ({name, kanji, src, handleClick, clicked, index,arr, setArr, shuffleArr}) {
  return (
    <div
      id={name}
      onClick={() => {
        handleClick(clicked)
        if (!clicked) {
          const obj = {name: name, kanji: kanji, src: src, clicked: true}
          const newArr = [...arr]
          newArr[index] = obj;
          shuffleArr(newArr, setArr)
          console.table(arr)
          console.table(newArr)
        }
      }}
    >
      <img src={src} alt={name}/>
      <p>{name}</p>
      <p>{kanji}</p>
    </div>
  )
}
export default Card;