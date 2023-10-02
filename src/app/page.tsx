'use client'
import Form from "@/components/Form/Form"
import Header from "@/components/Header/Header"
import { useEffect, useState } from "react";

export default function Home() {
  const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true)
    }, [])

  return (
    <main>
      {domLoaded && (
        <>
          <Header />
          <Form />
        </>
      )}
    </main>
  )
}
