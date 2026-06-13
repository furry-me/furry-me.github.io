/* ── Masonry Grid Helper ──
   Generic row-first waterfall layout.

   masonryLayout(containerSelector, cardSelector, options)

   options:
     gap          - gap between cards (default: 18)
     colBreaks    - [3-col threshold, 2-col threshold] (default: [900, 550])
     filter       - optional function(card) -> boolean to decide which cards to layout
                    (use for pages with visibility filtering, like the series catalog)
     onReady      - callback(layoutFn) called after images loaded, before initial layout */

function masonryLayout(containerSelector, cardSelector, options) {
    options = options || {};
    var gap = options.gap || 18;
    var colBreaks = options.colBreaks || [1100, 550];
    var cardFilter = options.filter || null;

    var grid = document.querySelector(containerSelector);
    if (!grid) return null;

    var allCards = Array.prototype.slice.call(grid.querySelectorAll(cardSelector));
    if (!allCards.length) { grid.style.height = '0'; return null; }

    function layout() {
        var cards = cardFilter ? allCards.filter(cardFilter) : allCards;
        if (!cards.length) { grid.style.height = '0'; return; }

        var containerWidth = grid.offsetWidth;
        var cols;

        if (containerWidth > colBreaks[0]) {
            cols = 3;
        } else if (containerWidth > colBreaks[1]) {
            cols = 2;
        } else {
            cols = 1;
        }

        var colWidth = (containerWidth - gap * (cols - 1)) / cols;
        var colHeights = [];
        for (var i = 0; i < cols; i++) colHeights[i] = 0;
        var maxH = 0;

        cards.forEach(function (card) {
            card.style.position = 'absolute';
            card.style.width = colWidth + 'px';
            var minIdx = 0, minH = colHeights[0];
            for (var j = 1; j < cols; j++) {
                if (colHeights[j] < minH) { minH = colHeights[j]; minIdx = j; }
            }
            card.style.left = (minIdx * (colWidth + gap)) + 'px';
            card.style.top = minH + 'px';
            var cardH = card.offsetHeight;
            colHeights[minIdx] = minH + cardH + gap;
            if (colHeights[minIdx] > maxH) maxH = colHeights[minIdx];
        });

        grid.style.height = maxH + 'px';
    }

    /* Wait for images / video metadata then layout */
    var loaded = 0;
    var toLoad = allCards.length;
    function onMediaDone() { loaded++; if (loaded >= toLoad || !toLoad) layout(); }

    allCards.forEach(function (card) {
        var img = card.querySelector('img');
        var vid = card.querySelector('video');

        if (img) {
            if (img.complete) onMediaDone();
            else img.addEventListener('load', onMediaDone);
        } else if (vid) {
            if (vid.readyState >= 1) onMediaDone();
            else vid.addEventListener('loadedmetadata', onMediaDone);
        } else {
            onMediaDone();
        }
    });

    /* Debounced resize */
    var _rT;
    window.addEventListener('resize', function () { clearTimeout(_rT); _rT = setTimeout(layout, 100); });

    if (options.onReady) options.onReady(layout);

    return layout;
}
