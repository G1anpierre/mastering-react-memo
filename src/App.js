import './App.css'
import {useState, memo, useMemo, useCallback} from 'react'

const Swatch = ({params, onClick}) => {
  console.log('Swatch is re-rendering')

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{backgroundColor: params.color, width: 75, height: 75}}></div>
      <button onClick={() => onClick()}>do a click</button>
    </div>
  )
}

// * Memo first option solution: Compare its prevProps with nextProps
// * for objects and arrays that are compared by reference.

// const MemoizeSwatch = memo(Swatch, (prevProps, nextProps) => {
// console.log('What is it ? :', prevProps.params.color)
// return prevProps.params.color === nextProps.params.color
// })

const MemoizeSwatch = memo(Swatch)

function App() {
  const [state, setState] = useState(0)
  const [color, setColor] = useState('red')

  const handleSum = () => {
    setState(prev => prev + 1)
  }

  const handleColor = () => {
    setColor(color === 'red' ? 'blue' : 'red')
  }

  const params = useMemo(() => ({color}), [color])
  const onClick = useCallback(() => {
    console.log('I have made a memoize click')
  }, [])

  console.log('App is re-rendering')

  return (
    <div className="App">
      <div>
        <div>{state}</div>
        <button onClick={handleSum}>re-render Sum</button>
        <button onClick={handleColor}>re-render Swatch</button>
      </div>
      <div>
        <MemoizeSwatch params={params} onClick={onClick} />
        {/* <Swatch params={params} onClick={onClick} /> */}
        {/* <MemoizeSwatch params={{color}} /> */}
      </div>
    </div>
  )
}

export default App
