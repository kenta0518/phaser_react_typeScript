import { useEffect, useState } from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import App from '../game/app.client';

export default function Game() {

  return (
    <ClientOnly fallback={<h3>Loading Game...</h3>}>
      { () => <App /> }
    </ClientOnly>
  );
}