import { css } from '@emotion/react';
import { ArticleFormat } from '@guardian/libs';
import {
	Hide,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import { neutral, brandAlt, space } from '@guardian/source-foundations';
import { KeyEventCard } from './KeyEventCard';

interface Props {
	keyEvents: Block[];
	filterKeyEvents: boolean;
	format: ArticleFormat;
}

const carouselStyles = css`
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overflow-x: auto;
	overflow-y: hidden;
	display: flex;
	flex-direction: column;
`;

const containerStyles = css`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: stretch;
	width: fit-content;
	margin-bottom: 34px;
`;

const buttonContainerStyles = css`
	display: flex;
	height: 34px;
	margin-top: 10px;
	margin-bottom: ${space[5]}px;
	position: absolute;
	bottom: 0;
	justify-content: space-between;
	width: 100%;
	padding-right: 40px;
`;

const buttonStyles = css`
	border: 0 none;
	border-radius: 100%;
	height: 34px;
	width: 34px;
	cursor: pointer;
	padding: 0;
	background-color: ${neutral[0]};
	bottom: 4px;
	&:active,
	&:hover {
		outline: none;
		background-color: ${brandAlt[400]};
		svg {
			fill: ${neutral[7]};
		}
	}

	&:focus {
		outline: none;
	}

	svg {
		fill: ${neutral[100]};
		height: 34px;
	}
`;

const disabledButtonStyles = css`
	background-color: ${neutral[60]};
	cursor: 'default';

	&:hover,
	&:focus {
		background-color: ${neutral[60]};

		svg {
			fill: ${neutral[100]};
		}
	}
`;

const isServer = typeof window === 'undefined';

const carousel: Element | null = !isServer
	? window.document.getElementById('key-event-carousel')
	: null;

export const KeyEventsCarousel = ({
	keyEvents,
	filterKeyEvents,
	format,
}: Props) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [elements, setElements] = useState<Element[]>();
	const isFirstCard = activeIndex === 6;
	const isLastCard = activeIndex === keyEvents.length - 1;

	useEffect(() => {
		const cards = document.querySelectorAll('#key-event-card');
		setElements(Array.from(cards));
	}, []);

	useEffect(() => {
		function handleIntersect(entries: IntersectionObserverEntry[]) {
			const entry = entries.find((e) => e.isIntersecting);
			if (entry) {
				const index = elements?.findIndex((e) => e === entry.target);

				if (index) {
					console.log('index is ', index);
					setActiveIndex(index);
				}
			}
		}

		const observer = new window.IntersectionObserver(handleIntersect, {
			root: carousel,
			rootMargin: '0px 0px 0px -1076px',
			threshold: 0.5,
		});

		elements?.forEach((el) => {
			observer.observe(el);
		});
	}, [elements]);

	function goPrevious() {
		if (activeIndex > 0 && elements) {
			if (carousel) carousel.scrollLeft -= 180;

			elements[activeIndex - 1].scrollIntoView({
				behavior: 'smooth',
			});
		}
	}

	function goNext() {
		if (elements && activeIndex < elements.length - 1) {
			if (carousel) carousel.scrollLeft += 180;
		}
	}

	const transformedKeyEvents = keyEvents
		.filter((keyEvent) => {
			return keyEvent.title && keyEvent.blockFirstPublished;
		})
		.map((keyEvent) => {
			return {
				text: keyEvent.title || '', // We fallback to '' here purely to keep ts happy
				url: `?filterKeyEvents=${filterKeyEvents}&page=with:block-${keyEvent.id}#block-${keyEvent.id}`,
				date: new Date(keyEvent.blockFirstPublished || ''), // We fallback to '' here purely to keep ts happy
			};
		});
	return (
		<div id="key-event-carousel" css={carouselStyles}>
			<span css={containerStyles}>
				{transformedKeyEvents.map((keyEvent) => {
					return (
						<KeyEventCard
							text={keyEvent.text}
							url={keyEvent.url}
							date={keyEvent.date}
							format={format}
						/>
					);
				})}
			</span>
			<Hide until="desktop">
				<span css={buttonContainerStyles}>
					<button
						css={[
							buttonStyles,
							isFirstCard && disabledButtonStyles,
						]}
						type="button"
						aria-label="Move key events carousel backwards"
						onClick={() => {
							if (isFirstCard) return;
							goPrevious();
						}}
					>
						<SvgChevronLeftSingle />
					</button>
					<button
						css={[buttonStyles, isLastCard && disabledButtonStyles]}
						type="button"
						aria-label="Move key events carousel forwards"
						onClick={() => {
							if (isLastCard) return;
							goNext();
						}}
					>
						<SvgChevronRightSingle />
					</button>
				</span>
			</Hide>
		</div>
	);
};
