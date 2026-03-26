import { useState } from 'react';

import { Button, Heading } from '@/ui';
import { useTheme } from '@/contexts';

import styles from './App.module.scss';

function App() {
  const [count, setCount] = useState(0);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Heading>Hello world</Heading>

      <div className={styles.headerBar}>
        <section>
          <Heading level={2}>Pink button</Heading>
          <Button onClick={toggleTheme} className={styles.pinkButton}>
            {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          </Button>
        </section>

        <section>
          <Heading level={2}>Sizes</Heading>
          <div>
            <Button size="small" onClick={() => setCount((count) => count + 1)}>
              Count: {count}
            </Button>
            <Button onClick={() => setCount((count) => count + 1)}>
              Count: {count}
            </Button>
            <Button size="large" onClick={() => setCount((count) => count + 1)}>
              Count: {count}
            </Button>
          </div>
        </section>

        <section>
          <Heading level={2}>Intents</Heading>

          <Button
            onClick={() => setCount((count) => count + 1)}
            intent="primary"
          >
            Count: {count}
          </Button>

          <Button
            onClick={() => setCount((count) => count + 1)}
            intent="secondary"
          >
            Count: {count}
          </Button>
          <Button
            onClick={() => setCount((count) => count + 1)}
            intent="constructive"
          >
            Count: {count}
          </Button>
          <Button
            onClick={() => setCount((count) => count + 1)}
            intent="destructive"
          >
            Count: {count}
          </Button>
        </section>
      </div>
    </>
  );
}

export default App;
