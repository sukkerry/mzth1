/* javascripts.js — Audio Sebenar Mixkit + Animasi + 3 Level × 7 Aktiviti */

// ===================== SISTEM AUDIO (MIXKIT SOUND EFFECTS) =====================
const SoundSystem = {
    enabled: true,
    audioElements: {},
    
    // URL audio sebenar dari Mixkit
    urls: {
        // ===== BUNYI HAIWAN =====
        kucing: 'https://assets.mixkit.co/sfx/preview/mixkit-cat-meow-2-2068.mp3',
        anjing: 'https://assets.mixkit.co/sfx/preview/mixkit-dog-barking-2-2065.mp3',
        ayam: 'https://assets.mixkit.co/sfx/preview/mixkit-rooster-crowing-2-2067.mp3',
        lembu: 'https://assets.mixkit.co/sfx/preview/mixkit-cow-moo-2-2066.mp3',
        kambing: 'https://assets.mixkit.co/sfx/preview/mixkit-goat-bleat-2-2069.mp3',
        
        // ===== BUNYI MANUSIA =====
        bayi: 'https://assets.mixkit.co/sfx/preview/mixkit-baby-crying-2-2070.mp3',
        ketawa: 'https://assets.mixkit.co/sfx/preview/mixkit-laughing-2-2071.mp3',
        bersin: 'https://assets.mixkit.co/sfx/preview/mixkit-sneeze-2-2072.mp3',
        nyanyi: 'https://assets.mixkit.co/sfx/preview/mixkit-woman-singing-2-2073.mp3',
        tepuk: 'https://assets.mixkit.co/sfx/preview/mixkit-clapping-2-2074.mp3',
        
        // ===== BUNYI KENDERAAN =====
        kereta: 'https://assets.mixkit.co/sfx/preview/mixkit-car-ignition-2-2075.mp3',
        motorsikal: 'https://assets.mixkit.co/sfx/preview/mixkit-motorcycle-2-2076.mp3',
        bas: 'https://assets.mixkit.co/sfx/preview/mixkit-bus-horn-2-2077.mp3',
        kapal: 'https://assets.mixkit.co/sfx/preview/mixkit-ship-horn-2-2078.mp3',
        kapal_terbang: 'https://assets.mixkit.co/sfx/preview/mixkit-airplane-2-2079.mp3',
        
        // ===== BUNYI AKTIVITI =====
        correct: 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3',
        wrong: 'https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-buzz-2-2079.mp3',
        click: 'https://assets.mixkit.co/sfx/preview/mixkit-game-click-1114.mp3',
        complete: 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3',
        select: 'https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3',
        drag: 'https://assets.mixkit.co/sfx/preview/mixkit-drag-and-drop-2-2079.mp3'
    },
    
    init() {
        // Preload semua audio
        Object.keys(this.urls).forEach(key => {
            try {
                const audio = new Audio(this.urls[key]);
                audio.preload = 'auto';
                audio.volume = 0.7;
                this.audioElements[key] = audio;
            } catch (e) {
                console.warn('Gagal memuatkan audio:', key);
            }
        });
    },
    
    toggle() {
        this.enabled = !this.enabled;
        // Pause semua audio jika dimatikan
        if (!this.enabled) {
            Object.values(this.audioElements).forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
        }
        return this.enabled;
    },
    
    play(soundName) {
        if (!this.enabled) return;
        const audio = this.audioElements[soundName];
        if (audio) {
            try {
                audio.currentTime = 0;
                audio.play().catch(err => {
                    // Browser mungkin block autoplay, tapi ini normal
                    console.log('Audio play prevented:', err.message);
                });
            } catch (e) {}
        }
    }
};

