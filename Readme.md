
# chrome-store

  tiny wrapper around chrome.storage

## Installation

  Install with [component(1)](http://component.io):

    $ component install segmentio/chrome-store

## Example

```js
var store = require('chrome-store')('sync');

// single

store.set('a', 1, function(err){
  if (err) throw err;
  store.get('a', function(err, value){
    if (err) throw err;
    assert(1 == value);
  });
});

// multi

store
  .set('a', 1)
  .set('b', 2)
  .set('c', 3)
  .end(function(err){});

store
  .get('a')
  .get('b')
  .get('c')
  .end(function(err, obj){
    assert(1 == obj.a);
    assert(2 == obj.b);
    assert(3 == obj.c);
  });
```


## License

  MIT
