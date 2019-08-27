# Lite Notification Box
<p align="center">
  <img src="https://i.imgyukle.com/2019/08/26/o5j820.png" width="200px" height="200px">
</p>

# New Features!
 - Customizable via CSS.
 - Cookie support with optional expiry date.
 - Set a timed delay before the script starts tracking show notification box.
 - Showing 6 different positions
 - 3 different animations
 - Show once per session Option
 - Re-direct and new tab management

# Usage

Simply include the script and call its init function with any options you choose. 

```js
<script type="text/javascript" src="liteNotificationBox.min.js"></script>

<script type="text/javascript">
    liteNotificationBox.init({
       //options
    });
</script>
```

### Customize style with CSS
You can change CSS attirbutes on init function.
```js
<script type="text/javascript" src="liteNotificationBox.min.js"></script>

<script type="text/javascript">
    liteNotificationBox.init({
        .
        .
        css: ".ltImg{border-radius:10px;}",
        .
        .
    });
</script>
```

# Options

All options must be added to the init function as an object.

| Option | Type | Default | Description 
| ------ | ------ | ------ | ------ |
| position | string | bottomRight | The position of the notification box. It have 6 different positions. "bottomRight", "bottomLeft", "bottomCenter", "topRight", "topLeft", "topCenter". You have to write the value you want to use as it is here.
| animation | string | blur | The animation of the notification box. It have 3 different animations. "blur", "slide", "bubble". You have to write the value you want to use as it is here.
| width | integer | 250 | The width of the notification box.
| height | integer | 250 | The height of the notification box.
| imageUrl | string | icon-image | The image you want to show
| targetUrl | string | # | re-direction link
| targetOpenNewTab | boolean | true | This would be added "_blank" or "_self" after click.
| delay | integer | 0 | The time, in seconds, until the notification box activates.
| css | string | null | The CSS styles for the notification box. CSS can be added through this function or on the page itself.
| cookieExp | integer | 7 | The number of days to set the cookie for. A cookie is used to track if the notification box has already been shown to a specific visitor. If the notification box has been shown, it will not show again until the cookie expires. A value of 0 will always show the notification box.
| showOncePerSession | boolean | false | If true, the notification box will only show once per browser session. If false and cookieExp is set to 0, the notification box will show multiple times in a single browser session.

### Example
```html
<!DOCTYPE html>
<html>
<head>
    <script type="text/javascript" src="liteNotificationBox.js"></script>
</head>
<body></body>
<script type="text/javascript">
 liteNotificationBox.init({
        position: "bottomLeft",
        animation: "bubble",
        width: 200,
        height: 200,
        imageUrl: "https://blog.addthiscdn.com/wp-content/uploads/2015/11/JS-360454.png",
        targetUrl: "github.com",
        targetOpenNewTab: true,
        delay: 5,
        css: ".ltImg{border-radius:10px;}",
        cookieExp: 7,
        showOncePerSession: false,
    });
</script>
</html>
```

License
----

MIT license - https://opensource.org/licenses/MIT

**Free Software, Hell Yeah!**
