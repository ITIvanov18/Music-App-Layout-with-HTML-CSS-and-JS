console.clear();

// Filters
// =======

Vue.filter('time', function(seconds) {
    var minutes = Math.floor(seconds / 60),
        seconds = Math.floor(seconds % 60);

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
});

Vue.filter('minutes', function(seconds) {
    var minutes = Math.floor(seconds / 60);
    
    return minutes;
})


// App
// =====
new Vue({
    el: '.app',
    data: function() {
        return {
            player: {
                currentTrack: 0,
                elapsed: 0,
                playing: false,
                repeat: false,
                shuffle: true,
                volume: 68
            },
            playlist: {
                title: 'Billboard Top 100 Single Charts',
                author: 'ITIvanov18',
                tracks: [{
                    title: 'One Dance',
                    artist: 'Drake (feat. Wizkid & Kyla)',
                    album: 'View',
                    duration: 244,
                    cover: {
                        small: 'https://cdns-images.dzcdn.net/images/cover/56bdb7a86a27fadb96332c0c8f1b8e81/500x500.jpg',
                        large: 'https://desire2music.net/wp-content/uploads/2016/07/%D7%9C%D7%9C%D7%90-%D7%A9%D7%9D-2-1.jpg'
                    }
                }, {
                    title: 'Dangerous Woman',
                    artist: 'Ariana Grande',
                    album: 'Dangerous Woman',
                    duration: 236,
                    cover: {
                        small: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png',
                        large: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/A1LRANDvjvL._UF1000,1000_QL80_.jpg'

                    }
                }, {
                    title: 'Cant stop the feeling',
                    artist: 'Justin Timberlake',
                    album: '538 Hitzone 78',
                    duration: 207,
                    cover: {
                        small: 'https://upload.wikimedia.org/wikipedia/en/2/21/Justin_Timberlake_-_Can%27t_Stop_the_Feeling.png',
                        large: 'https://i1.sndcdn.com/artworks-000203903601-81vfv2-t500x500.jpg'
                    }
                }, {
                    title: 'Work from home',
                    artist: 'Fifth Harmony',
                    album: '7/27',
                    duration: 225,
                    cover: {
                        small: 'https://upload.wikimedia.org/wikipedia/en/f/f5/Work_From_Home_%28featuring_Ty_Dolla_%24ign%29_%28Official_Single_Cover%29_by_Fifth_Harmony.png',
                        large: 'https://i1.sndcdn.com/artworks-hzGk6Eac78HLAvfo-BTHJQA-t500x500.jpg'
                    }
                }, {
                    title: 'If it aint love',
                    artist: 'Jason Derulo',
                    album: 'Single',
                    duration: 199,
                    cover: {
                        small: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Jason_Derulo_-_If_It_Ain%27t_Love.png',
                        large: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Jason_Derulo_-_If_It_Ain%27t_Love.png'
                    }
                }]
            }
        }
    },
    computed: {
        currentTrack: function() {
            return this.playlist.tracks[this.player.currentTrack];
        },
        playlistDuration: function() {
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
        pause: function() {
            if (!this.player.playing) {
                return;
            }
            this.$set('player.playing', false);
            clearInterval(this.timer);
            this.$set('timer', false);
        },
        play: function() {
            if (this.player.playing) {
                return;
            }
            var _this = this,
                timer = setInterval(function() {
                    if (_this.player.elapsed >= _this.currentTrack.duration) {
                        _this.$set('player.elapsed', 0);
                        _this.skipForward();
                    }
                    _this.player.elapsed += .1;
                }, 100);
            
            this.$set('player.playing', true);
            this.$set('timer', timer);
        },
        selectTrack: function(id) {
            this.$set('player.currentTrack', id);
            this.$set('player.elapsed', 0);
            this.play();
        },
        skipForward: function() {
            var track = this.player.currentTrack + 1;
            
            track = track % this.playlist.tracks.length;
            this.selectTrack(track);
        },
        skipBack: function() {
            var track = this.player.currentTrack;
            
            if (this.player.elapsed < 2) {
                track = track - 1;
            }
            
            if (track < 0) {
                track = 0;
            }
            
            this.selectTrack(track);
        },
        toggleRepeat: function() {
            this.player.repeat = !this.player.repeat;
        },
        toggleShuffle: function() {
            this.player.shuffle = !this.player.shuffle;
        }
    }
});