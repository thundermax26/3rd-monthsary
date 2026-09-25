document.addEventListener('DOMContentLoaded', () => {
  const scenes = {
    cover: document.getElementById('coverScene'),
    letter: document.getElementById('letterScene'),
    memories: document.getElementById('memoriesScene')
  };

  let currentScene = 'cover';
  let changingScene = false;

  function setScene(nextScene, options = {}) {
    if (!scenes[nextScene] || changingScene || currentScene === nextScene) return;

    changingScene = true;

    Object.entries(scenes).forEach(([name, scene]) => {
      const active = name === nextScene;
      scene.classList.toggle('active', active);
      scene.setAttribute('aria-hidden', String(!active));
    });

    if (nextScene !== 'memories') {
      scenes.memories.classList.remove('closing');
    }

    currentScene = nextScene;

    window.setTimeout(() => {
      changingScene = false;
    }, options.duration || 650);
  }

  /* ---------- Cover → Letter ---------- */
  const openEnvelope = document.getElementById('openEnvelope');
  if (openEnvelope) {
    openEnvelope.addEventListener('click', () => {
      if (changingScene || currentScene !== 'cover') return;

      document.body.classList.add('opening');
      startMusic();

      window.setTimeout(() => {
        document.body.classList.remove('opening');
        setScene('letter');
      }, 760);
    });
  }

  /* ---------- Letter navigation ---------- */
  document.getElementById('letterPrevious')?.addEventListener('click', () => {
    setScene('cover');
  });

  document.getElementById('letterNext')?.addEventListener('click', () => {
    saveLetter(true);
    setScene('memories');
  });

  /* ---------- Memories navigation ---------- */
  document.getElementById('memoriesPrevious')?.addEventListener('click', () => {
    setScene('letter');
  });

  const closeStory = document.getElementById('closeStory');
  const memoriesScene = document.getElementById('memoriesScene');
  const closingOverlay = document.getElementById('closingOverlay');

  closeStory?.addEventListener('click', () => {
    if (changingScene || currentScene !== 'memories') return;

    memoriesScene.classList.add('closing');
    closingOverlay?.setAttribute('aria-hidden', 'false');
    changingScene = true;

    window.setTimeout(() => {
      memoriesScene.classList.remove('closing');
      closingOverlay?.setAttribute('aria-hidden', 'true');
      changingScene = false;
      setScene('cover', { duration: 850 });
    }, 1200);
  });

  /* ---------- Love letter autosave ---------- */
  const loveLetter = document.getElementById('loveLetter');
  const saveStatus = document.getElementById('saveStatus');
  const STORAGE_KEY = 'rl-third-monthsary-letter';

  const DEFAULT_LETTER = `My beautiful baby,

Happy third monthiversary, my love. ❤️

It still feels unbelievable to me that on June 26, 2026, in the middle of the night, I met you in Roblox, and something so simple turned into the most beautiful thing that has ever happened to me. We were just playing together that night, not knowing that we were beginning something that would become so important, so precious, and so deeply personal to both of us. Out of all the people, all the places, and all the moments in this world, somehow it was you and me, on that night. And I will always be grateful for that.

Baby, I want you to know how much I appreciate everything you do for me. I appreciate every time you take care of me, every time you worry about me, every time you ask if I’m okay, every time you make sure I’ve eaten, rested, or feel loved. I appreciate the little things you do that you might not even realize mean so much to me. I appreciate the way you listen to me, the way you stay with me, the way you make space for my feelings, and the way you love me even when I am not at my best.

You have given me comfort when I needed it, patience when I was difficult, reassurance when I was afraid, and love when I felt like I needed it the most. You have made me feel cared for in ways I cannot always put into words. I hope you always know that I see those things. I notice them. I remember them. And I treasure every single one.

And baby, I especially want you to remember something you told me.

You asked me to choose us, even on the worst days.
You asked me not to give up on each other when things become difficult.
You asked me to keep choosing you, even when life becomes hard.

Please never forget that.

Because I choose you.

I choose you on the beautiful days when everything feels easy.
I choose you on the difficult days when we misunderstand each other.
I choose you when we are laughing until we cannot breathe, and I choose you when we are tired, hurt, frustrated, or scared.

I do not want a love that only survives when everything is perfect. I want the kind of love that stays, listens, learns, forgives, grows, and tries again.

So when life gets hard, I want us to remember that we are on the same side. I want us to hold onto each other instead of letting go. I want us to talk things through, understand each other, forgive each other, and keep building what we started.

Because I never want to give up on you.

I want to spend this life with you. I want the ordinary days with you. The sleepy mornings, the silly arguments, the late-night conversations, the quiet moments, the celebrations, the difficult days, the growing pains, the victories, the failures, and all the little moments in between.

I want to do life with you.

I want us to build our own home together, a place filled with love, peace, laughter, comfort, and all the little things we once dreamed about. I want us to look around one day and realize that the life we imagined together is finally real.

You call me your 11:11 wish, and I cannot even explain how much that means to me. Knowing that you see me as your wish, something you hoped for and somehow found, is one of the sweetest things anyone could ever give my heart.

But the truth is, baby, you are my wish too.

You are the person I want beside me.
The person I want to come home to.
The person I want to tell everything to.
The person I want to grow old with.
The person I want to choose over and over again.

You are my everything.

And three months in, I already know that I do not want this to be just three months. I want three months to become a year, a year to become decades, and decades to become a lifetime.

And even one lifetime does not feel like enough.

I want you in this life.
I want you in the afterlife.
And in every life after that, I want you to find me again and again just like you promised.

No matter how many times life changes, no matter how many difficult seasons come, no matter how many things we have to work through, I want you. You and only you.

I love you so so much my beautiful baby. More than these words can properly hold.

Thank you for finding me.
Thank you for loving me.
Thank you for taking care of me.
Thank you for choosing me.
And thank you for reminding me that no matter how hard things become, we should keep choosing each other.

So today, on our third monthiversary, I want to remind us that 

I choose you.
I choose us.
And I will keep choosing you.

I am looking forward to forever with you. you are my last, my always and my eternity. ❤️

Happy third monthiversary, my beautiful baby.
I love you, and I always will forever.

Yours only in this life and every life,
Your loving baby`;

  function saveLetter(showSaved = true) {
    if (!loveLetter) return;
    localStorage.setItem(STORAGE_KEY, loveLetter.value);
    if (showSaved && saveStatus) {
      saveStatus.textContent = 'Saved automatically ♡';
    }
  }

  if (loveLetter) {
    const saved = localStorage.getItem(STORAGE_KEY);
    loveLetter.value = saved ?? DEFAULT_LETTER;

    let saveTimer;
    loveLetter.addEventListener('input', () => {
      window.clearTimeout(saveTimer);
      if (saveStatus) saveStatus.textContent = 'Saving...';
      saveTimer = window.setTimeout(() => saveLetter(true), 300);
    });
  }

  /* ---------- Memory image placeholders ---------- */
  document.querySelectorAll('.polaroid img').forEach((img) => {
    img.addEventListener('error', () => {
      const placeholder = document.createElement('div');
      placeholder.className = 'photo-placeholder';
      placeholder.textContent = 'Add your photo here ♡';
      img.replaceWith(placeholder);
    }, { once: true });
  });

  /* ---------- Background music ---------- */
const audio = document.getElementById('backgroundMusic');
const playButton = document.getElementById('musicPlay');
const volumeSlider = document.getElementById('musicVolume');
const muteButton = document.getElementById('musicMute');
const seekSlider = document.getElementById('musicSeek');
const musicTime = document.getElementById('musicTime');

  const MUSIC_KEY = 'rl-third-monthsary-music';
  let musicState = {};

  try {
    musicState = JSON.parse(localStorage.getItem(MUSIC_KEY) || '{}') || {};
  } catch (_) {
    musicState = {};
  }

  if (audio) {
    audio.volume = typeof musicState.volume === 'number'
      ? Math.min(1, Math.max(0, musicState.volume))
      : 0.45;
    audio.muted = Boolean(musicState.muted);

    if (typeof musicState.time === 'number' && musicState.time >= 0) {
      audio.addEventListener('loadedmetadata', () => {
        try {
          audio.currentTime = Math.min(musicState.time, Math.max(0, audio.duration - 0.25));
        } catch (_) {}
      }, { once: true });
    }
  }

  if (volumeSlider && audio) {
    volumeSlider.value = audio.volume;
  }

  function saveMusicState() {
    if (!audio) return;
    localStorage.setItem(MUSIC_KEY, JSON.stringify({
      time: audio.currentTime || 0,
      volume: audio.volume,
      muted: audio.muted,
      playing: !audio.paused
    }));
  }

  function updateMusicControls() {
    if (!audio) return;

    if (playButton) {
      playButton.textContent = audio.paused ? '♫' : '❚❚';
      playButton.setAttribute('aria-label', audio.paused ? 'Play music' : 'Pause music');
    }

    if (muteButton) {
      if (audio.muted || audio.volume === 0) {
        muteButton.textContent = '🔇';
      } else if (audio.volume < 0.5) {
        muteButton.textContent = '🔉';
      } else {
        muteButton.textContent = '🔊';
      }
    }

    if (volumeSlider) volumeSlider.value = audio.volume;
  if (seekSlider && audio && Number.isFinite(audio.duration)) {
  seekSlider.max = audio.duration;
  seekSlider.value = audio.currentTime;
}

if (musicTime && audio) {
  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes}:${String(secs).padStart(2, '0')}`;
  };

  musicTime.textContent =
    `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
}
  }
  window.startMusic = async function startMusic() {
    if (!audio) return;
    try {
      await audio.play();
      updateMusicControls();
      saveMusicState();
    } catch (_) {
      updateMusicControls();
    }
  };

  playButton?.addEventListener('click', async () => {
    if (!audio) return;

    if (audio.paused) {
      await window.startMusic();
    } else {
      audio.pause();
      saveMusicState();
      updateMusicControls();
    }
  });

  muteButton?.addEventListener('click', () => {
    if (!audio) return;
    audio.muted = !audio.muted;
    saveMusicState();
    updateMusicControls();
  });

  volumeSlider?.addEventListener('input', () => {
    if (!audio) return;
    audio.volume = Number(volumeSlider.value);
    if (audio.volume > 0) audio.muted = false;
    saveMusicState();
    updateMusicControls();
  });

seekSlider?.addEventListener('input', () => {
  if (!audio) return;
  audio.currentTime = Number(seekSlider.value);
  updateMusicControls();
});
  
  audio?.addEventListener('timeupdate', saveMusicState);
  audio?.addEventListener('play', updateMusicControls);
  audio?.addEventListener('pause', updateMusicControls);
  audio?.addEventListener('loadedmetadata', () => {
  if (!audio) return;

  if (seekSlider) {
    seekSlider.max = audio.duration || 0;
    seekSlider.value = audio.currentTime || 0;
  }

  updateMusicControls();
});

audio?.addEventListener('timeupdate', updateMusicControls);
  window.addEventListener('pagehide', saveMusicState);

  updateMusicControls();
});
