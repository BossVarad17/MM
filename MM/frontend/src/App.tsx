import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Header from './components/Header';

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Check for an active session when the app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes in authentication state (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup the listener when the component unmounts
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    // If no user is logged in, show the Supabase Auth UI
    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '320px' }}>
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
            </div>
        </div>
    )
  } else {
    // If a user is logged in, show the main application
    return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat session={session} />} />
        </Routes>
      </>
    );
  }
}

export default App;
