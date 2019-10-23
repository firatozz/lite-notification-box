window.liteNotificationBox = {
    position: "bottomRight", // OK
    animation: "blur", //OK slide, bubble, blur
    width: 250, // OK
    height: 250, // OK
    imageUrl: "https://raw.githubusercontent.com/firatozz/firatozz.github.io/master/assets/img/javascript.png", // OK
    targetUrl: "#", // OK
    targetOpenNewTab: true, // OK
    delay: 0, // OK
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
            ".ltNotificationBox{position:fixed; display:block; font-family: monospace;font-size: 15px; width:" +
            this.width + "px; height: " + this.height + "px; z-index: 10002;" +
            this.constPosition[prePosition][0] + "; " + this.constPosition[prePosition][1] + "; " + this.constPosition[prePosition][2] + "; " +
            this.constAnimation[preAnimation][0] + ";}" +
            ".ltNotificationBox.active{" + this.constAnimation[preAnimation][1] + ";}" +
            ".ltImg{width:" + this.width + "px; height: " + this.height + "px;}" +
            ".ltCloseEl{position: absolute;display:inline-block;width: " + this.height / 40 + "%;height:" + this.width / 40 + "%; top: 2%;right: 4%;cursor: pointer; border-radius: 50%;}" +
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
            0: ["bottom: 5px;"],
            1: ["right: 5px;"],
            2: ["transform-origin:right bottom;"],
            3: ["right: -100%"]
        },
        bottomLeft: {
            0: ["bottom: 5px;"],
            1: ["left: 5px;"],
            2: ["transform-origin:left bottom;"],
            3: ["left: -100%"]
        },
        bottomCenter: {
            0: ["bottom: 5px;"],
            1: ["transform-origin:center bottom;" + "bottom: 5px;"],
            2: ["left:calc(50% - _WIDTHpx);"],
            3: ["bottom: -100%"]
        },
        topRight: {
            0: ["top: 5px;"],
            1: ["right: 5px;"],
            2: ["transform-origin:right top;"],
            3: ["right: -100%"]
        },
        topLeft: {
            0: ["top: 5px;"],
            1: ["left: 5px;"],
            2: ["transform-origin:left top;"],
            3: ["left: -100%"]
        },
        topCenter: {
            0: ["top:5px;"],
            1: ["transform-origin:center top;" + "top:5px;"],
            2: ["left:calc(50% - _WIDTHpx)"],
            3: ["top: -100%"]
        }
    },

    //Defined Constant Animations
    constAnimation: {
        slide: {
            0: ["transition:1s ease-in-out;" + "_exPOS;" + "visibility:hidden;" + "overflow:hidden;"],
            1: ["transition:1s ease-in-out;" + "_activePOS;" + "visibility:visible;"]
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
                    document.body.style.overflowX = "hidden";
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
            "<img class='ltImg' src='" + this.imageUrl + "'></a><img class='ltCloseEl' src='data:image/png;base64,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'></img>";

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
        if (document.querySelector(".ltCloseEl")) {
            this.addEvent(document.querySelector(".ltCloseEl"), "click", function () {
                document.querySelector(".ltNotificationBox.active").className = "ltNotificationBox";
                setTimeout(function () {
                    document.querySelector(".ltNotificationBox").remove();
                    document.body.style.overflow = "visible";
                }, 1000);
            });
        }


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
