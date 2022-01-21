import { createContext, useState, useEffect } from 'react'
import {
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query
} from 'firebase/firestore'
import { db } from '../firebase.config'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch feedback
  const fetchFeedback = async () => {
    const feedbacks = []
    try {
      // Get reference
      const feedbackRef = collection(db, 'feedbacks')
      // Create a query
      const q = query(
        feedbackRef,
      )
      // Execute query
      const querySnap = await getDocs(q)
      querySnap.forEach((doc) => {
        let feedback = {id: doc.id, ...doc.data()};
        return  feedbacks.push(feedback);
      })

    } catch (error) {
    }
    setFeedback(feedbacks)
    setIsLoading(false)
  }

  // Add feedback
  const addFeedback = async (newFeedback) => {

    const docRef = await addDoc(collection(db, 'feedbacks'), newFeedback)
    newFeedback = {id: docRef.id, ...newFeedback}
    setFeedback([newFeedback, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'feedbacksgit ', id))
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Update feedback item
  const updateFeedback = async (id, updItem) => {
 
    const feedbackRef = doc(db, 'feedbacks', id)
    await updateDoc(feedbackRef, updItem)
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
