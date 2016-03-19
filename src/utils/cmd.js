import { getModInfo } from './mod'

/**
 * For a given directory, find the commands it exposes.
 */
export let findCmds = (dir) => {
  const dirInfo = getModInfo(dir)
  return dirInfo
}
