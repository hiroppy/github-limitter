(function() {
  'use strict';

  var validatedRepo = ['node']; // [TODO] replace

  var observer = new MutationObserver(function(mutations, self) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {

        // pull-request
        if (/^\/.+\/.+\/pull\/\d/.test(location.pathname)) {
          var splitted = location.pathname.match(/^\/(.+)\/(.+)\/pull\/(\d)/);
          var userName = splitted[1];
          var repoName = splitted[2];

          if (!~~validatedRepo.indexOf(repoName)) {
            var margeButton =
            Array.prototype.slice.call(document.querySelectorAll('.merge-message button'));

            margeButton.forEach(function(el) {
              el.setAttribute('disabled', true);
            });

            var closeButton = document.querySelector('.js-comment-and-button');

            closeButton.setAttribute('disabled', true);
          }
        }
      }
    });
  });

  observer.observe(document.querySelector('body'), {
    childList: true,
    subtree: true
  });
})();
