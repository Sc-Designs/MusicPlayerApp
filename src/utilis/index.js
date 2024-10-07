export const formateSecToMin = second => {
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60);

    const Formitedmin = String(min).padStart(2, '0');
    const Formitedsec = String(sec).padStart(2, '0');
    return `${Formitedmin}:${Formitedsec}`;
}

export const IsExist = (songs, track ) =>{
    return songs.some(song =>song.url === track.url);
}