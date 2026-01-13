import useCounterStore from '@/store/counter'

const About = () => {
  const count = useCounterStore((state) => state.count)

  return (
    <>
      <h1>About</h1>
      <p>{count}</p>
    </>
  )
}

export default About
