import { ZeitProvider, CssBaseline } from '@zeit-ui/react';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [themeType, setThemeType] = useState('light');
  const switchThemes = () => {
    setThemeType((lastThemeType) => (lastThemeType === 'dark' ? 'light' : 'dark'));
  };
  return (
    <ZeitProvider theme={{ type: themeType }}>
      <CssBaseline />
      <Component {...pageProps} changeTheme={switchThemes} />
    </ZeitProvider>
  );
}
export default MyApp;
