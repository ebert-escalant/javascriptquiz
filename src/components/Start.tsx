import { PlayIcon } from '../assets/icons'
import { useQuestionsStore } from '../store/questions'

const LIMIT_QUESTIONS = 10

const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS)
  }

  return (
    <div className='flex items-center justify-center mt-4'>
      <button
        type='button'
        className='flex items-center justify-center border-2 border-cyan-600 rounded-full px-3 py-1 text-cyan-400 cursor-pointer shadow hover:shadow-cyan-600 hover:text-cyan-200'
        onClick={handleClick}
      >
        <PlayIcon className='mr-2' />¡Empezar!
      </button>
    </div>
  )
}

export default Start