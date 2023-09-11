import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toPusherKey(key: string) {
  return key.replace(/:/g, '__')
}

export function chatHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort()
  return `${sortedIds[0]}--${sortedIds[1]}`
}

export function checkIfPastDay(
  timestamp1: number,
  timestamp2: number
): boolean {
  if (timestamp1 === undefined || timestamp2 === undefined) return false

  let msPerDay = 60 * 1000 * 60 * 24

  if (Math.floor(timestamp1 / msPerDay) !== Math.floor(timestamp2 / msPerDay)) {
    return true
  } else return false
}
