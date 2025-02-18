interface EventAttribute {
  key: string;
  value: string;
}

interface Event {
  type: string;
  attributes: EventAttribute[];
}

interface Log {
  events: Event[];
}

export type RowLog = Log[];
