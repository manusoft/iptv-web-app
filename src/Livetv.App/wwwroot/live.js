let hlsInstance;
function playChannel(channelUrl) {
    const video = document.getElementById('video');
    if (!video) return;

    // Dispose existing Hls instance if it exists
    if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = null;
    }

    if (Hls.isSupported()) {
        hlsInstance = new Hls();
        hlsInstance.loadSource(channelUrl);
        hlsInstance.attachMedia(video);
        hlsInstance.on(Hls.Events.MEDIA_ATTACHED, () => {
            video.muted = true;
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = channelUrl;
        video.addEventListener('canplay', () => video.play(), { once: true });
    }
}    