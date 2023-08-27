import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { type Question } from "../types"

interface QuestionsState {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => boolean
  goToNextQuestion: () => void
  goToPreviousQuestion: () => void
  reset: () => void
}

export const useQuestionsStore = create<QuestionsState>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      const response = await fetch(`http://localhost:5173/data.json`)
      const data = await response.json()

      const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },
    selectAnswer: (questionId: number, answerIndex: number): boolean => {
      const { questions } = get()
      const newQuestions = structuredClone(questions)
      const questionIndex = newQuestions.findIndex((question: Question) => question.id === questionId)
      const questionInfo = newQuestions[questionIndex]

      if (questionInfo.selectedAnswer !== undefined) return false

      newQuestions[questionIndex] = {
        ...questionInfo,
        selectedAnswer: answerIndex,
        isCorrectAnswer: questionInfo.correctAnswer === answerIndex
      }

      set({ questions: newQuestions })

      return questionInfo.correctAnswer === answerIndex
    },
    goToNextQuestion: () => {
      const { questions, currentQuestion } = get()
      if (currentQuestion >= questions.length - 1) return
      set({ currentQuestion: currentQuestion + 1 })
    },
    goToPreviousQuestion: () => {
      const { currentQuestion } = get()
      if (currentQuestion <= 0) return
      set({ currentQuestion: currentQuestion - 1 })
    },
    reset: () => {
      set({ questions: [], currentQuestion: 0 })
    }
  }
}, {
  name: "questions",
  storage: createJSONStorage(() => localStorage)
}))