// ===================== DATA BUNYI =====================
const SOUND_DATA = {
    mudah: {
        animals: [
            { id: 'kucing', name: 'Kucing', emoji: '🐱', sound: 'Meow' },
            { id: 'anjing', name: 'Anjing', emoji: '🐶', sound: 'Woof' },
            { id: 'ayam', name: 'Ayam', emoji: '🐔', sound: 'Kukuruyuk' }
        ],
        humans: [
            { id: 'bayi', name: 'Bayi', emoji: '👶', sound: 'Owek' },
            { id: 'ketawa', name: 'Ketawa', emoji: '😄', sound: 'Haha' },
            { id: 'bersin', name: 'Bersin', emoji: '🤧', sound: 'Achoo' }
        ],
        vehicles: [
            { id: 'kereta', name: 'Kereta', emoji: '🚗', sound: 'Vroom' },
            { id: 'motorsikal', name: 'Motorsikal', emoji: '🏍️', sound: 'Brum' },
            { id: 'bas', name: 'Bas', emoji: '🚌', sound: 'Honk' }
        ]
    },
    sederhana: {
        animals: [
            { id: 'kucing', name: 'Kucing', emoji: '🐱', sound: 'Meow' },
            { id: 'anjing', name: 'Anjing', emoji: '🐶', sound: 'Woof' },
            { id: 'ayam', name: 'Ayam', emoji: '🐔', sound: 'Kukuruyuk' },
            { id: 'lembu', name: 'Lembu', emoji: '🐮', sound: 'Moo' }
        ],
        humans: [
            { id: 'bayi', name: 'Bayi', emoji: '👶', sound: 'Owek' },
            { id: 'ketawa', name: 'Ketawa', emoji: '😄', sound: 'Haha' },
            { id: 'bersin', name: 'Bersin', emoji: '🤧', sound: 'Achoo' },
            { id: 'nyanyi', name: 'Nyanyi', emoji: '🎤', sound: 'Lalala' }
        ],
        vehicles: [
            { id: 'kereta', name: 'Kereta', emoji: '🚗', sound: 'Vroom' },
            { id: 'motorsikal', name: 'Motorsikal', emoji: '🏍️', sound: 'Brum' },
            { id: 'bas', name: 'Bas', emoji: '🚌', sound: 'Honk' },
            { id: 'kapal', name: 'Kapal', emoji: '🚢', sound: 'Toot' }
        ]
    },
    mencabar: {
        animals: [
            { id: 'kucing', name: 'Kucing', emoji: '🐱', sound: 'Meow' },
            { id: 'anjing', name: 'Anjing', emoji: '🐶', sound: 'Woof' },
            { id: 'ayam', name: 'Ayam', emoji: '🐔', sound: 'Kukuruyuk' },
            { id: 'lembu', name: 'Lembu', emoji: '🐮', sound: 'Moo' },
            { id: 'kambing', name: 'Kambing', emoji: '🐐', sound: 'Mbek' }
        ],
        humans: [
            { id: 'bayi', name: 'Bayi', emoji: '👶', sound: 'Owek' },
            { id: 'ketawa', name: 'Ketawa', emoji: '😄', sound: 'Haha' },
            { id: 'bersin', name: 'Bersin', emoji: '🤧', sound: 'Achoo' },
            { id: 'nyanyi', name: 'Nyanyi', emoji: '🎤', sound: 'Lalala' },
            { id: 'tepuk', name: 'Tepuk', emoji: '👏', sound: 'Clap' }
        ],
        vehicles: [
            { id: 'kereta', name: 'Kereta', emoji: '🚗', sound: 'Vroom' },
            { id: 'motorsikal', name: 'Motorsikal', emoji: '🏍️', sound: 'Brum' },
            { id: 'bas', name: 'Bas', emoji: '🚌', sound: 'Honk' },
            { id: 'kapal', name: 'Kapal', emoji: '🚢', sound: 'Toot' },
            { id: 'kapal_terbang', name: 'Kapal Terbang', emoji: '✈️', sound: 'Whoosh' }
        ]
    }
};

// ===================== STATE =====================
let currentLevel = 'mudah';
let currentActivity = 0;

// ===================== DOM =====================
const levelSelection = document.getElementById('level-selection');
const activityScreen = document.getElementById('activity-screen');
const currentLevelTitle = document.getElementById('current-level-title');
const activityProgress = document.getElementById('activity-progress');
const activityContent = document.getElementById('activity-content');
const feedbackEl = document.getElementById('feedback');
const tabButtons = document.querySelectorAll('.tab-btn');
const backBtn = document.getElementById('back-to-level');
const soundToggle = document.getElementById('sound-toggle');

