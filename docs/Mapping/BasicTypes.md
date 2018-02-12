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





