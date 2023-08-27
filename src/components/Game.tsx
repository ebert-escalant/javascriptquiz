import { useQuestionsStore } from '../store/questions'
import QuestionCard from './QuestionCard'
import { NextIcon, PreviousIcon } from '../assets/icons'
import Footer from './Footer'

const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
  const goToNextQuestion = useQuestionsStore((state) => state.goToNextQuestion)
  const goToPreviousQuestion = useQuestionsStore((state) => state.goToPreviousQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <section className='mt-4'>
      <header className='flex items-center justify-center mb-4'>
        <button
          type='button'
          className='text-cyan-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-cyan-100 hover:bg-opacity-10 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-transparent'
          onClick={goToPreviousQuestion}
          disabled={currentQuestion <= 0}
        >
          <PreviousIcon className='w-4 h-4' />
        </button>
        <span className='mx-4 text-lg'>{currentQuestion + 1} / {questions.length}</span>
        <button
          type='button'
          className='text-cyan-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-cyan-100 hover:bg-opacity-10 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-transparent'
          onClick={goToNextQuestion}
          disabled={currentQuestion >= questions.length - 1}
        >
          <NextIcon className='w-4 h-4' />
        </button>
      </header>
      <QuestionCard info={questionInfo} />
      <Footer />
    </section>
  )
}

export default Game