// ===================== INIT =====================
function init() {
    // Init audio
    SoundSystem.init();
    
    // Aktifkan audio pada interaksi pertama
    document.body.addEventListener('click', () => {
        // Browser memerlukan interaksi pengguna untuk main audio
        if (SoundSystem.audioElements.correct) {
            SoundSystem.play('click');
        }
    }, { once: true });

    // Butang bunyi
    soundToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const enabled = SoundSystem.toggle();
        soundToggle.classList.toggle('muted', !enabled);
        soundToggle.innerHTML = enabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
        if (enabled) SoundSystem.play('click');
    });

    // Pilih level
    document.querySelectorAll('.level-card').forEach(card => {
        card.addEventListener('click', () => {
            SoundSystem.play('click');
            currentLevel = card.dataset.level;
            levelSelection.classList.remove('active');
            activityScreen.classList.add('active');
            currentLevelTitle.textContent = currentLevel.toUpperCase();
            currentActivity = 0;
            updateTabs();
            renderActivity();
            feedbackEl.textContent = '';
        });
    });

    // Kembali ke pilih level
    backBtn.addEventListener('click', () => {
        SoundSystem.play('click');
        activityScreen.classList.remove('active');
        levelSelection.classList.add('active');
        feedbackEl.textContent = '';
    });

    // Tab aktiviti
    tabButtons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            SoundSystem.play('click');
            currentActivity = idx;
            updateTabs();
            renderActivity();
            feedbackEl.textContent = '';
        });
    });
}

function updateTabs() {
    tabButtons.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === currentActivity);
    });
    activityProgress.textContent = `Aktiviti ${currentActivity + 1}/7`;
}

// ===================== RENDER AKTIVITI =====================
function renderActivity() {
    activityContent.innerHTML = '';
    feedbackEl.textContent = '';

    const levelData = SOUND_DATA[currentLevel];
    const allItems = [
        ...levelData.animals,
        ...levelData.humans,
        ...levelData.vehicles
    ];

    switch (currentActivity) {
        case 0: renderMengecam(levelData, allItems); break;
        case 1: renderPadanan(levelData, allItems); break;
        case 2: renderDragDrop(levelData, allItems); break;
        case 3: renderMemori(levelData, allItems); break;
        case 4: renderBetulSalah(levelData, allItems); break;
        case 5: renderSusunUrutan(levelData, allItems); break;
        case 6: renderPuzzle(levelData, allItems); break;
    }
}

// ===================== 1. MENGECAM =====================
function renderMengecam(levelData, allItems) {
    const item = allItems[Math.floor(Math.random() * allItems.length)];
    const options = shuffleArray([...allItems]).slice(0, 4);
    if (!options.find(o => o.id === item.id)) {
        options[0] = item;
        shuffleArray(options);
    }

    let html = `<div class="activity-title">🔊 Dengar dan pilih gambar yang betul</div>`;
    html += `<div style="font-size:2rem; margin:10px 0; cursor:pointer;" id="play-sound-btn">🔊 "${item.sound}" <i class="fas fa-play-circle" style="color:#b35100;"></i></div>`;
    html += `<div style="font-size:1.2rem; color:#7a4a1b;">Bunyi apa ini? (Klik bunyi untuk dengar)</div>`;
    html += `<div class="options-grid">`;
    options.forEach(opt => {
        html += `<div class="option-card" data-id="${opt.id}" data-correct="${opt.id === item.id}">
            ${opt.emoji}<br><span style="font-size:0.9rem;">${opt.name}</span>
        </div>`;
    });
    html += `</div>`;
    activityContent.innerHTML = html;

    document.getElementById('play-sound-btn').addEventListener('click', () => {
        SoundSystem.play(item.id);
    });

    // Auto-main bunyi selepas render
    setTimeout(() => SoundSystem.play(item.id), 400);

    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            const isCorrect = this.dataset.correct === 'true';
            if (isCorrect) {
                SoundSystem.play('correct');
                this.classList.add('correct-highlight');
                feedbackEl.textContent = '✅ Betul! Hebat!';
                feedbackEl.style.color = '#2e7d32';
                document.querySelectorAll('.option-card').forEach(c => c.style.pointerEvents = 'none');
                setTimeout(() => renderActivity(), 1600);
            } else {
                SoundSystem.play('wrong');
                this.classList.add('wrong-highlight');
                feedbackEl.textContent = '❌ Cuba lagi!';
                feedbackEl.style.color = '#c62828';
                setTimeout(() => this.classList.remove('wrong-highlight'), 700);
            }
        });
    });
}

