import React from 'react';
import { css, cx } from 'emotion';
import { space } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';

type Props = {
	badge: string;
	badgeAlt: string;
	palette: Palette;
};

const badgeImageStyle = css`
	max-height: ${space[12]}px;
	margin-left: ${space[3]}px;
	vertical-align: middle;
`;

const badgeWrapperStyle = css`
	margin-top: ${space[6]}px;
	padding-right: ${space[3]}px;
	padding-bottom: ${space[3]}px;
	text-align: right;
	flex: auto;
`;

const paidForStyle = css`
	${textSans.xsmall({ fontWeight: 'bold' })}
`;

export const LabBadge = ({ badge, badgeAlt, palette }: Props) => (
	<div className={badgeWrapperStyle}>
		<div
			className={cx(
				paidForStyle,
				css`
					color: ${palette.text.branding};
				`,
			)}
		>
			Paid for by
		</div>
		<img className={badgeImageStyle} alt={badgeAlt} src={badge} />
	</div>
);
