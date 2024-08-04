import React, { useEffect } from 'react';

const Index = (func, delay, deps = []) => {
    useEffect(() => {
        const handler = setTimeout(() => {
            func();
        }, delay);
    
        return () => {
          clearTimeout(handler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, deps);
};

export default Index;