// ===================== 2. PADANAN =====================
function renderPadanan(levelData, allItems) {
    const pairs = shuffleArray([...allItems]).slice(0, 3);
    const leftItems = pairs.map(p => ({ ...p, type: 'sound' }));
    const rightItems = shuffleArray(pairs.map(p => ({ ...p, type: 'emoji' })));

    let html = `<div class="activity-title">🔗 Padankan bunyi dengan gambar</div>`;
    html += `<div style="display:flex; flex-wrap:wrap; gap:30px; justify-content:center; align-items:center;">`;
    html += `<div style="display:flex; flex-direction:column; gap:12px;">`;
    leftItems.forEach(item => {
        html += `<div class="match-card" data-id="${item.id}" data-type="sound" style="font-size:1.2rem; padding:10px 18px; width:auto; min-width:130px; height:auto; background:linear-gradient(145deg, #c5e0ff, #a8c8f0); cursor:pointer;">
            🔊 ${item.sound}
        </div>`;
    });
    html += `</div>`;
    html += `<div style="display:flex; flex-direction:column; gap:12px;">`;
    rightItems.forEach(item => {
        html += `<div class="match-card" data-id="${item.id}" data-type="emoji" style="font-size:2.5rem; padding:10px; width:auto; min-width:100px; height:auto;">
            ${item.emoji}
        </div>`;
    });
    html += `</div></div>`;
    activityContent.innerHTML = html;

    let selectedSound = null;
    let matchedCount = 0;

    document.querySelectorAll('.match-card[data-type="sound"]').forEach(card => {
        card.addEventListener('click', function() {
            if (this.classList.contains('matched')) return;
            SoundSystem.play(this.dataset.id);
            document.querySelectorAll('.match-card[data-type="sound"]').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedSound = this;
        });
    });

    document.querySelectorAll('.match-card[data-type="emoji"]').forEach(card => {
        card.addEventListener('click', function() {
            if (!selectedSound || this.classList.contains('matched')) return;
            if (selectedSound.dataset.id === this.dataset.id) {
                SoundSystem.play('correct');
                selectedSound.classList.add('correct-highlight');
                this.classList.add('correct-highlight');
                selectedSound.classList.remove('selected');
                selectedSound.classList.add('matched');
                this.classList.add('matched');
                selectedSound.style.pointerEvents = 'none';
                this.style.pointerEvents = 'none';
                matchedCount++;
                feedbackEl.textContent = '✅ Padanan betul!';
                feedbackEl.style.color = '#2e7d32';
                selectedSound = null;
                if (matchedCount === 3) {
                    setTimeout(() => {
                        SoundSystem.play('complete');
                        feedbackEl.textContent = '🎉 Semua padanan betul!';
                        setTimeout(() => renderActivity(), 1600);
                    }, 400);
                }
            } else {
                SoundSystem.play('wrong');
                this.classList.add('wrong-highlight');
                feedbackEl.textContent = '❌ Cuba lagi!';
                feedbackEl.style.color = '#c62828';
                setTimeout(() => this.classList.remove('wrong-highlight'), 700);
            }
        });
    });
}

