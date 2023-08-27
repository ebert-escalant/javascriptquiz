import { JavaScriptLogo } from "./assets/icons"
import Game from "./components/Game"
import Start from "./components/Start"
import { useQuestionsStore } from "./store/questions"

const App = () => {
  const questions = useQuestionsStore((state) => state.questions)

  return (
    <main className='w-full min-h-screen h-full flex justify-center items-center'>
      <section className='p-4 rounded max-w-xl w-full'>
        <div className='flex items-center justify-center'>
          <JavaScriptLogo />
          <h1 className='text-4xl font-bold ml-2'>JavaScript quiz</h1>
        </div>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </section>
    </main>
  )
}

export default App
