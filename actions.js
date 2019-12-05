// Messages
export const ARCHIVE = 'ARCHIVE';
export const MESSAGE = 'MESSAGE';

// ----------------
// Authentication
// ----------------
export function archive(firstName, lastName) {
  return { type: ARCHIVE, firstName, lastName }
}

export function message(firstName, lastName, id, text, createdAt, user) {
  return { type: MESSAGE, firstName, lastName, id, text, createdAt, user }
}
