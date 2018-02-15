# Rest Parameters

## Introduction

The Rest parameters (denoted by ...parameterName for the last argument) gives the user the ability to group multiple parameters into one variable name and treat them as an array.

## Rest

The Rest Parameter `...parameterName` has a direct mapping to C# `params` keyword.

Methods with Rest Parameter:

```typescript
    log(message?: any, ...optionalParams: any[]): void;
    createTouchList(...touches: Touch[]): TouchList;
    writeln(...content: string[]): void;
```

```csharp
    void log(Object message, params Object[] optionalParams);
    TouchList createTouchList(params Touch[] touches);
    void writeln(params string[] content);        
```
