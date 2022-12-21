// https://github.com/ai/nanoevents
export type EventCallback = (...args: any) => void

export let createNanoEvents = () => ({
  events: {} as Record<string, EventCallback[]>,
  emit(event: string, ...args: any[]) {
    const callbacks = this.events[event] || [];
    for (let i = 0, length = callbacks.length; i < length; i++) {
      callbacks[i](...args);
    }
  },
  on(event: string, cb: EventCallback) {
    if (this.events[event]) {
      this.events[event].push(cb);
    } else {
      this.events[event] = [cb];
    }
    return () => {
      this.events[event] = this.events[event]?.filter(i => cb !== i);
    };
  }
});