// Returns initials from string
export const getInitials = string => {
  if (!string) return ''

  return string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')
}