// ===================== 3. DRAG & DROP =====================
function renderDragDrop(levelData, allItems) {
    const items = shuffleArray([...allItems]).slice(0, 3);
    let html = `<div class="activity-title">📦 Seret bunyi ke gambar yang betul</div>`;
    html += `<div style="display:flex; flex-wrap:wrap; gap:25px; justify-content:center;">`;
    items.forEach(item => {
        html += `<div class="drop-zone" data-id="${item.id}" style="flex-direction:column; font-size:2.5rem;">
            ${item.emoji}<br><span style="font-size:0.8rem;">${item.name}</span>
        </div>`;
    });
    html += `</div>`;
    html += `<div style="margin-top:25px; display:flex; flex-wrap:wrap; gap:15px; justify-content:center;">`;
    shuffleArray(items).forEach(item => {
        html += `<div class="drag-item" draggable="true" data-id="${item.id}" style="font-size:1.2rem; width:auto; padding:12px 20px; height:auto; cursor:grab;">
            🔊 ${item.sound}
        </div>`;
    });
    html += `</div>`;
    activityContent.innerHTML = html;

    document.querySelectorAll('.drag-item').forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.dataset.id);
            SoundSystem.play(item.dataset.id);
        });
    });

    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('hover');
        });
        zone.addEventListener('dragleave', () => {
            zone.classList.remove('hover');
        });
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('hover');
            const id = e.dataTransfer.getData('text/plain');
            const dropId = zone.dataset.id;
            if (id === dropId) {
                SoundSystem.play('correct');
                zone.style.background = 'linear-gradient(145deg, #b9f6ca, #a5d6a7)';
                zone.style.borderColor = '#2e7d32';
                zone.innerHTML = `✅ ${zone.innerHTML}`;
                document.querySelector(`.drag-item[data-id="${id}"]`)?.remove();
                feedbackEl.textContent = '✅ Betul!';
                feedbackEl.style.color = '#2e7d32';
                if (document.querySelectorAll('.drag-item').length === 0) {
                    setTimeout(() => {
                        SoundSystem.play('complete');
                        feedbackEl.textContent = '🎉 Hebat! Semua betul!';
                        setTimeout(() => renderActivity(), 1600);
                    }, 400);
                }
            } else {
                SoundSystem.play('wrong');
                feedbackEl.textContent = '❌ Cuba lagi!';
                feedbackEl.style.color = '#c62828';
            }
        });
    });
}

// ===================== 4. MEMORI =====================
function renderMemori(levelData, allItems) {
    const pairs = shuffleArray([...allItems]).slice(0, 4);
    let cards = [];
    pairs.forEach(p => {
        cards.push({ id: p.id, emoji: p.emoji, name: p.name, type: 'emoji' });
        cards.push({ id: p.id, text: p.sound, name: p.name, type: 'sound' });
    });
    cards = shuffleArray(cards);

    let html = `<div class="activity-title">🧠 Memori: Padankan bunyi & gambar</div>`;
    html += `<div class="memory-grid">`;
    cards.forEach((card, idx) => {
        html += `<div class="memory-card" data-idx="${idx}" data-id="${card.id}" data-type="${card.type}" data-face="${card.type === 'emoji' ? card.emoji : card.text}" data-matched="false">
            ❓
        </div>`;
    });
    html += `</div>`;
    activityContent.innerHTML = html;

    let flipped = [];
    let matchedPairs = 0;
    let lock = false;

    document.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('click', function() {
            if (lock || this.classList.contains('flipped') || this.classList.contains('matched')) return;
            SoundSystem.play('click');
            const face = this.dataset.face;
            this.textContent = face;
            this.classList.add('flipped');

            if (this.dataset.type === 'sound') {
                SoundSystem.play(this.dataset.id);
            }

            flipped.push({ el: this, id: this.dataset.id, type: this.dataset.type });

            if (flipped.length === 2) {
                lock = true;
                const [a, b] = flipped;
                if (a.id === b.id && a.type !== b.type) {
                    setTimeout(() => {
                        SoundSystem.play('correct');
                        a.el.classList.add('matched');
                        b.el.classList.add('matched');
                        a.el.classList.remove('flipped');
                        b.el.classList.remove('flipped');
                        a.el.textContent = a.el.dataset.face;
                        b.el.textContent = b.el.dataset.face;
                        matchedPairs++;
                        feedbackEl.textContent = '✅ Padanan betul!';
                        feedbackEl.style.color = '#2e7d32';
                        flipped = [];
                        lock = false;
                        if (matchedPairs === 4) {
                            setTimeout(() => {
                                SoundSystem.play('complete');
                                feedbackEl.textContent = '🎉 Semua padanan betul!';
                                setTimeout(() => renderActivity(), 1600);
                            }, 400);
                        }
                    }, 400);
                } else {
                    setTimeout(() => {
                        SoundSystem.play('wrong');
                        a.el.textContent = '❓';
                        b.el.textContent = '❓';
                        a.el.classList.remove('flipped');
                        b.el.classList.remove('flipped');
                        feedbackEl.textContent = '❌ Cuba lagi!';
                        feedbackEl.style.color = '#c62828';
                        flipped = [];
                        lock = false;
                    }, 800);
                }
            }
        });
    });
}

