"use client"

import { useEffect } from "react";

const ConsoleClient = (props: any) => {
  
    useEffect(() => {
        console.log(props)
    },[props])

  return <div></div>;
};

export default ConsoleClient;
