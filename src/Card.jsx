function Card ({name, kanji, src, handleClick, clicked, index,arr, setArr, shuffleArr}) {
  return (
    <div
      className="card"
      id={name}
      onClick={() => {
        handleClick(clicked)
        if (!clicked) {
          const obj = {name: name, kanji: kanji, src: src, clicked: true}
          const newArr = [...arr]
          newArr[index] = obj;
          shuffleArr(newArr, setArr)
        } else {
          shuffleArr(arr, setArr)
        }
      }}
    >
      <img src={src} alt={name}/>
      <div>
        <p>{name}</p>
        <p>{kanji}</p>
      </div>
    </div>
  )
}
export default Card;