// ===================== 5. BETUL / SALAH =====================
function renderBetulSalah(levelData, allItems) {
    const item = allItems[Math.floor(Math.random() * allItems.length)];
    const isCorrect = Math.random() > 0.5;
    const other = allItems.find(i => i.id !== item.id);
    const shownEmoji = isCorrect ? item.emoji : (other ? other.emoji : '🐶');
    const shownName = isCorrect ? item.name : (other ? other.name : 'Anjing');

    let html = `<div class="activity-title">✅ Betul atau Salah?</div>`;
    html += `<div style="font-size:2rem; margin:15px 0; cursor:pointer;" id="play-sound-btn2">🔊 Bunyi: "${item.sound}" <i class="fas fa-play-circle" style="color:#b35100;"></i></div>`;
    html += `<div style="font-size:5rem; animation: bounceSlow 2s infinite;">${shownEmoji}</div>`;
    html += `<div style="font-size:1.5rem; margin:10px 0;">${shownName}</div>`;
    html += `<div style="display:flex; gap:30px; margin-top:20px; flex-wrap:wrap; justify-content:center;">`;
    html += `<button class="option-card" id="btn-betul" style="font-size:1.8rem; width:auto; padding:15px 40px; background:linear-gradient(145deg, #b9f6ca, #a5d6a7); color:#1b5e20;">BETUL</button>`;
    html += `<button class="option-card" id="btn-salah" style="font-size:1.8rem; width:auto; padding:15px 40px; background:linear-gradient(145deg, #ffcdd2, #ef9a9a); color:#b71c1c;">SALAH</button>`;
    html += `</div>`;
    activityContent.innerHTML = html;

    document.getElementById('play-sound-btn2').addEventListener('click', () => {
        SoundSystem.play(item.id);
    });
    setTimeout(() => SoundSystem.play(item.id), 400);

    document.getElementById('btn-betul').addEventListener('click', () => checkBetulSalah(true, isCorrect));
    document.getElementById('btn-salah').addEventListener('click', () => checkBetulSalah(false, isCorrect));
}

function checkBetulSalah(userSaysBetul, correctAnswer) {
    if (userSaysBetul === correctAnswer) {
        SoundSystem.play('correct');
        feedbackEl.textContent = '✅ Betul! Hebat!';
        feedbackEl.style.color = '#2e7d32';
        document.querySelectorAll('.option-card').forEach(b => b.style.pointerEvents = 'none');
        setTimeout(() => renderActivity(), 1600);
    } else {
        SoundSystem.play('wrong');
        feedbackEl.textContent = '❌ Cuba lagi!';
        feedbackEl.style.color = '#c62828';
    }
}

