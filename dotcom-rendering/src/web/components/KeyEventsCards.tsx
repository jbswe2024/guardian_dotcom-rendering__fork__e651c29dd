import { css } from '@emotion/react';
import { textSans, neutral, space, from } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import { timeAgo } from '@guardian/libs';

interface KeyEvent {
	date: Date;
	text: string;
	url: string;
}

const linkStyles = css`
	position: initial;
	text-decoration: none;

	&:hover::before {
		background-color: ${neutral[0]};
	}

	&::before {
		content: '';
		display: block;
		position: relative;
		height: 13px;
		width: 13px;
		border-radius: 50%;
		background-color: ${neutral[46]};
		margin-bottom: ${space[2]}px;
		z-index: 2;

		${from.tablet} {
			height: 15px;
			width: 15px;
		}
	}
`;

const listItemStyles = css`
	padding-bottom: ${space[3]}px;
	padding-top: ${space[3]}px;
	position: relative;
	background-color: ${neutral[97]};
	padding-right: ${space[5]}px;
	list-style: none;

	${from.desktop} {
		background-color: ${neutral[93]};
	}

	&::before {
		content: '';
		display: block;
		position: absolute;
		border-top: 1px dotted ${neutral[46]};
		left: 0;
		right: 0;
		top: 6px;

		${from.tablet} {
			top: ${space[2]}px;
		}
	}

	&:last-child::before {
		border-top: 0;
	}
`;

const textStyles = css`
	width: 150px;
	${textSans.small({ fontWeight: 'regular', lineHeight: 'regular' })};

	// TODO: update this colour
	color: ${neutral[7]};
	display: block;
	text-decoration: none;

	&:hover {
		// TODO: update this colour
		color: ${neutral[7]};
		text-decoration: underline;
	}

	${from.desktop} {
		// TODO: update this colour
		color: ${neutral[7]};

		&:hover {
			// TODO: update this colour
			color: ${neutral[7]};
			text-decoration: underline;
		}
	}
`;

const timeStyles = css`
	${textSans.xsmall({ fontWeight: 'bold', lineHeight: 'tight' })};
	color: ${neutral[7]};
	display: block;
`;

const KeyEventCard = ({ text, date, url }: KeyEvent) => {
	return (
		<li css={listItemStyles}>
			<Link priority="secondary" css={linkStyles} href={url}>
				<time
					dateTime={date.toISOString()}
					data-relativeformat="med"
					title={`${date.toLocaleDateString('en-GB', {
						hour: '2-digit',
						minute: '2-digit',
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						timeZoneName: 'long',
					})}`}
					css={timeStyles}
				>
					{timeAgo(date.getTime())}
				</time>
				<span css={textStyles}>{text}</span>
			</Link>
		</li>
	);
};

export default KeyEventCard;
export type { KeyEvent };
