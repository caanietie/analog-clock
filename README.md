# AnalogClock App

This project simulates the working of the analog clock

### Input props

| Props   | Data type |    Description |
| :------: | :----: | :-----------------|
| **radius** | *number* | This property indicates the radius of the clock in pixels |
| **rimColor** | *Color* | This property indicates the rim color of the clock |
| **tickColor** | *Color* | This property indicates the color of the clock callibrations |
| **fontColor** | *Color*| This property indicates the color of the numbers on the face of the clock |
| **fontSize** | *number* |This property indicates the font size of the text of the face of the clock |
| **secondHandColor** | *Color* | This property indicates the color of the second hand of the clock |
| **minuteHandColor** | *Color* | This property indicates the color of the minute hand of the clock |
| **hourHandColor** | *Color* | This property indicates the color of the hour hand of the clock |
| **minorCallibrations** | *boolean* | This property indicates the presence of minor calibrations of the clock |
| **majorCallibrations** | *boolean* | This property indicates the presence of major calibrations of the clock |
| **fillColor** | *string* | This property indicates the interior color of the clock|


### How to use
Using ECMA syntax
``` javascript
import AnalogClock from "analogClock";

React.render(
	React.createElement(AnalogClock()),
	ReactDOM.createRoot(root)
);
```

Using JSX syntax
``` javascript
import React from "react";
import AnalogClock from "analogClock";

React.render(<AnalogClock/>, root);
```

### Author
Anietie [github](https://github.com) [twitter](https://www/twitter.com)