// ===================== 6. SUSUN URUTAN =====================
function renderSusunUrutan(levelData, allItems) {
    const items = shuffleArray([...allItems]).slice(0, 3);
    const soundOrder = items.map(i => i.sound);
    const shuffledEmojis = shuffleArray([...items]);

    let html = `<div class="activity-title">🔢 Susun gambar mengikut urutan bunyi</div>`;
    html += `<div style="display:flex; gap:15px; justify-content:center; margin:15px 0; font-size:1.2rem; flex-wrap:wrap;">`;
    soundOrder.forEach((s, idx) => {
        html += `<div style="background:linear-gradient(145deg, #ffeac2, #ffd89c); padding:8px 18px; border-radius:30px; box-shadow: 0 4px 0 #b16f2a; animation: bounceSlow 2s infinite; animation-delay: ${idx * 0.2}s;">${idx+1}. ${s}</div>`;
    });
    html += `</div>`;
    html += `<div style="display:flex; gap:20px; justify-content:center; margin:20px 0; flex-wrap:wrap;" id="sortable-emojis">`;
    shuffledEmojis.forEach(item => {
        html += `<div class="option-card sortable" data-id="${item.id}" style="font-size:3rem; cursor:pointer;">${item.emoji}</div>`;
    });
    html += `</div>`;
    html += `<button id="check-order" class="btn-pilih" style="max-width:200px;">SEMAK</button>`;
    activityContent.innerHTML = html;

    let selectedOrder = [];
    document.querySelectorAll('.sortable').forEach(card => {
        card.addEventListener('click', function() {
            SoundSystem.play(this.dataset.id);
            if (this.classList.contains('selected')) return;
            this.classList.add('selected');
            selectedOrder.push(this.dataset.id);
            if (selectedOrder.length === 3) {
                document.getElementById('check-order').style.display = 'block';
            }
        });
    });

    document.getElementById('check-order').addEventListener('click', () => {
        const correctIds = items.map(i => i.id);
        if (JSON.stringify(selectedOrder) === JSON.stringify(correctIds)) {
            SoundSystem.play('correct');
            feedbackEl.textContent = '✅ Urutan betul!';
            feedbackEl.style.color = '#2e7d32';
            setTimeout(() => renderActivity(), 1600);
        } else {
            SoundSystem.play('wrong');
            feedbackEl.textContent = '❌ Cuba lagi!';
            feedbackEl.style.color = '#c62828';
            document.querySelectorAll('.sortable').forEach(c => c.classList.remove('selected'));
            selectedOrder = [];
        }
    });
}

// ===================== 7. PUZZLE =====================
function renderPuzzle(levelData, allItems) {
    const item = allItems[Math.floor(Math.random() * allItems.length)];
    const pieces = [item.emoji, item.emoji, item.emoji, item.emoji];
    const shuffled = shuffleArray([...pieces]);

    let html = `<div class="activity-title">🧩 Susun puzzle: ${item.name}</div>`;
    html += `<div style="font-size:1.2rem; margin-bottom:10px; cursor:pointer;" id="play-sound-btn3">🔊 Dengar bunyi: "${item.sound}" <i class="fas fa-play-circle" style="color:#b35100;"></i></div>`;
    html += `<div class="puzzle-grid" id="puzzle-grid">`;
    shuffled.forEach((p, idx) => {
        html += `<div class="puzzle-piece" data-idx="${idx}" data-emoji="${p}" style="animation-delay: ${idx * 0.1}s;">${p}</div>`;
    });
    html += `</div>`;
    html += `<p style="margin-top:15px; color:#7a4a1b;">Klik dua keping untuk tukar tempat</p>`;
    activityContent.innerHTML = html;

    document.getElementById('play-sound-btn3').addEventListener('click', () => {
        SoundSystem.play(item.id);
    });
    setTimeout(() => SoundSystem.play(item.id), 400);

    let selectedPiece = null;
    document.querySelectorAll('.puzzle-piece').forEach(piece => {
        piece.addEventListener('click', function() {
            SoundSystem.play('click');
            if (!selectedPiece) {
                selectedPiece = this;
                this.classList.add('selected');
            } else {
                const temp = selectedPiece.textContent;
                selectedPiece.textContent = this.textContent;
                this.textContent = temp;
                selectedPiece.classList.remove('selected');
                selectedPiece = null;
                const allPieces = [...document.querySelectorAll('.puzzle-piece')];
                if (allPieces.every(p => p.textContent === item.emoji)) {
                    SoundSystem.play('complete');
                    feedbackEl.textContent = '🎉 Puzzle selesai!';
                    feedbackEl.style.color = '#2e7d32';
                    setTimeout(() => renderActivity(), 1600);
                }
            }
        });
    });
}

// ===================== UTILITI =====================
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ===================== MULA =====================
document.addEventListener('DOMContentLoaded', init);
