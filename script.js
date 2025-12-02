// --- AYARLAR ---
const VIDEO_URL = "https://vz-5b1aab28-e89.b-cdn.net/f24655ab-505d-4a1a-b565-66d78e2364ab/playlist.m3u8";

const modal = document.getElementById("videoModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".close-btn");
const playerWrapper = document.getElementById("customPlayerWrapper");

let hls = null;
let isPlayerSetup = false;

// --- MODAL İŞLEMLERİ ---
openBtn.onclick = function() {
    modal.classList.add("open");
    if (!isPlayerSetup) {
        setupPlayer(VIDEO_URL);
        isPlayerSetup = true;
    } else {
        const video = playerWrapper.querySelector('video');
        if(video) video.play();
    }
}

// --- MODAL İŞLEMLERİ (GÜNCELLENDİ) ---

// Açma İşlemi
openBtn.onclick = function() {
    modal.classList.add("open");
    
    // Her açılışta player'ı sıfırdan kur (Böylece video hep baştan başlar)
    if (!isPlayerSetup) {
        setupPlayer(VIDEO_URL);
        isPlayerSetup = true;
    } else {
        const video = playerWrapper.querySelector('video');
        if(video) video.play();
    }
}

// Kapatma Fonksiyonu (Videoyu Hafızadan Siler)
function closePlayer() {
    modal.classList.remove("open");
    
    const video = playerWrapper.querySelector('video');
    
    if (video) {
        video.pause();           // 1. Durdur
        video.removeAttribute('src'); // 2. Kaynağı sil
        video.load();            // 3. Boş kaynağı yükle (Bildirimi siler)
    }

    // HLS kullanıyorsak onu da yok et
    if (hls) {
        hls.destroy();
        hls = null;
    }

    // Player içeriğini temizle ve durumu sıfırla
    playerWrapper.innerHTML = ""; 
    isPlayerSetup = false; 
}

// Çarpıya basınca
closeBtn.onclick = closePlayer;

// Boşluğa basınca
window.onclick = function(event) {
    if (event.target == modal) closePlayer();
}

// --- PLAYER KURULUMU ---
function setupPlayer(url) {
    playerWrapper.innerHTML = `
        <div class="player-container">
            <div class="loading-spinner"></div>
            
            <video id="mainVideo" playsinline crossorigin="anonymous"></video>
            
            <div class="controls-container">
                <div class="timeline-container">
                    <div class="timeline"></div>
                </div>

                <div class="controls">
                    <div class="controls-left">
                        <button class="play-pause-btn"><span class="material-icons">play_arrow</span></button>
                        <div class="duration-container"><span class="current-time">0:00</span> / <span class="total-time">0:00</span></div>
                    </div>
                    
                    <div class="controls-right">
                        <div class="settings-container" style="position: relative;">
                            <button class="settings-btn"><span class="material-icons">settings</span></button>
                            <div class="settings-menu hidden">
                                <div class="settings-menu-content"></div>
                            </div>
                        </div>
                        <button class="fullscreen-btn"><span class="material-icons">fullscreen</span></button>
                    </div>
                </div>
            </div>
        </div>`;

    const video = document.getElementById('mainVideo');
    const container = playerWrapper.querySelector('.player-container');

    // HLS Bağlantısı
    if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play().catch(e => console.log("Otomatik oynatma engellendi."));
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', function() {
            video.play();
        });
    }

    initializeControls(video, container);
}

