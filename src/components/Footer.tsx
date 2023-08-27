import { useQuestionsData } from '../hooks/useQuestionsData'
import { useQuestionsStore } from '../store/questions'

const Footer = () => {
  const { correctAnswers, wrongAnswers, unanswered } = useQuestionsData()
  const reset = useQuestionsStore((state) => state.reset)

  return (
    <footer className='mt-4'>
      <div className='flex flex-col items-center'>
        <strong className='text-center'>{`✅ ${correctAnswers} correctas - ❌ ${wrongAnswers} incorrectas - ❓ ${unanswered} sin responder`}</strong>
        <button
          type='button'
          className='mt-4 py-1 px-2 rounded text-cyan-600 flex items-center justify-center hover:bg-cyan-100 hover:bg-opacity-10'
          onClick={() => reset()}
        >
          Reiniciar juego
        </button>
      </div>
    </footer>
  )
}

export default Footer