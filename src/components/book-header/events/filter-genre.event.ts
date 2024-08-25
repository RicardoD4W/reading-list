export class FilterGengeEvent extends CustomEvent<string> {
  constructor(config: CustomEventInit<string> = {}) {
    super('filter:range-event', {
      ...config,
      bubbles: true,
      composed: true,
    })
  }
}
