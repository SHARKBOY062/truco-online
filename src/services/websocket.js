export function connectWebSocket(tableId, token) {
  return new WebSocket(`ws://localhost:3001/game/${tableId}?token=${token}`);
}
