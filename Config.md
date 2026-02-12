##Самое верное решение в конфиге webpack


```
cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.webpack-cache'),
    buildDependencies: { config: [__filename] },
}
```