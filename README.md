# @vedanshshetti/beautify-js

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue.svg)](https://www.typescriptlang.org/)
[![npm](https://img.shields.io/badge/npm-%40vedanshshetti%2Fbeautify--js-orange.svg)](https://www.npmjs.com/package/@vedanshshetti/beautify-js)

A lightweight TypeScript utility library that makes JavaScript/TypeScript code easier to read and validate. Provides clean, type-safe helpers for condition checking, string validation, and array transformations.

## Features

- **Condition Class** – Create expressive, reusable validation conditions with clear pass/fail semantics
- **String Validators** – Chainable string checks (JSON validation, empty, length, numeric, case-sensitive, regex matching)
- **Array Utilities** – Convert arrays to JSON strings, Sets, or unique arrays
- **Type Safety** – Fully typed with TypeScript for IDE autocomplete and error prevention
- **Zero Dependencies** – Pure TypeScript, no external dependencies required

## Installation

```bash
npm install @vedanshshetti/beautify-js
# or
pnpm add @vedanshshetti/beautify-js
# or
yarn add @vedanshshetti/beautify-js
```

## Usage

### Condition Validation

Create reusable conditions that validate expected outputs with clear logging:

```typescript
import { Condition } from '@vedanshshetti/beautify-js';

const isEven = new Condition(
  () => 42 % 2,
  0,
  'Number is even'
);

if (isEven.passes()) {
  console.log('Condition passed!');
} else {
  // Logs: [@vedanshshetti/beautify-js]: Condition "Number is even" failed. Given Callback returned 0, expected output was 0
}

// Check if condition fails
if (isEven.fails()) {
  console.log('Condition failed!');
}
```

### String Validation

Chainable string validators for common checks:

```typescript
import { isString } from '@vedanshshetti/beautify-js';

const input = '{ "valid": true }';

// Check if valid JSON
if (isString(input).validJSON()) {
  console.log('Valid JSON string');
}

// Check string properties
isString(input).empty();        // false
isString(input).ofLength(17);   // true
isString(input).numeric();       // false
isString(input).uppercase();     // false
isString(input).lowercase();     // false
isString(input).matches(/\d+/); // false
```

### Array Conversion

Transform arrays with clean, declarative syntax:

```typescript
import { convertArray } from '@vedanshshetti/beautify-js';

const numbers = [1, 2, 2, 3, 3, 3];

// Convert to JSON string
const json = convertArray(numbers).toJsonString();
// "[1,2,2,3,3,3]"

// Convert to Set
const set = convertArray(numbers).toSet();
// Set {1, 2, 3}

// Get unique values as array
const unique = convertArray(numbers).toUniqueArray();
// [1, 2, 3]
```

### Utility Functions

```typescript
import { not } from '@vedanshshetti/beautify-js';

const result = not(true); // false
const truthy = not(false); // true
```

## API Reference

### `Condition<ExpectedOutputType>`

A class for creating reusable validation conditions.

#### Constructor

```typescript
new Condition<T>(
  cb: () => unknown,
  expectedOutput: T,
  label: string,
  logger: (...args: any[]) => void = console.warn
)
```

#### Methods

- `passes(): boolean` – Returns `true` if callback output matches expected output. Logs failure details if mismatch.
- `fails(): boolean` – Returns `true` if callback output does NOT match expected output.

### `isString(str: string)`

Returns an object with chainable string validation methods:

- `validJSON(): boolean` – Checks if the string is valid JSON
- `empty(): boolean` – Checks if the string is empty
- `ofLength(expectedLength: number): boolean` – Checks if the string has the expected length
- `numeric(): boolean` – Checks if the string contains only numeric characters
- `uppercase(): boolean` – Checks if the string is uppercase (non-empty)
- `lowercase(): boolean` – Checks if the string is lowercase (non-empty)
- `matches(regex: RegExp): boolean` – Checks if the string matches the given regex

### `convertArray<ItemType>(array: ItemType[])`

Returns an object with array transformation methods:

- `toJsonString(): string` – Converts the array to a JSON string
- `toSet(): Set<ItemType>` – Converts the array to a Set
- `toUniqueArray(): ItemType[]` – Returns a new array with unique values

### `not<T>(value: T): boolean`

Returns the boolean negation of the input value.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Vedansh Shetti ([@vedanshshetti](https://github.com/vedanshshetti))
