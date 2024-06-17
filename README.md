# async_error_node

[![](https://img.shields.io/badge/Node-18.13.0-333.svg)](https://nodejs.org/)

Review of Error Handling in Node motivated by [this](https://stackify.com/node-js-error-handling/#h-the-perils-of-async-try-catch) article.

Specifically:

> "In summary, if you’re handling async error handling, you should really use the promises catch handler, which will allow you to effectively handle the async errors. But if you’re dealing with synchronous code, the try/catch will do just fine."

I think that's not the most accurate, best, precise, or most comprehensive suggestion.

Consider:

1. **Error Handling** *within* an Asynchronous Function, Timeout, Interval, Spawn or Forked Exec. (Will likely be **Synchronous** internal to the Asynchronous Function and will therefore use a `try-catch` block.)
2. I typically combine a `try-catch` block with a `process.on('uncaughtException', ...)` event listener:
   
   ```javascript
   try {
        process.on('uncaughtException', exception => { console.error(`Exception encountered: ${exception}`) })

        //...
   } catch (ex) {
        //...
   } 
   ```

   This acts as a *defacto* `catch` block for any `Error` that bubbles up to the top-level `process` itself. Even Asynchronous ones.
3. Using a `try-catch` block with `async`-`await` notation is (probably most-)often encountered.

## Topics

Remember:

```JavaScript
//Same syntactic and semantic functionality
Error()
new Error()
```

Remember that the following is invalid:
```JavaScript
T()
    .then(success => { console.log(success) }, failure => { console.log(failure) })
    .catch(ex => console.error(`Line 16 - asynch catch(): ${ex.message}`))
```
The `.catch()` chained method will handle `failure`.

## Use

```bash
npm i && node main.js
```

```bash
Line 40 - Exception encountered: Error!
Line 16 - Exception encountered: Third Async Error!
Line 21 - asynch catch(): Third Async Error!
Line 25 - asynch catch(): Fourth Async Error - By Rejection
Line 47 - Exception encountered: Async Error!
Line 35 - UncaughtException encountered: Error: Second Async Error!
```

Observe that lines `54` and `28` are never logged:

* Line `28` is ignored since the prior `.catch()` methods handle Exceptions, Errors, and Rejections.
* Line `54` is ignored by `setTimeout()` although the `try-catch` block internal to the Timeout is used.

## Resources and Links

1. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
2. https://stackify.com/node-js-error-handling/#h-the-perils-of-async-try-catch