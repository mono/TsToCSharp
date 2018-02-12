# Basic Types

## Introduction

TypeScript contains a number of [Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html) that model the JavaScript types closely but correspond loosely with C# primitive types.  Because of this there may be some liberties taken to obtain a mapping which may later be edited by hand for the correct C# primitive.  An example of this is the `number` type described below.

### Boolean

The `boolean` type has a direct mapping to C# `bool`.

Method Returning boolean:

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






