

export var fontsLoaded= false;

// // Load them google fonts before starting...!



window.WebFontConfig = {
    google: {        families: ['Snippet', 'Arvo:700italic', 'Podkova:700']    },
    active() { fontsLoaded=true;  /* init(); */  },
};

/* eslint-disable */
// include the web-font loader script
(function() {
    const wf = document.createElement('script');
    wf.src = `${document.location.protocol === 'https:' ? 'https' : 'http'
    }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
    wf.type = 'text/javascript';
    wf.async = 'true';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
}());
/* eslint-enabled */
