# Basic Types

## Introduction

TypeScript contains a number of [Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html) that model the JavaScript types closely but correspond loosely with C# primitive types.  Because of this there may be some liberties taken to obtain a mapping which may later be edited by hand for the correct C# primitive.  An example of this is the `number` type described below.

## Boolean

The `boolean` type has a direct mapping to C# `bool`.

Method returning boolean:

```typescript
    hasAttributes(): boolean;
```

```csharp
    bool hasAttributes();
```

Method with boolean parameter:

```typescript
    initEvent(eventTypeArg: string, canBubbleArg: boolean, cancelableArg: boolean): void;
```

```csharp
    void initEvent(string eventTypeArg, bool canBubbleArg, bool cancelableArg);
```

Property:

```typescript
    readonly cancelable: boolean;
    cancelBubble: boolean;
```

```csharp
    bool cancelable { get; }
    bool cancelBubble { get; set; }
```

## Number

All numbers in TypeScript are floating point values and represented by a double precision 64-bit floating point value.  The `number` type has a direct mapping to C# `double`.

Method returning number:

```typescript
    now(): number;
```

```csharp
    double now();
```

Method with number parameter:

```typescript
    caretRangeFromPoint(x: number, y: number): Range;
```

```csharp
    Range caretRangeFromPoint(double x, double y);
```

Property:

```typescript
    readonly accuracy: number;
    scrollTop: number;
```

```csharp
   double accuracy { get; }
   double scrollTop { get; set; }
```

## String

Strings in TypeScript represet UTF-16 string data.  

The `string` type has a direct mapping to C# `string`.

Method returning string:

```typescript
    toString(): string;
```

```csharp
    string toString();
```

Method with string parameter:

```typescript
    setAttribute(name: string, value: string): void;
```

```csharp
    void setAttribute(string name, string value);
```

Property:

```typescript
    readonly baseURI: string;
    accessKey: string;
```

```csharp
   string baseURI { get; }
   string accessKey { get; set; }
```

## Array

Array types can be written with a element type followed by `[]` (`elemType[]`) or as a generic array type, Array<elemType>.

### elemType[]

First some examples of the element type followed by `[]`

Method returning `elemType[]`:

```typescript
    getLineDash(): number[];
    getAll(name: string): string[];
    deepPath(): EventTarget[];
```

```csharp
    double[] getLineDash();
    string[] getAll(string name);
    EventTarget[] deepPath();
```

Method with `elemType[]` parameter:

```typescript
    initFauxInterface(fauxArg: boolean[]): void;
    setLineDash(segments: number[]): void;
    msLockOrientation(orientations: string[]): boolean;
    makeCredential(accountInformation: Account, cryptoParameters: ScopedCredentialParameters[], attestationChallenge: BufferSource, options?: ScopedCredentialOptions): ScopedCredentialInfo;
```

```csharp
    void initFauxInterface(bool[] fauxArg);
    void setLineDash(double[] segments);
    bool msLockOrientation(string[] orientations);
    ScopedCredentialInfo makeCredential(Account accountInformation, ScopedCredentialParameters[] cryptoParameters, BufferSource attestationChallenge, ScopedCredentialOptions options);    
```

Property:

```typescript
    readonly axesAvailable: boolean[];
    readonly axes: number[];
    readonly languages: string[];    
    MessagePort[] ports { get; set; }
```

```csharp
    bool[] axesAvailable { get; }
    double[] axes { get; }
    string[] languages { get; }    
    MessagePort[] ports { get; set; }
```

### Array<elemType>

Now some examples of Array<elemType>.

Method returning `Array<elemType>`:

```typescript

    Not supported yet

```

```csharp

    Not supported yet

```

Method with `Array<elemType>` parameter:

```typescript

    Not supported yet

```

```csharp

    Not supported yet

```

Property:

```typescript

    Not supported yet

```

```csharp

    Not supported yet

```

## Void

The `void` keyword represents a method or function that will not return back a value and thus has no type.

The `void` keyword has a direct mapping to C# `void`.

Method returning `void`:

```typescript

    dispatchEvent(): void;

```

```csharp

    void dispatchEvent();

```

## Never

The `never` type represents values that never occur.

The `never` type has no direct mapping to C# and at this type defaults to `void`.

Method returning `never`:

```typescript

    fail(): never;

```

```csharp

    void fail();

```