import React, { useState, useCallback, useMemo } from 'react';
import { breadcrumbItems } from './constants';
import { Counter } from './counter';
import { Button } from './button';
import { Breadcrumb } from './breadcrumb';

function App() {
  const [currentVariant, setCurrentVariant] = useState("V2");

  const handleClick = useCallback(() => {
    const variants = Object.keys(breadcrumbItems);
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    setCurrentVariant(randomVariant);
  }, []);

  const currentItems = useMemo(() => breadcrumbItems[currentVariant], [currentVariant]);

  return (
    <>
      <div>
        <Breadcrumb
          items={currentItems}
        />
      </div>
      <Button onClick={handleClick}>Change variant</Button>
      <Counter />
    </>
  );
}

export default App;