/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/Home';
import ProjectsPage from './pages/projects/Projects';
import AboutPage from './pages/about-me/AboutMe';
import ContactPage from './pages/contact/Contact';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';


function App() {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t('document_title');
  }, [t]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />} // Sử dụng Layout component ở đây
        >
          <Route index element={<HomePage />} />
          <Route path="/about-me" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
