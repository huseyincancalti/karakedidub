const content = document.getElementById('content-area');
const socialMedia = document.getElementById('social-media'); // Sosyal medya linkleri container'ı
const originalTitle = document.title;
let currentSection = null;

// Sekme dışına çıkınca başlık değiştir
window.addEventListener("blur", () => {
    document.title = "Geri Gel 😭";
});

// Sekmeye geri gelince başlığı eski haline getir
window.addEventListener("focus", () => {
    document.title = originalTitle;
});



// Logo tıklanınca sayfa yenilensin
document.getElementById("refresh-link").addEventListener("click", (event) => {
    event.preventDefault();
    location.reload();
});

// Mobilde video arka plan otomatik oynatma kontrolü
const bgVideo = document.getElementById('background-video');
if (/Mobi|Android/i.test(navigator.userAgent)) {
    if (bgVideo) {
        bgVideo.pause();
        // Kullanıcı sayfaya tıklayınca oynat
        document.body.addEventListener('click', () => {
            if (bgVideo.paused) bgVideo.play();
        }, { once: true });
    }
}

// Shop içeriği döndüren fonksiyon
function getShopContent() {
    return `
    <div class="shop-links">
        <a href="https://www.sahibinden.com/arama?userId=aaanY296LAp2ywfDoiKRKhA" target="_blank" class="sahibinden" rel="noopener noreferrer">
            <img src="Resimler/sahibinden-icon.webp" class="shop-icon" alt="Sahibinden" />
            Sahibinden
        </a>
        <a href="https://www.gardrops.com/karakedidub" target="_blank" class="gardrops" rel="noopener noreferrer">
            <img src="Resimler/gardrops-icon.webp" class="shop-icon" alt="Gardrops" />
            Gardrops
        </a>
        <a href="https://www.dolap.com/profil/karakedidub" target="_blank" class="dolap" rel="noopener noreferrer">
            <img src="Resimler/dolap-icon.webp" class="shop-icon" alt="Dolap" />
            Dolap
        </a>
    </div>

    <div class="campaign-container">
        <div class="campaign-item" onclick="window.open('https://www.sahibinden.com/ilan/ikinci-el-ve-sifir-alisveris-muzik-studyo-ekipmanlari-behringer-umc22-temiz-ve-sifir-gibi-ses-karti-1253373572/detay', '_blank')">
            <img src="Resimler/sahibinden-campaign.webp" alt="Sahibinden Kampanya" />
            <h3>BEHRINGER UMC22 SES KARTI</h3>
            <p>Sahibinden Linki!</p>
        </div>
        <div class="campaign-item" onclick="window.open('https://www.gardrops.com/cocuk/cocuk-oyuncak/gojo-figuru-gomen-amanai-56ed06ceafb556cc', '_blank')">
            <img src="Resimler/gardrops-campaign.webp" alt="Gardrops Kampanya" />
            <h3>GOJO FİGÜRÜ</h3>
            <p>Gardrops Linki!</p>
        </div>
    </div>
    `;
}

