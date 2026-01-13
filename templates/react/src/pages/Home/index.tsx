import useCounterStore from '@/store/counter'

const Home = () => {
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)

  return (
    <>
      <h1>Home</h1>

      <button onClick={increment}>{count}</button>
    </>
  )
}

export default Home
