occupied
========

A small Express app for Raspberry Pi and PiFace for checking an occupation sensor.


Installation assumes you have a working Raspberry Pi running the latest Raspbian "Wheezy" release, and the latest "arm-pi" release of [Node.js](http://nodejs.org). Also, your PiFace should be up and running according to their [installation docs](http://www.element14.com/community/docs/DOC-53057/l/piface-get-started-guide) *(element 14 registration required)*.


Installation
------------

After cloning the repository, a `npm install` should get you all the required libraries. This includes:

- express
- ejs
- caf_piface
- node-sass
- coffee-script

**Important Note:** There is currently [a bug in *node-spi*](https://github.com/RussTheAerialist/node-spi/issues/3) which *caf_piface* requires. The [repo](https://github.com/RussTheAerialist/node-spi) is updated but `npm` is not as of this writing. Please ensure you're using the most up-to-date module, and if necessary, rebuild your modules with:

```
npm rebuild spi
npm rebuild caf_piface
```

From there, you should be able to execute a `coffee app.coffee` as your *root* user, and SWITCH 1 should be tied into your occupation sensor, LED 7 to your occupation light. Hit the interface at *http://<your_rpi_ip>:3000 and go!


Contributing
------------

I love pull requests, so send me good ones. Please be sure to fully describe your changes!

License
=======

The MIT License (MIT)

Copyright (c) 2013 Nathan Wittstock

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


Acknowledgements
================

This package includes [Zurb Foundation](http://foundation.zurb.com), which is provided under an MIT License.
