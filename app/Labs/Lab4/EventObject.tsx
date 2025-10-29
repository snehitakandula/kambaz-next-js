import { useState } from "react";
export default function EventObject() {
  const [event, setEvent] = useState<Record<string, unknown> | null>(null);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const modifiedEvent: Record<string, unknown> = {};
    
    // Function to check if a value is serializable
    const isSerializable = (value: unknown): boolean => {
      if (value === null || value === undefined) return true;
      const type = typeof value;
      return type === 'string' || type === 'number' || type === 'boolean';
    };
    
    // Get all properties from the event object and its prototype chain
    let currentObj = e as unknown;
    while (currentObj !== null && currentObj !== Object.prototype) {
      Object.getOwnPropertyNames(currentObj).forEach(prop => {
        if (prop !== 'view' && !(prop in modifiedEvent)) {
          try {
            const value = (e as unknown as Record<string, unknown>)[prop];
            if (isSerializable(value)) {
              modifiedEvent[prop] = value;
            }
          } catch (error) {
            // Skip properties that throw errors when accessed
          }
        }
      });
      currentObj = Object.getPrototypeOf(currentObj);
    }
    
    // Override target with outerHTML
    if (e.target instanceof HTMLElement) {
      modifiedEvent.target = e.target.outerHTML;
    }
    
    setEvent(modifiedEvent);
  };
  return (
    <div>
      <h2>Event Object</h2>
      <button onClick={(e) => handleClick(e)}
        className="btn btn-primary"
        id="wd-display-event-obj-click">
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr/>
    </div>
);}