
import React, { useEffect } from 'react'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './components/dashboard/Dashboard'
import { StudyPage } from './components/study/StudyPage'
import { EstatisticasPage } from './components/stats/EstatisticasPage'
import { FavoritesPage } from './components/favorites/FavoritesPage'
import { SavedPage } from './components/saved/SavedPage'
import { DrLuzaumPage } from './components/drluzaum/DrLuzaumPage'
import { SimuladosPage } from './components/simulados/SimuladosPage'
import { AcervoPage } from './components/acervo/AcervoPage'
import { Routes, Route, useLocation } from 'react-router-dom'
import { initializeQuestionBank } from './utils/localStorage'
import { sampleQuestions } from './data/sampleQuestions'
import { AnimatePresence, motion } from 'framer-motion'

// Page transition wrapper component
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// Animated routes component
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Dashboard />
            </PageTransition>
          }
        />
        <Route
          path="/estudo"
          element={
            <PageTransition>
              <StudyPage />
            </PageTransition>
          }
        />
        <Route
          path="/simulados"
          element={
            <PageTransition>
              <SimuladosPage />
            </PageTransition>
          }
        />
        <Route
          path="/acervo"
          element={
            <PageTransition>
              <AcervoPage />
            </PageTransition>
          }
        />
        <Route
          path="/estatisticas"
          element={
            <PageTransition>
              <EstatisticasPage />
            </PageTransition>
          }
        />
        <Route
          path="/favoritas"
          element={
            <PageTransition>
              <FavoritesPage />
            </PageTransition>
          }
        />
        <Route
          path="/salvas"
          element={
            <PageTransition>
              <SavedPage />
            </PageTransition>
          }
        />
        <Route
          path="/drluzaum"
          element={
            <PageTransition>
              <DrLuzaumPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export function App() {
  // Initialize question bank with sample questions
  useEffect(() => {
    initializeQuestionBank(sampleQuestions)
  }, [])

  return (
    <Layout>
      <AnimatedRoutes />
    </Layout>
  )
}