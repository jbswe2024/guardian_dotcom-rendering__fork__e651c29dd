import React from 'react';
import { css } from 'emotion';

import { from, until, between } from '@guardian/src-utilities';

import { MainMedia } from '@frontend/web/components/MainMedia';
import { ArticleHeadline } from '@frontend/web/components/ArticleHeadline';
import { ArticleStandfirst } from '@frontend/web/components/ArticleStandfirst';
import { SeriesSectionLink } from '@frontend/web/components/SeriesSectionLink';
import { HeaderItem } from '@frontend/web/components/HeaderItem';
import { Hide } from '@frontend/web/components/Hide';

const positionMainImage = css`
    /*
        Decide the order for ArticleHeader items. The natural order is:
            - 1. <SeriesSectionLink />
            - 2. <ArticleHeadline />
            - 3. <ArticleStandfirst />
            - 4. <MainImage />
    */

    /* For all articles, below 740px move the image above headline */
    ${until.tablet} {
        order: 0;
    }

    ${between.tablet.and.leftCol} {
        order: 4;
    }

    /* Move the standfirst above the main image when over 1140px */
    ${from.leftCol} {
        order: 2;
    }
`;

const headerStyles = css`
    ${until.phablet} {
        margin: 0 -10px;
    }

    display: flex;
    flex-direction: column;
`;

type Props = {
    CAPI: CAPIType;
};

export const ShowcaseHeader = ({ CAPI }: Props) => {
    const {
        headline,
        tags,
        webPublicationDate,
        pillar,
        mainMediaElements,
        standfirst,
    } = CAPI;

    return (
        <header className={headerStyles}>
            <HeaderItem order={1}>
                <Hide when="above" breakpoint="leftCol">
                    <SeriesSectionLink CAPI={CAPI} fallbackToSection={true} />
                </Hide>
            </HeaderItem>
            <HeaderItem order={2}>
                <ArticleHeadline
                    headlineString={headline}
                    tags={tags}
                    webPublicationDate={webPublicationDate}
                />
            </HeaderItem>
            <HeaderItem order={3}>
                <Hide when="above" breakpoint="leftCol">
                    <ArticleStandfirst
                        pillar={pillar}
                        standfirst={standfirst}
                    />
                </Hide>
            </HeaderItem>
            <div className={positionMainImage}>
                <MainMedia elements={mainMediaElements} pillar={pillar} />
            </div>
        </header>
    );
};
