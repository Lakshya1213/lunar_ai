import { useEffect } from 'react';
import { ProjectProvider, useProject } from './context/ProjectContext';
import { TopNav } from './components/layout/TopNav';
import { Sidebar } from './components/layout/Sidebar';
import { LandingScreen } from './components/screens/LandingScreen';
import { UnderstandView } from './components/views/UnderstandView';
import { PlanView } from './components/views/PlanView';
import { BuildView } from './components/views/BuildView';
import { DebugView } from './components/views/DebugView';
import { ExplainView } from './components/views/ExplainView';
import { LearnView } from './components/views/LearnView';

function MainLayout() {
  const { isLandingPage, activeStage, setActiveStage } = useProject();

  // Keyboard navigation shortcuts (1-6 to switch stages)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === '1') setActiveStage('understand');
      if (e.key === '2') setActiveStage('plan');
      if (e.key === '3') setActiveStage('build');
      if (e.key === '4') setActiveStage('debug');
      if (e.key === '5') setActiveStage('explain');
      if (e.key === '6') setActiveStage('learn');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveStage]);

  if (isLandingPage) {
    return <LandingScreen />;
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#09090b] text-[#f4f4f5] overflow-hidden selection:bg-zinc-800">
      {/* Top Application Bar */}
      <TopNav />

      {/* Main Body with Sidebar + Active View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Center / Right Workbench Stage */}
        <main className="flex-1 overflow-y-auto bg-[#09090b] relative">
          {activeStage === 'understand' && <UnderstandView />}
          {activeStage === 'plan' && <PlanView />}
          {activeStage === 'build' && <BuildView />}
          {activeStage === 'debug' && <DebugView />}
          {activeStage === 'explain' && <ExplainView />}
          {activeStage === 'learn' && <LearnView />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <MainLayout />
    </ProjectProvider>
  );
}
