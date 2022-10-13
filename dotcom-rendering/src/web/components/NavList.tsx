import { css } from '@emotion/react';
import {
	between,
	border,
	from,
	palette,
	space,
	until,
} from '@guardian/source-foundations';
import type { DCRContainerPalette } from 'src/types/front';
import type { TrailType } from '../../types/trails';
import { MiniCard } from './MiniCard';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
};

const ulStyles = css`
	${until.tablet} {
		column-count: 1;
	}
	${between.tablet.and.desktop} {
		column-count: 3;
	}
	column-count: 4;

	column-rule: 1px solid ${border.secondary};
	column-gap: 10px;
`;

const liStyles = css`
	color: ${palette.neutral[7]};
	border-top: 1px solid ${palette.neutral[93]};
	padding-top: ${space[1]}px;
	padding-bottom: ${space[3]}px;

	${from.tablet} {
		margin-left: 10px;
		margin-right: 10px;
	}
`;

export const NavList = ({ trails, containerPalette }: Props) => {
	return (
		<ul css={ulStyles}>
			{trails.map((trail) => (
				<li css={liStyles}>
					<MiniCard
						trail={trail}
						showImage={false}
						containerPalette={containerPalette}
					/>
				</li>
			))}
		</ul>
	);
};
