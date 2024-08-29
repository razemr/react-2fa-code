
# react-2fa-code

React component for inputing 2FA and other verification codes.


## Installation

```bash
  npm install react-2fa-code
```
    
## Usage

It's pretty easy to get it up and running!

```javascript
import AuthCode from 'react-2fa-code'

function App() {
  return <AuthCode />
}
```

That's it! See API reference for props and default configuration.


## Demo

![](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWtxcmI4d3BhMHU2bjg3MXYyb3JpZ3dubnpodTd5a3h1b3IydDc4ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XcYlEZGwxgbpE2oZuJ/giphy.gif)



## API Reference


| Prop | Type | Default | Description  |
| :--- | :--- | :------ | :------------ |
| value | String | "" | The value of the component |
| length | Number | 4 | The number of characters to be rendered |
| password | Boolean | false | Hide the inputted characters |
| disabled | Boolean | false | Disable the component |
| allowPaste | Boolean | false | Allow characters to be pasted from the clipboard |
| pattern | RegExp &#124; String | "" | The characters that are allowed |
| autoFocus | Boolean | false | Focus the component as soon as it is rendered |
| containerClassName | String | "" | CSS class name to add to the container |
| inputClassName | String | "" | CSS class name to add to the inputs |
| OnChange | Function | - | Callback function that gets called when the value of the component changes |
| OnComplete | Function | - | Callback function that gets called when all characters have been inputted |





## License

[MIT](https://github.com/razemr/react-2fa-code/blob/main/LICENSE)


## Authors

- [@razemr](https://github.com/razemr)

