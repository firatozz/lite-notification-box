window.liteNotificationBox = {
    position: "bottomRight", // OK
    animation: "blur", //OK slide, bubble, blur
    width: "250", // OK
    height: "250", // OK
    imageUrl: "https://blog.addthiscdn.com/wp-content/uploads/2015/11/JS-360454.png", // OK
    targetUrl: "#", // OK
    targetOpenNewTab: true, // OK
    delay: "0", // OK
    css: "", // OK
    cookieExp: 7, // OK
    showOncePerSession: false, // OK

    cookieManager: {
        // Create a cookie
        create: function (name, value, days, sessionOnly) {
            var expires = "";

            if (sessionOnly)
                expires = "; expires=0"
            else if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }

            document.cookie = name + "=" + value + expires + "; path=/";
        },

        // Get the value of a cookie
        get: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }

            return null;
        },

        // Delete a cookie
        erase: function (name) {
            this.create(name, "", -1);
        }
    },

    // Handle the liteNotificationBox_shown cookie
    // If present and true, return true
    // If not present or false, create and return false
    checkCookie: function () {
        // Handle cookie reset
        if (this.cookieExp <= 0) {
            // Handle showing notification box once per browser session.
            if (this.showOncePerSession && this.cookieManager.get("liteNotificationBox_shown_session") == "true")
                return true;

            this.cookieManager.erase("liteNotificationBox_shown");
            return false;
        }
        // If showOncePerSession is set to false
        if (!this.showOncePerSession) {
            this.cookieManager.erase("liteNotificationBox_shown");
            return false;
        }

        // If cookie is set to true
        if (this.cookieManager.get("liteNotificationBox_shown") == "true")
            return true;

        return false;
    },

    addCSS: function () {
        // Base CSS styles for the notification box
        var css = document.createTextNode(
            ".ltNotificationBox{position:absolute; display:block; font-family: monospace;font-size: 15px; width:" +
            this.width + "px; height: " + this.height + "px; z-index: 10002;" +
            this.constPosition[prePosition][0] + "; " + this.constPosition[prePosition][1] + "; " + this.constPosition[prePosition][2] + "; " +
            this.constAnimation[preAnimation][0] + ";}" +
            ".ltNotificationBox.active{" + this.constAnimation[preAnimation][1] + ";}" +
            ".ltImg{width:" + this.width + "px; height: " + this.height + "px;}" +
            ".ltCloseEl{position: absolute;display:inline-block; top: 2%;right: 4%;cursor: pointer; color:#fff;border-radius: 50%;border: 2px solid;width: 18px;height:18px;text-align: center;}" +
            this.css
        );

        // Create the style element
        var style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(css);
        // Insert it before other existing style
        // elements so user CSS isn't overwritten
        document.head.insertBefore(style, document.getElementsByTagName("style")[0]);
    },

    // Defined Constant Positions
    constPosition: {
        bottomRight: {
            0: ["bottom: 30px;"],
            1: ["right: 30px;"],
            2: ["transform-origin:right bottom;"],
            3: ["right: -100%"]
        },
        bottomLeft: {
            0: ["bottom: 30px;"],
            1: ["left: 30px;"],
            2: ["transform-origin:left bottom;"],
            3: ["left: -100%"]
        },
        bottomCenter: {
            0: ["bottom: 30px;"],
            1: ["transform-origin:center bottom;" + "bottom: 30px;"],
            2: ["left:calc(50% - _WIDTHpx);"],
            3: ["bottom: -100%"]
        },
        topRight: {
            0: ["top: 30px;"],
            1: ["right: 30px;"],
            2: ["transform-origin:right top;"],
            3: ["right: -100%"]
        },
        topLeft: {
            0: ["top: 30px;"],
            1: ["left: 30px;"],
            2: ["transform-origin:left top;"],
            3: ["left: -100%"]
        },
        topCenter: {
            0: ["top:30px;"],
            1: ["transform-origin:center top;" + "top:30px;"],
            2: ["left:calc(50% - _WIDTHpx)İ"],
            3: ["top: -100%"]
        }
    },

    //Defined Constant Animations
    constAnimation: {
        slide: {
            0: ["transition:1s ease-in-out;" + "_exPOS;"],
            1: ["transition:1s ease-in-out;" + "_activePOS;"]
        },
        bubble: {
            0: ["transform:scale(0);" + "transition:.5s ease-in-out;" + "visibility:hidden;" + "overflow:hidden;"],
            1: ["transform:scale(1);" + "transition:.5s ease-in-out;" + "visibility:visible;"]
        },
        blur: {
            0: ["transform: translateZ(0) scale(0);" + "transition:.7s ease-in-out;" + "filter: blur(100vh);" + "visibility: hidden;"],
            1: ["transform: translateZ(0) scale(1);" + "transition:.7s ease-in-out;" + "filter: blur(0);" + "visibility:visible;"]
        }
    },

    // Set user defined Position for the notification box
    setPosition: function () {
        for (var i = 0; i < Object.keys(this.constPosition).length; i++) {
            if (Object.keys(this.constPosition)[i] === this.position) {
                prePosition = (Object.keys(this.constPosition)[i]);
                this.constPosition[prePosition][2][0] = this.constPosition[prePosition][2][0].replace("_WIDTH", this.width / 2);
            }
        }
    },

    // Set user defined Animation for the notification box
    setAnimation: function () {
        for (var i = 0; i < Object.keys(this.constAnimation).length; i++) {
            if (Object.keys(this.constAnimation)[i] === this.animation) {
                preAnimation = (Object.keys(this.constAnimation)[i]);
                if (this.animation === "slide") {
                    document.body.style.overflow = "hidden";
                }
                this.constAnimation[preAnimation][1][0] = this.constAnimation[preAnimation][1][0].replace("_activePOS", this.constPosition[prePosition][1][0]);
                this.constAnimation[preAnimation][0][0] = this.constAnimation[preAnimation][0][0].replace("_exPOS", this.constPosition[prePosition][3][0]);
            }
        }
    },

    // Create Notification Box
    liteNotificationBoxCreator: function () {
        var ltNotificationBox = document.createElement("div");
        ltNotificationBox.className = "ltNotificationBox";
        document.querySelector("body").appendChild(ltNotificationBox);

        var x = this.targetOpenNewTab ? this.targetOpenNewTab = '_blank' : '_self';
        ltNotificationBox.innerHTML = "<a href =//" + this.targetUrl + " target='" + x + "'>" +
            "<img class='ltImg' src='" + this.imageUrl + "'></a><span class='ltCloseEl'>&#10761;</span>";
    },

    //Show Notification Box 
    liteNotificationBoxShow: function () {
        var x = document.querySelector(".ltNotificationBox");
        setTimeout(function () {
            x.className = "ltNotificationBox active";
        }, 1000);

        this.cookieManager.create("liteNotificationBox_shown", this.showOncePerSession, this.cookieExp, false);
        this.cookieManager.create("liteNotificationBox_shown_session", this.showOncePerSession, 0, true);
    },

    // Event listener initialisation for all browsers
    addEvent: function (obj, event, callback) {
        if (obj.addEventListener)
            obj.addEventListener(event, callback, false);
        else if (obj.attachEvent)
            obj.attachEvent("on" + event, callback);
    },

    // Load event listeners for the Notification Box
    loadEvents: function () {
        this.addEvent(document.querySelector(".ltCloseEl"), "click", function () {
            document.querySelector(".ltNotificationBox.active").className = "ltNotificationBox";
            setTimeout(function () {
                document.querySelector(".ltNotificationBox").remove();
                document.body.style.overflow = "visible";
            }, 1000);
        });

        //If targetOpenNewTab have worked, the box will close
        this.addEvent(document.querySelector(".ltImg"), "click", function () {
            document.querySelector(".ltNotificationBox").remove();
            document.body.style.overflow = "visible";
        });
    },


    // Set user defined options for the notification box
    setOptions: function (opts) {
        this.position = (typeof opts.position === 'undefined') ? this.position : opts.position;
        this.animation = (typeof opts.animation === 'undefined') ? this.animation : opts.animation;
        this.width = (typeof opts.width === 'undefined') ? this.width : opts.width;
        this.height = (typeof opts.height === 'undefined') ? this.height : opts.height;
        this.imageUrl = (typeof opts.imageUrl === 'undefined') ? this.imageUrl : opts.imageUrl;
        this.targetUrl = (typeof opts.targetUrl === 'undefined') ? this.targetUrl : opts.targetUrl;
        this.targetOpenNewTab = (typeof opts.targetOpenNewTab === 'undefined') ? this.targetOpenNewTab : opts.targetOpenNewTab;
        this.delay = (typeof opts.delay === 'undefined') ? this.delay : opts.delay;
        this.css = (typeof opts.css === 'undefined') ? this.css : opts.css;
        this.cookieExp = (typeof opts.cookieExp === 'undefined') ? this.cookieExp : opts.cookieExp;
        this.showOncePerSession = (typeof opts.showOncePerSession === 'undefined') ? this.showOncePerSession : opts.showOncePerSession;
    },


    // Ensure the DOM has loaded
    domReady: function (callback) {
        (document.readyState === "interactive" || document.readyState === "complete") ? callback(): this.addEvent(document, "DOMContentLoaded", callback);
    },

    // Initialize
    init: function (opts) {
        // Handle options
        if (typeof opts !== 'undefined')
            this.setOptions(opts);

        this.setPosition();
        this.setAnimation();

        // Add CSS here to make sure user HTML is hidden regardless of cookie
        this.addCSS();

        this.domReady(function () {
            // Handle the cookie
            if (liteNotificationBox.checkCookie()) return;

            // Add the NotificationBox
            liteNotificationBox.liteNotificationBoxCreator();
            // Load events
            liteNotificationBox.loadEvents();

            setTimeout(function () {
                liteNotificationBox.liteNotificationBoxShow();
            }, liteNotificationBox.delay * 1000);
        });
    }
}