// Videolar içeriği döndüren fonksiyon
function getVideosContent() {
    return `
    <div class="video-gallery">

        <div class="video-item">
            <iframe src="https://drive.google.com/file/d/1I1LxffXlJxe_xDa10i7zUMoZdQfDCqhT/preview" title="🔥 Wınd Breaker Shıshıtoren BASKINI" allowfullscreen style="display: block; width: 100%; height: 315px; margin-bottom: 10px;"></iframe>
            <h3>Wind Breaker Shishitoren BASKINI</h3>
            <div style="text-align: left;">
                <p class="section-title"><strong>Seslendirenler 🎙️</strong></p>
                <ul style="list-style: none; padding-left: 0; margin: 8px 0;">
                    <li>🔹 Choji Tomiyama: <strong>Berkan ASLAN</strong></li>
                    <li>🔹 Umemiya: <strong>Cankat MEZDE</strong></li>
                    <li>🔹 Togame: <strong>Barkın SÖNMEZ</strong></li>
                    <li>🔹 Sakura: <strong>Hüseyin Can ÇALTI</strong></li>
                    <li>🔹 Hiragi: <strong>Berke DAMAR</strong></li>
                    <li>🔹 Nirei: <strong>Alp HANCİ</strong></li>
                    <li>🔹 Suo: <strong>Muhammet Ali ÖZSEZ</strong></li>
                    <li>🔹 Sugishita: <strong>Onur ÖZDEMİR</strong></li>
                    <li>🔹 Sasaki: <strong>Ersin Furkan YETİM</strong></li>
                    <li>🔹 Kanuma: <strong>Alper Emre ŞAHİN</strong></li>
                    <li>🔹 Arima: <strong>Alperen</strong></li>
                    <li>🔹 Sako: <strong>Emir</strong></li>
                </ul>
                <p class="section-title"><strong>Ekip 🛠️</strong></p>
                <ul style="list-style: none; padding-left: 0; margin: 8px 0;">
                    <li>🔸 Yönetmen – Hüseyin Can ÇALTI</li>
                    <li>🔸 Çeviri & Lokalizasyon – Muhammet Ali ÖZSEZ</li>
                    <li>🔸 Mix & Kurgu – Yiğit Efe MAMUR</li>
                    <li>🔸 Kapak Tasarımı – Hüseyin Can ÇALTI</li>
                </ul>
            </div>
        </div>

        <div class="video-item">
            <iframe src="https://drive.google.com/file/d/1RRJjBB9qL6BKoaOjjco-4wJ1DvwYnIUN/preview" title="Dabi - Toga Geçmişi" allowfullscreen style="display: block; width: 100%; height: 315px; margin-bottom: 10px;"></iframe>
            <h3>Toga'nın Geçmişi</h3>
            <div style="text-align: left;">
                <p class="section-title"><strong>Seslendirenler 🎙️</strong></p>
                <ul style="list-style: none; padding-left: 0; margin: 8px 0;">
                    <li>🔹 Dabi: <strong>Hüseyin Can ÇALTI</strong></li>
                    <li>🔹 Küçük Toga & Himiko Toga: <strong>Sina SÖNMEZ</strong></li>
                    <li>🔹 Baba: <strong>Berke DAMAR</strong></li>
                    <li>🔹 Anne: <strong>Esma Shiga</strong></li>
                    <li>🔹 Kız: <strong>Palyanne</strong></li>
                </ul>
                <p class="section-title"><strong>Ekip 🛠️</strong></p>
                <ul style="list-style: none; padding-left: 0; margin: 8px 0;">
                    <li>🔸 Yönetmen – Hüseyin Can ÇALTI</li>
                    <li>🔸 Çeviri & Lokalizasyon – Hüseyin Can ÇALTI</li>
                    <li>🔸 Mix & Kurgu – Hüseyin Can ÇALTI</li>
                    <li>🔸 Kapak Tasarımı – Hüseyin Can ÇALTI</li>
                </ul>
            </div>
        </div>

        <div class="video-item">
            <iframe src="https://drive.google.com/file/d/1wrA4w1RNxSU7bXHvzRJGtOEYc5GD1Oh-/preview" title="Mushoku Tensei Rudeus'un Çavuşu (Drive)" allowfullscreen style="display: block; width: 100%; height: 315px; margin-bottom: 10px;"></iframe>
            <h3>Mushoku Tensei Rudeus'un Çavuşu</h3>
            <div style="text-align: left;">
                <p class="section-title"><strong>Seslendirenler 🎙️</strong></p>
                <ul style="list-style: none; padding-left: 0; margin: 8px 0;">
                    <li>🔹 Hitogami: <strong>Hüseyin Can Çaltı</strong></li>
                    <li>🔹 Rudeus: <strong>Berke Damar</strong></li>
                </ul>
                <p class="section-title"><strong>Ekip 🛠️</strong></p>
                <ul style="list-style: none; padding-left: 0; margin: 8px 0;">
                    <li>🔸 Yönetmen – Hüseyin Can Çaltı</li>
                    <li>🔸 Ses ve SFX – Cenktuğ</li>
                    <li>🔸 Mix & Kurgu – Hüseyin Can Çaltı</li>
                    <li>🔸 Çeviri & Lokalizasyon – Hüseyin Can Çaltı</li>
                    <li>🔸 Kapak Tasarımı – Hüseyin Can ÇALTI</li>
                </ul>
            </div>
        </div>

    </div>
    `;
}

// İçerik gösterme ve sosyal medya gizleme/gösterme fonksiyonu
function showSection(section) {

    

    if (section === currentSection) {
        // Aynı butona tekrar basılırsa içeriği ve gizlemeyi kaldır
        content.innerHTML = '';
        currentSection = null;
        if (socialMedia) socialMedia.style.display = 'flex'; // Sosyal medyayı göster
        return;
    }

    currentSection = section;

    // İçeriği güncelle
    if (section === 'shop') {
        content.innerHTML = getShopContent();
    } else if (section === 'videos') {
        content.innerHTML = getVideosContent();
    } else {
        content.innerHTML = '';
    }

    // Mobilde sosyal medya linklerini gizle, masaüstünde göster
    if (window.innerWidth <= 650) {
        if (socialMedia) socialMedia.style.display = 'none';
    } else {
        if (socialMedia) socialMedia.style.display = 'flex';
    }

    // Scroll hareketi
    if (window.innerWidth <= 650) {
        const yOffset = -20; // biraz üstten başlatmak için
        const y = content.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
}

// Mobilde video arka planının yükseklik hatasını düzeltmek için --vh hesapla
function updateVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Sayfa yüklendiğinde ve boyut değiştiğinde tetikle
updateVH();
window.addEventListener('resize', updateVH);


// Sayfa yüklendiğinde içerik boş
content.innerHTML = '';
