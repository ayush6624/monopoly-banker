import Head from 'next/head';
import { Radio, Card, Select, Text, Input, Button, Spacer } from '@geist-ui/react';
import { useEffect, useState, useCallback } from 'react';
import socket from '../lib/socket';
// import { useRouter } from 'next/router';
import Router from 'next/router';

export default function Home() {
  // const router = useRouter();
  const [name, setName] = useState('');
  const [notification, setNotification] = useState('');
  const [oldGame, setOldGame] = useState('');

  // First useEffect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let prevGame = window.localStorage.getItem('username');
      if (prevGame) {
        console.log('prev game ->  ', prevGame);
        setOldGame(prevGame);
      }
    }
  }, []);

  // Second useEffect
  useEffect(() => {
    console.log('socket listner accounces 1st useeffect');
    socket.on('notification', (n) => {
      console.log('index notifications -> ', n);
      setNotification(n);
    });
    return () => {
      console.log('turn off notification index');
      socket.off('notification');
    };
  }, []);

  // Third useEffect -> notification
  useEffect(() => {
    if (notification) console.log(notification);
    if (notification.message?.includes('has joined the game')) {
      window.localStorage.setItem('username', name);
      setTimeout(() => {
        Router.push('/game');
        // console.log('MOCK ROUTING TO /PAGE');
      }, 500);
    }
    return () => {
      console.log('notification and pushing unmount');
    };
  }, [notification]);

  return (
    <div className="container">
      <Head>
        <title>Monopoly Digital</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          <a>Digital Monopoly</a>
        </h1>

        <p className="description">Easy Financial Management</p>

        <Card hoverable shadow width="300px">
          <h4 align="center"> Enter Your Name </h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (name !== '') {
                socket.emit('register', name);
              }
            }}
          >
            <Input onChange={(e) => setName(e.target.value)}></Input>
            <Spacer y={0.5}></Spacer>
            <Button type="success" htmlType="submit">
              Proceed
            </Button>
          </form>

          {notification ? (
            <Text align="center" type={notification.type}>
              {notification.message}
            </Text>
          ) : (
            ''
          )}
          {oldGame ? (
            <>
              <Spacer y={0.5}></Spacer>
              <Button
                type="secondary"
                onClick={() => {
                  console.log('clicked on prev game');
                  Router.push('/game');
                }}
              >
                Join Previous Game!
              </Button>
            </>
          ) : (
            ''
          )}
        </Card>
      </main>

      <footer>
        <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
