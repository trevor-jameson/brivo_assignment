import { useState } from 'react';

interface City {
  name: string;
  lat?: string;
  lon?: string;
  country: string;
  state?: string;
}

export default function MainContainer(props: any) {

  return (
    <div id='main-container'>
      {props.children}
    </div>
  )
}