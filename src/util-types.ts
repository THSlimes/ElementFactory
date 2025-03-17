/** Represents an object that can be converted to a string */
export interface ToStringable {
    toString(): string
}

/** Union type of primitive values */
export type Primitive = number | bigint | string | boolean | null | undefined;