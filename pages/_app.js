import { GeistProvider, CssBaseline } from '@geist-ui/react';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [themeType, setThemeType] = useState('light');
  const switchThemes = () => {
    setThemeType((lastThemeType) => (lastThemeType === 'dark' ? 'light' : 'dark'));
  };
  return (
    <GeistProvider theme={{ type: themeType }}>
      <CssBaseline />
      <Component {...pageProps} changeTheme={switchThemes} />
    </GeistProvider>
  );
}
export default MyApp;
