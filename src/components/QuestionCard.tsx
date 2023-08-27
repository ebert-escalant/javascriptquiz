import { Question } from './../types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionsStore } from '../store/questions'
import confettti from 'canvas-confetti'

const getBackgroundColor = (info: Question, index: number) => {
  const { selectedAnswer, correctAnswer } = info

  if (selectedAnswer !== undefined && correctAnswer === index) return 'bg-emerald-700 hover:bg-emerald-800'
  else if (selectedAnswer === index) return 'bg-rose-700 hover:bg-rose-800'

  return 'bg-transparent hover:bg-gray-700'
}

const QuestionCard = ({ info }: { info: Question }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  const handleClick = (answerIndex: number) => () => {
    const isCorrect = selectAnswer(info.id, answerIndex)

    if (isCorrect) confettti()
  }

  return (
    <div className='bg-gray-800 p-4 rounded'>
      <h5 className='text-lg'>{info.question}</h5>
      {info.code !== '' && (
        <SyntaxHighlighter
          language='javascript'
          style={gradientDark}
          className='rounded mt-4'
        >
          {info.code}
        </SyntaxHighlighter>
      )}
      <ul className={`mt-4 divide-y divide-gray-700 border-2 border-gray-700 overflow-hidden ${info.selectedAnswer !== undefined ? 'opacity-75' : ''}`}>
        {info.answers.map((answer, index) => (
          <li key={index}>
            <button
              type='button'
              className={`text-center w-full py-1 px-2 font-medium disabled:cursor-not-allowed ${getBackgroundColor(info, index)}`}
              onClick={handleClick(index)}
              disabled={info.selectedAnswer !== undefined}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuestionCard