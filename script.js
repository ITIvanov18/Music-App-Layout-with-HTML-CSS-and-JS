console.clear();

// Filters

Vue.filter('time', function (seconds) {
    var minutes = Math.floor(seconds / 60),
        seconds = Math.floor(seconds % 60);

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
});

Vue.filter('minutes', function (seconds) {
    var minutes = Math.floor(seconds / 60);

    return minutes;
})


// App

new Vue({
    el: '.app',
    data: function () {
        return {
            player: {
                currentTrack: 0,
                elapsed: 0,
                playing: false,
                repeat: false,
                shuffle: true,
                volume: 50
            },
            playlist: {
                title: 'Billboard Top 100 Single Charts',
                author: 'ITIvanov18',
                tracks: [{
                    title: 'One Dance',
                    artist: 'Drake (feat. Wizkid & Kyla)',
                    album: 'View',
                    duration: 244,
                    audio: 'AudioTracks_mp3/One Dance.mp3',
                    cover: {
                        small: 'https://cdns-images.dzcdn.net/images/cover/56bdb7a86a27fadb96332c0c8f1b8e81/500x500.jpg',
                        large: 'https://desire2music.net/wp-content/uploads/2016/07/%D7%9C%D7%9C%D7%90-%D7%A9%D7%9D-2-1.jpg'
                    }
                }, {
                    title: 'good 4 u',
                    artist: 'Olivia Rodrigo',
                    album: 'Sour',
                    duration: 198,
                    audio: 'AudioTracks_mp3/good 4 u.mp3',
                    cover: {
                        small: 'https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a ',
                        large: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e678bd119570653.60a090a514e50.jpg'
                    }
                }, {
                    title: 'Cant stop the feeling',
                    artist: 'Justin Timberlake',
                    album: '538 Hitzone 78',
                    duration: 207,
                    audio: 'AudioTracks_mp3/Cant Stop The Feeling.mp3',
                    cover: {
                        small: 'https://upload.wikimedia.org/wikipedia/en/2/21/Justin_Timberlake_-_Can%27t_Stop_the_Feeling.png',
                        large: 'https://i1.sndcdn.com/artworks-000203903601-81vfv2-t500x500.jpg'
                    }
                }, {
                    title: 'STAY',
                    artist: 'The Kid LAROI & Justin Bieber',
                    album: 'STAY',
                    duration: 142,
                    audio: 'AudioTracks_mp3/STAY.mp3',
                    cover: {
                        small: 'https://static.wikia.nocookie.net/justin-bieber/images/7/75/STAY_Alternative_Cover_for_D2C.jpg/revision/latest?cb=20210824232555',
                        large: 'https://i.scdn.co/image/ab67616d0000b27341e31d6ea1d493dd77933ee5'
                    }
                }, {
                    title: 'Stereo Love',
                    artist: 'Edward Maya & Vika Jigulina',
                    album: 'Stereo Love',
                    duration: 249,
                    audio: 'AudioTracks_mp3/Stereo Love.mp3',
                    cover: {
                        small: 'https://i.scdn.co/image/ab67616d0000b273f204118fe356fda7fa84cd36',
                        large: 'https://i.scdn.co/image/ab67616d0000b27363930afae902cae1ca1c65b9'
                    }
                }]
            },
            audioElement: null
        }
    },
    mounted() {
        this.audioElement = document.createElement("audio");
        this.audioElement.autoplay = true;
        this.audioElement.addEventListener("ended", this.playNext);
        document.body.appendChild(this.audioElement);
    },
    computed: {
        currentTrack: function () {
            return this.playlist.tracks[this.player.currentTrack];
        },
        playlistDuration: function () {
            var duration = 0,
                tracks = this.playlist.tracks,
                i;

            for (i = 0; i < tracks.length; i += 1) {
                duration += tracks[i].duration;
            }

            return duration;
        }
    },
    methods: {
        playAudio() {
            this.audioElement.src = this.currentTrack.audio;
            this.audioElement.oncanplaythrough = () => {
                this.audioElement.volume = this.player.volume / 100;
                this.audioElement.play();
                this.player.playing = true;
                this.audioElement.oncanplaythrough = null;
            };
        },
        pause: function () {
            if (!this.player.playing) {
                return;
            }
            this.$set('player.playing', false);
            clearInterval(this.timer);
            this.$set('timer', false);
        },
        play: function () {
            if (this.player.playing) {
                return;
            }
            var _this = this,
                timer = setInterval(function () {
                    if (_this.player.elapsed >= _this.currentTrack.duration) {
                        _this.$set('player.elapsed', 0);
                        _this.skipForward();
                    }
                    _this.player.elapsed += .1;
                }, 100);

            this.$set('player.playing', true);
            this.$set('timer', timer);
        },
        selectTrack: function (id) {
            this.$set('player.currentTrack', id);
            this.$set('player.elapsed', 0);
            this.play();
        },
        skipForward: function () {
            var track = this.player.currentTrack + 1;

            track = track % this.playlist.tracks.length;
            this.selectTrack(track);
        },
        skipBack: function () {
            var track = this.player.currentTrack;

            if (this.player.elapsed < 2) {
                track = track - 1;
            }

            if (track < 0) {
                track = 0;
            }

            this.selectTrack(track);
        },
        toggleRepeat: function () {
            this.player.repeat = !this.player.repeat;
        },
        toggleShuffle: function () {
            this.player.shuffle = !this.player.shuffle;
        }
    }
});