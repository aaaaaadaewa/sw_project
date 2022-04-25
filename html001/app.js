window.onload = function() {
    console.log(1);
    if (navigator.serviceWorker) {
        console.log(2);
        navigator.serviceWorker
           .register('/sw.js')
           .then((registration) => { // 登録成功
             console.log('scope:', registration.scope);
           })
           .catch((error) => { // 登録失敗
             console.log('failed: ', error);
           });

           document.getElementById('clear_cache').addEventListener('click', function() {
            console.log("clear_cache");
            if (navigator.serviceWorker) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for(let registration of registrations) {
                      registration.unregister();
                    }
                  });
                  caches.keys().then(function(keys) {
                    let promises = [];
                    keys.forEach(function(cacheName) {
                      if (cacheName) {
                        promises.push(caches.delete(cacheName));
                      }
                    });
                  });
            }
        });

    }
}


// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//         console.log("registration start");
//         navigator.serviceWorker.register('/sw.js').then(() => {
//             console.log('[登録成功] ServiceWorker registration successful.');
//         },() => {
//             console.log('[登録失敗] ServiceWorker registration failed.');
//         });

//         document.getElementById('clear_cache').addEventListener('click', function() {
//             console.log("clear_cache");
//             if ('serviceWorker' in navigator) {
//                 if (navigator.serviceWorker.controller) {
//                     navigator.serviceWorker.controller.postMessage({
//                         message: 'clear'
//                     });
//                 } else {
//                     alert('有効化されたService Workerがありません。');
//                 }
//             }
//         });
//     });
// }