function initializeControls(video, container) {
    const playBtn = container.querySelector('.play-pause-btn span');
    const playBtnWrapper = container.querySelector('.play-pause-btn');
    const fullBtn = container.querySelector('.fullscreen-btn');
    const timeDisplay = container.querySelector('.current-time');
    const durationDisplay = container.querySelector('.total-time');
    const timelineContainer = container.querySelector('.timeline-container');
    const timeline = container.querySelector('.timeline');
    const settingsBtn = container.querySelector('.settings-btn');
    const settingsMenu = container.querySelector('.settings-menu');
    const menuContent = container.querySelector('.settings-menu-content');

    // Süre Formatı (0:00)
    function formatTime(seconds) {
        if(isNaN(seconds)) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    // Oynat/Durdur
    function togglePlay() {
        if(video.paused) video.play(); else video.pause();
    }
    playBtnWrapper.addEventListener('click', togglePlay);
    video.addEventListener('click', () => {
        if (!settingsMenu.classList.contains('hidden')) settingsMenu.classList.add('hidden');
        else togglePlay();
    });

    video.addEventListener('play', () => playBtn.textContent = 'pause');
    video.addEventListener('pause', () => playBtn.textContent = 'play_arrow');

    // Zaman Güncellemesi
    video.addEventListener('timeupdate', () => {
        const percent = (video.currentTime / video.duration) * 100;
        timeline.style.width = `${percent}%`;
        timeDisplay.textContent = formatTime(video.currentTime);
    });

    video.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(video.duration);
    });

    // Timeline Tıklama
    timelineContainer.addEventListener('click', (e) => {
        const rect = timelineContainer.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = percent * video.duration;
    });

    // -----------------------------------------------------
    // YENİ EKLENEN: AKILLI MOBİL TAM EKRAN MANTIĞI
    // -----------------------------------------------------
    fullBtn.addEventListener('click', async () => {
        if (!document.fullscreenElement) {
            // Tam ekrana gir
            try {
                await container.requestFullscreen();
                // Destekleyen mobillerde ekranı YATAY kilitle
                if (screen.orientation && screen.orientation.lock) {
                    await screen.orientation.lock('landscape').catch(err => {
                        console.log('Oryantasyon kilidi desteklenmiyor veya izin verilmedi:', err);
                    });
                }
            } catch (err) {
                console.log("Tam ekran hatası:", err);
            }
        } else {
            // Tam ekrandan çık
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            }
        }
    });

    // Sistem (Geri Tuşu) ile çıkılırsa oryantasyonu düzelt
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            // Tam ekrandan çıkıldıysa oryantasyon kilidini kaldır (Eski haline dönsün)
            if (screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock();
            }
        }
    });
    // -----------------------------------------------------

    // Loading Göstergesi
    video.addEventListener('waiting', () => container.classList.add('loading'));
    video.addEventListener('playing', () => container.classList.remove('loading'));

    // Mouse Durunca Kontrolleri Gizle
    let timer;
    container.addEventListener('mousemove', () => {
        container.classList.add('controls-visible');
        clearTimeout(timer);
        timer = setTimeout(() => {
            if(!video.paused && settingsMenu.classList.contains('hidden')) {
                container.classList.remove('controls-visible');
            }
        }, 2000);
    });

    // --- AYARLAR MENÜSÜ ---
    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsMenu.classList.toggle('hidden');
        if (!settingsMenu.classList.contains('hidden')) buildMainMenu();
    });

    settingsMenu.addEventListener('click', (e) => e.stopPropagation());

    // 1. ANA MENÜ
    function buildMainMenu(isBack = false) {
        const speed = video.playbackRate === 1 ? 'Normal' : `${video.playbackRate}x`;
        
        let quality = 'Otomatik';
        if (hls && hls.currentLevel !== -1 && hls.levels.length > 0) {
            const lvl = hls.levels[hls.currentLevel];
            if(lvl) quality = lvl.height + 'p';
        }

        const html = `
            <div class="menu-header">Ayarlar</div>
            
            <div class="menu-item" data-menu="quality">
                <div class="label"><span class="material-icons">high_quality</span>Kalite</div>
                <div class="value">${quality} <span class="material-icons">chevron_right</span></div>
            </div>

            <div class="menu-item" data-menu="speed">
                <div class="label"><span class="material-icons">slow_motion_video</span>Hız</div>
                <div class="value">${speed} <span class="material-icons">chevron_right</span></div>
            </div>
        `;
        
        renderMenu(html);
        
        // Tıklama Olayları
        menuContent.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                if (item.dataset.menu === 'quality') buildQualityMenu();
                if (item.dataset.menu === 'speed') buildSpeedMenu();
            });
        });
    }

    // 2. KALİTE MENÜSÜ
    function buildQualityMenu() {
        if (!hls) return;
        let html = `<div class="menu-header is-back-button"><span class="material-icons">arrow_back</span>Kalite</div>`;
        
        const isAuto = hls.autoLevelEnabled;
        html += `<div class="menu-item ${isAuto ? 'active' : ''}" data-val="-1"><div class="label">Otomatik</div></div>`;

        hls.levels.forEach((level, index) => {
            const isSelected = hls.currentLevel === index && !isAuto;
            html += `<div class="menu-item ${isSelected ? 'active' : ''}" data-val="${index}"><div class="label">${level.height}p</div></div>`;
        });

        renderMenu(html);
        bindBackBtn();

        menuContent.querySelectorAll('.menu-item[data-val]').forEach(item => {
            item.addEventListener('click', () => {
                hls.currentLevel = parseInt(item.dataset.val);
                buildMainMenu();
            });
        });
    }

    // 3. HIZ MENÜSÜ
    function buildSpeedMenu() {
        const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        let html = `<div class="menu-header is-back-button"><span class="material-icons">arrow_back</span>Hız</div>`;

        speeds.forEach(s => {
            const isActive = video.playbackRate === s;
            const label = s === 1 ? 'Normal' : s + 'x';
            html += `<div class="menu-item ${isActive ? 'active' : ''}" data-val="${s}"><div class="label">${label}</div></div>`;
        });

        renderMenu(html);
        bindBackBtn();

        menuContent.querySelectorAll('.menu-item[data-val]').forEach(item => {
            item.addEventListener('click', () => {
                video.playbackRate = parseFloat(item.dataset.val);
                buildMainMenu();
            });
        });
    }

    // YARDIMCI FONKSİYONLAR
    function renderMenu(html) {
        menuContent.innerHTML = html;
    }

    function bindBackBtn() {
        menuContent.querySelector('.is-back-button').addEventListener('click', () => buildMainMenu());
    }
}