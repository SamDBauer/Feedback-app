import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

//to create a context
const FeedbackContext = createContext()

// to create a provider
const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    { id: 1, text: 'This is from context', rating: 10 },
    { id: 2, text: 'This is from context2', rating: 8 },
    { id: 3, text: 'This is from context3', rating: 9 },
  ])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true })
  }

  const updateFeedback = (id, updItem) => {
    updItem.id = id
    setFeedback(feedback.map((item) => (item.id === id ? updItem : item)))
  }
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
        setFeedbackEdit,
        feedbackEdit,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}
//  default export of the context
export default FeedbackContext
export { FeedbackProvider } //named export of the provider
