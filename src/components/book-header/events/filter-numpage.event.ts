export class FilterNumPageEvent extends CustomEvent<number> {
  constructor(config: CustomEventInit<number> = {}) {
    super('filter:numpage-event', {
      ...config,
      bubbles: true,
      composed: true,
    })
  }
}
