// Generated by https://quicktype.io

export interface AxiosRecentlySub {
    title: string;
    latest_ep: string;
    url: string;
    thumbnail: string;
}

// Generated by https://quicktype.io

export interface AxiosEpisodeAnime {
    vidstreaming: string;
    vidcdn: string;
    streamsb: string;
    doodstream: string;
    fembed: string;
}

// Generated by https://quicktype.io

export interface APIEpisodeAnime {
    source: Source[];
    source_bk: Source[];
    track: any[];
    advertising: any[];
    linkiframe: string;
}

export interface Source {
    file: string;
    label: string;
    type: string;
    default?: string;
}
