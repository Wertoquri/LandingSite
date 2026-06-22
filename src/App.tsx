import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Shell } from './components/Shell';
import { I18nProvider } from './i18n';
import { Privacy, ThankYou } from './pages/StaticPages';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App(){return <I18nProvider><BrowserRouter><Shell><Suspense fallback={<div className="route-loader" aria-label="Loading"/>}><Routes><Route path="/" element={<Home/>}/><Route path="/work/:slug" element={<CaseStudy/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<Privacy/>}/><Route path="/thank-you" element={<ThankYou/>}/><Route path="*" element={<NotFound/>}/></Routes></Suspense></Shell></BrowserRouter></I18nProvider>}
