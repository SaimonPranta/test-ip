import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export const firebaseConfig = [
  {
    apiKey: "AIzaSyBLqxdOpoJRmtOEMbxa32fYx_nFvpBh7Gc",
    authDomain: "get-code-cb252.firebaseapp.com",
    projectId: "get-code-cb252",
    storageBucket: "get-code-cb252.appspot.com",
    messagingSenderId: "745352803812",
    appId: "1:745352803812:web:91068ddb8e44d027efc3f1",
  },
  {
    //all quota exceeded
    apiKey: "AIzaSyCC0Mq8vpWr0WsVUsom3nrsX032aq-5oto",
    authDomain: "micple--2.firebaseapp.com",
    projectId: "micple--2",
    storageBucket: "micple--2.appspot.com",
    messagingSenderId: "962057735616",
    appId: "1:962057735616:web:29fe7693f651243d910c25",
  },
  {
    //robi quata exceeded
    apiKey: "AIzaSyDKLD6_4H-Kg4pOm7X1fp9e78NB8bRP_9k",
    authDomain: "micple--3.firebaseapp.com",
    projectId: "micple--3",
    storageBucket: "micple--3.appspot.com",
    messagingSenderId: "689176755295",
    appId: "1:689176755295:web:2b0551ece2a249eb532fea",
  },
  {
    apiKey: "AIzaSyCktyRX8TktVciOrrFQZibPLk8VY7tMBu4",
    authDomain: "micple--4.firebaseapp.com",
    projectId: "micple--4",
    storageBucket: "micple--4.appspot.com",
    messagingSenderId: "866279508488",
    appId: "1:866279508488:web:c1b69e237c3c860d6e5fbd",
  },
  {
    apiKey: "AIzaSyDp6kn5WYuC_1sEO6cir8U8efaB4mdLYF8",
    authDomain: "micple--5.firebaseapp.com",
    projectId: "micple--5",
    storageBucket: "micple--5.appspot.com",
    messagingSenderId: "1012915540355",
    appId: "1:1012915540355:web:dd7ec000e17459165b26b6",
  },
  {
    apiKey: "AIzaSyCc4OkThF996CsePsm0Mjai1gY_sfDGNN0",
    authDomain: "micple--6.firebaseapp.com",
    projectId: "micple--6",
    storageBucket: "micple--6.appspot.com",
    messagingSenderId: "1028031399933",
    appId: "1:1028031399933:web:27f88813cfa686e992fb94",
  },
  {
    apiKey: "AIzaSyBIH7kjlq0p6U3Qo0nt7KeCqje-me61nSc",
    authDomain: "micple--7.firebaseapp.com",
    projectId: "micple--7",
    storageBucket: "micple--7.appspot.com",
    messagingSenderId: "577332232124",
    appId: "1:577332232124:web:8f2d32d84a6a9e503535b9",
  },
  {
    apiKey: "AIzaSyCi7hrNuFELBJKvsqPIMC4O-KraxfFLk4E",
    authDomain: "micple--8.firebaseapp.com",
    projectId: "micple--8",
    storageBucket: "micple--8.appspot.com",
    messagingSenderId: "369285193607",
    appId: "1:369285193607:web:637e99a2d44f28a703fd22",
  },
  {
    apiKey: "AIzaSyDxIdV4A6Emtlfk1P62Nw-1vrNt6QnygJE",
    authDomain: "micple--9.firebaseapp.com",
    projectId: "micple--9",
    storageBucket: "micple--9.appspot.com",
    messagingSenderId: "311017569812",
    appId: "1:311017569812:web:689f3199bb4e1f328cb101",
  },
  {
    apiKey: "AIzaSyDoCWJkPJ2U8tgj43PkJSvT27LjD7hNB2o",
    authDomain: "micple--10-30f03.firebaseapp.com",
    projectId: "micple--10-30f03",
    storageBucket: "micple--10-30f03.appspot.com",
    messagingSenderId: "343237315262",
    appId: "1:343237315262:web:e5f289b266d9410035acef",
  },
];

const useFirebaseAuth = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const calApi = async () => {
      const random = await new Promise((resolve, reject) => {
        const random = Math.floor(Math.random() * firebaseConfig.length);
        resolve(random);
      });
      const app = await initializeApp(firebaseConfig[random]);
      const auth = getAuth(app);
      setAuth(auth);
    };
    const timeout = setTimeout(calApi, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return [auth, setAuth];
};

export default useFirebaseAuth;
