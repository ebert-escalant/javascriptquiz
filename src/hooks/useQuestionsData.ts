import { useQuestionsStore } from "../store/questions"

export const useQuestionsData = () => {
  const questions = useQuestionsStore((state) => state.questions)

  let correctAnswers = 0
  let wrongAnswers = 0
  let unanswered = 0

  for (const question of questions) {
    if (question.selectedAnswer === undefined) unanswered++
    else if (question.selectedAnswer === question.correctAnswer) correctAnswers++
    else wrongAnswers++
  }

  return { correctAnswers, wrongAnswers, unanswered }
}