let supportsAudio = !!document.createElement('audio').canPlayType;
window.onload = function () {
    if (supportsAudio) {
        let player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume'
            ]
        });

        let index = 0;
        let playing = false;
        let mediaPath = 'music/';
        let extension = '';
        let tracks = [{
                'track': 1,
                'name': 'Mujuice - Hurt',
                'duration': '4:50',
                'file': 'track1'
            }, {
                'track': 2,
                'name': 'Mazzy Star - Into Dust',
                'duration': '5:36',
                'file': 'track2'
            }, {
                'track': 3,
                'name': 'Tom Odell - Another Love',
                'duration': '4:04',
                'file': 'track3'
            }, {
                'track': 4,
                'name': 'Michael Penn - Walter Reed',
                'duration': '3:41',
                'file': 'track4'
            }, {
                'track': 5,
                'name': 'The Rolling Stones - You Cant Always Get What You Want',
                'duration': '7:28',
                'file': 'track5'
            }, {
                'track': 6,
                'name': 'Fallulah - Give Us a Little Love',
                'duration': '3:46',
                'file': 'track6'
            }, {
                'track': 7,
                'name': 'Nizkiz - Небяспечна',
                'duration': '4:45',
                'file': 'track7'
            }, {
                'track': 8,
                'name': 'LCD Soundsystem - Christmas Will Break Your Heart',
                'duration': '4:26',
                'file': 'track8'
            }, {
                'track': 9,
                'name': 'Tor Band - Памятай',
                'duration': '3:56',
                'file': 'track9'
            }, {
                'track': 10,
                'name': 'Recoil - Missing Peace',
                'duration': '5:31',
                'file': 'track10'
            }];

        trackCount = tracks.length;
        tracks.forEach(function (value, key) {
            let trackNumber = value.track;
            let trackName = value.name;
            let trackDuration = value.duration;
            if ((trackNumber + '').length === 1) {
                trackNumber = '0' + trackNumber;
            }
            document.getElementsByClassName('track-list')[0].innerHTML += `<li onclick="playCurrent(${key})"> <div class="plItem"> <span class="plNum">${trackNumber}.</span> <span class="plTitle">${trackName}</span> <span class="plLength">${trackDuration}</span> </div> </li>`;
        });

        const action = document.getElementsByClassName('action')[0];
        const npName = document.getElementsByClassName('np-name')[0];
        audio = document.getElementsByTagName('audio')[0];
        audio.onplay = function () {
            playing = true;
            action.innerHTML = 'Now Playing';
        };

        audio.onpause = function () {
            playing = false;
            action.innerHTML = 'Paused';
        };
        
        li = document.getElementsByClassName('track-list li');
        li.onclick =  function () {
            let id = parseInt(this).index();
            if (id !== index) {
                playTrack(id);
            }
        };

        loadTrack = function (id) {
            if (document.getElementsByClassName('plSel').classList) {
                document.getElementsByClassName('plSel').classList.remove('plSel');
                document.getElementsByClassName('track-list li:eq(' + id + ')').classList.add('plSel');
            }

            npName.innerHTML = tracks[id].name;
            index = id;
            audio.src = mediaPath + tracks[id].file + extension;
        };

        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } 
}

function playCurrent(id) {
    loadTrack(id);
    audio.play();
}
