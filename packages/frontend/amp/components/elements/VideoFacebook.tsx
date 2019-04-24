import React from 'react';

export const VideoFacebook: React.FC<{
    element: VideoFacebook;
}> = ({ element }) => {
    return (
        <amp-facebook
            data-href={element.url}
            data-embed-as="video"
            layout="responsive"
            width="5"
            height="3"
        />
    );
};
