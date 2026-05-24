# Public Entity Implementation Guide

## Goal

Public entities in Edwin must be easy to extend through inheritance while keeping their internal state controlled and predictable.

## Rules

1. **Store attributes in protected-by-convention fields** (`_name`, `_properties`, etc.).
   - Do not expose raw mutable attributes as public writable fields.
   - Avoid `#private` fields in entities intended for consumer inheritance.

2. **Expose public getters for all public attributes.**
   - Consumers should read entity state through the public API, not internal fields.

3. **Use setters for mutable public attributes.**
   - Apply validation in setters (required values, allowed states, defaults).
   - Normalize incoming data in one place (inside the setter).

4. **Use defensive copies for mutable collections and objects.**
   - Return copies in getters (`{ ...obj }`, `[...list]`) when needed.
   - Clone incoming values in setters to avoid external mutation side effects.

5. **Keep behavior methods operating on internal protected fields.**
   - Methods such as transitions, add/remove operations, and serialization should read/write `_` fields directly.

6. **Serialize from internal state with `toJSON()`.**
   - Keep persistence output stable and explicit.
   - For nested entities, serialize using each child entity's `toJSON()`.

## Reference Pattern

```js
export class Item {
  constructor({ id, name, properties = {} }) {
    if (!id) { throw new Error('Item requires an id.'); }
    if (!name) { throw new Error('Item requires a name.'); }

    this._id = id;
    this._name = name;
    this._properties = { ...properties };
  }

  get id() {
    return this._id;
  }

  set id(id) {
    if (!id) { throw new Error('Item requires an id.'); }
    this._id = id;
  }

  get properties() {
    return { ...this._properties };
  }

  set properties(properties) {
    this._properties = { ...(properties ?? {}) };
  }
}
```

## Why this matters

- **Safe extensibility:** game implementations can subclass entities without bypassing core invariants.
- **Stable API:** consumers interact through getters/setters instead of implicit field contracts.
- **Predictable state:** validation and normalization stay centralized in the entity API.
