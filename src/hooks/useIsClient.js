import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * False during prerender and on the hydrating render, true afterwards.
 *
 * Use it to gate browser-only widgets (WebGL, canvas) out of the server render
 * without the `setState` in a mount effect that React now warns about, and
 * without risking a hydration mismatch: `getServerSnapshot` and the hydration
 * pass both return false, so server and client markup agree.
 */
export default function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
